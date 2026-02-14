import { useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Step0 from "./components/Step0";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Footer from "./components/Footer";

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

const slideTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export default function App() {
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked; the user interaction should allow it
      });
    }
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step0
            key="step0"
            onPlay={() => {
              startAudio();
              nextStep();
            }}
          />
        );
      case 1:
        return <Step1 key="step1" onNext={nextStep} />;
      case 2:
        return <Step2 key="step2" onNext={nextStep} />;
      case 3:
        return <Step3 key="step3" onNext={nextStep} />;
      case 4:
        return <Step4 key="step4" onNext={nextStep} />;
      case 5:
        return <Step5 key="step5" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Persistent audio element — lives outside AnimatePresence */}
      <audio ref={audioRef} src="/song.mp3" preload="auto" />

      <main className="relative flex flex-col items-center justify-center w-full max-w-[420px] mx-auto px-5 py-8 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
