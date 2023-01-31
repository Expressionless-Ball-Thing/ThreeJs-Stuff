import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ThreeStuffBox from "../../components/layouts/stuff";

export default function CameraTransition() {
  const [counter, setCounter] = useState(0);

  return (
    <ThreeStuffBox>
      <Canvas
        className=" bg-blue-400 cursor-pointer h-full w-full absolute"
        onClick={() => {
          setCounter((count) => count + 1);
        }}
        shadows
      >
        <Stuff counter={counter} />
      </Canvas>
    </ThreeStuffBox>
  );
}

function Stuff({ counter }: { counter: number }) {
  const { camera: camera, set: set, size: size } = useThree();
  const cameraRef = useRef<any>();

  const [moved, setMoved] = useState<Boolean>(false);

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
      x: 4,
      y: 4,
      z: -4,
    },
    second: {
      x: 4,
      y: 4,
      z: 4,
    },
    third: {
      x: -4,
      y: 4,
      z: 4,
    },
    fourth: {
      x: -4,
      y: 4,
      z: -4,
    },
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
        transition={{ duration: 1, type: "easeIn" }}
      />
      <motion.group
        initial={false}
        animate={moved ? { x: 0, y: -50, z: 0 } : { x: 0, y: 0, z: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Scene1 position={[0, 0, 0]} setMoved={setMoved} />
        <Scene2 position={[0, 50, 0]} setMoved={setMoved} />
      </motion.group>
    </>
  );
}

function Scene2({
  position = [0, 0, 0],
  setMoved,
}: {
  position: number[];
  setMoved: Dispatch<SetStateAction<Boolean>>;
}) {
  const box = useRef(null);
  useEffect(() => {
    console.log(box.current);
  });
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    (box.current! as any).position.x = Math.sin(time);
    (box.current! as any).position.y = Math.sin(time) + 1.7;
    (box.current! as any).position.z = Math.cos(time);
  });

  return (
    <group position={position}>
      <mesh scale={[4, 0.2, 4]} castShadow receiveShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={box} position={[0, 2.5, 0]} scale={1} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <motion.group position={[3.3, 0, 0]} whileHover={{ scale: 1.1 }}>
        <Text
          rotation-x={-Math.PI / 2}
          rotation-z={Math.PI}
          maxWidth={1}
          textAlign="center"
          onClick={(e) => {
            e.nativeEvent.stopPropagation();
            setMoved((prev) => !prev);
          }}
        >
          Click Me
        </Text>
      </motion.group>
    </group>
  );
}

function Scene1({
  position = [0, 0, 0],
  setMoved,
}: {
  position: number[];
  setMoved: Dispatch<SetStateAction<Boolean>>;
}) {
  return (
    <group position={position}>
      <mesh scale={[4, 0.2, 4]} castShadow receiveShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.7, 0]} scale={2} castShadow receiveShadow>
        <icosahedronBufferGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
      <mesh position={[0, 1.5, 1]} scale={[2, 3, 0.1]} castShadow receiveShadow>
        <boxBufferGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <mesh
        position={[-1.9, 0, 0]}
        scale={[0.5, 4, 4]}
        castShadow
        receiveShadow
      >
        <boxBufferGeometry />
        <meshStandardMaterial color={"yellow"} />
      </mesh>

      <motion.group position={[3.3, 0, 0]} whileHover={{ scale: 1.1 }}>
        <Text
          rotation-x={-Math.PI / 2}
          rotation-z={Math.PI}
          maxWidth={1}
          textAlign="center"
          onClick={(e) => {
            e.nativeEvent.stopPropagation();
            setMoved((prev) => !prev);
          }}
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
      <pointLight intensity={1.5} position={[4, 0, 0]} castShadow/>
      <motion.directionalLight
        position={[0, 3, 0]}
        castShadow
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
