import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Users, Briefcase, ArrowRight } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { statData } from "../data/homeData";
import heroImage from "../../../../../public/Generated image_ Smiling Student with Colorful Notebooks (2).png";

// ─── Updated stat values ───────────────────────────────────────────────────────
// "95% Success Rate" replaced with "4.8★ Avg Rating"
// "20,000+ Students Trained" → "10,000+"
// "500+ Hiring Partners" → "50+"

const floatingStats = [
  {
    key: "rating",
    icon: Star,
    label: "at your own pace",
    display: " Live Classes",   // shown as raw string — no toLocaleString needed
    isRaw: true,
  },
  {
    key: "students",
    icon: Users,
    label: "Learn from experienced",
    display: "Expert",
    isRaw: true,
  },
  {
    key: "partners",
    icon: Briefcase,
    label: " To professional world",
    display: "Career Ready",
    isRaw: true,
  },
];

const REGISTER_PATH = "/register";

export default function Hero() {
  const { isDark } = useThemeContext();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-app-dark-gradient"
          : "bg-gradient-to-br from-primary-50 via-porcelain to-secondary-50"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[120px]" />
      </div>

      {/*
        VIEWPORT FIX:
        - Mobile: auto height, sensible py, no min-h so content isn't stretched
        - lg+: min-h calc so it fills the screen properly
        - gap tightened on mobile
      */}
      <div className="relative mx-auto grid w-full max-w-[1580px] grid-cols-1 items-center
        gap-8 px-5 pt-10 pb-24
        sm:px-8 sm:py-12
        lg:min-h-[calc(100svh-72px)] lg:grid-cols-2 lg:gap-6 lg:px-12 lg:py-5
        xl:px-16">

        {/* ── LEFT ── */}
        <div className="text-center lg:text-left">
          <span
            className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium sm:text-sm ${
              isDark ? "bg-primary-500/10 text-primary-300" : "bg-primary-50 text-primary-700"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            Future-Ready Corporate Training Platform
          </span>

          {/*
            FONT SIZE FIX:
            - clamp tightened: starts smaller on mobile (1.8rem), caps at 4.2rem on xl
            - prevents the huge text overflow seen on desktop
          */}
          <h1
            className={`mt-4 font-black leading-[1.05] tracking-[-0.03em]
              text-[clamp(1.8rem,5vw,4.2rem)]
              ${isDark ? "text-white" : "text-ink-900"}`}
          >
            Empowering{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Minds.
            </span>
            <br className="hidden sm:block" />
            Building{" "}
            <span className="text-secondary-500">Futures.</span>
          </h1>

          <p className={`mt-4 mx-auto max-w-xl text-sm leading-7 lg:mx-0 sm:text-base xl:text-lg
            ${isDark ? "text-white/60" : "text-ink-900/60"}`}>
            Master industry skills with live training, projects, mentorship and placement assistance.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              to="/upskill-program"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2
                rounded-full bg-gradient-to-r from-[#1E73BE] via-[#2D8FB4] to-[#5BAE43]
                px-6 py-3 text-sm font-semibold text-white shadow-xl
                transition-all duration-300 hover:scale-[1.03] sm:px-8 sm:py-3.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Explore Programs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-pill border px-6 py-3 text-sm font-semibold
                transition-all duration-300 sm:px-8 ${
                isDark
                  ? "border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                  : "border-primary-500/20 text-primary-600 hover:border-primary-500/40 hover:bg-primary-50"
              }`}
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>

        {/* ── RIGHT — Image + floating badges ── */}
        <div className="relative flex justify-center">
          {/* Glow pulse */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] lg:h-[430px] lg:w-[430px] xl:h-[490px] xl:w-[490px]"
          />
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute rounded-full border border-primary-500/20 h-[290px] w-[290px] sm:h-[350px] sm:w-[350px] lg:h-[415px] lg:w-[415px] xl:h-[475px] xl:w-[475px]"
          />

          {/*
            IMAGE SIZE FIX:
            - Mobile: uses vw-based sizing so it never overflows
            - lg+: restores larger viewport-relative size
          */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative z-10">
            <img
              src={heroImage}
              alt="Smiling student holding colorful notebooks"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="rounded-full object-cover object-top shadow-[0_40px_80px_rgba(0,0,0,.15)] h-[min(80vw,300px)] w-[min(80vw,300px)] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px] xl:h-[460px] xl:w-[460px]"
            />
          </motion.div>

          {/* ── Floating stat badges ── */}
          {floatingStats.map((stat, i) => {
            const Icon = stat.icon;

            /*
              POSITION FIX:
              - More conservative positions so badges don't clip on small screens
              - Slightly inset from edges on mobile, larger offset on lg+
            */
            const positionClasses = [
              // Rating — top left
              "top-2 left-0 sm:top-8 sm:left-2 lg:top-12 lg:-left-4",
              // Students — top right
              "top-2 right-0 sm:top-8 sm:right-2 lg:top-20 lg:-right-4",
              // Partners — below image on mobile, bottom left on sm+
              "-bottom-4 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-2 sm:translate-x-0 lg:bottom-16 lg:left-2",
            ][i];

            const floatOffset = i % 2 === 0 ? -6 : 6;

            return (
              <motion.div
                key={stat.key}
                animate={shouldReduceMotion ? undefined : { y: [0, floatOffset, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity }}
                className={`absolute z-20 ${positionClasses}`}
              >
                <div
                  className={`flex items-center gap-1.5 rounded-2xl p-2 shadow-lg backdrop-blur-xl
                    transition-transform hover:scale-105
                    sm:gap-2 sm:p-2.5 sm:shadow-xl
                    lg:rounded-3xl lg:p-3 lg:gap-3
                    ${isDark ? "bg-ink-900/85" : "bg-white/90"}`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full
                      sm:h-8 sm:w-8
                      lg:h-10 lg:w-10
                      ${isDark ? "bg-primary-500/15 text-primary-300" : "bg-primary-50 text-primary-600"}`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  </span>
                  <span>
                    {/*
                      FONT SIZE FIX on badges:
                      - Mobile: text-xs / text-[10px]
                      - sm+: text-sm / text-xs
                      - lg+: text-lg / text-sm
                    */}
                    <span className={`block text-xs font-bold leading-none sm:text-sm lg:text-lg
                      ${isDark ? "text-white" : "text-ink-900"}`}>
                      {stat.display}
                    </span>
                    <span className={`text-[10px] lg:text-xs
                      ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
                      {stat.label}
                    </span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}