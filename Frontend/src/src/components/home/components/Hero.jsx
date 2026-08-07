import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Briefcase, ArrowRight } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { statData } from "../data/homeData";
import heroImage from "../../../../../public/Generated image_ Smiling Student with Colorful Notebooks (2).png";

// Real, site-wide figures (homeData.statData) — kept in sync with what
// Stats/TrustedCompanies claim elsewhere so the hero never contradicts
// the rest of the page with different numbers for the same fact.
const findStat = (label) => statData.find((s) => s.label === label) ?? { value: 0, suffix: "" };

const floatingStats = [
  { key: "success", icon: Award, label: "Success Rate", to: "/placement", ...findStat("Success Rate") },
  { key: "students", icon: Users, label: "Students Trained", to: "/students", ...findStat("Students Trained") },
  { key: "partners", icon: Briefcase, label: "Hiring Partners", to: "/placement", ...findStat("Hiring Partners") },
];

export default function Hero() {
  const { isDark } = useThemeContext();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-ink-950" : "bg-gradient-to-br from-primary-50 via-porcelain to-secondary-50"}`}>
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1580px] grid-cols-1 items-center gap-10 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:px-12 lg:py-5 xl:px-16">
        {/* LEFT */}
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium ${
              isDark ? "bg-primary-500/10 text-primary-300" : "bg-primary-50 text-primary-700"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            Future Ready Learning Platform
          </span>

          <h1
            className={`mt-5 text-[clamp(2.75rem,8vh,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] ${
              isDark ? "text-white" : "text-ink-900"
            }`}
          >
            Empowering{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Minds.
            </span>
            <br />
            Building <span className="text-secondary-500">Futures.</span>
          </h1>

          <p className={`mt-4 max-w-xl text-base leading-7 xl:text-lg ${isDark ? "text-white/60" : "text-ink-900/60"}`}>
            Master industry skills with live training, projects, mentorship and placement assistance.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
  to="/upskill-program"
  className="
    group
    relative
    overflow-hidden
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    bg-gradient-to-r
    from-[#1E73BE]
    via-[#2D8FB4]
    to-[#5BAE43]
    px-8
    py-3.5
    font-semibold
    text-white
    shadow-xl
    transition-all
    duration-300
    hover:scale-[1.03]
  "
>
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  <span className="relative flex items-center gap-2">
    Explore Programs
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </span>
</Link>
 

            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-pill border px-8 py-3 font-semibold transition-all duration-300 ${
                isDark
                  ? "border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                  : "border-primary-500/20 text-primary-600 hover:border-primary-500/40 hover:bg-primary-50"
              }`}
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative flex justify-center">
          {/* glow */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute h-[min(44vw,64vh,560px)] w-[min(44vw,64vh,560px)] rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl"
          />

          {/* pulse ring */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute h-[min(40vw,58vh,520px)] w-[min(40vw,58vh,520px)] rounded-full border border-primary-500/20"
          />

          {/* image */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <img
              src={heroImage}
              alt="Smiling student holding colorful notebooks"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-[min(40vw,58vh,520px)] w-[min(40vw,58vh,520px)] rounded-full object-cover shadow-[0_40px_80px_rgba(0,0,0,.15)]"
            />
          </motion.div>

          {/* Floating stat badges — real, site-wide figures */}
          {floatingStats.map((stat, i) => {
            const Icon = stat.icon;
            const positionClass = [
              "top-12 left-0",
              "top-24 right-0",
              "bottom-20 left-6",
            ][i];
            const floatOffset = i % 2 === 0 ? -12 : 12;

            return (
              <motion.div
                key={stat.key}
                animate={shouldReduceMotion ? undefined : { y: [0, floatOffset, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity }}
                className={`absolute ${positionClass}`}
              >
                <Link
                  to={stat.to}
                  className={`flex items-center gap-3 rounded-3xl p-3 shadow-xl backdrop-blur-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    isDark ? "bg-ink-900/85" : "bg-white/85"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                      isDark ? "bg-primary-500/15 text-primary-300" : "bg-primary-50 text-primary-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className={`block text-xl font-bold leading-none ${isDark ? "text-white" : "text-ink-900"}`}>
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </span>
                    <span className={`text-sm ${isDark ? "text-white/50" : "text-ink-900/50"}`}>{stat.label}</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}