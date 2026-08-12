import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, PlayCircle, TrendingUp, Radio,
  Star, Plus, BarChart3, Code2, Languages, Megaphone, DollarSign, Palette,
  PiggyBank, Users, Video, Gamepad2, Clock, BookOpen, ShieldCheck,
  Briefcase, Rocket, CheckCircle2, MessageCircle, ChevronDown, ChevronUp,
  Coins
} from 'lucide-react';
import Navbar from '@shared/components/navbar';
import Footer from '@shared/components/Footer';
import CareerRoadmapGenerator from '../components/Careerroadmapgenerator';
import RegisterModal from '../../../shared/components/RegisterModal';

// ---------------------------------------------------------------
// Reveal-on-scroll
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
      {/* Ambient glows — overflow-hidden lives HERE, not on the section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 dark:opacity-20">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-white/70 blur-[100px] dark:bg-primary-500/20" />
        <div className="absolute right-10 top-44 h-80 w-80 rounded-full bg-indigo-300/40 blur-[90px] dark:bg-secondary-500/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          {/* Honest badge for a starting institute */}
          <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="usk-mono text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300">
              Founding Batch — Limited Seats
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

          {/* Honest stats for a new institute */}
          <Reveal
            delay={400}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/50 pt-6 text-sm text-slate-700 dark:border-white/10"
          >
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">New Batch </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Now Enrolling</p>
            </div>
            <div className="h-8 w-px bg-slate-300/60 dark:bg-white/10" />
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">6+</strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live Tracks</p>
            </div>
            <div className="h-8 w-px bg-slate-300/60 dark:bg-white/10" />
            <div>
              <strong className="usk-display font-bold text-slate-900 dark:text-white text-base">100%</strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">Placement Support</p>
            </div>
          </Reveal>
        </div>

        {/* Right — image card */}
        <div ref={cardRef} className="lg:col-span-5 relative pt-4 sm:pt-2">
          <div
            className={`relative rounded-[2.5rem] border border-white/90 bg-white/40 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-700 dark:border-white/10 dark:bg-white/5 sm:p-4 ${
              cardVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
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

          {/* Floating badge — Placement Support */}
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
              <p className="usk-display text-sm font-bold text-slate-900 dark:text-white">100%</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Placement support</p>
            </div>
          </div>

          {/* Floating badge — Live cohorts */}
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
    tint: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    border: 'hover:border-orange-200 dark:hover:border-orange-500/30',
  },
];

function WhoThisIsFor() {
  return (
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

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 80}
              className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] ${a.border}`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tint}`}>
                <a.icon size={20} />
              </span>
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

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Reveal
              as="a"
              href="#courses"
              key={c.label}
              delay={i * 50}
              className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-500/30"
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
const COURSES = [
  {
    title: 'Advanced UI/UX Design Patterns',
    lessons: '24 Lessons',
    duration: '12 Hours',
    rating: 4.8,
    reviews: '12',
    badge: 'New',
    badgeClass: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    title: 'Full-Stack Web Masterclass',
    lessons: '42 Lessons',
    duration: '28 Hours',
    rating: 5.0,
    reviews: '8',
    badge: 'Popular',
    badgeClass: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    title: 'Digital Marketing Strategy',
    lessons: '18 Lessons',
    duration: '8 Hours',
    rating: 4.7,
    reviews: '5',
    badge: null,
    badgeClass: '',
    image: 'https://i.pinimg.com/736x/b0/41/ab/b041abab5f12ce21f693f0bf2e1f895b.jpg',
  },
  {
    title: 'Personal Finance for Beginners',
    lessons: '15 Lessons',
    duration: '6 Hours',
    rating: 4.9,
    reviews: '11',
    badge: 'Bestseller',
    badgeClass: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

function CourseCard({ title, lessons, duration, rating, reviews, badge, badgeClass, image, index, onOpenModal }) {
  return (
    <Reveal
      delay={index * 80}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between dark:border-white/10 dark:bg-white/[0.03]"
    >
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
          <span className={`absolute left-2.5 top-2.5 rounded-full ${badgeClass} px-2.5 py-0.5 usk-mono text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm`}>
            {badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-xs">
          <Star size={12} className="fill-orange-500 text-orange-500" />
          <span className="font-semibold text-slate-900 dark:text-white">{rating}</span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">({reviews} reviews)</span>
        </div>
        <h3 className="mt-1.5 usk-display text-sm font-semibold leading-snug text-slate-900 dark:text-white">{title}</h3>
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
        <button
          type="button"
          onClick={() => onOpenModal({ title, lessons, duration })}
          className="w-full inline-flex items-center justify-center gap-1 rounded-full bg-[linear-gradient(90deg,#1683D8_0%,#2FA9A8_50%,#4DBB5A_100%)] px-3.5 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:brightness-110 hover:scale-[1.02]"
        >
          Enroll Now
          <Plus size={13} />
        </button>
      </div>
    </Reveal>
  );
}

function FeaturedCourses({ onOpenModal }) {
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

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((c, i) => (
            <CourseCard key={c.title} {...c} index={i} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Guaranteed Internship — Dedicated Section
// ---------------------------------------------------------------
function InternshipSection({ onOpenModal }) {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 to-teal-600 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-white blur-[80px]" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-teal-300 blur-[70px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 usk-mono text-[11px] font-semibold uppercase tracking-widest text-white border border-white/20">
              <ShieldCheck size={13} /> Our Core Promise
            </span>
            <h2 className="mt-4 usk-display text-3xl font-bold text-white sm:text-4xl leading-tight">
              Every learner gets a real, paid internship. Guaranteed.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 max-w-md">
              We don't just hand you a certificate. Before you graduate, we place you in a paid internship with one of our hiring partners — hands-on experience that shows on your resume.
            </p>
            <button
              type="button"
              onClick={() => onOpenModal(null)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Claim Your Seat
              <ArrowRight size={15} />
            </button>
          </Reveal>

          <Reveal delay={150} className="grid grid-cols-1 gap-4">
            {[
              { icon: CheckCircle2, title: 'Paid, not unpaid', desc: 'All internships through our network are compensated — your time has value.' },
              { icon: Briefcase, title: 'Real companies, real work', desc: 'Partner companies give you actual projects, not busy work.' },
              { icon: Rocket, title: 'Starts before you graduate', desc: 'Begin your internship while still completing your track.' },
              { icon: Users, title: 'Dedicated placement team', desc: 'Our placement team prepares your resume, mock interviews, and referrals.' },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <item.icon size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/70">{item.desc}</p>
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
          <p className="usk-mono text-xs uppercase tracking-widest font-semibold text-orange-500 dark:text-orange-400">
            Why choose Kini Edx Hub
          </p>
          <h2 className="mt-2 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            More than a course library
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We make learning joyful, accessible, and effective — with a platform built around actually finishing what you start.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                <f.icon size={18} />
              </span>
              <h3 className="mt-4 usk-display text-sm font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Founder / Instructor Section
// ---------------------------------------------------------------
const INSTRUCTORS = [
  {
    name: 'Arun ',
    role: 'Lead Mentor',
    bio: '10+ years in product and tech. Previously at major startups. Teaches practical skills, not theory.',
    initials: 'AK',
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
    name: 'Rahul Mehta',
    role: 'Full-Stack Engineering',
    bio: 'Built and shipped products used by thousands. Passionate about teaching clean, production-ready code.',
    initials: 'RM',
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
              <p className="usk-mono text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">{ins.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{ins.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Testimonials (early cohort, honest framing)
// ---------------------------------------------------------------
const QUOTES = [
  {
    name: 'Priya ',
    role: 'UX Designer — Batch 1 preview student',
    text: 'The mentor feedback loop is what made it stick. I shipped a real portfolio piece in week 3, not week 12.',
    initials: 'PN',
  },
  {
    name: 'Lahari lakshmi',
    role: 'Full-Stack Developer — Beta cohort',
    text: 'I compared four platforms before this one. This was the only one that felt built for finishing, not just starting.',
    initials: 'DO',
  },
  {
    name: 'M.Narayana',
    role: 'Marketing Lead — Early access',
    text: 'The live sessions mean you actually stay on track. I finished the whole track in 6 weeks.',
    initials: 'ML',
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
// FAQ Section
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

        <div className="mt-8 divide-y divide-slate-200/80 dark:divide-white/10">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 50}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                {open === i
                  ? <ChevronUp size={16} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                  : <ChevronDown size={16} className="shrink-0 text-slate-400 dark:text-slate-500" />
                }
              </button>
              {open === i && (
                <p className="pb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Final CTA with batch urgency
// ---------------------------------------------------------------
function FinalCTA({ onOpenModal }) {
  return (
    <section className="relative bg-gradient-to-t from-[#BCEBFA]/30 to-white py-20 dark:bg-app-dark-gradient sm:py-24">
      <Reveal className="relative mx-auto max-w-lg px-6 text-center">
        {/* Urgency banner */}
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 usk-mono text-[11px] font-semibold text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
        New Batch  starts soon — seats are limited
        </span>

        <h2 className="mt-5 usk-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Your next skill is{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-teal-700 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-300">
            one course away.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Join our founding batch and build something real from day one. Guaranteed internship placement included.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

        {/* WhatsApp CTA */}
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
    </section>
  );
}

// ---------------------------------------------------------------
// Root — sticky navbar fix applied here
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

        /* Sticky navbar */
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

      {/* Sticky Navbar — must be OUTSIDE <main> and root must NOT have overflow-hidden */}
      <div className="sticky-nav-wrapper">
        <Navbar />
      </div>

      {/* FIX: overflow-x-hidden moved here so it doesn't break sticky navbar above */}
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