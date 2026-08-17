import { motion } from "framer-motion";
import { Laptop, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const tracks = [
  {
    icon: Laptop,
    title: "Online Programs",
    desc: "Live, instructor-led programs designed around practical skills, hands-on projects, and guided learning.",
    items: [
      "React Development",
      "MERN Stack",
      "Python Full Stack",
      "AI Engineering",
    ],
    accent: "from-[#085FA7] via-[#38BDF8] to-[#7DD3B2]",
    iconBg: "bg-[#085FA7]/10",
    iconColor: "text-[#085FA7]",
    ctaLink: "/upskill-program",
    ctaLabel: "Explore Online Programs",
  },
  {
    icon: Building2,
    title: "Offline Training",
    desc: "Classroom-based learning with hands-on practice, mentor guidance, collaborative projects, and career preparation.",
    items: [
      "Practical Training",
      "Hands-on Labs",
      "Career Preparation",
      "Peer Learning",
    ],
    accent: "from-[#5CA347] via-[#7DD3B2] to-[#085FA7]",
    iconBg: "bg-[#5CA347]/10",
    iconColor: "text-[#5CA347]",
    ctaLink: "/upskill-program",
    ctaLabel: "Explore Offline Training",
  },
];

export default function LearningEcosystem() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B5DBFF] via-[#C4EFF6] to-[#D8FBF5] dark:from-transparent dark:via-transparent dark:to-transparent dark:bg-app-dark-gradient" />

      {/* Glows */}
      <div className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-[#085FA7]/15 blur-[130px] dark:bg-[#4F46E5]/15" />
      <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-[#5CA347]/15 blur-[130px] dark:bg-[#06B6D4]/10" />
      <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[120px] dark:bg-white/5" />

      {/* Grid – reduced opacity */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#085FA7 1px, transparent 1px), linear-gradient(90deg,#085FA7 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-white/80 backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[#085FA7] shadow dark:bg-white/10 dark:text-primary-300">
            One Ecosystem • Two Learning Modes
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Our Learning Ecosystem
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Learn online from anywhere or experience immersive offline
            training. Choose the path that fits your career goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_15px_40px_rgba(15,23,42,.06)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(8,95,167,.15)] dark:border-white/10 dark:bg-white/[0.03]"
              >
                {/* Top Gradient */}
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${track.accent}`}
                />

                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/30 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative p-5 sm:p-6">
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${track.iconBg}`}
                  >
                    <Icon className={track.iconColor} size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                    {track.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {track.desc}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {track.items.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <span
                          className={`h-2 w-2 rounded-full ${track.iconBg}`}
                        />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={track.ctaLink}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#085FA7] to-[#5CA347] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#085FA7]"
                    aria-label={track.ctaLabel}
                  >
                    {track.ctaLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}