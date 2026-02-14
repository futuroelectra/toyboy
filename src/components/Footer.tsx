import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <>
      <footer className="w-full py-4 text-center">
        <button
          onClick={() => setShowEgg(true)}
          className="text-white/40 text-xs font-manrope tracking-wide hover:text-white/60 transition-colors cursor-pointer"
        >
          Made with ♥️ for Banana
        </button>
      </footer>

      {/* Easter Egg Popup */}
      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setShowEgg(false)}
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Popup */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative backdrop-blur-[24px] bg-white/15 border border-white/20 rounded-3xl px-8 py-6 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white text-xl font-clash font-semibold leading-relaxed">
                You're beautiful,
                <br />I love you!
              </p>
              <p className="text-white/50 text-xs mt-3">tap anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
