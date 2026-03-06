"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Triforce({
    size = "md",
    animate = true,
    onEasterEgg
}: {
    size?: "sm" | "md" | "lg",
    animate?: boolean,
    onEasterEgg?: () => void
}) {
    const [clicks, setClicks] = useState(0);

    const handleClick = () => {
        if (!onEasterEgg) return;
        const newClicks = clicks + 1;
        setClicks(newClicks);
        if (newClicks >= 3) {
            onEasterEgg();
            setClicks(0);
        }
    };

    const sizes = {
        sm: "w-8 h-8",
        md: "w-24 h-24",
        lg: "w-48 h-48",
    };

    return (
        <motion.div
            className={`relative ${sizes[size]} flex items-center justify-center cursor-pointer`}
            animate={animate ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            onClick={handleClick}
            whileTap={{ scale: 0.9 }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
                {/* Top Triangle */}
                <polygon points="50,5 75,50 25,50" fill="#D4AF37" />
                {/* Bottom Left Triangle */}
                <polygon points="25,50 50,95 0,95" fill="#D4AF37" />
                {/* Bottom Right Triangle */}
                <polygon points="75,50 100,95 50,95" fill="#D4AF37" />
            </svg>
        </motion.div>
    );
}
