import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Heart shape for confetti
const heartShape = confetti.shapeFromPath({
  path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
});

function fireConfetti() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 30,
    shapes: [heartShape],
    colors: ["#f43f5e", "#ec4899", "#fb7185", "#fda4af", "#fecdd3", "#ffffff"],
    scalar: 1.2,
  };

  confetti({ ...defaults, particleCount: 60, origin: { x: 0.2, y: 0.5 } });
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.8, y: 0.5 } });
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.3 } });
}

function fireLocalizedConfetti() {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { x: 0.5, y: 0.7 },
    shapes: [heartShape],
    colors: ["#f43f5e", "#ec4899", "#fbbf24", "#ffffff"],
    scalar: 1,
    gravity: 0.6,
  });
}

export default function Step5() {
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    // Fire confetti on entry
    const t1 = setTimeout(() => fireConfetti(), 300);
    const t2 = setTimeout(() => fireConfetti(), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleClaim = () => {
    setClaimed(true);
    fireLocalizedConfetti();
    setTimeout(() => fireLocalizedConfetti(), 400);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-6">
      {/* Circular portrait with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="relative"
      >
        {/* Animated glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 60px 15px rgba(244, 63, 94, 0.35), 0 0 120px 40px rgba(244, 63, 94, 0.15), 0 0 180px 60px rgba(251, 191, 36, 0.08)",
              "0 0 80px 20px rgba(244, 63, 94, 0.45), 0 0 140px 50px rgba(236, 72, 153, 0.2), 0 0 200px 80px rgba(251, 191, 36, 0.12)",
              "0 0 60px 15px rgba(244, 63, 94, 0.35), 0 0 120px 40px rgba(244, 63, 94, 0.15), 0 0 180px 60px rgba(251, 191, 36, 0.08)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ margin: -10 }}
        />
        <div
          className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/40"
          style={{
            boxShadow:
              "0 0 50px rgba(244, 63, 94, 0.4), 0 0 100px rgba(244, 63, 94, 0.2), 0 0 150px rgba(236, 72, 153, 0.15), 0 0 200px rgba(251, 191, 36, 0.1)",
          }}
        >
          <img
            src="/kiss.png"
            alt="Kiss"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Valentine message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-white font-manrope text-base leading-relaxed max-w-[320px] px-2"
      >
        Happy Valentine's Day my love. I miss you more than this website could
        possibly communicate.
      </motion.p>

      {/* Claim button / Voucher */}
      <AnimatePresence mode="wait">
        {!claimed ? (
          <motion.button
            key="claim-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.7 }}
            onClick={handleClaim}
            className="mt-2 px-8 py-4 rounded-2xl backdrop-blur-[24px] bg-white/15 border border-white/25 text-white font-clash text-lg font-bold tracking-wide hover:bg-white/25 transition-colors cursor-pointer shadow-xl shadow-rose-500/15"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim Your Kiss
          </motion.button>
        ) : (
          <motion.div
            key="voucher"
            initial={{ scale: 0.5, opacity: 0, rotateX: 20 }}
            animate={{ scale: [0.5, 1.05, 1], opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="mt-2 w-full max-w-[340px] backdrop-blur-[24px] bg-white/15 border border-white/25 rounded-3xl p-6 shadow-2xl shadow-rose-500/10"
            style={{ perspective: 800 }}
          >
            {/* Voucher header */}
            <div className="border-b border-white/15 pb-3 mb-4">
              <h3 className="font-clash text-2xl font-bold text-white tracking-widest">
                KISS VOUCHER
              </h3>
            </div>

            {/* Voucher body */}
            <p className="text-white/80 font-manrope text-sm leading-relaxed mb-4">
              Valid for one (1) very, very long kiss. Please present this screen
              to your <span className="italic text-white">'angelbug'</span> upon
              return.
            </p>

            {/* Voucher footer */}
            <div className="border-t border-white/15 pt-3">
              <motion.p
                animate={{
                  textShadow: [
                    "0 0 8px rgba(251, 191, 36, 0.4)",
                    "0 0 20px rgba(251, 191, 36, 0.7)",
                    "0 0 8px rgba(251, 191, 36, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-clash font-semibold text-amber-300 text-sm tracking-wider"
              >
                Status: CLAIMED ✓
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
