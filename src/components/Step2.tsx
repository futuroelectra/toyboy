import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./GlassCard";

interface Step2Props {
  onNext: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    question: "Where did we have our first kiss?",
    options: ["The Moon", "The Beach", "The Womb"],
    correctIndex: 2,
  },
  {
    question: "If I had one superpower, what would it be?",
    options: [
      "Invisibility",
      "Super Strength",
      "To Fly (to India and make love to you)",
    ],
    correctIndex: 2,
  },
  {
    question:
      "If I was stranded on an island, what is the one thing I couldn't live without?",
    options: ["Water", "A Knife", "Banana"],
    correctIndex: 2,
  },
];

export default function Step2({ onNext }: Step2Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const question = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (selectedIdx !== null) return; // already answered
    setSelectedIdx(idx);
    const correct = idx === question.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= 3) {
        // All correct — show success then transition
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => onNext(), 1500);
        }, 600);
      } else {
        // Move to next question
        setTimeout(() => {
          setSelectedIdx(null);
          setIsCorrect(null);
          setCurrentQ((q) => q + 1);
        }, 800);
      }
    } else {
      // Wrong — shake then let them retry
      setTimeout(() => {
        setSelectedIdx(null);
        setIsCorrect(null);
      }, 900);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-7xl"
        >
          💯
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-clash text-2xl font-bold text-white"
        >
          You know us well!
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-5">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-clash text-3xl font-bold text-white"
      >
        Relationship Lore
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-white/50 text-xs font-manrope"
      >
        Question {currentQ + 1} of {questions.length}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
          className="w-full"
        >
          <GlassCard className="p-5 mb-4">
            <p className="text-white font-manrope font-semibold text-base leading-relaxed">
              {question.question}
            </p>
          </GlassCard>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const showCorrectColor = isSelected && isCorrect === true;
              const showWrongColor = isSelected && isCorrect === false;

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  whileHover={{ scale: 1.03, rotateY: 4 }}
                  whileTap={{ scale: 0.97 }}
                  animate={
                    showWrongColor
                      ? { x: [0, -10, 10, -10, 10, 0] }
                      : showCorrectColor
                        ? { scale: [1, 1.05, 1] }
                        : {}
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`
                    w-full text-left px-5 py-4 rounded-2xl backdrop-blur-[24px]
                    border font-manrope text-sm font-medium
                    transition-colors cursor-pointer
                    ${
                      showCorrectColor
                        ? "bg-emerald-500/25 border-emerald-400/40 text-white"
                        : showWrongColor
                          ? "bg-red-500/25 border-red-400/40 text-white"
                          : "bg-white/10 border-white/15 text-white/90 hover:bg-white/20"
                    }
                  `}
                  style={{ perspective: 600 }}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
