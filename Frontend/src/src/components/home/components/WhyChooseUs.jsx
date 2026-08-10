import { motion } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Infinity as InfinityIcon, Radio, Users } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { fadeUp, staggerContainer } from "@shared/hooks/useScrollAnimation";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { whyChooseUsFeatures } from "../data/homeData";

const ICONS = [Radio, GraduationCap, Briefcase, Code2, Users, InfinityIcon];

function FeatureCard({ feature, Icon, isDark, featured = false, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative rounded-3xl ${className}`}
    >
      {/* Top border – gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-3xl pointer-events-none" />

      <div
        className={`p-6 rounded-3xl transition-shadow duration-300 ${
          featured
            ? isDark
              ? "bg-gradient-to-br from-primary-500/10 via-white/[0.02] to-secondary-500/10"
              : "bg-gradient-to-br from-primary-50 via-white to-secondary-50 shadow-card"
            : isDark
              ? "bg-white/[0.03] hover:bg-white/[0.06]"
              : "bg-white shadow-card hover:shadow-card-lg"
        }`}
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white ${
            featured ? "shadow-glow" : ""
          }`}
        >
          <Icon className={featured ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
        </span>

        <h3
          className={`mt-4 font-display font-bold ${featured ? "text-xl" : "text-base"} ${
            isDark ? "text-white" : "text-ink-900"
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`mt-2 leading-relaxed ${featured ? "text-sm" : "text-xs"} ${
            isDark ? "text-white/50" : "text-ink-900/50"
          }`}
        >
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const { isDark } = useThemeContext();
  const [first, second, ...rest] = whyChooseUsFeatures;

  // Add the Internship feature – we insert it after the grid as a full‑width card
  const internshipFeature = {
    title: "Guaranteed Internships",
    desc: "Every learner is placed in a real, paid internship before graduating – hands-on experience, not just certificates.",
  };
  const InternshipIcon = Briefcase; // or Users, whichever fits

  return (
    <Section
      className={
        isDark
          ? "bg-app-dark-gradient"
          : "bg-porcelain"
      }
    >
      <SectionHeader
        eyebrow="Why Choose Us"
        heading={
          <>
            Built Different from{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Every Other Bootcamp
            </span>
          </>
        }
        subheading="No recorded courses, no crowded cohorts, no guesswork. Just outcomes."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10"
      >
        {/* First row: featured card + second card */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <FeatureCard feature={first} Icon={ICONS[0]} isDark={isDark} featured className="lg:col-span-2" />
          <FeatureCard feature={second} Icon={ICONS[1]} isDark={isDark} />
        </div>

        {/* Second row: the remaining features (4 items) */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} Icon={ICONS[i + 2]} isDark={isDark} />
          ))}
        </div>

        {/* 🆕 Internship feature – full width, highlighted */}
        <div className="mt-5">
          <FeatureCard
            feature={internshipFeature}
            Icon={InternshipIcon}
            isDark={isDark}
            featured={true}
            className="w-full"
          />
        </div>
      </motion.div>
    </Section>
  );
}