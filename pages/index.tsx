import { motion } from "framer-motion";
import CatalogCard from "../components/CatalogCard";

const variants = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: 100}
};

const transition = {
  type: "easeInOut",
  duration: 0.4
}

export default function Home() {
  return (
    <>
      <motion.main className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-8 py-6"
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
              After some time figuring out how Three Js, I now create this site,
              where I dump my ThreeJs creations for the world to see.
              <br />
              <br />
              This place also serves as a testing ground for nextJs, Tailwind
              and Framer Motion.
            </p>
            <div className="flex flex-row w-full color">
              <div className="flex-grow-[1] p-2 font-semibold">Stack:</div>
              <div className="flex-grow-[3] p-2">
                React, Framer Motion, ThreeJs, TailwindCSS
              </div>
            </div>
          </div>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Catalog
          </h3>
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3" >
            <CatalogCard
              stuffLink={"WordSphere"}
              commentaryLink={"stub"}
              title={"Words Sphere"}
              description={
                "Words displayed on the surface of a sphere, with added mouse rotate"
              }
            />
            <CatalogCard 
            stuffLink={"CameraTransition"} 
            commentaryLink={"stub"} 
            title={"Camera Transitions"} 
            description={"Some camera transitions activated with mouse clicks."}              
            />
            <CatalogCard stuffLink={"ObjectFunnel"} commentaryLink={"stub"} title={"Cube Rain"} description={"Bunch of geoemtries falling endlessly (sort of)"}            
            />
            <CatalogCard stuffLink={"ObjectFunnel"} commentaryLink={"stub"} title={"Cube Rain"} description={"Bunch of cube falling endlessly (sort of) in a physics simulation."}            
            />
            <CatalogCard 
            stuffLink={"PerlinSphere"} 
            commentaryLink={"stub"} 
            title={"Perlin Sphere"} 
            description={"Sphere with Perlin Noise applied to its shader."}              
            />
          </div>
        </div>
      </motion.main>
    </>
  );
}
