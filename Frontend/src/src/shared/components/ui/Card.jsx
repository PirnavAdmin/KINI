import { motion } from "framer-motion";
import { useThemeContext } from "@shared/context/ThemeContext";

/**
 * Shared glass-morphism card surface. One spec for border/blur/shadow so
 * sections stop each inventing their own opacity + border values.
 */
export default function Card({ hover = true, className = "", children, ...props }) {
  const { isDark } = useThemeContext();

  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-card border backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-white/[0.03] shadow-card-dark hover:border-white/20"
          : "border-slate-200 bg-white/80 shadow-card hover:border-primary-500/20"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
