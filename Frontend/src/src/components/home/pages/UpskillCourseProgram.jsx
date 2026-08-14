import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, PlayCircle, TrendingUp, Radio,
  Star, Plus, BarChart3, Code2, Languages, Megaphone, DollarSign, Palette,
  PiggyBank, Users, Video, Gamepad2, Clock, BookOpen, ShieldCheck,
  Briefcase, Rocket, CheckCircle2, MessageCircle, ChevronDown, ChevronUp,
  Coins, Award
} from 'lucide-react';
import Navbar from '@shared/components/navbar';
import Footer from '@shared/components/Footer';
import CareerRoadmapGenerator from '../components/Careerroadmapgenerator';
import RegisterModal from '../../../shared/components/RegisterModal';
import { useThemeContext } from '@shared/context/ThemeContext';

// ─── Import real course data ──────────────────────────────────────────────
import { featuredCourses } from "../data/homeData";

// ---------------------------------------------------------------
// Reveal-on-scroll helpers
// ---------------------------------------------------------------
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------
function Hero({ onOpenModal }) {
  const [cardRef, cardVisible] = useReveal(0.15);

  return (
    <section className="relative bg-gradient-to-br from-[#9ac7ff] via-[#b6e6fa] to-[#c7f5ee] pb-28 pt-12 dark:bg-app-dark-gradient sm:pb-36 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 dark:opacity-20">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-white/70 blur-[100px] dark:bg-primary-500/20" />
        <div className="absolute right-10 top-44 h-80 w-80 rounded-full bg-indigo-300/40 blur-[90px] dark:bg-secondary-500/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span className="usk-mono text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300">
              Limited Seats Available
            </span>
          </Reveal>

          <Reveal
            delay={100}
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            Learn skills that{' '}
            <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-700 bg-clip-text text-transparent dark:from-indigo-400 dark:via-indigo-300 dark:to-teal-300">
              actually compound.
            </span>
          </Reveal>

          <Reveal delay={200} className="mt-6 max-w-lg text-base leading-relaxed text-slate-700 dark:text-slate-400 sm:text-lg">
            Structured tracks, live expert sessions, and guaranteed internship placement — designed to help you build real-world capabilities and land your first role.
          </Reveal>

          <Reveal delay={300} className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenModal(null)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            >
              Apply for New Batch
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-900 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <PlayCircle size={16} className="text-indigo-600 dark:text-indigo-400" />
              Browse Courses
            </a>
          </Reveal>

          {/* FIX: Added gap-y-4 for proper vertical spacing on mobile, ensured dividers are visible */}
          <Reveal
            delay={400}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/50 pt-6 text-sm text-slate-700 dark:border-white/10"
          >
            <div className="min-w-0">
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base block">
                Corporate Level Training
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Industry‑relevant curriculum
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-300/60 dark:bg-white/10 shrink-0" />

            <div className="min-w-0">
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base block">
                Guaranteed Internship
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real‑world experience
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-300/60 dark:bg-white/10 shrink-0" />

            <div className="min-w-0">
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base block">
                100% Placement Assistance
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Dedicated career support
              </p>
            </div>
          </Reveal>
        </div>

        <div ref={cardRef} className="lg:col-span-5 relative pt-4 sm:pt-2">
          <div
            className={`relative rounded-[2.5rem] border border-white/90 bg-white/40 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-700 dark:border-white/10 dark:bg-white/5 sm:p-4 ${
              cardVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner bg-slate-100">
              <img
                src="https://i.pinimg.com/736x/7e/66/52/7e6652b5db5df7abd15a0438093627d2.jpg"
                alt="Student learning on laptop"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 usk-mono text-[11px] font-bold text-white backdrop-blur-md border border-white/30 mb-2">
                  <Radio size={12} className="text-emerald-400 animate-pulse" /> LIVE COHORT SESSION
                </span>
                <h3 className="usk-display text-lg font-bold tracking-tight text-white">
                  Real Skills, Real Projects
                </h3>
              </div>
            </div>
          </div>

          {/* Floating card – brand colour */}
          <div
            className={`usk-float absolute -left-4 -top-3 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-105 dark:border-white/10 dark:bg-ink-900/90 sm:-left-6 sm:-top-5 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-sm border border-brand/20 dark:border-brand/30 dark:bg-brand/20 dark:text-brand-light">
              <TrendingUp size={18} />
            </span>
            <div>
              <p className="usk-display text-sm font-bold text-slate-900 dark:text-white">100%</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Placement assistance</p>
            </div>
          </div>

          <div
            className={`usk-float-slow absolute -right-3 -bottom-5 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-105 dark:border-white/10 dark:bg-ink-900/90 sm:-bottom-7 sm:-right-6 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <Radio size={18} className="text-indigo-600 dark:text-indigo-300" />
            </span>
            <div>
              <p className="usk-display text-sm font-bold text-slate-900 dark:text-white">Live</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Expert-led cohorts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Who This Is For
// ---------------------------------------------------------------
const AUDIENCES = [
  {
    icon: BookOpen,
    title: 'Students & Freshers',
    desc: 'No experience? Perfect starting point. Build portfolio projects and land your first role with our guaranteed internship placement.',
    tint: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    border: 'hover:border-indigo-200 dark:hover:border-indigo-500/30',
  },
  {
    icon: Briefcase,
    title: 'Career Switchers',
    desc: 'Transitioning from another field? Our structured tracks get you job-ready in your new domain within months, not years.',
    tint: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400',
    border: 'hover:border-teal-200 dark:hover:border-teal-500/30',
  },
  {
    icon: TrendingUp,
    title: 'Working Professionals',
    desc: 'Upskill on the side with live weekend sessions and self-paced content that fits around your current job.',
    tint: 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light',
    border: 'hover:border-brand/30 dark:hover:border-brand/30',
  },
];

function WhoThisIsFor() {
  return (
    // FIX: Consistent vertical padding matching other sections
    <section className="bg-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
            Who this is for
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Built for your next move
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Whether you're starting fresh or levelling up, there's a path here for you.
          </p>
        </Reveal>

        {/* FIX: gap-6 for better card breathing room */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 80}
              className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] ${a.border}`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tint}`}>
                <a.icon size={20} />
              </span>
              {/* FIX: mt-4 consistent heading spacing */}
              <h3 className="mt-4 usk-display text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Categories
// ---------------------------------------------------------------
const CATEGORIES = [
  { icon: BarChart3, label: 'Business', count: '12 courses', tint: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  { icon: Code2, label: 'Development', count: '18 courses', tint: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  { icon: Languages, label: 'Language', count: '8 courses', tint: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  { icon: Megaphone, label: 'Marketing', count: '10 courses', tint: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' },
  { icon: DollarSign, label: 'Finance', count: '9 courses', tint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { icon: Palette, label: 'Design', count: '14 courses', tint: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400' },
];

function CategoriesSection() {
  return (
    <section id="categories" className="bg-slate-50/50 py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
              Browse by category
            </p>
            <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
              Explore Categories
            </h2>
          </div>
          <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
            Six paths, one platform — every track built by working practitioners.
          </p>
        </Reveal>

        {/* FIX: gap-5 for consistent card grid spacing */}
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Reveal
              as="a"
              href="#courses"
              key={c.label}
              delay={i * 50}
              className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-500/30"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${c.tint}`}>
                <c.icon size={18} />
              </span>
              <p className="mt-3 usk-display text-xs font-semibold text-slate-900 dark:text-white">{c.label}</p>
              <p className="mt-0.5 usk-mono text-[11px] text-slate-400 dark:text-slate-500">{c.count}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Featured Courses
// ---------------------------------------------------------------
const BADGE_COLOR_MAP = {
  Hot: 'bg-brand',
  New: 'bg-indigo-600',
  Popular: 'bg-indigo-600',
  'In Demand': 'bg-emerald-500',
  Trending: 'bg-brand',
};
const DEFAULT_BADGE_COLOR = 'bg-slate-600';

function CourseCard({ title, lessons, duration, rating, reviews, badge, badgeClass, image, index, onOpenModal }) {
  return (
    <Reveal
      delay={index * 80}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-blue-200" />
        )}
        {badge && (
          <span className={`absolute left-2.5 top-2.5 rounded-full ${badgeClass} px-2.5 py-0.5 usk-mono text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm`}>
            {badge}
          </span>
        )}
      </div>

      {/* FIX: consistent p-5 padding on card body */}
      <div className="p-5">
        <div className="flex items-center gap-1 text-xs">
          {/* FIX: star color uses theme-aware brand variable */}
          <Star size={12} className="fill-current text-amber-400" />
          <span className="font-semibold text-slate-900 dark:text-white">{rating}</span>
          {/* FIX: hide "N/A reviews" — show dash when not available */}
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">
            {reviews && reviews !== 'N/A' ? `(${reviews} reviews)` : ''}
          </span>
        </div>
        <h3 className="mt-2 usk-display text-sm font-semibold leading-snug text-slate-900 dark:text-white">{title}</h3>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <BookOpen size={13} className="text-indigo-600 dark:text-indigo-400" />
            {lessons}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-teal-600 dark:text-teal-400" />
            {duration}
          </span>
        </div>
      </div>

      {/* FIX: px-5 pb-5 for consistent bottom padding */}
      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={() => onOpenModal({ title, lessons, duration })}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-4 py-2.5 text-xs font-semibold text-white transition-transform duration-300 hover:brightness-110 hover:scale-[1.02]"
        >
          Enroll Now
          <Plus size={13} />
        </button>
      </div>
    </Reveal>
  );
}
// ─── Course image map by title keyword ───────────────────────────────────────
const COURSE_IMAGE_MAP = [
  { key: "python",    url: "https://i.pinimg.com/736x/f9/0a/cb/f90acb224dfbb653ad778cee91217b78.jpg" },
  { key: "react",     url: "https://i.pinimg.com/1200x/9f/4f/cf/9f4fcf5aa7766a03f042b1e15489b39f.jpg" },
  { key: "node",      url: "https://i.pinimg.com/1200x/9f/4f/cf/9f4fcf5aa7766a03f042b1e15489b39f.jpg" },
  { key: "laravel",   url: "https://i.pinimg.com/1200x/9f/4f/cf/9f4fcf5aa7766a03f042b1e15489b39f.jpg" },
  { key: "web dev",   url: "https://i.pinimg.com/1200x/9f/4f/cf/9f4fcf5aa7766a03f042b1e15489b39f.jpg" },
  { key: "cloud",     url: "https://i.pinimg.com/736x/6d/3b/2d/6d3b2d761f653056f9866cc1fa518f6e.jpg" },
  { key: "aws",       url: "https://i.pinimg.com/736x/6d/3b/2d/6d3b2d761f653056f9866cc1fa518f6e.jpg" },
  { key: "cyber",     url: "https://i.pinimg.com/1200x/e6/ec/86/e6ec86d140147e8dc72514dbd2af546f.jpg" },
  { key: "security",  url: "https://i.pinimg.com/1200x/e6/ec/86/e6ec86d140147e8dc72514dbd2af546f.jpg" },
];
function getCourseImage(title = "") {
  const t = title.toLowerCase();
  const match = COURSE_IMAGE_MAP.find((m) => t.includes(m.key));
  return match ? match.url : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400";
}


function FeaturedCourses({ onOpenModal }) {
  const displayedCourses = featuredCourses.slice(0, 4);

  return (
    <section id="courses" className="bg-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
              Handpicked for you
            </p>
            <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
              Featured Courses
            </h2>
          </div>
        </Reveal>

        {/* FIX: gap-6 for more breathing room between course cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedCourses.map((course, i) => (
            <CourseCard
              key={course.slug}
              title={course.title}
              lessons={course.sessions}
              duration={course.duration}
              rating={4.8}
              reviews={null}
              badge={course.badge}
              badgeClass={BADGE_COLOR_MAP[course.badge] || DEFAULT_BADGE_COLOR}
              image={getCourseImage(course.title)}
              index={i}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Internship Section
// ---------------------------------------------------------------
function InternshipSection({ onOpenModal }) {
  const { isDark } = useThemeContext();

  return (
    <section
      className={`relative py-20 sm:py-24 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-indigo-600 to-teal-600'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${
          isDark ? 'opacity-10' : 'opacity-20'
        }`}
      >
        <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-white blur-[80px]" />
        <div
          className={`absolute bottom-0 left-10 h-64 w-64 rounded-full blur-[70px] ${
            isDark ? 'bg-primary-500' : 'bg-teal-300'
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest border ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/80'
                  : 'border-white/20 bg-white/15 text-white'
              }`}
            >
              <ShieldCheck size={13} /> Our Core Promise
            </span>
            <h2
              className={`mt-4 font-display text-3xl font-bold sm:text-4xl leading-tight ${
                isDark ? 'text-white' : 'text-white'
              }`}
            >
              Every learner gets a real internship. Guaranteed.
            </h2>
            <p
              className={`mt-4 text-sm leading-relaxed max-w-md ${
                isDark ? 'text-slate-300' : 'text-white/80'
              }`}
            >
              We don't just hand you a certificate. Before you graduate, we place you in a paid internship with one of our hiring partners — hands-on experience that shows on your resume.
            </p>
            <button
              type="button"
              onClick={() => onOpenModal(null)}
              className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark
                  ? 'bg-brand text-white hover:bg-brand/90'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              Claim Your Seat
              <ArrowRight size={15} />
            </button>
          </Reveal>

          {/* FIX: gap-4 consistent card spacing */}
          <Reveal delay={150} className="grid grid-cols-1 gap-4">
            {[
              {
                icon: Award,
                title: 'Corporate Level Training',
                desc: 'Get guaranteed internship and 100% placement assistance with our industry-aligned training programs.'
              },
              {
                icon: Briefcase,
                title: 'Real companies, real work',
                desc: 'Partner companies give you actual projects, not busy work.'
              },
              {
                icon: Rocket,
                title: 'Starts before you graduate',
                desc: 'Begin your internship while still completing your track.'
              },
              {
                icon: Users,
                title: 'Dedicated placement team',
                desc: 'Our placement team prepares your resume, mock interviews, and referrals.'
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 rounded-2xl border p-4 backdrop-blur-sm ${
                  isDark
                    ? 'border-white/10 bg-white/5'
                    : 'border-white/20 bg-white/10'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? 'bg-white/10 text-white' : 'bg-white/20 text-white'
                  }`}
                >
                  <item.icon size={17} />
                </span>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-white'}`}>
                    {item.title}
                  </p>
                  <p className={`mt-0.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-white/70'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Why Choose Us
// ---------------------------------------------------------------
const FEATURES = [
  {
    icon: Coins,
    title: 'Affordable Pricing',
    desc: "Quality education shouldn't break the bank. Flexible plans for everyone.",
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    desc: 'Learn directly from industry leaders with real-world experience.',
  },
  {
    icon: Video,
    title: 'Live Classes',
    desc: 'Interactive sessions with instructors in real-time to clear your doubts instantly.',
  },
  {
    icon: Gamepad2,
    title: 'Fun & Interactive',
    desc: 'Gamified learning paths keep you motivated and engaged every step.',
  },
];

function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative bg-gradient-to-br from-[#D2F9F3]/40 via-[#BCEBFA]/30 to-slate-50 py-20 dark:bg-app-dark-gradient sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest font-semibold text-brand dark:text-brand-light">
            Why choose Kini Edx Hub
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            More than a course library
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We make learning joyful, accessible, and effective — with a platform built around actually finishing what you start.
          </p>
        </Reveal>

        {/* FIX: gap-6 for better card spacing; icon tint corrected to use brand color */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              {/* FIX: Icon background uses brand color consistently in both light and dark */}
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 usk-display text-sm font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Instructor Section
// ---------------------------------------------------------------
const INSTRUCTORS = [
  {
    name: 'Srinivas',
    role: 'Lead Mentor',
    bio: '10+ years in product and tech. Previously at major startups. Teaches practical skills, not theory.',
    initials: 'SS',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
  },
  {
    name: 'Sneha Reddy',
    role: 'Design & UX Lead',
    bio: 'Ex-senior designer with work at top product companies. Mentors students on building real portfolios.',
    initials: 'SR',
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300',
  },
  {
    name: 'Poorna Sai',
    role: 'Full-Stack Engineering',
    bio: 'Built and shipped products used by thousands. Passionate about teaching clean, production-ready code.',
    initials: 'PS',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  },
];

function InstructorsSection() {
  return (
    <section className="bg-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
            Your mentors
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Learn from people who've done it
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Not just educators — practitioners who are active in their fields right now.
          </p>
        </Reveal>

        {/* FIX: gap-6 for consistent card spacing */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {INSTRUCTORS.map((ins, i) => (
            <Reveal
              key={ins.name}
              delay={i * 80}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl usk-mono text-lg font-bold ${ins.color}`}>
                {ins.initials}
              </span>
              <h3 className="mt-4 usk-display text-sm font-semibold text-slate-900 dark:text-white">{ins.name}</h3>
              <p className="usk-mono text-[11px] text-indigo-600 dark:text-indigo-400 mt-1">{ins.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{ins.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------
const QUOTES = [
  {
    name: 'Priya',
    role: 'UX Designer — Batch 1 preview student',
    text: 'The mentor feedback loop is what made it stick. I shipped a real portfolio piece in week 3, not week 12.',
    initials: 'PN',
  },
  {
    name: 'Lahari Lakshmi',
    role: 'Full-Stack Developer — Beta cohort',
    text: 'I compared four platforms before this one. This was the only one that felt built for finishing, not just starting.',
    initials: 'LL',
  },
  {
    name: 'M. Narayana',
    role: 'Marketing Lead — Early access',
    text: 'The live sessions mean you actually stay on track. I finished the whole track in 6 weeks.',
    initials: 'MN',
  },
];

function Testimonials() {
  return (
    <section id="reviews" className="bg-slate-50/50 py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
            From early learners
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Learners who finished, not just started
          </h2>
        </Reveal>

        {/* FIX: gap-6 for consistent spacing */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 80}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
            >
              {/* FIX: Stars now render as amber/yellow, matching brand star in CourseCard */}
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} className="fill-current" />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">"{q.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 usk-mono text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 shrink-0">
                  {q.initials}
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{q.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{q.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------
const FAQS = [
  {
    q: 'Is this suitable for complete beginners?',
    a: 'Absolutely. Our tracks start from the ground up. No prior experience needed — just a willingness to put in the work.',
  },
  {
    q: 'Are classes live or pre-recorded?',
    a: 'Both. You get live weekly sessions with your mentor, plus recorded modules you can revisit anytime at your own pace.',
  },
  {
    q: 'How does the guaranteed internship work?',
    a: 'Once you complete 80% of your track, our placement team connects you with hiring partners. We help you apply, prep for interviews, and land a paid internship — before you graduate.',
  },
  {
    q: 'Can I study while working full-time?',
    a: 'Yes. Live sessions are scheduled on weekends, and all content is available on-demand. Most working students invest 8–10 hours per week.',
  },
  {
    q: 'What if I fall behind?',
    a: "No worries. You keep lifetime access to all content and can join the next cohort's live sessions for free if you need more time.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
            Questions
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Frequently asked
          </h2>
        </Reveal>

        {/* FIX: Reveal only wraps the question button, not the whole item + answer, preventing phantom height */}
        <div className="mt-10 divide-y divide-slate-200/80 dark:divide-white/10">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <Reveal delay={i * 50}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                  {open === i
                    ? <ChevronUp size={16} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                    : <ChevronDown size={16} className="shrink-0 text-slate-400 dark:text-slate-500" />
                  }
                </button>
              </Reveal>
              {open === i && (
                <p className="pb-5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------
function FinalCTA({ onOpenModal }) {
  return (
    <section className="relative bg-gradient-to-t from-[#BCEBFA]/30 to-white py-20 dark:bg-app-dark-gradient sm:py-24">
      {/* FIX: section is always full-height; only inner content elements reveal individually */}
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 usk-mono text-[11px] font-semibold text-brand dark:bg-brand/20 dark:border-brand/30 dark:text-brand-light">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            New Batch starts soon — seats are limited
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Your next skill is{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-teal-700 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-300">
              one course away.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Join our founding batch and build something real from day one. Guaranteed internship placement included.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenModal(null)}
              className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-6 py-3 text-xs font-semibold text-white shadow-lg transition-transform duration-300 hover:brightness-110 hover:scale-105"
            >
              Apply for New Batch
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-900 transition-colors duration-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Browse Courses
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            Have questions?{' '}
            <a
              href="https://wa.me/919000198239" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <MessageCircle size={13} />
              Chat with us on WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------
export default function UpskillCourseProgram() {
  const [modalCourse, setModalCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (course) => {
    setModalCourse(course);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalCourse(null);
  };

  return (
    <div className="usk-body bg-white text-slate-900 dark:bg-ink-950 dark:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .usk-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .usk-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .usk-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        /* ─── Brand colour variables ─── */
        :root {
          --color-brand: #1683D8;
          --color-brand-light: #4DBB5A;
        }
        .dark {
          --color-brand: #4DBB5A;
          --color-brand-light: #1683D8;
        }
        .bg-brand { background-color: var(--color-brand); }
        .text-brand { color: var(--color-brand); }
        .border-brand { border-color: var(--color-brand); }
        .bg-brand\\/10 { background-color: color-mix(in srgb, var(--color-brand) 10%, transparent); }
        .bg-brand\\/20 { background-color: color-mix(in srgb, var(--color-brand) 20%, transparent); }
        .text-brand-light { color: var(--color-brand-light); }
        .dark\\:text-brand-light { color: var(--color-brand-light); }
        .dark\\:bg-brand\\/20 { background-color: color-mix(in srgb, var(--color-brand) 20%, transparent); }
        .dark\\:border-brand\\/30 { border-color: color-mix(in srgb, var(--color-brand) 30%, transparent); }

        /* FIX: Enroll Now button always full gradient, no half-blue/half-green split */
        .enroll-btn {
          background: linear-gradient(90deg, #1683D8 0%, #2FA9A8 50%, #4DBB5A 100%);
        }

        @keyframes usk-float-kf {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .usk-float { animation: usk-float-kf 6s ease-in-out infinite; }

        @keyframes usk-float-kf-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }
        .usk-float-slow { animation: usk-float-kf-slow 8s ease-in-out infinite 1s; }

        .sticky-nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        }
        .sticky-nav-wrapper nav {
          background: transparent !important;
        }
        .dark .sticky-nav-wrapper {
          background: rgba(15, 23, 42, 0.92);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .usk-float, .usk-float-slow { animation: none; }
          * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
        }
      `}</style>

      <div className="sticky-nav-wrapper">
        <Navbar />
      </div>

      <main className="overflow-x-hidden">
        <Hero onOpenModal={handleOpenModal} />
        <CareerRoadmapGenerator />
        <FeaturedCourses onOpenModal={handleOpenModal} />
        <InternshipSection onOpenModal={handleOpenModal} />
        <WhyChooseUs />
        <InstructorsSection />
        <Testimonials />
        <FAQ />
        <FinalCTA onOpenModal={handleOpenModal} />
      </main>
      <Footer />
      <RegisterModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        course={modalCourse}
      />
    </div>
  );
}