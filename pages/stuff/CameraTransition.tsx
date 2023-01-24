import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMotionValue } from "framer-motion";
import { LayoutCamera, motion, MotionCanvas } from "framer-motion-3d";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ThreeStuffBox from "../../components/layouts/stuff";

export default function CameraTransition() {
  const [isFullscreen, setFullscreen] = useState(false);

  return (
    <ThreeStuffBox>
        <Canvas onClick={() => {console.log("cum");setFullscreen(!isFullscreen)}}>
          <Stuff />
        </Canvas>
    </ThreeStuffBox>
  );
}

function Stuff() {

  const {camera: camera, set: set, size: size} = useThree()
  const cameraRef = useRef<any>()

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
    console.log("hey")
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
    return 
  }, [camera, cameraRef, set]);

  return (
    <>
          <motion.perspectiveCamera
            fov={90}
            position={[0, 0, 5]}
            ref={cameraRef}
          />
    <motion.mesh>
      <icosahedronGeometry args={[1,0]}/>
      <meshBasicMaterial />
    </motion.mesh>    
    </>

  )
}
