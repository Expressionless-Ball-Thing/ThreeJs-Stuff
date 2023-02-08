import {
  KeyboardControls,
  PointerLockControls,
  useKeyboardControls
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { CuboidCollider, Debug, Physics, RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import ThreeStuffBox from "../../components/layouts/CanvasBox";

export default function FlightGame() {
  return (
    <ThreeStuffBox>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["w"] },
          { name: "backward", keys: ["s"] },
          { name: "leftward", keys: ["a"] },
          { name: "rightward", keys: ["d"] },
          { name: "up", keys: ["r"] },
          { name: "down", keys: ["f"] },
        ]}
      >
        <Canvas className=" bg-black">
          <Physics gravity={[0, 0, 0]}>
            <Scene />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </ThreeStuffBox>
  );
}

function Scene() {
  return (
    <>
    <RigidBody type="fixed">
      <mesh position={[0, 0, 12.5]}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, 0, -12.5]}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, 12.5, 0]} rotation-x={Math.PI / 2}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, -12.5, 0]} rotation-x={Math.PI / 2}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[12.5, 0, 0]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[-12.5, 0 , 0]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[25, 25, 1, 10, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
    </RigidBody>
      <Player />
    </>
  );
}

function Player() {
  const pointControls = useRef(null);
  const playerRef = useRef<RigidBodyApi>(null);

  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward} = getKeys();
    state.camera.position.set(...playerRef.current!.translation().toArray());
    playerRef.current!.setRotation(state.camera.quaternion);

    const impulseStrength = 0.05 * delta

    playerRef.current!.applyImpulse(state.camera.getWorldDirection(new THREE.Vector3).normalize().multiplyScalar(impulseStrength))

    const impulse = { x: 0, y: 0, z: 0 }

    if(forward)
    {
        impulse.y += impulseStrength
    }

    if(rightward)
    {
        impulse.x += impulseStrength
        
    }

    if(backward)
    {
        impulse.y -= impulseStrength
        
    }
    
    if(leftward)
    {
        impulse.x -= impulseStrength
    }

    playerRef.current!.applyImpulse(new THREE.Vector3(impulse.x, impulse.y, impulse.z).applyEuler(state.camera.rotation))

  });

  return (
    <>
      <PointerLockControls ref={pointControls} maxPolarAngle={Math.PI * 2} />
      <RigidBody ref={playerRef} colliders={false} linearDamping={0.5} restitution={2}>
        <CuboidCollider args={[0.1, 0.1, 0.1]} />
      </RigidBody>
    </>
  );
}
