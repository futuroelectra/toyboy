import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./GlassCard";

interface Step1Props {
  onNext: () => void;
}

const getLabel = (value: number) => {
  if (value <= 22) return { text: "Eish...", emoji: "🧊" };
  if (value <= 55) return { text: "Still cold...", emoji: "🥶" };
  if (value <= 88) return { text: "Getting there...", emoji: "🔥" };
  if (value <= 105) return { text: "Oh hi", emoji: "😍" };
  return { text: "SUCCESS: LOVE O'CLOCK! CLICK TO PROCEED", emoji: "💋" };
};

export default function Step1({ onNext }: Step1Props) {
  const [value, setValue] = useState(0);
  const label = getLabel(value);
  const canProceed = value > 105;
  const progress = (value / 110) * 100;

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-clash text-3xl font-bold text-white"
      >
        Love-O-Meter
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-sm font-manrope"
      >
        Calibrate your love levels...
      </motion.p>

      <GlassCard className="w-full p-6 mt-2">
        {/* Slider with glow track */}
        <div className="relative w-full mb-4">
          {/* Glow track fill */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full pointer-events-none transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #fb7185, #f43f5e, #e11d48)`,
              boxShadow: `0 0 12px rgba(244, 63, 94, ${0.3 + progress * 0.005}), 0 0 24px rgba(244, 63, 94, ${progress * 0.003})`,
            }}
          />
          <input
            type="range"
            min={0}
            max={110}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="relative z-10 w-full"
          />
        </div>

        {/* Dynamic label */}
        <motion.div
          key={label.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <span className="text-3xl mb-2 block">{label.emoji}</span>
          <p className="text-white font-manrope font-semibold text-sm">
            {label.text}
          </p>
        </motion.div>
      </GlassCard>

      {/* Next button — appears when value > 105 */}
      <AnimatePresence>
        {canProceed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={onNext}
            className="mt-2 px-8 py-3 rounded-2xl backdrop-blur-[24px] bg-white/15 border border-white/25 text-white font-clash font-semibold tracking-wide hover:bg-white/25 transition-colors cursor-pointer shadow-lg shadow-rose-500/10"
          >
            Next →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
