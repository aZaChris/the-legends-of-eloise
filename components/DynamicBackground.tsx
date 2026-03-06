"use client";

import { motion, AnimatePresence } from "framer-motion";

type Screen = "START" | "INTRO" | "STORY" | "HEARTS" | "CONFESSION" | "SUCCESS" | "FAILURE";

export default function DynamicBackground({ screen }: { screen: Screen }) {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={screen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                >
                    {screen === "START" || screen === "INTRO" ? <NightSky /> : null}
                    {screen === "STORY" ? <MagicForest /> : null}
                    {screen === "HEARTS" ? <TwilightSky /> : null}
                    {screen === "CONFESSION" ? <AncientTemple /> : null}
                    {screen === "SUCCESS" ? <DawnSky /> : null}
                    {screen === "FAILURE" ? <FailureSky /> : null}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function NightSky() {
    return (
        <div className="absolute inset-0 bg-[#050b1a]">
            {/* Stars */}
            <div className="absolute inset-0">
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 70}%`,
                            width: Math.random() * 3,
                            height: Math.random() * 3,
                        }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
                ))}
            </div>
            {/* Hills */}
            <svg className="absolute bottom-0 w-full h-1/2" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    fill="#0a1a0a"
                    d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>
            {/* Fog */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent blur-2xl" />
        </div>
    );
}

function MagicForest() {
    return (
        <div className="absolute inset-0 bg-[#0a1f0a]">
            {/* Floating Lights */}
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-emerald-400/20 blur-xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: Math.random() * 100 + 50,
                        height: Math.random() * 100 + 50,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
                />
            ))}
            {/* Stylized Trees */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                    <path
                        key={i}
                        d={`M${i * 15} 100 L${i * 15 + 10} 60 L${i * 15 + 20} 100`}
                        fill="#051a05"
                        transform={`translate(${Math.random() * 20 - 10}, 0)`}
                    />
                ))}
            </svg>
        </div>
    );
}

function TwilightSky() {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#4a1d33] to-[#7a4d2e]">
            {/* Golden Glows */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-zelda-gold/10 blur-xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: Math.random() * 80 + 20,
                        height: Math.random() * 80 + 20,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{ duration: Math.random() * 4 + 4, repeat: Infinity }}
                />
            ))}
        </div>
    );
}

function AncientTemple() {
    return (
        <div className="absolute inset-0 bg-[#1a1a1a]">
            {/* Central Radiance */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
            {/* Architectural Silhouettes */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <rect x="25%" y="60%" width="50%" height="40%" fill="#D4AF37" />
                <circle cx="50%" cy="50%" r="20%" stroke="#D4AF37" strokeWidth="2" fill="none" />
                <path d="M0 80 L50 40 L100 80" stroke="#D4AF37" strokeWidth="4" fill="none" />
            </svg>
        </div>
    );
}

function DawnSky() {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#87ceeb] via-[#f5e6d3] to-[#ffcc33]/20">
            {/* Hopeful Particles */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/40"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 1, 0],
                    }}
                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                />
            ))}
        </div>
    );
}

function FailureSky() {
    return (
        <div className="absolute inset-0 bg-[#0a0a0a]">
            {/* Dark Gloom */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.9)_100%)] opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent" />
        </div>
    );
}
