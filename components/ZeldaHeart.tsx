"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ZeldaHeartProps {
    filled?: boolean;
    delay?: number;
}

export default function ZeldaHeart({ filled = false, delay = 0 }: ZeldaHeartProps) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-12 h-12 flex items-center justify-center"
        >
            <Heart
                size={40}
                className={`transition-colors duration-1000 ${filled ? 'fill-zelda-red text-zelda-red' : 'text-gray-600'}`}
            />
            {filled && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: delay + 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-8 h-8 rounded-full bg-zelda-red/20 blur-md" />
                </motion.div>
            )}
        </motion.div>
    );
}
