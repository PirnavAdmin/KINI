import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Select from "react-select";
import {
  Rocket,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Loader2,
  Award,
  Briefcase,
  Target,
  Code2,
  FileJson,
  GitBranch ,
  Atom,
  RefreshCcw,
  Wind,
  Server,
  Database,
  Terminal,
  Layers,
  Coffee,
  Boxes,
  Brain,
  Cloud,
  
  Link2,
  LineChart,
  FolderGit2,
  Star,
  Clock,
  ShieldCheck,
  Milestone,
  BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ROLE_META = {
  "React JS Developer": { icon: Atom, tone: "from-blue-500 to-cyan-500" },
  "Frontend Developer": { icon: Code2, tone: "from-sky-500 to-blue-600" },
  "MERN Stack Developer": { icon: Layers, tone: "from-emerald-500 to-teal-500" },
  "Full Stack Developer": { icon: Boxes, tone: "from-indigo-500 to-violet-500" },
  "Python Developer": { icon: Terminal, tone: "from-amber-500 to-yellow-500" },
  "Java Developer": { icon: Coffee, tone: "from-orange-500 to-red-500" },
  "AI Engineer": { icon: Brain, tone: "from-fuchsia-500 to-purple-600" },
  "Data Scientist": { icon: LineChart, tone: "from-teal-500 to-emerald-600" },
  "Cloud Engineer": { icon: Cloud, tone: "from-sky-400 to-indigo-500" },
};

const roadmapConfig = {
  currentRoles: [
    "Student",
    "Fresher",
    "Frontend Developer",
    "Backend Developer",
    "QA Engineer",
    "Support Engineer",
    "Working Professional",
  ],
  targetRoles: Object.keys(ROLE_META),
  companies: [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Adobe",
    "Oracle",
    "Salesforce",
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Capgemini",
    "Startup",
  ],
  timelines: ["3 Months", "6 Months", "9 Months", "12 Months"],
  learningModes: ["Live", "Recorded", "Hybrid"],
  studyHours: ["1 Hour", "2 Hours", "4 Hours", "Weekend Only"],
};

const SKILL_LIBRARY = {
  "HTML & CSS": { icon: Code2, weeks: 2 },
  JavaScript: { icon: FileJson, weeks: 4 },
  "Git & GitHub": { icon: GitBranch, weeks: 1 },
  "React JS": { icon: Atom, weeks: 6 },
  "Redux Toolkit": { icon: RefreshCcw, weeks: 2 },
  "Tailwind CSS": { icon: Wind, weeks: 2 },
  "Node.js": { icon: Server, weeks: 4 },
  "Express & MongoDB": { icon: Database, weeks: 4 },
  "REST APIs": { icon: Link2, weeks: 2 },
  "SQL & Databases": { icon: Database, weeks: 2 },
  "Python Core": { icon: Terminal, weeks: 3 },
  "Django / Flask": { icon: Layers, weeks: 4 },
  "Java Core": { icon: Coffee, weeks: 4 },
  "Spring Boot": { icon: Boxes, weeks: 4 },
  "Machine Learning": { icon: Brain, weeks: 6 },
  "Deep Learning": { icon: Sparkles, weeks: 4 },
  "Data Analysis": { icon: LineChart, weeks: 4 },
  "Cloud Fundamentals (AWS)": { icon: Cloud, weeks: 4 },
  "DevOps & CI/CD": { icon: GitBranch, weeks: 3 },
  Projects: { icon: FolderGit2, weeks: 4 },
  "Placement Prep": { icon: Target, weeks: 2 },
};

const TARGET_ROLE_PATHS = {
  "React JS Developer": ["HTML & CSS", "JavaScript", "Git & GitHub", "React JS", "Redux Toolkit", "Tailwind CSS", "Projects", "Placement Prep"],
  "Frontend Developer": ["HTML & CSS", "JavaScript", "Git & GitHub", "React JS", "Tailwind CSS", "Projects", "Placement Prep"],
  "MERN Stack Developer": ["HTML & CSS", "JavaScript", "Git & GitHub", "React JS", "Node.js", "Express & MongoDB", "Redux Toolkit", "Projects", "Placement Prep"],
  "Full Stack Developer": ["HTML & CSS", "JavaScript", "Git & GitHub", "React JS", "Node.js", "Express & MongoDB", "REST APIs", "SQL & Databases", "Projects", "Placement Prep"],
  "Python Developer": ["Python Core", "Git & GitHub", "SQL & Databases", "Django / Flask", "REST APIs", "Projects", "Placement Prep"],
  "Java Developer": ["Java Core", "Git & GitHub", "SQL & Databases", "Spring Boot", "REST APIs", "Projects", "Placement Prep"],
  "AI Engineer": ["Python Core", "Git & GitHub", "SQL & Databases", "Machine Learning", "Deep Learning", "Projects", "Placement Prep"],
  "Data Scientist": ["Python Core", "SQL & Databases", "Data Analysis", "Machine Learning", "Git & GitHub", "Projects", "Placement Prep"],
  "Cloud Engineer": ["Git & GitHub", "Python Core", "Cloud Fundamentals (AWS)", "DevOps & CI/CD", "SQL & Databases", "Projects", "Placement Prep"],
};

const SALARY_BY_ROLE = {
  "React JS Developer": "\u20b96 \u2013 14 LPA",
  "Frontend Developer": "\u20b95 \u2013 12 LPA",
  "MERN Stack Developer": "\u20b97 \u2013 16 LPA",
  "Full Stack Developer": "\u20b98 \u2013 18 LPA",
  "Python Developer": "\u20b96 \u2013 14 LPA",
  "Java Developer": "\u20b96 \u2013 15 LPA",
  "AI Engineer": "\u20b910 \u2013 24 LPA",
  "Data Scientist": "\u20b99 \u2013 22 LPA",
  "Cloud Engineer": "\u20b98 \u2013 20 LPA",
};

const BADGE_STYLES = {
  BEGINNER: "bg-blue-500",
  "MOST POPULAR": "bg-orange-500",
  HOT: "bg-rose-500",
  ADVANCED: "bg-violet-500",
  "IN-DEMAND": "bg-emerald-500",
  POPULAR: "bg-blue-500",
};

const COURSE_LIBRARY = [
  { title: "HTML & CSS Fundamentals", level: "Beginner", roles: ["React JS Developer", "Frontend Developer", "MERN Stack Developer", "Full Stack Developer"], badge: "BEGINNER", icon: Code2, tone: "from-blue-500 to-blue-600", duration: "2 Weeks", rating: "4.8", reviews: "1.2K" },
  { title: "JavaScript Complete Guide", level: "Beginner", roles: ["React JS Developer", "Frontend Developer", "MERN Stack Developer", "Full Stack Developer"], badge: "MOST POPULAR", icon: FileJson, tone: "from-amber-400 to-yellow-500", duration: "4 Weeks", rating: "4.9", reviews: "2.4K" },
  { title: "React JS From Scratch", level: "Intermediate", roles: ["React JS Developer", "Frontend Developer", "MERN Stack Developer", "Full Stack Developer"], badge: "HOT", icon: Atom, tone: "from-rose-500 to-pink-600", duration: "6 Weeks", rating: "4.9", reviews: "3.1K" },
  { title: "Redux Toolkit State Management", level: "Advanced", roles: ["React JS Developer", "MERN Stack Developer"], badge: "ADVANCED", icon: RefreshCcw, tone: "from-violet-500 to-purple-600", duration: "2 Weeks", rating: "4.7", reviews: "1.1K" },
  { title: "Tailwind CSS Masterclass", level: "Beginner", roles: ["React JS Developer", "Frontend Developer", "MERN Stack Developer", "Full Stack Developer"], badge: "IN-DEMAND", icon: Wind, tone: "from-cyan-400 to-sky-500", duration: "2 Weeks", rating: "4.8", reviews: "1.6K" },
  { title: "Node.js & Express Bootcamp", level: "Intermediate", roles: ["MERN Stack Developer", "Full Stack Developer"], badge: "HOT", icon: Server, tone: "from-emerald-500 to-green-600", duration: "4 Weeks", rating: "4.7", reviews: "980" },
  { title: "Python for Developers", level: "Beginner", roles: ["Python Developer", "AI Engineer", "Data Scientist"], badge: "BEGINNER", icon: Terminal, tone: "from-yellow-400 to-amber-500", duration: "3 Weeks", rating: "4.8", reviews: "2.0K" },
  { title: "Django & Flask APIs", level: "Intermediate", roles: ["Python Developer"], badge: "POPULAR", icon: Layers, tone: "from-teal-500 to-emerald-600", duration: "4 Weeks", rating: "4.6", reviews: "650" },
  { title: "Java + Spring Boot", level: "Intermediate", roles: ["Java Developer"], badge: "IN-DEMAND", icon: Coffee, tone: "from-orange-500 to-red-600", duration: "6 Weeks", rating: "4.7", reviews: "890" },
  { title: "Machine Learning Foundations", level: "Advanced", roles: ["AI Engineer", "Data Scientist"], badge: "ADVANCED", icon: Brain, tone: "from-fuchsia-500 to-purple-600", duration: "6 Weeks", rating: "4.8", reviews: "1.3K" },
  { title: "Cloud & DevOps with AWS", level: "Intermediate", roles: ["Cloud Engineer"], badge: "HOT", icon: Cloud, tone: "from-sky-400 to-indigo-500", duration: "4 Weeks", rating: "4.6", reviews: "720" },
  { title: "Data Analysis with SQL & Python", level: "Beginner", roles: ["Data Scientist", "Python Developer"], badge: "BEGINNER", icon: LineChart, tone: "from-teal-500 to-cyan-600", duration: "3 Weeks", rating: "4.7", reviews: "1.0K" },
];

const DIFFICULTY_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 };
const LEARNING_BONUS = { Live: 6, Hybrid: 3, Recorded: 0 };
const TIMELINE_WEEKS = { "3 Months": 12, "6 Months": 24, "9 Months": 36, "12 Months": 48 };

const AVATAR_TONES = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-cyan-500",
  "from-rose-500 to-pink-500",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function initials(label) {
  return label
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function toneFor(label) {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

function buildRoadmap({ currentRole, targetRole, experience, timeline, learningMode }) {
  const skillKeys = TARGET_ROLE_PATHS[targetRole] ?? [];
  const steps = skillKeys.map((key, index) => ({
    id: `${targetRole}-${key}-${index}`,
    label: key,
    weeks: SKILL_LIBRARY[key]?.weeks ?? 2,
    icon: SKILL_LIBRARY[key]?.icon ?? Sparkles,
  }));
  const totalWeeks = steps.reduce((sum, step) => sum + step.weeks, 0);
  const months = Math.max(1, Math.round(totalWeeks / 4));
  const skillsCount = skillKeys.filter((key) => key !== "Projects" && key !== "Placement Prep").length;
  const projectsCount = Math.max(3, Math.round(steps.length / 2));
  const targetWeeks = TIMELINE_WEEKS[timeline] ?? 24;
  const paceBonus = targetWeeks >= totalWeeks ? 10 : -6;
  const rawScore = 58 + experience * 3 + paceBonus + (LEARNING_BONUS[learningMode] ?? 0);
  const readinessScore = Math.round(Math.max(45, Math.min(98, rawScore)));

  return {
    currentRole,
    targetRole,
    steps,
    totalWeeks,
    months,
    skillsCount,
    projectsCount,
    certificatesCount: 2,
    salary: SALARY_BY_ROLE[targetRole] ?? "\u20b96 \u2013 16 LPA",
    readinessScore,
  };
}

function getRecommendedCourses(targetRole, experience) {
  const tier = experience <= 1 ? 1 : experience <= 4 ? 2 : 3;
  return COURSE_LIBRARY.filter((course) => course.roles.includes(targetRole))
    .map((course) => ({ course, gap: Math.abs(DIFFICULTY_RANK[course.level] - tier) }))
    .sort((a, b) => a.gap - b.gap)
    .slice(0, 5)
    .map((entry) => entry.course);
}

/* ------------------------------------------------------------------ */
/*  Motion variants                                                     */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ------------------------------------------------------------------ */
/*  react-select theming                                               */
/* ------------------------------------------------------------------ */

const selectClassNames = {
  control: (state) =>
    `flex min-h-[42px] items-center rounded-2xl border bg-white px-3 text-sm transition-colors dark:bg-white/[0.03] ${
      state.isFocused ? "border-primary-500 ring-2 ring-primary-500/20" : "border-ink-900/10 dark:border-white/10"
    }`,
  placeholder: () => "text-ink-900/35 dark:text-white/30 text-sm",
  singleValue: () => "text-ink-900 dark:text-white text-sm font-semibold",
  input: () => "text-ink-900 dark:text-white text-sm",
  valueContainer: () => "gap-1 py-1",
  indicatorsContainer: () => "gap-1",
  dropdownIndicator: () => "text-ink-900/40 dark:text-white/40",
  indicatorSeparator: () => "hidden",
  clearIndicator: () => "text-ink-900/30 hover:text-ink-900/60 dark:text-white/30",
  menu: () => "mt-2 overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card-lg dark:border-white/10 dark:bg-ink-900",
  menuList: () => "max-h-64 overflow-y-auto py-1",
  option: (state) =>
    `cursor-pointer px-3 py-2 text-sm ${state.isFocused ? "bg-primary-50 dark:bg-white/10" : ""} ${
      state.isSelected ? "font-bold text-primary-600 dark:text-primary-300" : "text-ink-900/80 dark:text-white/70"
    }`,
  noOptionsMessage: () => "px-3 py-4 text-center text-sm text-ink-900/40 dark:text-white/40",
};

function formatCompanyOption(option) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${toneFor(
          option.label,
        )} text-[9px] font-bold text-white`}
      >
        {initials(option.label)}
      </span>
      {option.label}
    </span>
  );
}

function formatRoleOption(option) {
  const meta = ROLE_META[option.value];
  const Icon = meta?.icon ?? Sparkles;
  return (
    <span className="flex items-center gap-2">
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${
          meta?.tone ?? "from-primary-500 to-secondary-500"
        } text-white`}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
      </span>
      {option.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink-900/60 dark:text-white/45">
        {label}
      </label>
      {children}
    </div>
  );
}

function NativeSelect({ id, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-ink-900/10 bg-white px-3.5 py-2.5 pr-9 text-sm font-semibold text-ink-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/40 dark:text-white/40"
        aria-hidden="true"
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.06] bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <Icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
      <p className="mt-2 text-lg font-extrabold leading-tight text-ink-900 dark:text-white">{value}</p>
      <p className="text-[11px] font-semibold text-ink-900/45 dark:text-white/40">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CareerRoadmapGenerator() {
  const reduceMotion = useReducedMotion();
  const roadmapRef = useRef(null);

  const [currentRole, setCurrentRole] = useState(roadmapConfig.currentRoles[0]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [experience, setExperience] = useState(0);
  const [targetRole, setTargetRole] = useState(roadmapConfig.targetRoles[0]);
  const [targetCompany, setTargetCompany] = useState("Google");
  const [timeAvailable, setTimeAvailable] = useState(roadmapConfig.studyHours[1]);
  const [learningMode, setLearningMode] = useState(roadmapConfig.learningModes[0]);
  const [timeline, setTimeline] = useState(roadmapConfig.timelines[1]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const companyOptions = useMemo(
    () => roadmapConfig.companies.map((company) => ({ value: company, label: company })),
    [],
  );
  const targetRoleOptions = useMemo(
    () => roadmapConfig.targetRoles.map((role) => ({ value: role, label: role })),
    [],
  );

  const recommendedCourses = useMemo(() => {
    if (!roadmap) return [];
    return getRecommendedCourses(roadmap.targetRole, experience);
  }, [roadmap, experience]);

  const canGenerate = Boolean(currentRole && targetRole) && !isGenerating;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    window.setTimeout(() => {
      setRoadmap(buildRoadmap({ currentRole, targetRole, experience, timeline, learningMode }));
      setIsGenerating(false);
    }, 900);
  };

  useEffect(() => {
    if (!roadmap || !roadmapRef.current) return undefined;
    const timeoutId = window.setTimeout(() => {
      roadmapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(timeoutId);
  }, [roadmap]);

  return (
    <section id="career-roadmap" className="relative overflow-hidden bg-white py-20 dark:bg-ink-950 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="flex items-center justify-center gap-2 font-display text-2xl font-extrabold text-ink-900 dark:text-white sm:text-3xl">
            <Sparkles className="h-6 w-6 text-primary-500" aria-hidden="true" />
            Build Your Career Roadmap
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-900/55 dark:text-white/50 sm:text-base">
            Tell us your goal and we&apos;ll create a personalized learning path for you.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 max-w-6xl rounded-3xl border border-ink-900/[0.06] bg-white p-6 shadow-card-lg dark:border-white/10 dark:bg-white/[0.02] sm:p-8"
        >
          {/* Row A: current + target */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-4">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900/40 dark:text-white/35">
                Where You Are
              </p>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Current Role" htmlFor="current-role">
                  <NativeSelect
                    id="current-role"
                    value={currentRole}
                    onChange={setCurrentRole}
                    options={roadmapConfig.currentRoles}
                  />
                </Field>
                <Field label="Current Company (Optional)" htmlFor="current-company">
                  <Select
                    inputId="current-company"
                    instanceId="current-company"
                    unstyled
                    isClearable
                    classNames={selectClassNames}
                    options={companyOptions}
                    formatOptionLabel={formatCompanyOption}
                    placeholder="Not Working / Student"
                    value={currentCompany ? { value: currentCompany, label: currentCompany } : null}
                    onChange={(option) => setCurrentCompany(option ? option.value : null)}
                  />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-center lg:pt-6">
              <motion.div
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg"
                aria-hidden="true"
              >
                <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
              </motion.div>
            </div>

            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900/40 dark:text-white/35">
                Where You Want To Go
              </p>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Target Role" htmlFor="target-role">
                  <Select
                    inputId="target-role"
                    instanceId="target-role"
                    unstyled
                    classNames={selectClassNames}
                    options={targetRoleOptions}
                    formatOptionLabel={formatRoleOption}
                    placeholder="Search role..."
                    value={targetRole ? { value: targetRole, label: targetRole } : null}
                    onChange={(option) => setTargetRole(option ? option.value : null)}
                  />
                </Field>
                <Field label="Target Company (Optional)" htmlFor="target-company">
                  <Select
                    inputId="target-company"
                    instanceId="target-company"
                    unstyled
                    isClearable
                    classNames={selectClassNames}
                    options={companyOptions}
                    formatOptionLabel={formatCompanyOption}
                    placeholder="Search company..."
                    value={targetCompany ? { value: targetCompany, label: targetCompany } : null}
                    onChange={(option) => setTargetCompany(option ? option.value : null)}
                  />
                </Field>
              </div>
            </div>
          </div>

          <div className="my-7 h-px bg-ink-900/[0.06] dark:bg-white/10" />

          {/* Row B: experience + extras */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="experience" className="text-xs font-semibold text-ink-900/60 dark:text-white/45">
                  Work Experience
                </label>
                <span className="rounded-pill bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                  {experience >= 10 ? "10+ Years" : `${experience} ${experience === 1 ? "Year" : "Years"}`}
                </span>
              </div>
              <input
                id="experience"
                type="range"
                min={0}
                max={10}
                step={1}
                value={experience}
                onChange={(event) => setExperience(Number(event.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-900/10 accent-primary-500 dark:bg-white/10"
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-ink-900/35 dark:text-white/30">
                <span>0 Years</span>
                <span>10+ Years</span>
              </div>
            </div>

            <Field label="Time Available Per Day" htmlFor="time-available">
              <NativeSelect
                id="time-available"
                value={timeAvailable}
                onChange={setTimeAvailable}
                options={roadmapConfig.studyHours}
              />
            </Field>

            <Field label="Learning Preference" htmlFor="learning-mode">
              <NativeSelect
                id="learning-mode"
                value={learningMode}
                onChange={setLearningMode}
                options={roadmapConfig.learningModes}
              />
            </Field>

            <Field label="Target Timeline" htmlFor="timeline">
              <NativeSelect id="timeline" value={timeline} onChange={setTimeline} options={roadmapConfig.timelines} />
            </Field>
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            whileHover={canGenerate ? { scale: 1.01 } : undefined}
            whileTap={canGenerate ? { scale: 0.98 } : undefined}
            className="group relative mt-8 flex w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4 text-sm font-bold text-white shadow-lg transition-shadow hover:shadow-[0_0_40px_-8px_rgba(37,99,235,0.55)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Generating your roadmap...
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5" aria-hidden="true" />
                Generate My Roadmap
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </motion.button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-ink-900/40 dark:text-white/35">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            Trusted by 100K+ learners to build successful careers
          </p>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {roadmap && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto mt-8 max-w-6xl"
            >
              {/* Roadmap card */}
              <div
                ref={roadmapRef}
                className="scroll-mt-24 rounded-3xl border border-ink-900/[0.06] bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/[0.02] sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900 dark:text-white sm:text-xl">
                      <Milestone className="h-5 w-5 text-primary-500" aria-hidden="true" />
                      Your Career Roadmap
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-ink-900/45 dark:text-white/40">
                      {roadmap.currentRole} <ArrowRight className="inline h-3 w-3" aria-hidden="true" /> {roadmap.targetRole}
                    </p>
                  </div>
                  <span className="rounded-pill bg-primary-50 px-4 py-1.5 text-xs font-bold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                    Estimated Duration: {roadmap.months} {roadmap.months === 1 ? "Month" : "Months"}
                  </span>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex items-start gap-0 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-ink-900/10 [&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-thumb]:bg-white/10"
                >
                  {roadmap.steps.map((step, index) => (
                    <Fragment key={step.id}>
                      {index > 0 && (
                        <div
                          className="mt-7 h-0.5 w-6 flex-shrink-0 border-t-2 border-dashed border-ink-900/15 dark:border-white/15 sm:w-8 md:w-10"
                          aria-hidden="true"
                        />
                      )}
                      <motion.div variants={fadeInUp} className="flex w-24 flex-shrink-0 flex-col items-center text-center sm:w-28">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-card">
                          <step.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="mt-2 text-xs font-bold leading-tight text-ink-900 dark:text-white">{step.label}</p>
                        <p className="text-[11px] font-semibold text-ink-900/45 dark:text-white/40">
                          {step.weeks} {step.weeks === 1 ? "Week" : "Weeks"}
                        </p>
                      </motion.div>
                    </Fragment>
                  ))}
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 grid grid-cols-2 gap-3 border-t border-ink-900/[0.06] pt-6 dark:border-white/10 sm:grid-cols-3 lg:grid-cols-6"
                >
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={Clock} label="Estimated Duration" value={`${roadmap.months} ${roadmap.months === 1 ? "Month" : "Months"}`} />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={Sparkles} label="Skills You'll Gain" value={`${roadmap.skillsCount}+`} />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={FolderGit2} label="Projects" value={roadmap.projectsCount} />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={Award} label="Certificates" value={roadmap.certificatesCount} />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={Briefcase} label="Expected Salary" value={roadmap.salary} />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <StatCard icon={BadgeCheck} label="Job Readiness Score" value={`${roadmap.readinessScore}%`} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Recommended courses */}
              {recommendedCourses.length > 0 && (
                <div className="mt-6 rounded-3xl border border-ink-900/[0.06] bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/[0.02] sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900 dark:text-white sm:text-xl">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        Recommended Courses For You
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-ink-900/45 dark:text-white/40">
                        Handpicked courses to help you follow the roadmap
                      </p>
                    </div>
                    <a
                      href="#courses"
                      className="text-xs font-bold text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-300"
                    >
                      View All Courses
                    </a>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
                  >
                    {recommendedCourses.map((course) => (
                      <motion.div
                        key={course.title}
                        variants={fadeInUp}
                        className="overflow-hidden rounded-2xl border border-ink-900/[0.06] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg dark:border-white/10 dark:bg-ink-900/60"
                      >
                        <div className="relative flex h-28 items-center justify-center bg-ink-950">
                          <span
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${course.tone} shadow-lg`}
                          >
                            <course.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                          <span
                            className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                              BADGE_STYLES[course.badge] ?? "bg-primary-500"
                            }`}
                          >
                            {course.badge}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="line-clamp-2 text-sm font-bold leading-snug text-ink-900 dark:text-white">
                            {course.title}
                          </h4>
                          <div className="mt-2 flex items-center gap-3 text-[11px] font-semibold text-ink-900/50 dark:text-white/40">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                              {course.rating} ({course.reviews})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}