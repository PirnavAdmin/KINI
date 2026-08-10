import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { FaRobot } from "react-icons/fa";

// Lottie URLs
const LOTTIE_1 = "https://lottie.host/7dffc81e-cd4a-4dd5-a7b8-f3051d0de370/KW4ucR2SjZ.lottie";
const LOTTIE_2 = "https://lottie.host/31ec9d79-84e6-48e3-8ca5-e28d8f76b7f5/UvhgChLpzJ.lottie";
const LOTTIE_3 = "https://lottie.host/1a197c3c-87a7-4a2f-ab43-0c2d2f6e9a13/Q13OGciyjR.lottie";
const LOTTIE_4 = "https://lottie.host/29adac1f-8fa6-4a78-bdce-f9ae0199a4ec/VfN3A0v9wK.lottie";
const LOTTIE_CORE = "https://lottie.host/302e5e47-76ce-4a46-be53-e04492adc7f5/0qTdtA24zK.lottie";

const leftFeatures = [
  { id: "lessons",       title: "Interactive Lessons",  icon: LOTTIE_1 },
  { id: "mentorship",    title: "AI Mentorship",         icon: LOTTIE_2 },
];

const rightFeatures = [
  { id: "career",        title: "Career Growth",         icon: LOTTIE_3 },
  { id: "certifications",title: "Certifications",        icon: LOTTIE_4 },
];

const decorativeElements = [
  { 
    id: "deco1", 
    src: LOTTIE_1, 
    className: "absolute top-4 left-4 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 opacity-20 hidden sm:block",
    animation: "float-slow"
  },
  { 
    id: "deco2", 
    src: LOTTIE_2, 
    className: "absolute top-4 right-4 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 opacity-20 hidden sm:block",
    animation: "float-medium"
  },
  { 
    id: "deco3", 
    src: LOTTIE_3, 
    className: "absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 opacity-20 hidden sm:block",
    animation: "float-slow"
  },
  { 
    id: "deco4", 
    src: LOTTIE_4, 
    className: "absolute bottom-4 right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 opacity-20 hidden sm:block",
    animation: "float-medium"
  },
];

function CardLottie({ src }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "80px" });

  return (
    <div
      ref={ref}
      className="h-20 w-20 shrink-0 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      aria-hidden="true"
    >
      {inView && <DotLottieReact src={src} autoplay loop />}
    </div>
  );
}

function DecorativeLottie({ src, className, animation }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "100px" });
  
  const animations = {
    "float-slow": {
      y: [0, -12, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    "float-medium": {
      y: [0, -18, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { 
        opacity: 0.2, 
        scale: 1,
        ...animations[animation]
      } : { 
        opacity: 0, 
        scale: 0.5 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {inView && <DotLottieReact src={src} autoplay loop />}
    </motion.div>
  );
}

function FeatureCard({ icon, title, align, cardRef, isDark }) {
  const isRight = align === "right";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex flex-col items-center gap-3 ${
        isRight ? "items-end" : "items-start"
      }`}
    >
      <div className={`relative overflow-hidden rounded-2xl p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        isDark
          ? "bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/80 hover:from-[#334155]/90 hover:to-[#1E293B]/90 hover:shadow-[#085FA7]/30"
          : "bg-gradient-to-br from-[#E3F2FD]/80 to-[#E8F5E9]/80 hover:from-[#BBDEFB]/90 hover:to-[#C8E6C9]/90 hover:shadow-[#085FA7]/20"
      }`}>
        <CardLottie src={icon} />
        <div className={`absolute inset-0 rounded-2xl border-2 transition-opacity duration-300 ${
          isDark
            ? "border-[#4F46E5]/20 opacity-0 hover:opacity-100"
            : "border-[#085FA7]/20 opacity-0 hover:opacity-100"
        }`} />
      </div>

      <h3 className={`text-sm font-bold sm:text-base lg:text-lg ${
        isRight ? "text-right" : "text-left"
      } ${isDark ? "text-white" : "text-[#1A237E]"}`}>
        {title}
      </h3>
    </motion.div>
  );
}

// ---------- AiCore – robot badge at the BOTTOM ----------
function AiCore({ coreRef, isDark }) {
  return (
    <div
      ref={coreRef}
      className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72 lg:h-96 lg:w-96"
    >
      {/* Background glow, rings, and rotating gradient */}
      <div className={`absolute inset-0 rounded-full blur-2xl animate-pulse ${
        isDark ? "bg-[#4F46E5]/20" : "bg-[#085FA7]/10"
      }`} />
      <div className={`absolute inset-6 rounded-full border ${
        isDark ? "border-[#4F46E5]/30" : "border-[#085FA7]/20"
      }`} />
      <div className={`absolute inset-12 rounded-full border ${
        isDark ? "border-[#4F46E5]/20" : "border-[#085FA7]/10"
      }`} />
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
        isDark
          ? "from-[#4F46E5]/20 to-[#06B6D4]/20"
          : "from-[#085FA7]/10 to-[#5CA347]/10"
      } animate-spin-slow`} />
      
      <div className={`absolute inset-[-20%] rounded-full border ${
        isDark ? "border-[#4F46E5]/30" : "border-[#085FA7]/20"
      } animate-ping-slow`} />
      <div className={`absolute inset-[-40%] rounded-full border ${
        isDark ? "border-[#06B6D4]/20" : "border-[#5CA347]/15"
      } animate-ping-slower`} />
      
      {/* Lottie animation – main visual at full opacity */}
      <div className="relative h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72">
        <DotLottieReact
          src={LOTTIE_CORE}
          loop
          autoplay
        />
      </div>

      {/* 🤖 Robot badge – positioned at the BOTTOM */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute bottom-2 sm:bottom-3 lg:bottom-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 ${
          isDark
            ? "bg-[#4F46E5]/40 border border-[#4F46E5]/50 text-[#A5B4FC] backdrop-blur-sm"
            : "bg-white/40 backdrop-blur-sm border border-white/50 text-[#085FA7] shadow-lg"
        }`}
      >
        <FaRobot className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
        <span className="text-[8px] sm:text-[10px] lg:text-xs font-semibold tracking-wide whitespace-nowrap">
          AI Mentor
        </span>
      </motion.div>
    </div>
  );
}
// ---------- End of AiCore ----------

function useConnectorPaths({ containerRef, coreRef, leftRefs, rightRefs }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    function calculate() {
      const container = containerRef.current;
      const core = coreRef.current;
      if (!container || !core) return;

      const cRect = container.getBoundingClientRect();
      const kRect = core.getBoundingClientRect();

      const cx = kRect.left + kRect.width / 2 - cRect.left;
      const cy = kRect.top + kRect.height / 2 - cRect.top;
      const cr = kRect.width / 2;

      const buildPath = (ref, side) => {
        const el = ref?.current;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        
        const featureRect = el.querySelector('div[class*="h-20"]')?.getBoundingClientRect() || r;
        
        const sx = side === "left" 
          ? featureRect.right - cRect.left 
          : featureRect.left - cRect.left;
        const sy = featureRect.top + featureRect.height / 2 - cRect.top;
        
        const dx = cx - sx;
        const dy = cy - sy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        const startX = sx;
        const startY = sy;
        
        const endX = cx - (dx / dist) * (cr + 20);
        const endY = cy - (dy / dist) * (cr + 20);
        
        const mx = (startX + endX) / 2;
        const my = (startY + endY) / 2 - 20;

        return { 
          d: `M ${startX} ${startY} C ${(startX + mx) / 2} ${my - 30} ${(endX + mx) / 2} ${my - 30} ${endX} ${endY}`,
          start: { x: startX, y: startY },
          end: { x: endX, y: endY }
        };
      };

      setPaths([
        ...leftRefs.map((r) => buildPath(r, "left")),
        ...rightRefs.map((r) => buildPath(r, "right")),
      ].filter(Boolean));
    }

    calculate();
    const ro = new ResizeObserver(calculate);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", calculate);
    return () => { ro.disconnect(); window.removeEventListener("resize", calculate); };
  }, [containerRef, coreRef, leftRefs, rightRefs]);

  return paths;
}

// ---------- ConnectorLines (bubbles flow center → corners) ----------
function ConnectorLines({ paths, reduceMotion, isDark }) {
  if (!paths.length) return null;

  const colors = isDark
    ? {
        gradient1: ["#4F46E5", "#818CF8", "#06B6D4"],
        gradient2: ["#06B6D4", "#818CF8", "#4F46E5"],
        bubble: "#818CF8",
        glow: "#4F46E5",
        pulse: "#4F46E5",
      }
    : {
        gradient1: ["#085FA7", "#2EA7E0", "#5CA347"],
        gradient2: ["#5CA347", "#2EA7E0", "#085FA7"],
        bubble: "#2EA7E0",
        glow: "#085FA7",
        pulse: "#2EA7E0",
      };

  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={colors.gradient1[0]} />
          <stop offset="30%"  stopColor={colors.gradient1[1]} />
          <stop offset="70%"  stopColor={colors.gradient1[2]} />
          <stop offset="100%" stopColor={colors.gradient1[2]} />
        </linearGradient>
        
        <linearGradient id="wgReverse" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor={colors.gradient2[0]} />
          <stop offset="30%"  stopColor={colors.gradient2[1]} />
          <stop offset="70%"  stopColor={colors.gradient2[2]} />
          <stop offset="100%" stopColor={colors.gradient2[2]} />
        </linearGradient>
        
        <radialGradient id="bubbleGrad">
          <stop offset="0%" stopColor={colors.bubble} stopOpacity="0.8"/>
          <stop offset="50%" stopColor={colors.glow} stopOpacity="0.6"/>
          <stop offset="100%" stopColor={colors.gradient1[2]} stopOpacity="0.3"/>
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <radialGradient id="pulseGrad">
          <stop offset="0%" stopColor={colors.pulse} stopOpacity="0.7"/>
          <stop offset="50%" stopColor={colors.glow} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={colors.gradient1[2]} stopOpacity="0"/>
        </radialGradient>
      </defs>

      {paths.map((pathData, i) => {
        const isLeft = i < 2;
        const gradient = isLeft ? "url(#wg)" : "url(#wgReverse)";
        
        return (
          <g key={i}>
            <motion.path
              d={pathData.d}
              stroke={gradient}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeOpacity="0.6"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: "easeInOut" }}
            />

            <motion.path
              d={pathData.d}
              stroke={gradient}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeOpacity="0.06"
              filter="url(#glowStrong)"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: i * 0.15, ease: "easeInOut" }}
            />

            {!reduceMotion && (
              <>
                <motion.circle
                  r="7"
                  fill="url(#bubbleGrad)"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "100%" }}
                  animate={{ offsetDistance: "0%" }}
                  transition={{
                    duration: 2.5 + i * 0.2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${pathData.d}")` }}
                />
                
                <motion.circle
                  r="5"
                  fill="url(#bubbleGrad)"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "100%" }}
                  animate={{ offsetDistance: "0%" }}
                  transition={{
                    duration: 3 + i * 0.2,
                    delay: i * 0.3 + 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${pathData.d}")` }}
                />

                <motion.circle
                  r="3.5"
                  fill={colors.bubble}
                  opacity="0.8"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "100%" }}
                  animate={{ offsetDistance: "0%" }}
                  transition={{
                    duration: 2 + i * 0.15,
                    delay: i * 0.3 + 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${pathData.d}")` }}
                />

                <motion.circle
                  r="2"
                  fill={colors.gradient1[2]}
                  opacity="0.7"
                  initial={{ offsetDistance: "100%" }}
                  animate={{ offsetDistance: "0%" }}
                  transition={{
                    duration: 1.8 + i * 0.15,
                    delay: i * 0.3 + 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${pathData.d}")` }}
                />
              </>
            )}

            <motion.circle
              cx={pathData.start.x}
              cy={pathData.start.y}
              r="8"
              fill="url(#pulseGrad)"
              initial={{ scale: 0.6, opacity: 0.4 }}
              animate={{
                scale: [0.6, 1.6, 0.6],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.circle
              cx={pathData.end.x}
              cy={pathData.end.y}
              r="8"
              fill="url(#pulseGrad)"
              initial={{ scale: 0.6, opacity: 0.4 }}
              animate={{
                scale: [0.6, 1.6, 0.6],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2 + 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {!reduceMotion && [0.2, 0.4, 0.6, 0.8].map((offset, idx) => (
              <motion.circle
                key={`dot-${i}-${idx}`}
                r="2"
                fill={idx % 2 === 0 ? colors.bubble : colors.gradient1[2]}
                opacity="0.3"
                initial={{ offsetDistance: "100%" }}
                animate={{ offsetDistance: "0%" }}
                transition={{
                  duration: 3 + i * 0.1,
                  delay: i * 0.2 + offset * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ offsetPath: `path("${pathData.d}")` }}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
// ---------- End of ConnectorLines ----------

export default function PremiumELearning() {
  const { isDark } = useThemeContext();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const leftRef1 = useRef(null);
  const leftRef2 = useRef(null);
  const rightRef1 = useRef(null);
  const rightRef2 = useRef(null);
  const leftRefs = useMemo(() => [leftRef1, leftRef2], []);
  const rightRefs = useMemo(() => [rightRef1, rightRef2], []);

  const paths = useConnectorPaths({ containerRef, coreRef, leftRefs, rightRefs });

  return (
    <section
      className={`relative flex flex-col justify-center overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-app-dark-gradient"
          : "bg-gradient-to-br from-[#F5F9FF] via-[#E8F4FD] to-[#F0F7F1]"
      }`}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? `
                radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.15), transparent 50%),
                radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.10), transparent 50%)
              `
            : `
                radial-gradient(ellipse at 20% 50%, rgba(8,95,167,0.08), transparent 50%),
                radial-gradient(ellipse at 80% 50%, rgba(92,163,71,0.06), transparent 50%)
              `,
        }}
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(79,70,229,0.1)' : 'rgba(8,95,167,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(79,70,229,0.1)' : 'rgba(8,95,167,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {decorativeElements.map((deco) => (
          <DecorativeLottie
            key={deco.id}
            src={deco.src}
            className={deco.className}
            animation={deco.animation}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-6 max-w-2xl text-center sm:mb-8"
        >
          <p className={`text-[10px] font-bold uppercase tracking-[0.35em] sm:text-xs ${
            isDark ? "text-[#818CF8]" : "text-[#085FA7]"
          }`}>
            Interactive learning
          </p>

          <h2 className={`mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${
            isDark ? "text-white" : "text-[#1A237E]"
          }`}>
            E learning{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#06B6D4] bg-clip-text text-transparent">
              ecosystem
            </span>
          </h2>

          <p className={`mt-3 text-sm sm:text-base ${
            isDark ? "text-slate-300" : "text-[#455A64]"
          }`}>
            Transform your learning experience with our comprehensive platform
          </p>

          <div className={`mx-auto mt-4 h-px w-24 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] opacity-60`} />
        </motion.div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-8"
        >
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            {leftFeatures.map((card, i) => (
              <FeatureCard
                key={card.id}
                {...card}
                align="left"
                cardRef={leftRefs[i]}
                isDark={isDark}
              />
            ))}
          </div>

          <div className="order-1 flex justify-center md:col-span-2 lg:order-2 lg:col-span-1">
            <AiCore coreRef={coreRef} isDark={isDark} />
          </div>

          <div className="order-3 flex flex-col gap-6">
            {rightFeatures.map((card, i) => (
              <FeatureCard
                key={card.id}
                {...card}
                align="right"
                cardRef={rightRefs[i]}
                isDark={isDark}
              />
            ))}
          </div>

          <ConnectorLines paths={paths} reduceMotion={reduceMotion} isDark={isDark} />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.05; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }

        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.03; }
          100% { transform: scale(1); opacity: 0.15; }
        }
        .animate-ping-slower {
          animation: ping-slower 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}