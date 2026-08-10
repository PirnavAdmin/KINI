import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Briefcase, ArrowRight, MessageCircle } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { statData } from "../data/homeData";
import heroImage from "../../../../../public/Generated image_ Smiling Student with Colorful Notebooks (2).png";

const findStat = (label) => statData.find((s) => s.label === label) ?? { value: 0, suffix: "" };
const REGISTER_PATH = "/register";

const floatingStats = [
  { key: "success", icon: Award, label: "Success Rate", ...findStat("Success Rate") },
  { key: "students", icon: Users, label: "Students Trained", ...findStat("Students Trained") },
  { key: "partners", icon: Briefcase, label: "Hiring Partners", ...findStat("Hiring Partners") },
];

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
      {/* Background glow - keep as is */}
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
            className={`mt-5 text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] ${
              isDark ? "text-white" : "text-ink-900"
            }`}
          >
            Empowering{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Minds.
            </span>
            <br className="hidden sm:block" />
            Building <span className="text-secondary-500">Futures.</span>
          </h1>

          <p className={`mt-4 max-w-xl text-base leading-7 xl:text-lg ${isDark ? "text-white/60" : "text-ink-900/60"}`}>
            Master industry skills with live training, projects, mentorship and placement assistance.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/upskill-program"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E73BE] via-[#2D8FB4] to-[#5BAE43] px-8 py-3.5 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.03]"
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

        {/* IMAGE + FLOATING BADGES */}
        <div className="relative flex justify-center">
          {/* Glow & pulse - keep as is */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute h-[min(60vw,40vh,320px)] lg:h-[min(44vw,64vh,560px)] w-[min(60vw,40vh,320px)] lg:w-[min(44vw,64vh,560px)] rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl"
          />

          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute h-[min(55vw,38vh,300px)] lg:h-[min(40vw,58vh,520px)] w-[min(55vw,38vh,300px)] lg:w-[min(40vw,58vh,520px)] rounded-full border border-primary-500/20"
          />

          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <img
              src={heroImage}
              alt="Smiling student holding colorful notebooks"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-[min(55vw,38vh,300px)] w-[min(55vw,38vh,300px)] lg:h-[min(40vw,58vh,520px)] lg:w-[min(40vw,58vh,520px)] rounded-full object-cover shadow-[0_40px_80px_rgba(0,0,0,.15)]"
            />
          </motion.div>

          {/* Floating Stats - Responsive positioning */}
          {floatingStats.map((stat, i) => {
            const Icon = stat.icon;
            const positionClasses = [
              "top-2 left-2 md:top-12 md:left-0 lg:top-12 lg:left-0",
              "top-16 right-2 md:top-24 md:right-0 lg:top-24 lg:right-0",
              "bottom-2 left-2 md:bottom-20 md:left-6 lg:bottom-20 lg:left-6",
            ][i];
            const floatOffset = i % 2 === 0 ? -8 : 8;

            return (
              <motion.div
                key={stat.key}
                animate={shouldReduceMotion ? undefined : { y: [0, floatOffset, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity }}
                className={`absolute ${positionClasses} max-w-[140px] md:max-w-none`}
              >
                <Link
                  to={REGISTER_PATH}
                  className={`flex items-center gap-2 md:gap-3 rounded-2xl md:rounded-3xl p-2 md:p-3 shadow-xl backdrop-blur-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    isDark ? "bg-ink-900/85" : "bg-white/85"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 md:h-11 md:w-11 flex-shrink-0 items-center justify-center rounded-full ${
                      isDark ? "bg-primary-500/15 text-primary-300" : "bg-primary-50 text-primary-600"
                    }`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className={`block text-base md:text-xl font-bold leading-none ${isDark ? "text-white" : "text-ink-900"}`}>
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </span>
                    <span className={`text-xs md:text-sm ${isDark ? "text-white/50" : "text-ink-900/50"}`}>{stat.label}</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Floating Button (optional) – you can uncomment if needed */}
      {/* 
        <motion.a
          href="https://wa.me/yournumber"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-colors hover:bg-green-600 md:px-5 md:py-3.5"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </motion.a>
      */}
    </section>
  );
}