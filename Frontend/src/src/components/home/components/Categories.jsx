import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@shared/context/ThemeContext";
import { useEnrollment } from "@shared/context/ModalProvider";
import { categories, featuredCourses } from "@features/home/data/homeData";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { FaCheckCircle, FaArrowRight, FaClock, FaUsers } from "react-icons/fa";

/**
 * SalaryGrowthChart
 * ------------------------------------------------------------------
 * A small illustrative line chart showing salary trending upward
 * from "Before" to the course's target package. It's stylized (not
 * plotting real historical data — homeData only gives us a single
 * target figure per course), so treat the curve as directional, not
 * as literal statistics. Swap the `points` easing if you later have
 * real month-by-month salary data to plot.
 * ------------------------------------------------------------------
 */
function SalaryGrowthChart({ salary, isDark }) {
  // Normalized upward curve — purely illustrative.
  const points = [
    { x: 0, y: 78 },
    { x: 25, y: 70 },
    { x: 50, y: 52 },
    { x: 75, y: 30 },
    { x: 100, y: 12 },
  ];

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  const axisColor = isDark ? "#334155" : "#E2E8F0";
  const labelColor = isDark ? "#64748B" : "#94A3B8";

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-32 w-full overflow-visible sm:h-36"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="salaryLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-secondary-500)" />
          </linearGradient>
          <linearGradient id="salaryFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-secondary-500)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-secondary-500)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline grid */}
        {[25, 50, 75].map((yPos) => (
          <line
            key={yPos}
            x1="0"
            x2="100"
            y1={yPos}
            y2={yPos}
            stroke={axisColor}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        ))}

        {/* Filled area under the curve */}
        <motion.path
          d={areaPath}
          fill="url(#salaryFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Growth line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#salaryLine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Point markers */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 ? 2.6 : 1.6}
            fill={i === points.length - 1 ? "var(--color-secondary-500)" : "var(--color-primary-500)"}
            stroke={isDark ? "#0F172A" : "#F8FAFC"}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
          />
        ))}
      </svg>

      {/* Axis labels */}
      <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: labelColor }}>
        <span>Before</span>
        <span>6 mo</span>
        <span className="font-semibold text-secondary-500">
          After · {salary}
        </span>
      </div>
    </div>
  );
}

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
          className={`overflow-hidden rounded-3xl border backdrop-blur-xl ${
            isDark ? "border-white/5 bg-white/[0.03]" : "border-ink-900/[0.06] bg-white/80 shadow-card"
          }`}
        >
          <div className="grid gap-0 md:grid-cols-2">
            {/* Info side */}
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
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/50" : "text-ink-900/50"}`}>{course.desc}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <span className={`flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
                  <FaClock className="text-secondary-500" /> {course.duration}
                </span>
                <span className={`flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
                  <FaUsers className="text-primary-500" /> {course.sessions}
                </span>
              </div>

              {/* Salary badge */}
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent">
                  {course.salary}
                </span>
                <span className={`text-xs ${isDark ? "text-white/40" : "text-ink-900/40"}`}>target salary</span>
              </div>

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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform dark:bg-white dark:text-ink-900"
              >
                Enroll Now <FaArrowRight className="text-xs" />
              </motion.button>
            </div>

            {/* Visual side — salary growth chart + package badge */}
            <div
              className={`relative flex flex-col justify-center border-t p-7 sm:p-9 md:border-l md:border-t-0 ${
                isDark ? "border-white/5 bg-white/[0.02]" : "border-ink-900/[0.06] bg-porcelain/60"
              }`}
            >
              <div className="mx-auto w-full max-w-[300px]">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-ink-900/40"}`}>
                    Salary Growth
                  </span>

                  <span className="bg-gradient-to-br from-primary-500 to-secondary-500 bg-clip-text text-lg font-black text-transparent">
                    {course.salary}
                  </span>
                </div>

                <div className="mt-3">
                  <SalaryGrowthChart salary={course.salary} isDark={isDark} />
                </div>

                <p className={`mt-3 text-center text-[10px] ${isDark ? "text-white/40" : "text-ink-900/40"}`}>
                  Illustrative trend, actual outcomes vary by role and experience
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
