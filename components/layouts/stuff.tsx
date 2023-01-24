import { motion } from "framer-motion";
import { ReactNode } from "react";


const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: {opacity: 1, x: 0, y: 0},
    exit: {opacity: 0, x: 0, y: 100}
  };
  
  const transition = {
    type: "easeInOut",
    duration: 0.4
  }

export default function ThreeStuffBox({ children }: { children: ReactNode }) {
  return (
    <motion.main className=" top-0 right-0 bottom-0 left-0 h-screen w-screen"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={transition}
    >
      {children}
    </motion.main>
  );
}
