import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { Html } from "@react-three/drei";
import * as Utils from "three/examples/jsm/utils/BufferGeometryUtils";
import useMeasure, { RectReadOnly } from "react-use-measure";
import {
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { motion } from "framer-motion-3d";
import ThreeStuffBox from "../../components/layouts/stuff";

const spring = { stiffness: 600, damping: 30 };

function Sphere({
  mouseX,
  mouseY,
  bounds,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  bounds: RectReadOnly;
}) {
  const sphereRef = useRef<any>(null);
  const sphereRotateY = useSpring(
    useTransform(
      mouseX,
      [-bounds.width, bounds.width],
      [-2 * Math.PI, 2 * Math.PI]
    ),
    spring
  );
  const sphereRotateZ = useSpring(
    useTransform(
      mouseY,
      [-bounds.height, bounds.height],
      [-2 * Math.PI, 2 * Math.PI]
    ),
    spring
  );

  // Apparent setting the tolerance to 1 somehow fixes it?
  const stuff = Utils.mergeVertices(new THREE.IcosahedronGeometry(2.1, 0), 1.1);
  const positionArray = stuff.attributes.position.array;
  const textArray = [];
  for (let i = 0; i < positionArray.length / 3; i++) {
    textArray.push(
      <Html
        key={i}
        position-x={positionArray[i * 3]}
        position-y={positionArray[i * 3 + 1]}
        position-z={positionArray[i * 3 + 2]}
        castShadow
        receiveShadow
        color="salmon"
        distanceFactor={25}
        center
      >
        {i}
        <meshStandardMaterial side={THREE.DoubleSide} />
      </Html>
    );
  }

  return (
    <motion.group
      ref={sphereRef}
      rotation-y={sphereRotateY}
      rotation-z={sphereRotateZ}
    >
      {textArray}
      <mesh>
        <icosahedronGeometry args={[2.1, 0]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </motion.group>
  );
}

export default function WordSphere() {
  // useMeasure for mouse stuff.
  const [ref, bounds] = useMeasure({ scroll: false });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <ThreeStuffBox>
      <Canvas
        ref={ref}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <directionalLight position={[0, 0, 1]} />
        <Sphere mouseX={mouseX} mouseY={mouseY} bounds={bounds} />
      </Canvas>
    </ThreeStuffBox>
  );
}
