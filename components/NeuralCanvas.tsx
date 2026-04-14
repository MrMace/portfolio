"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const NODE_COUNT = 120;
  const SPREAD = 18;
  const CONNECTION_DIST = 5;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const { linePositions, lineColors } = useMemo(() => {
    const linePos: number[] = [];
    const lineCol: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DIST) {
          linePos.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
          const alpha = 1 - dist / CONNECTION_DIST;
          // Mix between cyan and purple based on position
          const t = (i / NODE_COUNT);
          const r = t * 0.49;
          const g = (1 - t) * 0.71;
          const b = 1.0;
          lineCol.push(r, g, b, r, g, b);
        }
      }
    }
    return {
      linePositions: new Float32Array(linePos),
      lineColors: new Float32Array(lineCol),
    };
  }, [positions]);

  const nodeColors = useMemo(() => {
    const colors = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = i / NODE_COUNT;
      if (t < 0.5) {
        colors[i * 3] = 0.02;
        colors[i * 3 + 1] = 0.71;
        colors[i * 3 + 2] = 0.83;
      } else {
        colors[i * 3] = 0.49;
        colors[i * 3 + 1] = 0.23;
        colors[i * 3 + 2] = 0.93;
      }
    }
    return colors;
  }, []);

  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.04;
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.02) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Neural nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function NeuralCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0" style={{ zIndex: 0, background: "#030712" }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "default",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#030712", 1);
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => { e.preventDefault(); },
            false
          );
        }}
        style={{ background: "#030712" }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
