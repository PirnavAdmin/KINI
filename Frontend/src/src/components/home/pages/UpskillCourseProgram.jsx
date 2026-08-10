import { useEffect, useRef, useState } from 'react';
import {
  Menu, X, ArrowRight, PlayCircle, TrendingUp, CheckCircle2, Radio,
  Star, Plus, BarChart3, Code2, Languages, Megaphone, DollarSign, Palette,
  PiggyBank, Users, Video, Gamepad2, Clock, BookOpen, Sparkles, ShieldCheck,
  Briefcase
} from 'lucide-react';
import Navbar from '@shared/components/navbar';
import Footer from '@shared/components/Footer';
import { useEnrollment } from '@shared/context/ModalProvider';
import CareerRoadmapGenerator from '../components/Careerroadmapgenerator';
import { useThemeContext } from '@shared/context/ThemeContext';
// ---------------------------------------------------------------
// Reveal-on-scroll (replaces framer-motion's whileInView)
// ---------------------------------------------------------------
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
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
function Hero() {
  const [cardRef, cardVisible] = useReveal(0.15);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#9ac7ff] via-[#b6e6fa] to-[#c7f5ee] pb-28 pt-12 dark:bg-app-dark-gradient sm:pb-36 sm:pt-20">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 dark:opacity-20">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-white/70 blur-[100px] dark:bg-primary-500/20" />
        <div className="absolute right-10 top-44 h-80 w-80 rounded-full bg-indigo-300/40 blur-[90px] dark:bg-secondary-500/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12">
        {/* Left — copy (7 cols) */}
        <div className="lg:col-span-7">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="usk-mono text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300">
              100K+ active learners online
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
            Structured tracks, live expert sessions, and an execution-focused platform designed to help you build real-world capabilities by next week.
          </Reveal>

          <Reveal delay={300} className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            {/* PRIMARY BUTTON — gradient applied */}
            <a
              href="#start"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            >
              Start Learning Today
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-900 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <PlayCircle size={16} className="text-indigo-600 dark:text-indigo-400" />
              Browse Courses
            </a>
          </Reveal>

          <Reveal
            delay={400}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/50 pt-6 text-sm text-slate-700 dark:border-white/10"
          >
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">100K+</strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Enrolled Students</p>
            </div>
            <div className="h-8 w-px bg-slate-300/60 dark:bg-white/10" />
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">1,200+</strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expert Modules</p>
            </div>
            <div className="h-8 w-px bg-slate-300/60 dark:bg-white/10" />
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">4.8 / 5</strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Average Rating</p>
            </div>
          </Reveal>
        </div>

        {/* Right — Student Image Workspace Showcase (5 cols) */}
        <div ref={cardRef} className="lg:col-span-5 relative pt-4 sm:pt-2">
          <div
            className={`relative rounded-[2.5rem] border border-white/90 bg-white/40 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-700 dark:border-white/10 dark:bg-white/5 sm:p-4 ${
              cardVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Student Image Container */}
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                alt="Student learning on laptop"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {/* Overlay text on image */}
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

          {/* Floating badge — Success Rate (Top Left) */}
          <div
            className={`usk-float absolute -left-4 -top-3 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-105 dark:border-white/10 dark:bg-ink-900/90 sm:-left-6 sm:-top-5 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 shadow-sm border border-orange-100 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
              <TrendingUp size={18} />
            </span>
            <div>
              <p className="usk-display text-sm font-bold text-slate-900 dark:text-white">95%</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Career success rate</p>
            </div>
          </div>

          {/* Floating badge — Avg Rating (Bottom Right) */}
          <div
            className={`usk-float-slow absolute -right-3 -bottom-5 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-105 dark:border-white/10 dark:bg-ink-900/90 sm:-bottom-7 sm:-right-6 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <Star size={18} className="fill-indigo-600 text-indigo-600 dark:fill-indigo-300 dark:text-indigo-300" />
            </span>
            <div>
              <p className="usk-display text-sm font-bold text-slate-900 dark:text-white">4.8 / 5</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Verified reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Categories
// ---------------------------------------------------------------
const CATEGORIES = [
  { icon: BarChart3, label: 'Business', count: '180 courses', tint: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  { icon: Code2, label: 'Development', count: '340 courses', tint: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  { icon: Languages, label: 'Language', count: '95 courses', tint: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  { icon: Megaphone, label: 'Marketing', count: '140 courses', tint: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' },
  { icon: DollarSign, label: 'Finance', count: '110 courses', tint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { icon: Palette, label: 'Design', count: '210 courses', tint: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400' },
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

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Reveal
              as="a"
              href="#courses"
              key={c.label}
              delay={i * 50}
              className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-500/30"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${c.tint}`}
              >
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
// Featured Courses with Images
// ---------------------------------------------------------------
const COURSES = [
  {
    title: 'Advanced UI/UX Design Patterns',
    lessons: '24 Lessons',
    duration: '12 Hours',
    rating: 4.8,
    reviews: '1.2k',
    badge: 'New',
    badgeClass: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    title: 'Full-Stack Web Masterclass',
    lessons: '42 Lessons',
    duration: '28 Hours',
    rating: 5.0,
    reviews: '3.4k',
    badge: 'Popular',
    badgeClass: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    title: 'Digital Marketing Strategy',
    lessons: '18 Lessons',
    duration: '8 Hours',
    rating: 4.3,
    reviews: '860',
    badge: null,
    badgeClass: '',
    image: 'https://images.unsplash.com/photo-1432889821006-c6a6e5cf0d59?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    title: 'Personal Finance for Beginners',
    lessons: '15 Lessons',
    duration: '6 Hours',
    rating: 4.9,
    reviews: '2.1k',
    badge: 'Bestseller',
    badgeClass: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

function CourseCard({ title, lessons, duration, rating, reviews, badge, badgeClass, image, index }) {
  const { openEnrollment } = useEnrollment();

  return (
    <Reveal
      delay={index * 80}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between dark:border-white/10 dark:bg-white/[0.03]"
    >
      {/* Image Container */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
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
          <span
            className={`absolute left-2.5 top-2.5 rounded-full ${badgeClass} px-2.5 py-0.5 usk-mono text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs">
          <Star size={12} className="fill-orange-500 text-orange-500" />
          <span className="font-semibold text-slate-900 dark:text-white">{rating}</span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">({reviews})</span>
        </div>

        <h3 className="mt-1.5 usk-display text-sm font-semibold leading-snug text-slate-900 dark:text-white">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen size={13} className="text-indigo-600 dark:text-indigo-400" />
            {lessons}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-teal-600 dark:text-teal-400" />
            {duration}
          </span>
        </div>
      </div>

      <div className="p-4 pt-0">
        {/* PRIMARY BUTTON — gradient applied */}
        <button
          type="button"
          onClick={() => openEnrollment({ title, lessons, duration })}
          className="w-full inline-flex items-center justify-center gap-1 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-3.5 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:brightness-110 hover:scale-[1.02]"
        >
          Enroll Now
          <Plus size={13} />
        </button>
      </div>
    </Reveal>
  );
}

function FeaturedCourses() {
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
          <a
            href="#all-courses"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white"
          >
            View all courses
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((c, i) => (
            <CourseCard key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Why Choose Upskill
// ---------------------------------------------------------------
// Inside WhyChooseUs.jsx (or wherever it's defined)

// Add the new feature to the FEATURES array (if defined elsewhere, update it)
const FEATURES = [
  {
    icon: PiggyBank,
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
  {
    icon: ShieldCheck, // or any appropriate icon
    title: 'Guaranteed Internships',
    desc: 'Every learner is placed in a real, paid internship before graduating – hands-on experience, not just certificates.',
    featured: true, // mark as featured
  },
];

// ─── Updated WhyChooseUs component ────────────────────────────────────
function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-gradient-to-br from-[#D2F9F3]/40 via-[#BCEBFA]/30 to-slate-50 py-20 dark:bg-app-dark-gradient sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest font-semibold text-orange-500 dark:text-orange-400">
            Why choose Upskill
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            More than a course library
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We make learning joyful, accessible, and effective — with a
            platform built around actually finishing what you start.
          </p>
        </Reveal>

        {/* Grid layout with 4 columns, last feature spans full width */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const isFeatured = f.featured || false;
            return (
              <Reveal
                key={f.title}
                delay={i * 80}
                className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                  isFeatured
                    ? 'lg:col-span-4 border-orange-200/80 bg-orange-50/80 dark:border-orange-500/20 dark:bg-orange-500/10'
                    : 'border-slate-200/80 bg-white/95 dark:border-white/10 dark:bg-white/[0.03]'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isFeatured
                      ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
                      : 'bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400'
                  }`}
                >
                  <f.icon size={18} />
                </span>
                <h3 className="mt-4 usk-display text-sm font-semibold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
              </Reveal>
            );
          })}
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
    name: 'Priya Nair',
    role: 'UX Designer, ex-student',
    text: 'The mentor feedback loop is what made it stick. I shipped a real portfolio piece in week 3, not week 12.',
    initials: 'PN',
  },
  {
    name: 'Daniel Osei',
    role: 'Full-Stack Developer',
    text: 'I compared four platforms before this one. Upskill was the only one that felt built for finishing, not just starting.',
    initials: 'DO',
  },
  {
    name: 'Maria Lopez',
    role: 'Marketing Lead',
    text: 'Lifetime access meant I could go back mid-project and re-learn a module. That alone paid for the course.',
    initials: 'ML',
  },
];

function Testimonials() {
  return (
    <section id="reviews" className="bg-slate-50/50 py-20 dark:bg-app-dark-gradient sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="usk-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold dark:text-indigo-400">
            From the community
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Learners who finished, not just started
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 80}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex gap-0.5 text-orange-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} className="fill-orange-500" />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">"{q.text}"</p>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 usk-mono text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  {q.initials}
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{q.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{q.role}</p>
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
// Final CTA
// ---------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-[#BCEBFA]/30 to-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <Reveal className="relative mx-auto max-w-lg px-6 text-center">
        <h2 className="usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Your next skill is{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-teal-700 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-300">
            one course away.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Join 100,000+ learners already building something real. Cancel
          anytime, keep everything you've learned.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#start"
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-6 py-3 text-xs font-semibold text-white shadow-lg transition-transform duration-300 hover:brightness-110 hover:scale-105"
          >
            Start Learning Today
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-900 transition-colors duration-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Browse Courses
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// ---------------------------------------------------------------
// Root component with sticky navbar
// ---------------------------------------------------------------
export default function UpskillCourseProgram() {
  return (
    <div className="usk-body overflow-x-hidden bg-white text-slate-900 dark:bg-ink-950 dark:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .usk-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .usk-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .usk-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

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

        /* Sticky navbar styles */
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

        /* Dark-mode sticky navbar — matches the section gradient's darkest stop */
        .dark .sticky-nav-wrapper {
          background: rgba(15, 23, 42, 0.92);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .usk-float, .usk-float-slow { animation: none; }
          * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
        }
      `}</style>

      {/* Sticky Navbar Wrapper */}
      <div className="sticky-nav-wrapper">
        <Navbar />
      </div>

      <main>
        <Hero />
        <CareerRoadmapGenerator />
        <FeaturedCourses />
        <WhyChooseUs />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}