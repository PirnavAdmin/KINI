import { motion } from "framer-motion";
import { Laptop, Building2, ArrowUpRight } from "lucide-react";

const tracks = [
  {
    icon: Laptop,
    title: "Online Programs",
    desc: "Live, cohort-based classes you can join from anywhere with expert mentors and real-world projects.",
    items: [
      "React Development",
      "MERN Stack",
      "Python Full Stack",
      "AI Engineering",
    ],
    accent:
      "from-[#085FA7] via-[#38BDF8] to-[#7DD3B2]",
    iconBg: "bg-[#085FA7]/10",
    iconColor: "text-[#085FA7]",
  },
  {
    icon: Building2,
    title: "Offline Campus",
    desc: "Hands-on classroom learning with industry labs, peer collaboration and placement support.",
    items: [
      "B.Tech Programs",
      "Industry Labs",
      "Career Services",
      "Peer Cohorts",
    ],
    accent:
      "from-[#5CA347] via-[#7DD3B2] to-[#085FA7]",
    iconBg: "bg-[#5CA347]/10",
    iconColor: "text-[#5CA347]",
  },
];

export default function LearningEcosystem() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B5DBFF] via-[#C4EFF6] to-[#D8FBF5]" />

      {/* Blue Glow */}
      <div className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-[#085FA7]/15 blur-[130px]" />

      {/* Green Glow */}
      <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-[#5CA347]/15 blur-[130px]" />

      {/* White Glow */}
      <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
          transition={{ duration: .6 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-white/80 backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[#085FA7] shadow">
            One Ecosystem • Two Learning Modes
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900">
            Our Learning Ecosystem
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600">
            Learn online from anywhere or experience immersive offline
            training. Choose the path that fits your career goals.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {tracks.map((track, index) => {

            const Icon = track.icon;

            return (

              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_25px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:shadow-[0_35px_90px_rgba(8,95,167,.18)]"
              >

                {/* Top Gradient */}

                <div
                  className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${track.accent}`}
                />

                {/* Hover Background */}

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/30 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative p-10">

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${track.iconBg}`}
                    >
                      <Icon
                        className={track.iconColor}
                        size={28}
                      />
                    </div>

                    <ArrowUpRight
                      size={22}
                      className="text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#085FA7]"
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {track.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {track.desc}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">

                    {track.items.map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >

                        <span
                          className={`h-2.5 w-2.5 rounded-full ${track.iconBg}`}
                        />

                        <span className="text-sm font-medium text-slate-700">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                  <button
                    className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#085FA7] to-[#5CA347] px-6 py-3 text-white font-semibold transition hover:shadow-lg"
                  >
                    Explore Programs

                    <ArrowUpRight size={18} />

                  </button>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}