import { motion } from "framer-motion";

interface Step0Props {
  onPlay: () => void;
}

export default function Step0({ onPlay }: Step0Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-clash text-6xl font-bold text-white tracking-tight drop-shadow-lg"
      >
        Dearest Banana.
      </motion.h1>

      {/* Subheader */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="font-manrope text-white/70 text-lg tracking-wide max-w-[300px]"
      >
        Please turn your sound on and click play to get started.
      </motion.p>

      {/* Pulsing Play Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        onClick={onPlay}
        className="relative mt-4 cursor-pointer"
      >
        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-white/20"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 rounded-full backdrop-blur-[24px] bg-white/15 border border-white/30 flex items-center justify-center shadow-lg shadow-rose-500/20"
        >
          {/* Play triangle */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
