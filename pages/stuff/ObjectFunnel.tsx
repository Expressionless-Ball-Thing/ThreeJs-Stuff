import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Debug,
  Physics,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useMemo } from "react";
import ThreeStuffBox from "../../components/layouts/stuff";

export default function ObjectFunnel() {
  const count = 10;

  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < count; i++) {
      positions.push([
        (Math.random() - 0.5) * 4,
        i,
        (Math.random() - 0.5) * 4,
      ]);
      rotations.push([0, 0, 0]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);

  return (
    <ThreeStuffBox>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <Physics>
          <Debug />
          <mesh scale={[4, 0.2, 4]} castShadow receiveShadow>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
          <CuboidCollider args={[2, 20, 0.2]} position={[0, 0, 2]} />
          <CuboidCollider args={[2, 20, 0.2]} position={[0, 0, -2]} />
          <CuboidCollider args={[0.2, 20, 2]} position={[2, 0, 0]} />
          <CuboidCollider args={[0.2, 20, 2]} position={[-2, 0, 0]} />
          <CuboidCollider args={[4, 0.5, 4]} position={[0, -15, 0]} />
          <InstancedRigidBodies
            positions={cubeTransforms.positions}
            rotations={cubeTransforms.rotations}
            scales={cubeTransforms.scales}
          >
            <instancedMesh args={[undefined, undefined, count]}>
                <boxGeometry/>
                <meshStandardMaterial />
            </instancedMesh>
          </InstancedRigidBodies>
        </Physics>
      </Canvas>
    </ThreeStuffBox>
  );
}
