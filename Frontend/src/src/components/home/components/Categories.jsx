import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@shared/context/ThemeContext";
import { useEnrollment } from "@shared/context/ModalProvider";
import { categories, featuredCourses } from "@features/home/data/homeData";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { FaCheckCircle, FaArrowRight, FaClock, FaUsers } from "react-icons/fa";

// ─── Updated image mapping with your URLs ──────────────────────────────
const imageMap = {
  // Primary program images
  "Full Stack Development": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdYGCnzISeozVcTXvvJ6lr-8c3x-5o8-JtCMwzbHLaQ&s=10",
  "Full Stack .NET": "https://www.ducatindia.com/_next/image?url=https%3A%2F%2Fadmin.ducatindia.com%2Fcourse%2F1773227600418chikipui.png&w=640&q=75",
  "AI & GenAI": "https://www.cio.com/wp-content/uploads/2023/10/iStock-1483013789-1.jpg?quality=50&strip=all&w=1024",
  "Cloud & DevOps": "https://www.cio.com/wp-content/uploads/2023/10/iStock-1483013789-1.jpg?quality=50&strip=all&w=1024",
  "Data Science": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaDfn88MAWqkouiLz35p2qSBER9_lWGegQmdXuH55Ojw&s=10",
  "MERN Stack": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdYGCnzISeozVcTXvvJ6lr-8c3x-5o8-JtCMwzbHLaQ&s=10",
  "Leadership": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ20n5d4gWDLkHXeXax4o2UlJYcyy_oHXSU8zwj8YytA&s=10",
  
  // Additional categories (kept as fallbacks)
  "Business": "https://images.unsplash.com/photo-4tpElFQemQ?auto=format&fit=crop&q=80&w=800&h=600",
  "Marketing": "https://images.unsplash.com/photo-1432889821006-c6a6e5cf0d59?auto=format&fit=crop&q=80&w=800&h=600",
  "Finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=600",
  "Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=600",
};

// Fallback image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600";

export default function Categories() {
  const [activeTab, setActiveTab] = useState(0);
  const { isDark } = useThemeContext();
  const { openEnrollment } = useEnrollment();
  const course = useMemo(() => featuredCourses[activeTab], [activeTab]);

  // Determine image: use course.image if exists, else look up by title, else fallback
  const imageUrl =
    course.image ||
    imageMap[course.title] ||
    imageMap[Object.keys(imageMap).find(key => course.title.includes(key))] ||
    FALLBACK_IMAGE;

  return (
    <Section
      className={isDark ? "bg-app-dark-gradient" : "bg-porcelain"}
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

      {/* Program Card with Image */}
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

          {/* Two‑column layout: image left, content right */}
          <div className="flex flex-col lg:flex-row">
            {/* Image – left side */}
            <div className="lg:w-2/5 relative overflow-hidden lg:rounded-l-3xl bg-slate-100 dark:bg-slate-800">
              <img
                src={imageUrl}
                alt={course.title}
                className="h-56 w-full object-cover lg:h-full lg:min-h-[340px] transition-transform duration-500 hover:scale-105"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent dark:from-black/20" />
            </div>

            {/* Content – right side */}
            <div className="flex-1 p-7 sm:p-9 lg:p-8">
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

              {/* Outcomes */}
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
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2">
                  Enroll Now
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}