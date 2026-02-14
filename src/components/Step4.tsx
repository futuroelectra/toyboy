import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step4Props {
  onNext: () => void;
}

// How many move events before the button appears.
// A casual swipe across the card fires ~100-200 events,
// so 150 ≈ one or two good back-and-forth strokes.
const SCRATCH_THRESHOLD = 150;

export default function Step4({ onNext }: Step4Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const strokeTotal = useRef(0);
  const [progress, setProgress] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const canFinish = progress >= 100;

  // Initialize canvas with silver overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use offsetWidth/offsetHeight for the content box (excludes border)
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Create metallic silver gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#d1d5db");
    gradient.addColorStop(0.3, "#e5e7eb");
    gradient.addColorStop(0.5, "#c0c0c0");
    gradient.addColorStop(0.7, "#d4d4d8");
    gradient.addColorStop(1, "#b8b8bd");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Add hint text
    ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
    ctx.font = `600 ${Math.min(w * 0.06, 18)}px Manrope, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch to reveal ✨", w / 2, h / 2);

    setCanvasReady(true);
  }, []);

  const getCoords = useCallback(
    (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();

      if ("touches" in e) {
        const touch = e.touches[0];
        if (!touch) return null;
        return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    []
  );

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 34, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      const coords = getCoords(e);
      if (coords) scratch(coords.x, coords.y);
    },
    [getCoords, scratch]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const coords = getCoords(e);
      if (coords) {
        scratch(coords.x, coords.y);
        strokeTotal.current++;
        // Update progress bar based on stroke count
        const pct = Math.min(100, Math.round((strokeTotal.current / SCRATCH_THRESHOLD) * 100));
        setProgress(pct);
      }
    },
    [getCoords, scratch]
  );

  const handleEnd = useCallback(() => {
    isDrawing.current = false;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-5">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-clash text-3xl font-bold text-white"
      >
        Scratch to Reveal
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-white/60 text-sm font-manrope"
      >
        A hidden message awaits...
      </motion.p>

      {/* Scratch-off area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        ref={containerRef}
        className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl"
      >
        {/* Hidden image underneath */}
        <img
          src="/scratch.png"
          alt="Hidden message"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        />

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair rounded-3xl"
          style={{ touchAction: "none" }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />

        {/* Progress indicator */}
        {canvasReady && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/40"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Finish button */}
      <AnimatePresence>
        {canFinish && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={onNext}
            className="mt-2 px-8 py-3 rounded-2xl backdrop-blur-[24px] bg-white/15 border border-white/25 text-white font-clash font-semibold tracking-wide hover:bg-white/25 transition-colors cursor-pointer shadow-lg shadow-rose-500/10"
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
