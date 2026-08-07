import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Users2, Code2, Briefcase } from 'lucide-react'

const milestones = [
  {
    icon: BookOpen,
    tag: 'Day 0',
    title: 'You start at zero — and that\u2019s fine',
    desc: 'No prior CS background required. We meet you at "what is a variable" and rebuild your foundations the right way, from syntax to systems thinking.',
    metric: '0 → first working program',
  },
  {
    icon: Users2,
    tag: 'Weeks 1–8',
    title: 'You learn with people, not just videos',
    desc: 'Live classes with working engineers, weekly 1:1 mentorship, and doubt-clearing that happens in hours, not days.',
    metric: '1:1 mentor check-ins, weekly',
  },
  {
    icon: Code2,
    tag: 'Weeks 9–16',
    title: 'You ship real, reviewed projects',
    desc: 'Production-style builds — not toy apps — with code review from engineers who\u2019ve shipped at scale.',
    metric: '6+ portfolio-grade projects',
  },
  {
    icon: Briefcase,
    tag: 'Placement',
    title: 'You interview — and you get hired',
    desc: 'Mock interviews, resume rebuilds, and warm introductions to 500+ hiring partners until an offer lands.',
    metric: '\u20b95\u201312 LPA average offer',
  },
]

export default function StorySection() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railHeight = useTransform(scrollYProgress, [0, 1], ['2%', '100%'])

  return (
    <section 
      id="story" 
      className="relative py-28 sm:py-36"
      style={{
        background: 'linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)'
      }}
    >
      {/* Optional: Add subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(8,95,167,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(92,163,71,0.05) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it actually works"
          title="From zero knowledge to a signed offer"
          subtitle="Four stages. No shortcuts skipped, no step outsourced — every learner walks the same verified path."
        />

        <div ref={containerRef} className="relative mt-20 grid gap-16 lg:grid-cols-[220px_1fr]">
          {/* Sticky ascent rail */}
          <div className="hidden lg:block">
            <div className="sticky top-32 h-[420px]">
              <div className="relative ml-3 h-full w-px bg-slate-200/50">
                <motion.div
                  style={{ height: railHeight }}
                  className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#085FA7] via-[#2EA7E0] to-[#5CA347]"
                />
                {milestones.map((m, i) => (
                  <div
                    key={m.tag}
                    className="absolute -left-[7px] flex items-center gap-3"
                    style={{ top: `${(i / (milestones.length - 1)) * 100}%` }}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full border-2 transition-colors duration-500 ${
                        activeIndex >= i
                          ? 'border-[#085FA7] bg-white'
                          : 'border-slate-300 bg-white/50'
                      }`}
                    />
                    <span
                      className={`font-mono text-xs transition-colors duration-500 ${
                        activeIndex >= i ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => (
              <StoryStep key={m.tag} {...m} index={i} onActivate={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StoryStep({ icon: Icon, tag, title, desc, metric, index, onActivate }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (inView) onActivate(index)
  }, [inView, index, onActivate])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-3xl border p-8 transition-all duration-500 sm:p-10 backdrop-blur-sm ${
        inView
          ? 'border-[#085FA7]/20 bg-white/80 shadow-card-lg'
          : 'border-white/30 bg-white/40 shadow-card'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#085FA7] to-[#5CA347] text-white shadow-glow">
            <Icon size={19} />
          </span>
          <span className="eyebrow text-[#085FA7] lg:hidden">{tag}</span>
        </div>
        <span className="rounded-full bg-white/70 backdrop-blur-sm px-3 py-1 font-mono text-xs text-slate-700 border border-white/30">
          {metric}
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">{desc}</p>
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="eyebrow text-[#085FA7]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{subtitle}</p>}
    </motion.div>
  )
}