"use client";
import { Center, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useRef } from "react";

const variants = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

const transition = {
  type: "easeInOut",
  duration: 0.4,
};

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className=" relative h-screen w-screen">
      <Suspense>
        <Canvas
          className="top-0 bottom-0 left-0 right-0 absolute h-full w-full"
          ref={canvasRef}
        >
          <Physics>
            <RigidBody position={[2, 5, 0]}>
              <Center>
                <Text3D
                  font={"./fonts/helvetiker_regular.typeface.json"}
                  size={0.75}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelSize={0.02}
                  bevelOffset={0}
                  bevelSegments={5}
                >
                  Stuff
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </RigidBody>
            <RigidBody position={[-2, 5, 0]}>
              <Center>
                <Text3D
                  font={"./fonts/helvetiker_regular.typeface.json"}
                  size={0.75}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelSize={0.02}
                  bevelOffset={0}
                  bevelSegments={5}
                >
                  ThreeJs
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </RigidBody>
            <CuboidCollider
              args={[5, 0.5, 5]}
              position={[0, -2, 0]}
              restitution={0.5}
              friction={0}
            />
          </Physics>
        </Canvas>
      </Suspense>
      <div className=" absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-transparent">
        <>
          <motion.main
            className=" flex flex-col justify-center px-8 py-6"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
              <div className="flex flex-col items-start mb-8">
                <div className="py-4">
                  <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
                    Hello There!
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  After some time figuring out how Three Js, I now create this
                  site, where I dump my ThreeJs creations for the world to see.
                  <br />
                  <br />
                  This place also serves as a testing ground for nextJs,
                  Tailwind and Framer Motion.
                </p>
                <div className="flex flex-row w-full color">
                  <div className="flex-grow-[1] p-2 font-semibold">Stack:</div>
                  <div className="flex-grow-[3] p-2">
                    NextJs, Framer Motion, ThreeJs, TailwindCSS
                  </div>
                </div>
              </div>
              <div className="w-full p-5 flex flex-row items-center justify-center">
                <Link href={"/catalog"} className="w-1/3">
                  <button className="bg-gray-500 rounded-xl  p-5 h-full hover:scale-110 transition-all ">
                    Click this button to see the catalog!
                  </button>
                </Link>
              </div>
            </div>
          </motion.main>
        </>
      </div>
    </div>
  );
}
