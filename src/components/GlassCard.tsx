import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hover3D = false,
  ...props
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-[24px] bg-white/15 border border-white/20
        rounded-3xl shadow-lg shadow-black/5
        ${className}
      `}
      whileHover={
        hover3D
          ? { scale: 1.03, rotateY: 4, rotateX: -2 }
          : { scale: 1.02 }
      }
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ perspective: 800 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
