import { useThemeContext } from "@shared/context/ThemeContext";

const TONES = {
  primary: {
    light: "border-primary-500/20 bg-primary-50 text-primary-500",
    dark: "border-primary-500/30 bg-primary-500/10 text-primary-300",
    dot: "bg-primary-500",
  },
  secondary: {
    light: "border-secondary-500/20 bg-secondary-50 text-secondary-600",
    dark: "border-secondary-500/30 bg-secondary-500/10 text-secondary-300",
    dot: "bg-secondary-500",
  },
  coral: {
    light: "border-brand-coral/20 bg-brand-coral/5 text-brand-coral",
    dark: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
    dot: "bg-brand-coral",
  },
};

/**
 * Eyebrow pill used above section headings — replaces the ad hoc
 * "inline-flex items-center gap-2 rounded-full ..." markup that was
 * copy-pasted with slightly different values in every section.
 */
export default function Badge({ children, tone = "primary", icon: Icon, pulse = true, className = "" }) {
  const { isDark } = useThemeContext();
  const t = TONES[tone];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill border px-4 py-1.5 text-xs font-semibold ${
        isDark ? t.dark : t.light
      } ${className}`}
    >
      {Icon ? (
        <Icon className="h-3 w-3" aria-hidden="true" />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot} ${pulse ? "animate-pulse" : ""}`} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
