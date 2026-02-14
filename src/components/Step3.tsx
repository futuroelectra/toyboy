import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step3Props {
  onNext: () => void;
}

const dates = [
  { src: "/date1.png", label: "Sunset Beach Picnic" },
  { src: "/date2.png", label: "Enchanted Forest Picnic" },
];

export default function Step3({ onNext }: Step3Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-5">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-clash text-3xl font-bold text-white"
      >
        Pick Our Date
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-white/60 text-sm font-manrope"
      >
        Choose our delayed V-Day adventure
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
        {dates.map((date, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              delay: idx * 0.15,
            }}
            onClick={() => setSelected(idx)}
            className={`
              relative overflow-hidden rounded-3xl backdrop-blur-[24px]
              border-2 transition-all cursor-pointer group
              ${
                selected === idx
                  ? "border-white/50 bg-white/20 shadow-xl shadow-rose-500/10"
                  : "border-white/15 bg-white/10 hover:border-white/30"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={date.src}
              alt={date.label}
              className="w-full aspect-square object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"
            />

            {/* Label overlay */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl">
              <p className="text-white text-sm font-manrope font-semibold">
                {date.label}
              </p>
            </div>

            {/* Checkmark */}
            <AnimatePresence>
              {selected === idx && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Confirmation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="flex flex-col items-center gap-4 mt-2"
          >
            <p className="text-white/70 font-manrope text-sm italic">
              Choice logged. Planning has begun.
            </p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3 rounded-2xl backdrop-blur-[24px] bg-white/15 border border-white/25 text-white font-clash font-semibold tracking-wide hover:bg-white/25 transition-colors cursor-pointer shadow-lg shadow-rose-500/10"
            >
              Next →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
