// Dice Dash — Cyberpunk Edition
// Three.js r128

const FACE_COLORS = {
  TOP:    0xff0090,
  BOTTOM: 0x00ffff,
  FRONT:  0xffee00,
  BACK:   0xff2200,
  RIGHT:  0x00ff41,
  LEFT:   0xaa00ff,
};
const COLOR_NAMES  = ['#ff0090','#00ffff','#ffee00','#ff2200','#00ff41','#aa00ff'];
const COLOR_LABELS = ['PINK','CYAN','YELLOW','RED','GREEN','VIOLET'];

// All 8 lines on a 3×3 grid
const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const GRID_X = [-0.3, 1.5, 3.3]; // shifted right 1.5 units
const GRID_Y = [0.2, 2.0, 3.8];  // shifted up so gate top (~4.5) grazes tunnel ceiling
const GATE_SPAWN_Z   = -50;
const GATE_DESTROY_Z = 3;
const GATE_PASS_Z    = 1.5;
const TUNNEL_Z_START = -60;

// ── Helpers ───────────────────────────────────────────────────────────────────

// Rounded rectangle extruded into a thin panel
function roundedPanelGeo(w, h, depth, r) {
  const shape = new THREE.Shape();
  shape.moveTo(-w/2 + r, -h/2);
  shape.lineTo( w/2 - r, -h/2);
  shape.quadraticCurveTo( w/2, -h/2,  w/2, -h/2 + r);
  shape.lineTo( w/2,  h/2 - r);
  shape.quadraticCurveTo( w/2,  h/2,  w/2 - r,  h/2);
  shape.lineTo(-w/2 + r,  h/2);
  shape.quadraticCurveTo(-w/2,  h/2, -w/2,  h/2 - r);
  shape.lineTo(-w/2, -h/2 + r);
  shape.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true,
    bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3,
  });
  geo.translate(0, 0, -(depth / 2 + 0.03));
  return geo;
}

// Glow layer: same shape as the panel but slightly larger, additive blending.
// Gives each cell/face its own colour-matched halo that follows the geometry.
function glowMesh(geo, hexColor, opacity = 0.18) {
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color: new THREE.Color(hexColor),
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
  }));
}

// Local face directions → color index mapping (BoxGeometry with matOrder=[4,5,0,1,2,3])
// +X=right(green=4), -X=left(violet=5), +Y=top(pink=0), -Y=bottom(cyan=1),
// +Z=front(yellow=2), -Z=back(red=3)
const LOCAL_FACES = [
  { dir: new THREE.Vector3( 1, 0, 0), idx: 4 },
  { dir: new THREE.Vector3(-1, 0, 0), idx: 5 },
  { dir: new THREE.Vector3( 0, 1, 0), idx: 0 },
  { dir: new THREE.Vector3( 0,-1, 0), idx: 1 },
  { dir: new THREE.Vector3( 0, 0, 1), idx: 2 },
  { dir: new THREE.Vector3( 0, 0,-1), idx: 3 },
];

// ── Audio ─────────────────────────────────────────────────────────────────────
class AudioEngine {
  constructor() {
    this.ctx = null;
    this._musicActive = false; this._musicMaster = null; this._pulseTimer = null;
    this.sfxMuted = localStorage.getItem('dd_sfx') === '0';
  }
  init() { try { this.ctx = new (window.AudioContext||window.webkitAudioContext)(); } catch(e){} }

  _play(freq,type,dur,gain=0.25) {
    if (!this.ctx || this.sfxMuted) return;
    const o=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.connect(g); g.connect(this.ctx.destination);
    o.type=type;
    o.frequency.setValueAtTime(freq, this.ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq*0.5, this.ctx.currentTime+dur);
    g.gain.setValueAtTime(gain, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime+dur);
    o.start(); o.stop(this.ctx.currentTime+dur);
  }

  setVolume(v) {
    this._volume = Math.max(0, Math.min(1, v));
    if (this._musicMaster) this._musicMaster.gain.value = this._volume;
    localStorage.setItem('dd_vol', this._volume);
  }

  startMusic() {
    if (!this.ctx || this._musicActive) return;
    this._musicActive = true;

    // Master — use saved volume (default 0.30)
    const saved = parseFloat(localStorage.getItem('dd_vol'));
    this._volume = isNaN(saved) ? 0.30 : saved;
    const master = this.ctx.createGain();
    master.gain.value = this._volume;
    master.connect(this.ctx.destination);
    this._musicMaster = master;

    // Three delay taps = natural room reverb
    const revBus = this.ctx.createGain();
    revBus.gain.value = 0.38;
    revBus.connect(master);
    const mkTap = (t, fb, wet) => {
      const d = this.ctx.createDelay(4); d.delayTime.value = t;
      const f = this.ctx.createGain();   f.gain.value = fb;
      const w = this.ctx.createGain();   w.gain.value = wet;
      d.connect(f); f.connect(d); d.connect(w); w.connect(revBus);
      return d;
    };
    this._r1 = mkTap(0.11, 0.52, 0.5);
    this._r2 = mkTap(0.25, 0.40, 0.3);
    this._r3 = mkTap(0.47, 0.28, 0.18);

    // C major pentatonic — sounds naturally serene across 3 octaves
    this._SCALE = [
      130.8, 146.8, 164.8, 196.0, 220.0,   // octave 3 (warm low)
      261.6, 293.7, 329.6, 392.0, 440.0,   // octave 4 (mid)
      523.3, 587.3, 659.3,                  // octave 5 (bright sparkle)
    ];

    this._scheduleNotes();
  }

  _playNote(freq, when, vol) {
    // Soft kalimba/piano: sine + decaying harmonics = natural pluck
    [[1, 1.0], [2, 0.30], [3, 0.10], [4, 0.03]].forEach(([h, amp]) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq * h;
      const dur = 3.0 / h; // higher harmonics fade faster
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(amp * vol * 0.20, when + 0.010);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      o.connect(g);
      g.connect(this._musicMaster);
      g.connect(this._r1); g.connect(this._r2); g.connect(this._r3);
      o.start(when);
      o.stop(when + dur + 0.1);
    });
  }

  _scheduleNotes() {
    if (!this._musicActive) return;
    const now = this.ctx.currentTime;
    let t = now + 0.05;
    const count = 4 + Math.floor(Math.random() * 4);

    for (let i = 0; i < count; i++) {
      // Weight heavily toward low/mid notes for serenity
      const r = Math.random();
      const pool = r < 0.55 ? this._SCALE.slice(0, 5)
                 : r < 0.88 ? this._SCALE.slice(5, 10)
                 :             this._SCALE.slice(10);
      const freq = pool[Math.floor(Math.random() * pool.length)];
      const vol  = 0.45 + Math.random() * 0.55;
      this._playNote(freq, t, vol);

      // Occasionally add a soft fifth for warmth
      if (Math.random() < 0.28) this._playNote(freq * 1.498, t, vol * 0.35);

      t += 1.0 + Math.random() * 3.0; // organic gaps between notes
    }

    this._pulseTimer = setTimeout(() => this._scheduleNotes(), (t - now - 0.3) * 1000);
  }

  stopMusic() {
    this._musicActive = false;
    clearTimeout(this._pulseTimer);
    if (this._musicMaster && this.ctx) {
      this._musicMaster.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2.5);
    }
    setTimeout(() => { this._musicMaster = null; }, 3000);
  }

  rotate() { this._play(500,'square',0.07,0.18); }
  move()   { this._play(280,'sine',0.04,0.12); }
  pass()   { this._play(960,'sine',0.18,0.35); }
  crash()  { this._play(90,'sawtooth',0.45,0.55); }
}

// ── Gate ──────────────────────────────────────────────────────────────────────
// 9 cells, 5 unique colors. One color appears EXACTLY twice in a line (the pair).
// Player must rotate die to that color and stand at the 3rd cell to complete 3-in-a-row.

class Gate {
  constructor(scene, score) {
    this.scene  = scene;
    this.passed = false;

    const pool = [...Array(COLOR_NAMES.length).keys()]
      .sort(() => Math.random()-0.5).slice(0, 5);
    const winColor    = pool[0];
    const otherColors = pool.slice(1);

    // Pick line, shuffle to get random targetIdx and pair
    let cellColors, targetIdx, pairA, pairB;
    let solved = false;

    for (let attempt = 0; attempt < 12 && !solved; attempt++) {
      const line = LINES[Math.floor(Math.random()*LINES.length)];
      const [a,b,c] = [...line].sort(() => Math.random()-0.5);
      targetIdx = a; pairA = b; pairB = c;

      const base = new Array(9).fill(-1);
      base[pairA] = winColor;
      base[pairB] = winColor;

      // Backtrack to fill remaining 7 cells
      const empty = [];
      for (let i=0;i<9;i++) if (base[i]===-1) empty.push(i);
      // Shuffle empty cells for randomness
      empty.sort(() => Math.random()-0.5);

      const result = Gate._backfill([...base], empty, 0, winColor, pairA, pairB, otherColors);
      if (result) { cellColors = result; solved = true; }
    }

    // Hard fallback (should be extremely rare) — use a known-valid template
    if (!solved) {
      cellColors = Gate._fallback(winColor, otherColors);
      targetIdx = 2; pairA = 0; pairB = 1;
    }

    this.cellColors   = cellColors;
    this.targetIdx    = targetIdx;
    this.winningColor = winColor;
    this.targetRow    = Math.floor(targetIdx / 3);
    this.targetCol    = targetIdx % 3;
    this.openSquares  = [{row: this.targetRow, col: this.targetCol, colorIndex: winColor}];

    this.group = new THREE.Group();
    this._build();
    this.group.position.z = GATE_SPAWN_Z;
    scene.add(this.group);
  }

  // Backtracking fill: assigns colors to empty cells one-by-one,
  // pruning immediately when a partial conflict is detected.
  static _backfill(cells, empty, pos, winColor, pairA, pairB, others) {
    if (pos === empty.length) return cells;
    const idx = empty[pos];
    const shuffled = [...others].sort(() => Math.random()-0.5);
    for (const color of shuffled) {
      cells[idx] = color;
      if (!Gate._conflictAt(cells, idx, winColor, pairA, pairB)) {
        const result = Gate._backfill(cells, empty, pos+1, winColor, pairA, pairB, others);
        if (result) return result;
      }
      cells[idx] = -1;
    }
    return null;
  }

  // Check only lines touching `idx` for conflicts (partial rows OK, skip -1 cells)
  static _conflictAt(cells, idx, winColor, pairA, pairB) {
    for (const line of LINES) {
      if (!line.includes(idx)) continue;
      const counts = {};
      for (const i of line) {
        if (cells[i] === -1) continue;
        counts[cells[i]] = (counts[cells[i]]||0) + 1;
      }
      for (const [cStr, count] of Object.entries(counts)) {
        if (count < 2) continue;
        const c = parseInt(cStr);
        if (c === winColor && line.includes(pairA) && line.includes(pairB)) continue;
        return true;
      }
    }
    return false;
  }

  // Known-valid fallback template for winning line = top row [0,1,2]
  static _fallback(win, others) {
    const [A,B,C,D] = others;
    return [win,win,A, B,C,D, D,A,B];
  }

  _build() {
    const cs = 1.45, r = 0.18, depth = 0.06, gap = 0.1;
    const inner = cs - gap;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const idx   = row*3+col;
        const ci    = this.cellColors[idx];
        const hex   = COLOR_NAMES[ci];
        const color = new THREE.Color(hex);
        const x = GRID_X[col], y = GRID_Y[row];

        // Solid panel
        const mat = new THREE.MeshStandardMaterial({
          color, emissive: color, emissiveIntensity: 0.75,
          roughness: 0.05, metalness: 0.75,
        });
        const mesh = new THREE.Mesh(roundedPanelGeo(inner, inner, depth, r), mat);
        mesh.position.set(x, y, 0);
        this.group.add(mesh);

        // Glow: flat halos sitting just behind the panel
        const g1 = glowMesh(roundedPanelGeo(inner*1.08, inner*1.08, 0.02, r*1.1), hex, 0.28);
        g1.position.set(x, y, -0.04);
        this.group.add(g1);

        const g2 = glowMesh(roundedPanelGeo(inner*1.22, inner*1.22, 0.02, r*1.3), hex, 0.10);
        g2.position.set(x, y, -0.10);
        this.group.add(g2);
      }
    }
  }

  // Build pulsing miss-highlight on the target cell (called from DiceDash)
  buildMissHighlight() {
    const x = GRID_X[this.targetCol];
    const y = GRID_Y[this.targetRow];
    const hex = COLOR_NAMES[this.winningColor];
    const color = new THREE.Color(hex);
    const cs = 1.5, depth = 0.1, bw = 0.1;

    this.highlightGroup = new THREE.Group();
    const mat = () => new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 2.0,
      roughness: 0, metalness: 1, transparent: true, opacity: 0.95,
    });
    // 4 border bars
    [
      {s:[cs, bw, depth], p:[x, y+cs/2, 0.25]},
      {s:[cs, bw, depth], p:[x, y-cs/2, 0.25]},
      {s:[bw, cs, depth], p:[x+cs/2, y, 0.25]},
      {s:[bw, cs, depth], p:[x-cs/2, y, 0.25]},
    ].forEach(({s,p}) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(...s), mat());
      m.position.set(...p);
      this.highlightGroup.add(m);
    });
    // Big soft glow layer behind the border
    const bigGlow = glowMesh(roundedPanelGeo(cs*1.8, cs*1.8, depth*0.3, 0.3), hex, 0.22);
    bigGlow.position.set(x, y, 0.1);
    this.highlightGroup.add(bigGlow);

    this.highlightGroup.position.copy(this.group.position);
    this.group.parent.add(this.highlightGroup);
    this._hlTime = 0;
  }

  tickHighlight(dt) {
    if (!this.highlightGroup) return;
    this._hlTime += dt;
    const pulse = 0.5 + 0.5 * Math.sin(this._hlTime * 18);
    this.highlightGroup.traverse(o => {
      if (o.material && o.material.emissive) {
        o.material.emissiveIntensity = 1.2 + pulse * 1.6;
        if (o.material.opacity !== undefined) o.material.opacity = 0.7 + pulse * 0.3;
      }
    });
  }

  destroyHighlight() {
    if (!this.highlightGroup) return;
    this.highlightGroup.parent?.remove(this.highlightGroup);
    this.highlightGroup.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material)  o.material.dispose();
    });
    this.highlightGroup = null;
  }

  update(dt, speed) { this.group.position.z += speed * dt; }
  isDead()  { return this.group.position.z > GATE_DESTROY_Z; }

  destroy() {
    this.destroyHighlight();
    this.scene.remove(this.group);
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material)  o.material.dispose();
    });
  }

  checkCollision(dieCol, dieRow, dieColorIdx) {
    const sq = this.openSquares[0];
    return sq.col===dieCol && sq.row===dieRow && sq.colorIndex===dieColorIdx;
  }
}

// ── Main Game ─────────────────────────────────────────────────────────────────
class DiceDash {
  constructor() {
    this.state      = 'start';
    this.score      = 0;
    this.highScore  = parseInt(localStorage.getItem('dd_hs')||'0');
    this.velocity   = 1.0;
    this.gates      = [];
    this.spawnTimer = 0;
    this.deathCount = parseInt(localStorage.getItem('dd_dc')||'0');
    this.missTimer  = 0;
    this.missGate   = null;

    this.dieGridCol = 1;
    this.dieGridRow = 1;
    this.dieTargetX = 0;
    this.dieTargetY = 0;

    this.audio = new AudioEngine();
    this._initThree();
    this._initDie();
    this._initTunnel();
    this._initLights();
    this._initInput();
    this._initUI();
    this._updateHUD();
    this._loop();
  }

  // ── Scene ──────────────────────────────────────────────────────────────────

  _initThree() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050510);
    this.scene.fog = new THREE.FogExp2(0x050510, 0.065);

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 200);
    this._updateCamera();
    this._updateTapZones();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this._updateCamera();
      this._updateTapZones();
    });
    this.clock = new THREE.Clock();
  }

  _toScreen(wx, wy, wz = 0) {
    const v = new THREE.Vector3(wx, wy, wz);
    v.project(this.camera);
    return {
      x: (v.x * 0.5 + 0.5) * window.innerWidth,
      y: (1 - (v.y * 0.5 + 0.5)) * window.innerHeight,
    };
  }

  _updateTapZones() {
    const W = window.innerWidth, H = window.innerHeight;
    // Midpoints between adjacent grid columns/rows
    const cx1 = (GRID_X[0] + GRID_X[1]) / 2;
    const cx2 = (GRID_X[1] + GRID_X[2]) / 2;
    const cy1 = (GRID_Y[0] + GRID_Y[1]) / 2;
    const cy2 = (GRID_Y[1] + GRID_Y[2]) / 2;

    // Store projected divider screen coords for tap detection
    this.tzX1 = this._toScreen(cx1, GRID_Y[1]).x;
    this.tzX2 = this._toScreen(cx2, GRID_Y[1]).x;
    this.tzY1 = this._toScreen(GRID_X[1], cy1).y; // lower screen Y = higher row
    this.tzY2 = this._toScreen(GRID_X[1], cy2).y;

    // Draw faint guide lines on mobile only
    const svg = document.getElementById('grid-guide');
    if (!svg) return;
    if (!portrait) { svg.innerHTML = ''; return; }
    // Extra margin beyond the grid edge
    const xMin = GRID_X[0] - 0.9, xMax = GRID_X[2] + 0.9;
    const yMin = GRID_Y[0] - 0.9, yMax = GRID_Y[2] + 0.9;

    const line = (ax, ay, bx, by) => {
      const a = this._toScreen(ax, ay), b = this._toScreen(bx, by);
      return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`;
    };

    svg.innerHTML = `<g stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6 8">
      ${line(cx1, yMin, cx1, yMax)}
      ${line(cx2, yMin, cx2, yMax)}
      ${line(xMin, cy1, xMax, cy1)}
      ${line(xMin, cy2, xMax, cy2)}
    </g>`;
  }

  _updateCamera() {
    const portrait = window.innerWidth < window.innerHeight;
    if (portrait) {
      this.camera.fov = 86;
      this.camera.position.set(2.0, 2.5, 8);
      this.camera.lookAt(-0.5, -3.5, -8);
    } else {
      this.camera.fov = 68;
      this.camera.position.set(3.5, 2.8, 8);
      this.camera.lookAt(0, -3.5, -8);
    }
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  _initLights() {
    this.scene.add(new THREE.AmbientLight(0x111133, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(3, 6, 5);
    this.scene.add(dir);

    // Die glow light — color tracks front face
    this.dieLight = new THREE.PointLight(0xffee00, 3.0, 10);
    this.dieLight.position.set(0, 0, 2.5);
    this.scene.add(this.dieLight);
  }

  _initDie() {
    const geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const colors = Object.values(FACE_COLORS);
    // BoxGeometry material order: +X,-X,+Y,-Y,+Z,-Z → right,left,top,bottom,front,back
    const matOrder = [4,5,0,1,2,3];
    const mats = matOrder.map(i => new THREE.MeshStandardMaterial({
      color: colors[i], emissive: colors[i], emissiveIntensity: 1.4,
      roughness: 0.04, metalness: 0.8,
    }));
    this.dieMesh = new THREE.Mesh(geo, mats);
    this.dieMesh.position.set(0, 0, 2.5);
    this.scene.add(this.dieMesh);

    // White edge outline
    this.dieMesh.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    ));

    // Thin edge-glow shell: just 2% larger, very low opacity — reads as a neon border not a separate cube
    const glowMats = matOrder.map(i => new THREE.MeshBasicMaterial({
      color: colors[i], transparent: true, opacity: 0.12,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide,
    }));
    const dieGlow = new THREE.Mesh(new THREE.BoxGeometry(1.26, 1.26, 1.26), glowMats);
    this.dieMesh.add(dieGlow);

    this.isRotating    = false;
    this.rotationQueue = [];
    this.rotT  = 0;
    this.rotStart = new THREE.Quaternion();
    this.rotEnd   = new THREE.Quaternion();
  }

  _initTunnel() {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x080818, emissive: 0x080818,
      emissiveIntensity: 0.4, side: THREE.BackSide,
    });
    const tunnel = new THREE.Mesh(new THREE.BoxGeometry(9,9,80), mat);
    tunnel.position.set(0, 0, -34);
    this.scene.add(tunnel);

    const lMat = new THREE.LineBasicMaterial({ color: 0x330066, transparent: true, opacity: 0.8 });
    for (let x=-4;x<=4;x++) {
      const pts=[new THREE.Vector3(x,-4.4,2),new THREE.Vector3(x,-4.4,TUNNEL_Z_START)];
      this.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lMat));
    }
    for (let z=0;z>=TUNNEL_Z_START;z-=4) {
      const pts=[new THREE.Vector3(-4.4,-4.4,z),new THREE.Vector3(4.4,-4.4,z)];
      this.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lMat));
    }
  }

  // ── Input ──────────────────────────────────────────────────────────────────

  _initInput() {
    const cv = this.renderer.domElement;
    this.touch      = { active: false };  // mouse state
    this.touchState = null;               // finger touch state

    cv.addEventListener('touchstart', e => this._onTouchStart(e), {passive:false});
    cv.addEventListener('touchmove',  e => this._onTouchMove(e),  {passive:false});
    cv.addEventListener('touchend',   e => this._onTouchEnd(e),   {passive:false});

    cv.addEventListener('mousedown', e => this._onMouseDown(e));
    cv.addEventListener('mousemove', e => this._onMouseMove(e));
    cv.addEventListener('mouseup',   e => this._onMouseUp(e));

    window.addEventListener('keydown', e => this._onKeyDown(e));
  }

  _onKeyDown(e) {
    if (this.state==='start') { this._startGame(); return; }
    if (this.state==='dead')  { if (e.key==='Enter'||e.key===' ') this._startGame(); return; }
    if (this.state!=='playing') return;
    switch(e.key) {
      case 'ArrowUp':    e.preventDefault(); this._queueRotation('up');    break;
      case 'ArrowDown':  e.preventDefault(); this._queueRotation('down');  break;
      case 'ArrowLeft':  e.preventDefault(); this._queueRotation('left');  break;
      case 'ArrowRight': e.preventDefault(); this._queueRotation('right'); break;
      case 'w':case 'W': this._moveGrid(0,1);  break;
      case 's':case 'S': this._moveGrid(0,-1); break;
      case 'a':case 'A': this._moveGrid(-1,0); break;
      case 'd':case 'D': this._moveGrid(1,0);  break;
    }
  }

  _moveToGrid(col, row) {
    if (col !== this.dieGridCol || row !== this.dieGridRow) {
      this.dieGridCol = col; this.dieGridRow = row;
      this.dieTargetX = GRID_X[col]; this.dieTargetY = GRID_Y[row];
      this.audio.move();
    }
  }

  _moveGrid(dCol, dRow) {
    this._moveToGrid(
      Math.max(0, Math.min(2, this.dieGridCol + dCol)),
      Math.max(0, Math.min(2, this.dieGridRow + dRow))
    );
  }

  _onMouseDown(e) {
    if (this.state!=='playing') return;
    this.touch = {startX:e.clientX, startY:e.clientY, startTime:Date.now(), active:true, isDrag:false};
    this._snapToGrid(e.clientX, e.clientY);
  }
  _onMouseMove(e) {
    if (!this.touch.active||this.state!=='playing') return;
    if (Math.hypot(e.clientX-this.touch.startX, e.clientY-this.touch.startY)>8) {
      this.touch.isDrag=true;
      this._snapToGrid(e.clientX, e.clientY);
    }
  }
  _onMouseUp(e) {
    if (!this.touch.active) return;
    const dt=Date.now()-this.touch.startTime;
    const dist=Math.hypot(e.clientX-this.touch.startX, e.clientY-this.touch.startY);
    this.touch.active=false;
    if (!this.touch.isDrag && dt<180 && dist>20) {
      const dx=e.clientX-this.touch.startX, dy=e.clientY-this.touch.startY;
      Math.abs(dx)>Math.abs(dy)
        ? (dx>0?this._queueRotation('right'):this._queueRotation('left'))
        : (dy>0?this._queueRotation('down') :this._queueRotation('up'));
    }
  }

  _onTouchStart(e) {
    e.preventDefault();
    if (this.state !== 'playing') return;
    const t = e.touches[0];
    this.touchState = { x: t.clientX, y: t.clientY, rotated: false };
    // Move fires immediately — use projected 3D grid boundaries for tap zones
    const col = t.clientX < this.tzX1 ? 0 : t.clientX < this.tzX2 ? 1 : 2;
    const row = t.clientY < this.tzY2 ? 2 : t.clientY < this.tzY1 ? 1 : 0;
    this._moveToGrid(col, row);
  }
  _onTouchMove(e) {
    e.preventDefault();
    if (!this.touchState || this.state !== 'playing' || this.touchState.rotated) return;
    const t    = e.touches[0];
    const dx   = t.clientX - this.touchState.x;
    const dy   = t.clientY - this.touchState.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 28) {
      // Rotation fires mid-swipe the instant direction is clear — no finger lift needed
      this.touchState.rotated = true;
      Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? this._queueRotation('right') : this._queueRotation('left'))
        : (dy > 0 ? this._queueRotation('down')  : this._queueRotation('up'));
    }
  }
  _onTouchEnd(e) {
    this.touchState = null;
  }

  _snapToGrid(cx, cy) {
    const nx=cx/window.innerWidth, ny=cy/window.innerHeight;
    const col=nx<0.33?0:nx<0.67?1:2;
    const row=ny<0.33?2:ny<0.67?1:0;
    if (col!==this.dieGridCol||row!==this.dieGridRow) {
      this.dieGridCol=col; this.dieGridRow=row;
      this.dieTargetX=GRID_X[col]; this.dieTargetY=GRID_Y[row];
      this.audio.move();
    }
  }

  // ── Rotation ───────────────────────────────────────────────────────────────

  _queueRotation(dir) {
    this.audio.rotate();
    if (!this.isRotating) {
      this._processRotation(dir);
    } else if (this.rotationQueue.length < 3) {
      this.rotationQueue.push(dir);
    }
  }

  // Returns the color index of whichever die face points most toward world +Z (camera).
  _frontFaceIndex() {
    const q = this.dieMesh.quaternion;
    const worldZ = new THREE.Vector3(0, 0, 1);
    let bestDot = -Infinity, bestIdx = 2;
    for (const { dir, idx } of LOCAL_FACES) {
      const dot = dir.clone().applyQuaternion(q).dot(worldZ);
      if (dot > bestDot) { bestDot = dot; bestIdx = idx; }
    }
    return bestIdx;
  }

  _processRotation(dir) {
    this.rotStart = this.dieMesh.quaternion.clone();
    // World-space axes — always rotate around fixed world X/Y regardless of
    // how the die is currently oriented (pre-multiply = world space).
    let axis, sign;
    switch(dir) {
      case 'up':    axis=new THREE.Vector3(1,0,0); sign=-1; break; // top swings toward camera
      case 'down':  axis=new THREE.Vector3(1,0,0); sign= 1; break; // bottom swings toward camera
      case 'right': axis=new THREE.Vector3(0,1,0); sign= 1; break; // right face swings toward camera
      case 'left':  axis=new THREE.Vector3(0,1,0); sign=-1; break; // left face swings toward camera
    }
    const delta = new THREE.Quaternion().setFromAxisAngle(axis, (Math.PI/2)*sign);
    this.rotEnd = delta.clone().multiply(this.rotStart); // world-space: pre-multiply
    this.rotT=0; this.isRotating=true;
    // HUD is updated at animation end (below), where the quaternion is actually set
  }

  // ── HUD ────────────────────────────────────────────────────────────────────

  _updateHUD(missGate) {
    const fi    = this._frontFaceIndex();
    const hex   = COLOR_NAMES[fi];
    const label = COLOR_LABELS[fi];
    let hint = `FRONT: <span style="color:${hex};text-shadow:0 0 8px ${hex};font-size:17px">■</span>`+
      ` <span style="color:${hex}">${label}</span>` +
      `&emsp;<span style="opacity:.45">${'ontouchstart' in window ? 'FLICK ROTATE · DRAG MOVE' : 'ARROWS ROTATE · WASD MOVE'}</span>`;

    if (missGate) {
      const wHex   = COLOR_NAMES[missGate.winningColor];
      const wLabel = COLOR_LABELS[missGate.winningColor];
      const pos    = `COL ${missGate.targetCol+1} · ROW ${missGate.targetRow+1}`;
      hint = `<span style="color:#ff2200;text-shadow:0 0 12px #ff2200">✗ NEEDED: </span>`+
        `<span style="color:${wHex};text-shadow:0 0 10px ${wHex};font-size:18px">■</span> `+
        `<span style="color:${wHex};font-weight:bold">${wLabel}</span>`+
        `<span style="opacity:.5"> at ${pos}</span>`;
    }
    document.getElementById('color-hint').innerHTML = hint;
  }

  // ── Game flow ──────────────────────────────────────────────────────────────

  _initUI() {
    document.getElementById('start-btn').addEventListener('click', ()=>this._startGame());
    document.getElementById('retry-btn').addEventListener('click', ()=>this._startGame());
    document.getElementById('share-btn').addEventListener('click', ()=>this._share());

    // Settings panel
    const btn     = document.getElementById('settings-btn');
    const panel   = document.getElementById('settings-panel');
    const slider  = document.getElementById('music-slider');
    const volPct  = document.getElementById('vol-pct');

    const savedVol = parseFloat(localStorage.getItem('dd_vol'));
    const initVol  = isNaN(savedVol) ? 30 : Math.round(savedVol * 100);
    slider.value   = initVol;
    volPct.textContent = initVol + '%';

    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', () => panel.classList.remove('open'));
    panel.addEventListener('click', e => e.stopPropagation());

    slider.addEventListener('input', () => {
      const v = parseInt(slider.value);
      volPct.textContent = v + '%';
      this.audio.setVolume(v / 100);
    });

    // SFX toggle
    const sfxBtn   = document.getElementById('sfx-toggle');
    const sfxKnob  = document.getElementById('sfx-knob');
    const setSfx = (on) => {
      this.audio.sfxMuted = !on;
      localStorage.setItem('dd_sfx', on ? '1' : '0');
      sfxKnob.style.left = on ? '25px' : '3px';
      sfxBtn.style.background = on ? 'rgba(0,255,255,0.15)' : 'transparent';
      sfxBtn.style.borderColor = on ? '#00ffff' : 'rgba(255,255,255,0.25)';
      sfxKnob.style.background = on ? '#00ffff' : 'rgba(255,255,255,0.3)';
      sfxKnob.style.boxShadow  = on ? '0 0 6px #00ffff' : 'none';
    };
    setSfx(!this.audio.sfxMuted); // apply saved state visually
    sfxBtn.addEventListener('click', e => {
      e.stopPropagation();
      setSfx(this.audio.sfxMuted); // toggle
    });
  }

  _startGame() {
    this.state='playing'; this.score=0; this.velocity=1.0; this.spawnTimer=0;
    this.missTimer=0; this.missGate=null;
    this.dieGridCol=1; this.dieGridRow=1;
    this.dieTargetX=0; this.dieTargetY=0;
    this.dieMesh.position.set(0,0,2.5);
    this.dieMesh.quaternion.identity();
    this.rotationQueue=[]; this.isRotating=false; this.rotT=0;
    this.rotStart=new THREE.Quaternion(); this.rotEnd=new THREE.Quaternion();
    this.gates.forEach(g=>g.destroy()); this.gates=[];
    document.getElementById('score-display').textContent='0';
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('gameover-screen').classList.add('hidden');
    this._updateHUD();
    this.audio.init();
    this.audio.startMusic();
    this.clock.start();
  }

  _triggerMiss(gate) {
    if (this.state!=='playing') return;
    this.state='miss';
    this.missGate=gate;
    this.missTimer=0;
    this.audio.crash();
    gate.buildMissHighlight();
    this._updateHUD(gate);
    // Flash background red briefly
    this.scene.background=new THREE.Color(0x2a0008);
    setTimeout(()=>{ this.scene.background=new THREE.Color(0x050510); }, 300);
  }

  _gameOver() {
    this.audio.stopMusic();
    this.state='dead';
    this.deathCount++;
    localStorage.setItem('dd_dc', this.deathCount);
    if (this.score>this.highScore) {
      this.highScore=this.score;
      localStorage.setItem('dd_hs', this.highScore);
    }
    document.getElementById('gameover-score').textContent=this.score;
    document.getElementById('gameover-best').textContent=`BEST: ${this.highScore}`;
    document.getElementById('gameover-screen').classList.remove('hidden');
  }

  _share() {
    const text=`I scored ${this.score} in Dice Dash! Can you beat me? 🎲`;
    navigator.share?.({title:'Dice Dash',text}).catch(()=>{});
    navigator.clipboard?.writeText(text);
  }

  // ── Update loop ────────────────────────────────────────────────────────────

  _update(dt) {
    // Miss-pause state: show highlight for 1.5s then game over
    if (this.state==='miss') {
      this.missTimer+=dt;
      if (this.missGate) this.missGate.tickHighlight(dt);
      if (this.missTimer>=1.5) this._gameOver();
      return;
    }
    if (this.state!=='playing') return;

    this.velocity = 1.0 + this.score*0.05;
    const speed   = this.velocity * 8.0;
    const spawnInterval = Math.max(1.2, 3.0/(this.velocity*0.5));

    this.spawnTimer+=dt;
    if (this.spawnTimer>=spawnInterval) {
      this.spawnTimer=0;
      this.gates.push(new Gate(this.scene, this.score));
    }

    // Die movement — higher factor = snappier response to finger
    this.dieMesh.position.x += (this.dieTargetX-this.dieMesh.position.x)*Math.min(1,dt*18);
    this.dieMesh.position.y += (this.dieTargetY-this.dieMesh.position.y)*Math.min(1,dt*18);

    // Die glow light follows die, color = front face
    this.dieLight.position.copy(this.dieMesh.position);
    const fc = new THREE.Color(COLOR_NAMES[this._frontFaceIndex()]);
    this.dieLight.color.lerp(fc, 0.12);
    this.dieLight.intensity = 2.5 + Math.sin(Date.now()*0.004)*0.5;

    // Rotation animation
    if (this.isRotating) {
      this.rotT = Math.min(1, this.rotT+dt*10);
      this.dieMesh.quaternion.slerpQuaternions(this.rotStart, this.rotEnd, this.rotT);
      if (this.rotT>=1) {
        this.dieMesh.quaternion.copy(this.rotEnd);
        this.isRotating=false;
        this._updateHUD(); // quaternion is finalized here — correct face is readable
        if (this.rotationQueue.length>0) this._processRotation(this.rotationQueue.shift());
      }
    }

    // Gates
    for (let i=this.gates.length-1;i>=0;i--) {
      const gate=this.gates[i];
      gate.update(dt,speed);
      const gz=gate.group.position.z;
      if (!gate.passed && gz>1.8 && gz<3.6) {
        gate.passed=true;
        const ok=gate.checkCollision(this.dieGridCol, this.dieGridRow, this._frontFaceIndex());
        if (ok) {
          this.score++;
          document.getElementById('score-display').textContent=this.score;
          this.audio.pass();
          this._flashGreen(gate);
        } else {
          this._triggerMiss(gate);
          return;
        }
      }
      if (gate.isDead()) { gate.destroy(); this.gates.splice(i,1); }
    }
  }

  _flashGreen(gate) {
    gate.group.traverse(o=>{
      if (!o.material||!o.material.emissive) return;
      const orig=o.material.emissive.clone();
      o.material.emissive.set(0x00ff88);
      setTimeout(()=>{ if(o.material) o.material.emissive.copy(orig); }, 180);
    });
  }

  _loop() {
    requestAnimationFrame(()=>this._loop());
    const dt=Math.min(this.clock.getDelta(), 0.05);
    this._update(dt);
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{ window.game = new DiceDash(); });
