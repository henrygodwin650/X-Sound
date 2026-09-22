import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Green Blob */}

      <motion.div
        animate={{
          x: [0, 120, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-0
          left-0
          h-96
          w-96
          rounded-full
          bg-green-500/20
          blur-[160px]
        "
      />

      {/* Purple Blob */}

      <motion.div
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          h-112
          w-md
          rounded-full
          bg-purple-500/20
          blur-[180px]
        "
      />

      {/* Blue Blob */}

      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-1/2
          left-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/10
          blur-[170px]
        "
      />
    </div>
  );
};

export default AnimatedBackground;