import {
  KeyboardControls,
  PointerLockControls,
  useKeyboardControls
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
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
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, 0, -12.5]}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, 12.5, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, -12.5, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[12.5, 0, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[-12.5, 0 , 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} wireframe />
      </mesh>
    </RigidBody>
      <Player />
    </>
  );
}

function Player() {
  const pointControls = useRef(null);
  const playerRef = useRef(null);

  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const verticalVector = new THREE.Vector3();
  const direction = new THREE.Vector3();

  const SPEED = 5;

  const [, getKeys] = useKeyboardControls();

  useFrame((state) => {
    const { forward, backward, leftward, rightward, up, down } = getKeys();
    state.camera.position.set(...playerRef.current.translation());
    playerRef.current!.setRotation(state.camera.quaternion);

    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+leftward - +rightward, 0, 0);
    verticalVector.set(0, +up - +down, 0);
    direction
      .subVectors(frontVector.addScaledVector(verticalVector, 1), sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);


    playerRef.current!.setLinvel({
      x: direction.x,
      y: direction.y,
      z: direction.z,
    });
  });

  return (
    <>
      <PointerLockControls ref={pointControls} maxPolarAngle={Math.PI * 2} />
      <Debug />
      <RigidBody ref={playerRef} colliders={false} linearDamping={0.5}>
        <CuboidCollider args={[0.1, 0.1, 0.1]} />
      </RigidBody>
    </>
  );
}
