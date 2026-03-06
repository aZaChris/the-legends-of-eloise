"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RefreshCw, Home as HomeIcon } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import ZeldaHeart from "@/components/ZeldaHeart";
import Triforce from "@/components/Triforce";
import Hero from "@/components/Hero";

// Screen types
type Screen = "START" | "INTRO" | "STORY" | "HEARTS" | "CONFESSION" | "SUCCESS" | "FAILURE";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("START");
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer for Zelda's Lullaby
  const [startTime, setStartTime] = useState<number | null>(null);
  const [listenDuration, setListenDuration] = useState<string>("00:00");

  // Easter Egg state
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Failure animation states
  const [failureStage, setFailureStage] = useState<"HIT" | "EMPTYING" | "GAMEOVER">("HIT");
  const [heartsCount, setHeartsCount] = useState(5);

  // Handle failure sequence
  useEffect(() => {
    if (currentScreen === "FAILURE") {
      setFailureStage("HIT");
      setHeartsCount(5);
      const hitTimeout = setTimeout(() => setFailureStage("EMPTYING"), 1500);
      return () => clearTimeout(hitTimeout);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (failureStage === "EMPTYING" && heartsCount > 0) {
      const interval = setInterval(() => setHeartsCount(prev => prev - 1), 300);
      if (heartsCount === 1) setTimeout(() => setFailureStage("GAMEOVER"), 1000);
      return () => clearInterval(interval);
    }
  }, [failureStage, heartsCount]);

  // Handle Lullaby Timer
  useEffect(() => {
    if (audioStarted && startTime === null) {
      setStartTime(Date.now());
    }
  }, [audioStarted, startTime]);

  // Format final duration
  const finalizeTimer = () => {
    if (startTime) {
      const durationMs = Date.now() - startTime;
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      setListenDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const handleStartInteraction = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      setAudioStarted(true);
    }
    setCurrentScreen("INTRO");
  };

  const nextScreen = (screen: Screen) => {
    if (screen === "SUCCESS") {
      finalizeTimer();
    }
    setCurrentScreen(screen);
  };

  const transitionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <DynamicBackground screen={currentScreen} />

      {/* Vignette Overlay for Failure */}
      <AnimatePresence>
        {currentScreen === "FAILURE" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]"
          />
        )}
      </AnimatePresence>

      {/* Corner UI Decoration / Easter Egg Trigger */}
      <div className="fixed top-4 right-4 z-50 opacity-40">
        <Triforce size="sm" onEasterEgg={() => setShowEasterEgg(true)} />
      </div>

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-8 backdrop-blur-md"
            {...transitionProps}
          >
            <div className="mb-8">
              <Triforce size="md" />
            </div>
            <div className="max-w-md space-y-6 text-zelda-gold italic text-xl">
              <p>"Dicono che un eroe non conti mai il tempo."</p>
              <p>"Per Link, ogni secondo trascorso a cercare Zelda è solo un battito di un'eternità già scritta."</p>
              <p className="not-italic font-fantasy text-2xl mt-8">Il mio tempo per te è senza confini.</p>
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="mt-12 px-6 py-2 border border-zelda-gold/50 text-zelda-gold hover:bg-zelda-gold/10 transition-all font-fantasy"
            >
              Ritorna alla Quest
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentScreen === "START" && (
          <motion.div
            key="start"
            {...transitionProps}
            className="z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="mb-12"
            >
              <Triforce size="md" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="text-4xl md:text-6xl font-fantasy text-zelda-gold mb-4"
            >
              Una piccola avventura
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              className="text-lg text-zelda-tan/60 mb-16 italic"
            >
              Forse la più importante.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 5.5, duration: 2, repeat: Infinity }}
              onClick={handleStartInteraction}
              className="text-zelda-gold font-fantasy text-2xl tracking-[0.3em] uppercase"
            >
              Inizia
            </motion.button>
          </motion.div>
        )}

        {currentScreen === "INTRO" && (
          <motion.div
            key="intro"
            {...transitionProps}
            className="z-10 max-w-md"
          >
            <h1 className="text-4xl md:text-5xl mb-8 leading-tight">
              Una nuova quest è iniziata
            </h1>
            <div className="space-y-4 text-lg text-zelda-tan/80 mb-12">
              <p>Nel vasto regno delle coincidenze,</p>
              <p>delle chat infinite</p>
              <p>e delle conversazioni improbabili,</p>
              <p className="mt-6">un avventuriero ha trovato qualcosa di raro.</p>
              <p>Non una spada leggendaria.</p>
              <p>Non una reliquia perduta.</p>
              <p className="text-zelda-gold font-fantasy text-xl mt-4">Ma qualcuno con cui iniziare una nuova avventura.</p>
            </div>
            <button
              onClick={() => nextScreen("STORY")}
              className="group relative px-8 py-3 bg-zelda-emerald border-2 border-zelda-gold text-zelda-gold font-fantasy text-xl tracking-widest hover:bg-zelda-gold hover:text-zelda-emerald transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              Inizia la quest
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {currentScreen === "STORY" && (
          <motion.div
            key="story"
            {...transitionProps}
            className="z-10 max-w-md flex flex-col items-center"
          >
            <div className="space-y-6 text-xl text-zelda-tan/90 leading-relaxed mb-12">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Ogni eroe esplora dungeon,</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>risolve enigmi</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>e attraversa mondi strani.</motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="mt-8 font-fantasy">Ma anche gli eroi più testardi</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }}>prima o poi capiscono una cosa:</motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.5 }} className="text-2xl text-zelda-gold">le avventure sono molto migliori</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.5 }}>quando non si affrontano da soli.</motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10.5 }}
                className="flex gap-2 justify-center my-4"
              >
                <span className="px-2 py-1 bg-white/5 rounded text-sm italic">giochi</span>
                <span className="px-2 py-1 bg-white/5 rounded text-sm italic">musica</span>
                <span className="px-2 py-1 bg-white/5 rounded text-sm italic">meme</span>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 12.5 }}>è successa una cosa strana.</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 14.5 }} className="text-2xl font-fantasy text-zelda-gold">
                Ho iniziato a pensare che forse la parte più bella di questa quest sei semplicemente tu.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 16 }}
              className="mt-4"
            >
              <button
                onClick={() => nextScreen("HEARTS")}
                className="px-10 py-3 border-2 border-zelda-gold/50 text-zelda-gold font-fantasy text-lg hover:border-zelda-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all"
              >
                Continua
              </button>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === "HEARTS" && (
          <motion.div
            key="hearts"
            {...transitionProps}
            className="z-10 max-w-md w-full"
          >
            <h2 className="text-3xl font-fantasy mb-8">Cuori ottenuti</h2>
            <p className="text-lg mb-12 text-zelda-tan/80">
              Nel mondo di Zelda la vita si misura in cuori.<br /><br />
              Ogni cuore rappresenta qualcosa di raro:<br />
              fiducia, tempo condiviso, risate inaspettate.<br /><br />
              E senza nemmeno accorgermene...<br />
              <span className="text-zelda-gold">credo di averne guadagnati alcuni grazie a te.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <ZeldaHeart filled delay={0.5} />
              <ZeldaHeart filled delay={1.5} />
              <ZeldaHeart filled delay={2.5} />
              <ZeldaHeart filled delay={3.5} />
              <ZeldaHeart filled delay={4.5} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6 }}
            >
              <button
                onClick={() => nextScreen("CONFESSION")}
                className="px-10 py-3 bg-zelda-emerald/40 border border-zelda-gold text-zelda-gold font-fantasy text-lg hover:bg-zelda-emerald transition-all"
              >
                Ultima quest
              </button>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === "CONFESSION" && (
          <motion.div
            key="confession"
            {...transitionProps}
            className="z-10 max-w-md flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-zelda-gold uppercase tracking-[0.2em] text-sm"
            >
              Nuova missione principale sbloccata
            </motion.div>

            <h2 className="text-2xl mb-12 italic text-zelda-tan/70">
              C'è solo un'ultima scelta prima che l'avventura possa continuare.
            </h2>

            <div className="my-16">
              <Triforce size="lg" />
            </div>

            <h1 className="text-4xl md:text-5xl font-fantasy mb-16 text-zelda-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              Vuoi essere la mia Zelda?
            </h1>

            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => nextScreen("SUCCESS")}
                className="w-full py-4 bg-zelda-emerald border-2 border-zelda-gold text-white font-fantasy text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Sì — Accetta la quest
              </button>
              <button
                onClick={() => nextScreen("FAILURE")}
                className="w-full py-2 text-gray-500 font-sans text-sm hover:text-gray-400 transition-colors"
              >
                No — Magari una side quest
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === "SUCCESS" && (
          <motion.div
            key="success"
            {...transitionProps}
            className="z-10 max-w-md"
          >
            <div className="mb-12 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Triforce size="md" />
              </motion.div>
            </div>

            <h1 className="text-4xl font-fantasy text-zelda-gold mb-8">Quest accettata.</h1>
            <p className="text-xl text-zelda-tan/90 mb-12 leading-relaxed">
              Un nuovo compagno di avventure si è unito al viaggio.
            </p>

            <motion.div
              className="p-6 border border-zelda-gold/30 bg-zelda-emerald/10 rounded-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-lg uppercase tracking-widest text-zelda-gold/70 mb-2">Prossimo obiettivo:</h2>
              <p className="text-2xl font-fantasy">continuare questa storia insieme.</p>
            </motion.div>

            {/* Secret Timer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="text-zelda-tan/50 italic text-sm"
            >
              <p>brava, sei rimasta soltanto {listenDuration} minuti ad ascoltare Zelda's Lullaby...</p>
              <p className="mt-1 font-fantasy tracking-wider uppercase">good girl</p>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === "FAILURE" && (
          <motion.div
            key="failure"
            {...transitionProps}
            className="z-30 max-w-md flex flex-col items-center"
          >
            {/* Hero Animation */}
            <div className="mb-8">
              <Hero isFalling={failureStage !== "HIT"} />
            </div>

            {/* Life Hearts Emptying */}
            <div className="flex gap-2 mb-12">
              {Array.from({ length: 5 }).map((_, i) => (
                <ZeldaHeart key={i} filled={i < heartsCount} />
              ))}
            </div>

            <AnimatePresence>
              {failureStage === "GAMEOVER" && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-6xl font-fantasy text-red-700 mb-8 drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]">
                    GAME OVER
                  </h1>

                  <div className="space-y-4 text-xl text-zelda-tan/80 italic mb-12">
                    <p>L'eroe è stato sconfitto…</p>
                    <p>ma continuerà comunque a portarti</p>
                    <p>meme, musica</p>
                    <p>e compagnia nelle future side quest.</p>
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <button
                      onClick={() => nextScreen("CONFESSION")}
                      className="group flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-zelda-gold/50 text-zelda-gold font-fantasy text-lg hover:bg-white/10 transition-all font-fantasy"
                    >
                      <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                      Riprova la quest
                    </button>
                    <button
                      onClick={() => nextScreen("INTRO")}
                      className="group flex items-center justify-center gap-2 w-full py-3 text-gray-500 font-sans text-sm hover:text-gray-400 transition-colors"
                    >
                      <HomeIcon size={16} />
                      Continua l'avventura
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        loop
        src="" // User will need to add their own audio src
      />
    </main>
  );
}
