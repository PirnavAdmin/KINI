import { motion } from "framer-motion";
import { BookOpen, Briefcase, ClipboardCheck, Code2, Trophy } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { fadeUp, staggerContainer } from "@shared/hooks/useScrollAnimation";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { learningProcessSteps } from "../data/homeData";

const ICONS = [ClipboardCheck, BookOpen, Code2, Briefcase, Trophy];

function StepNode({ step, Icon, isDark }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative z-10 flex flex-row items-start gap-4 text-left md:flex-col md:items-center md:text-center"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-elevated">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="md:mt-3">
        <span className="text-[11px] font-bold uppercase tracking-wide text-primary-500">
          Step {step.step}
        </span>
        <h3 className={`mt-1 text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{step.title}</h3>
        <p className={`mt-1.5 text-xs leading-relaxed md:max-w-[180px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {step.desc}
        </p>
        <span
          className={`mt-3 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold ${
            isDark ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"
          }`}
        >
          {step.duration}
        </span>
      </div>
    </motion.div>
  );
}

export default function StudentJourney() {
  const { isDark } = useThemeContext();

  return (
    <Section
      className={isDark ? "bg-slate-900" : "bg-slate-50"}
      decoration={
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary-500/[0.05] blur-[160px]" />
      }
    >
      <SectionHeader
        eyebrow="The Journey"
        heading={
          <>
            From Day 1 to Your{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Job Offer
            </span>
          </>
        }
        subheading="Every student follows the same proven path — live learning, real projects, and dedicated placement support until you're hired."
      />

      <div className="relative mt-12">
        {/* Connector line — desktop only, sits behind the step nodes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] top-6 hidden h-px bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-30 md:block"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4"
        >
          {learningProcessSteps.map((step, index) => (
            <StepNode key={step.step} step={step} Icon={ICONS[index]} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
