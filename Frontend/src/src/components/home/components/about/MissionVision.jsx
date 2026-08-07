import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

const cards = [
  {
    key: 'mission',
    icon: Target,
    label: 'Our Mission',
    accent: 'text-brand-blue',
    chip: 'bg-brand-blue/10',
    bar: 'bg-gradient-to-r from-brand-blue to-sky-400',
    glow: 'hover:shadow-[0_24px_48px_-12px_rgba(37,99,235,0.28)]',
    heading: 'Turn potential into proof — in the form of an offer letter.',
    copy: "We help learners build strong fundamentals, real engineering skills, and genuine interview confidence — turning ambition into offers from the technology companies they're aiming for.",
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    alt: 'Students collaborating and learning together',
  },
  {
    key: 'vision',
    icon: Eye,
    label: 'Our Vision',
    accent: 'text-brand-green',
    chip: 'bg-brand-green/10',
    bar: 'bg-gradient-to-r from-brand-green to-emerald-400',
    glow: 'hover:shadow-[0_24px_48px_-12px_rgba(5,150,105,0.24)]',
    heading: 'The top 1% of technology talent, trained here.',
    copy: "We're building the education layer the industry actually trusts — where a Kini Edx credential signals verified, job-ready skill, not just a completed course.",
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    alt: 'Future technology and innovation',
  },
]

export default function MissionVision() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: 'linear-gradient(135deg, #EAF5FF 0%, #DFF5F0 45%, #F6FFF9 100%)',
      }}
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-blue/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-green/10 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="eyebrow text-slate-500">Mission &amp; Vision</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Where ambition becomes a career
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">
            Two commitments that shape everything we build at Kini Edx.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-9">
          <div className="pointer-events-none absolute inset-y-2 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-ink-900/10 md:block" />

          {cards.map((c, i) => (
            <motion.article
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`relative flex min-w-0 flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-200 transition-transform duration-300 hover:-translate-y-1.5 ${c.glow}`}
            >
              <div className={`h-[3px] w-full ${c.bar}`} />

              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/0 to-transparent" />
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 pl-1.5 shadow-sm backdrop-blur-sm">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${c.chip} ${c.accent}`}>
                    <c.icon size={13} />
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${c.accent}`}>
                    {c.label}
                  </span>
                </span>
              </div>

              <div className="relative -mt-7 flex flex-1 flex-col gap-2.5 px-6 pb-7 pt-0 sm:px-7">
                <h3 className="font-display text-xl font-semibold leading-snug text-ink-900 sm:text-[22px]">
                  {c.heading}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-slate-600">{c.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}