"use client"
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Physics,
  CuboidCollider,
  InstancedRigidBodies,
  InstancedRigidBodyApi,
  Vector3Array,
} from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { InstancedMesh } from "three";

export default function ObjectFunnel() {
  return (
    <Canvas
      camera={{
        position: [-10, 0, 0],
      }}
    >
      <ambientLight />
      <Physics>
        <Stuff />
      </Physics>
    </Canvas>
  );
}

function Stuff() {
  const boxRef = useRef<InstancedRigidBodyApi>(null);
  const meshRef = useRef<InstancedMesh>(null);
  const count = 100;

  const cubeTransforms = useMemo(() => {
    const positions: Vector3Array[] = [];
    const rotations: Vector3Array[] = [];
    const scales: Vector3Array[] = [];

    for (let i = 0; i < count; i++) {
      positions.push([(Math.random() - 0.5) * 4, i, (Math.random() - 0.5) * 4]);
      rotations.push([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }
    return { positions, rotations, scales };
  }, []);

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      const origin = boxRef.current!.at(i).translation();

      if (origin.y < -10) {
        boxRef
          .current!.at(i)
          .setTranslation({
            x: (Math.random() - 0.5) * 4,
            y: 25,
            z: (Math.random() - 0.5) * 4,
          });
        boxRef.current!.at(i).setLinvel({ x: 0, y: 0, z: 0 });
        boxRef.current!.at(i).setAngvel({ x: 0, y: 0, z: 0 });
      }
    }
  });

  return (
    <>
      <CuboidCollider args={[4, 150, 0.2]} position={[0, 0, 4]} />
      <CuboidCollider args={[4, 150, 0.2]} position={[0, 0, -4]} />
      <CuboidCollider args={[0.2, 150, 4]} position={[4, 0, 0]} />
      <CuboidCollider args={[0.2, 150, 4]} position={[-4, 0, 0]} />

      <InstancedRigidBodies
        positions={cubeTransforms.positions}
        rotations={cubeTransforms.rotations}
        scales={cubeTransforms.scales}
        ref={boxRef}
      >
        <instancedMesh args={[undefined, undefined, count]} ref={meshRef}>
          <boxGeometry />
          <meshStandardMaterial />
        </instancedMesh>
      </InstancedRigidBodies>
    </>
  );
}
