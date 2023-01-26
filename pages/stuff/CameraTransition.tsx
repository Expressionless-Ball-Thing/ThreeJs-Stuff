import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from "react";
import ThreeStuffBox from "../../components/layouts/stuff";

export default function CameraTransition() {

  const [counter, setCounter] = useState(0);

  return (
    <ThreeStuffBox>
        <Canvas className=" bg-blue-400 cursor-pointer h-full w-full absolute" 
          onClick={() => {
            setCounter((count) => count + 1);
          }}
        >
          <Stuff counter={counter}/>
        </Canvas>
    </ThreeStuffBox>
  );
}

function Stuff({counter}: {counter: number}) {
  const { camera: camera, set: set, size: size } = useThree();
  const cameraRef = useRef<any>();

  //  Setup the camera's projection matrix, so the meshes don't look distorted and messed up.
  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  });

  // Set the motion.perspectiveCamera to be the camera of the canvas
  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
    return;
  }, [camera, cameraRef, set]);

  const CameraVariants = {
    first: {
      x: 4, y: 4, z: -4
    },
    second: {
      x: 4, y: 4, z: 4
    },
    third: {
      x: -4, y: 4, z: 4
    },
    fourth: {
      x: -4, y: 4, z: -4
    }
  };

  return (
    <>
      <Lights />
      <motion.perspectiveCamera
        initial={false}
        animate={["first", "second", "third", "fourth"][counter % 4]}
        variants={CameraVariants}
        fov={90}
        ref={cameraRef}
        position={[4, 4, -4]}
      />
      <Scene1 />
    </>
  );
}

function Scene1() {
  return (
    <group>
      <mesh scale={[4, 0.2, 4]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.7, 0]} scale={2}>
        <icosahedronBufferGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position={[0, 1.5, 1]} scale={[2, 3, 0.1]}>
        <boxBufferGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <mesh position={[-1.9, 0, 0]} scale={[0.5, 4, 4]}>
        <boxBufferGeometry />
        <meshStandardMaterial color={"yellow"} />
      </mesh>

      <motion.group position={[3.3, 0, 0]} whileHover={{ scale: 1.1 }}>
        <Text
          rotation-x={-Math.PI / 2}
          rotation-z={Math.PI}
          maxWidth={1}
          textAlign="center"
        >
          Click Me
        </Text>
      </motion.group>
    </group>
  );
}

function Lights() {
  const three = useThree();
  useFrame(() => {
    three.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.2} />
    </>
  );
}
