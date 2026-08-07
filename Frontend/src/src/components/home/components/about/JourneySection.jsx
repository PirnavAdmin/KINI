import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UserX, GraduationCap, FolderGit2, MessagesSquare, Trophy } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp.js'

const stages = [
  { icon: UserX, label: 'Unemployed', note: 'Day 0, no plan', x: 4, y: 86 },
  { icon: GraduationCap, label: 'Learning', note: 'Fundamentals + DSA', x: 27, y: 66 },
  { icon: FolderGit2, label: 'Projects', note: '6+ shipped builds', x: 51, y: 42 },
  { icon: MessagesSquare, label: 'Interviews', note: 'Mocks + real rounds', x: 75, y: 20 },
  { icon: Trophy, label: 'Hired', note: '\u20b95\u201312 LPA offer', x: 96, y: 6 },
]

export default function JourneySection() {
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.3 })
  const salary = useCountUp(9.2, 1800, 1)

  const pathD =
    'M 20 258 C 120 258, 160 200, 260 200 S 380 130, 500 125 S 680 62, 750 60 S 900 20, 960 18'

  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="eyebrow text-brand-blue">The full arc</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Student Journey to Placement
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-500">
            One continuous trajectory — every learner climbs the same verified
            line, from their first login to their first offer.
          </p>
        </motion.div>

        {/* Desktop ascent diagram */}
        <div ref={wrapRef} className="relative mt-20 hidden aspect-[10/3.4] w-full lg:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 280" fill="none" preserveAspectRatio="none">
            <path d="M 20 258 L 960 258" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 6" />
            <motion.path
              d={pathD}
              stroke="url(#journeyAscent)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="journeyAscent" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="60%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>

          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.35 }}
              className="absolute flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-card ${
                  i === stages.length - 1
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                    : 'border-brand-blue/30 bg-white text-brand-blue'
                }`}
              >
                <s.icon size={18} />
              </span>
              <div className="mt-2 whitespace-nowrap text-center">
                <p className="text-xs font-semibold text-slate-900">{s.label}</p>
                <p className="font-mono text-[10px] text-slate-400">{s.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile stacked fallback */}
        <div className="mt-14 space-y-4 lg:hidden">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
                  i === stages.length - 1
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                    : 'border-brand-blue/30 bg-white text-brand-blue'
                }`}
              >
                <s.icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{s.label}</p>
                <p className="font-mono text-xs text-slate-400">{s.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Salary payoff badge */}
       
      </div>
    </section>
  )
}
