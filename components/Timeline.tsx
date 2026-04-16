"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    MessageSquare, 
    Users, 
    Flame, 
    Map, 
    MoonStar, 
    Gift, 
    ShoppingCart, 
    Swords,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import DynamicBackground from "./DynamicBackground";
import ParticlesBackground from "./ParticlesBackground";

type Screen = "START" | "INTRO" | "STORY" | "HEARTS" | "CONFESSION" | "SUCCESS" | "FAILURE";

interface SlideData {
    chapter: string;
    screen: Screen;
    title: string;
    subtitle: string;
    body: string;
    icon: React.ComponentType<{ className?: string }>;
}

const timelineSlides: SlideData[] = [
    {
        chapter: "I",
        screen: "START",
        title: "L'inizio",
        subtitle: "Gennaio. Un messaggio su Threads.",
        body: "Lei scriveva di psicologia.\nLui commentò.\nNessuno dei due sapeva ancora cosa stava facendo.",
        icon: MessageSquare
    },
    {
        chapter: "II",
        screen: "INTRO",
        title: "Solo amici",
        subtitle: "Qualche settimana dopo.",
        body: "Lui disse: \"Con te sono convinto che potrebbe nascere una bella amicizia.\"\nLei pensò: vabbè Elisa, cosa potevi aspettarti.\nEntrambi mentivano benissimo.",
        icon: Users
    },
    {
        chapter: "III",
        screen: "STORY",
        title: "La gelosia che non mente",
        subtitle: "Il momento di rottura.",
        body: "Lei menzionò un altro.\nLui capì, finalmente, che non era affatto indifferente.\n\"In realtà avrei preferito farlo io.\"",
        icon: Flame
    },
    {
        chapter: "IV",
        screen: "HEARTS",
        title: "La distanza (o almeno così dicevano)",
        subtitle: "Sicilia. Toscana.",
        body: "Entrambi convinti che la distanza fosse un ostacolo insormontabile.\nSpoiler: non lo era.",
        icon: Map
    },
    {
        chapter: "V",
        screen: "CONFESSION",
        title: "Il divano della bibi",
        subtitle: "La prima volta.",
        body: "Luci soffuse.\n\"Te lo meriti.\"\nAlcune cose non si dimenticano.",
        icon: MoonStar
    },
    {
        chapter: "VI",
        screen: "SUCCESS",
        title: "La box dell'Happy Meal",
        subtitle: "Seconda visita. Primo regalo.",
        body: "Dentro c'era Chandler Bing in versione Funko Pop.\nLe labbra stampate su un foglio.\nUna camelia disegnata a mano.\nChi regala così, capisce davvero.",
        icon: Gift
    },
    {
        chapter: "VII",
        screen: "SUCCESS",
        title: "Il mascarpone senza lattosio",
        subtitle: "Un dettaglio piccolo. Enorme.",
        body: "Lei è intollerante al lattosio.\nLui ci ha pensato mentre facevano la spesa.\nHa preso quello giusto senza che lei lo chiedesse.\nÈ questo, l'amore nei dettagli.",
        icon: ShoppingCart
    },
    {
        chapter: "VIII",
        screen: "SUCCESS",
        title: "Monster Club",
        subtitle: "Una sera qualunque. Non proprio.",
        body: "Insieme al Monster Club.\nPerché alcune uscite diventano un capitolo a sé.",
        icon: Swords
    },
];

const variants = {
    hidden: (direction: number) => {
        return {
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            y: 30
        };
    },
    center: {
        x: 0,
        y: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            y: -30
        };
    }
};

export default function Timeline() {
    const [[page, direction], setPage] = useState([0, 0]);


    
    const paginate = (newDirection: number) => {
        const nextSlide = page + newDirection;
        if (nextSlide >= 0 && nextSlide < timelineSlides.length) {
            setPage([nextSlide, newDirection]);
        }
    };

    // Calculate current slide (safe index)
    const currentSlide = timelineSlides[page];
    const Icon = currentSlide.icon;

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Backgrounds */}
            <div className="absolute inset-0 z-0">
                <DynamicBackground screen={currentSlide.screen} />
            </div>
            <div className="absolute inset-0 z-0 opacity-50">
                <ParticlesBackground />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 w-full max-w-2xl px-6 flex-1 flex flex-col justify-center items-center text-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="hidden"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            y: { duration: 0.4 }
                        }}
                        className="flex flex-col items-center w-full"
                    >
                        {/* Chapter Number */}
                        <div className="text-[#D4AF37] font-serif text-6xl mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                            {currentSlide.chapter}
                        </div>
                        
                        {/* Icon */}
                        <div className="mb-8 p-4 rounded-full bg-black/30 border border-[#D4AF37]/30 backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-[#D4AF37]" />
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-3 drop-shadow-md">
                            {currentSlide.title}
                        </h2>
                        <h3 className="text-gray-400 italic text-sm md:text-base mb-8">
                            {currentSlide.subtitle}
                        </h3>

                        {/* Body Text */}
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed whitespace-pre-line max-w-lg mx-auto drop-shadow-sm">
                            {currentSlide.body}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation & Controls */}
            <div className="relative z-20 w-full max-w-md mx-auto flex items-center justify-between px-8 pb-12">
                <button
                    onClick={() => paginate(-1)}
                    disabled={page === 0}
                    className={`p-3 rounded-full border border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300
                        ${page === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#D4AF37]/20 hover:scale-110 text-[#D4AF37]'}`}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Counter */}
                <div className="text-[#D4AF37] font-serif tracking-widest text-lg drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]">
                    {currentSlide.chapter} / {timelineSlides[timelineSlides.length - 1].chapter}
                </div>

                <button
                    onClick={() => paginate(1)}
                    disabled={page === timelineSlides.length - 1}
                    className={`p-3 rounded-full border border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300
                        ${page === timelineSlides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#D4AF37]/20 hover:scale-110 text-[#D4AF37]'}`}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
