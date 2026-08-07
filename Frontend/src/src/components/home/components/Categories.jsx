import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@shared/context/ThemeContext";
import { useEnrollment } from "@shared/context/ModalProvider";
import { categories, featuredCourses } from "@features/home/data/homeData";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { FaCheckCircle, FaArrowRight, FaClock, FaUsers } from "react-icons/fa";

export default function Categories() {
  const [activeTab, setActiveTab] = useState(0);
  const { isDark } = useThemeContext();
  const { openEnrollment } = useEnrollment();
  const course = useMemo(() => featuredCourses[activeTab], [activeTab]);

  return (
    <Section
      className={isDark ? "bg-ink-950" : "bg-porcelain"}
      decoration={
        <>
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary-500/5 blur-[150px] dark:bg-primary-500/10" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-secondary-500/5 blur-[150px] dark:bg-secondary-500/10" />
        </>
      }
    >
      <SectionHeader
        eyebrow="Our Programs"
        heading={
          <>
            Industry-Focused{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Career Tracks
            </span>
          </>
        }
        subheading="Specialized programs designed to make you job-ready in 12-24 weeks."
      />

      {/* Tabs */}
      <div className="mt-8 mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(i)}
            className={`rounded-pill border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeTab === i
                ? "border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg"
                : isDark
                  ? "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                  : "border-ink-900/10 bg-white text-ink-900/60 hover:border-primary-500/30 hover:text-ink-900"
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Program Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative overflow-hidden rounded-3xl border ${
            isDark 
              ? "border-white/10 bg-white/[0.03]" 
              : "border-ink-900/15 bg-white/80 shadow-card"
          }`}
        >
          {/* Top gradient bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{
              background: 'linear-gradient(90deg, #1E73BD 0%, #2890B8 35%, #35A89D 65%, #58B347 100%)'
            }}
          />

          {/* Single column content */}
          <div className="p-7 sm:p-9">
            <span
              className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold ${
                isDark ? "bg-primary-500/20 text-primary-300" : "bg-primary-50 text-primary-600"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
              {course.badge}
            </span>
            <h3 className={`mt-3 font-display text-xl font-bold sm:text-2xl ${isDark ? "text-white" : "text-ink-900"}`}>
              {course.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
              {course.desc}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className={`flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
                <FaClock className="text-secondary-500" /> {course.duration}
              </span>
              <span className={`flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
                <FaUsers className="text-primary-500" /> {course.sessions}
              </span>
            </div>

            {/* Outcomes – no salary badge anymore */}
            <div className="mt-4 space-y-2">
              {course.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="flex-shrink-0 text-xs text-secondary-500" />
                  <span className={`text-xs ${isDark ? "text-white/70" : "text-ink-900/60"}`}>{outcome}</span>
                </div>
              ))}
            </div>

           <motion.button
  type="button"
  onClick={() => openEnrollment(course)}
  whileHover={{ scale: 1.03, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="
    group
    mt-6
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    px-6
    py-3
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    shadow-[0_12px_30px_rgba(30,115,189,0.28)]
    hover:shadow-[0_18px_40px_rgba(30,115,189,0.38)]
    active:shadow-[0_8px_20px_rgba(30,115,189,0.25)]
    relative
    overflow-hidden
  "
  style={{
    background:
      "linear-gradient(90deg, #1E73BD 0%, #2890B8 35%, #35A89D 65%, #58B347 100%)",
  }}
>
  {/* Shine Effect */}
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  <span className="relative z-10 flex items-center gap-2">
    Enroll Now
    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
  </span>
</motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}