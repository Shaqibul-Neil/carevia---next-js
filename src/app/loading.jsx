"use client";

import { motion } from "framer-motion";

const RootLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Animated Logo/Loader */}
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-900 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-2 border-4 border-t-emerald-500 dark:border-t-emerald-400 border-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-4 border-4 border-b-emerald-600 dark:border-b-emerald-300 border-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Center Pulse */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="space-y-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait...
          </p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootLoading;
