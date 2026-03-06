"use client";

import { motion } from "framer-motion";

export default function Hero({ isFalling = false }: { isFalling?: boolean }) {
  return (
    <motion.div
      className="relative w-32 h-32 flex items-center justify-center"
      animate={isFalling ? { 
        rotate: [0, -10, -90], 
        y: [0, -20, 100],
        opacity: [1, 1, 0] 
      } : { 
        y: [0, -5, 0],
      }}
      transition={isFalling ? { 
        duration: 1.5, 
        ease: "easeIn" 
      } : { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Simple Stylized Hero */}
        {/* Body/Tunic */}
        <path d="M30 40 L70 40 L80 80 L20 80 Z" fill="#2d5a27" />
        {/* Head */}
        <circle cx="50" cy="25" r="15" fill="#f3d2b3" />
        {/* Hat */}
        <path d="M35 15 L50 0 L65 15 Z" fill="#2d5a27" />
        {/* Arms */}
        <rect x="15" y="45" width="15" height="10" rx="5" fill="#f3d2b3" />
        <rect x="70" y="45" width="15" height="10" rx="5" fill="#f3d2b3" />
        {/* Eyes */}
        <circle cx="45" cy="25" r="2" fill="#333" />
        <circle cx="55" cy="25" r="2" fill="#333" />
        {/* Shield (on back/side) */}
        <path d="M75 50 L90 60 L85 80 L75 80 Z" fill="#a1a1a1" stroke="#333" strokeWidth="1" />
      </svg>
      
      {/* Hit Effect Overlay */}
      {isFalling && (
        <motion.div 
          className="absolute inset-0 bg-red-500/40 rounded-full blur-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5], opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
