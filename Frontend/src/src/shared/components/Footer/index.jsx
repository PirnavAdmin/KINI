import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { ROUTES } from "@shared/constants/routeConstants";
import { fadeUp, staggerContainer } from "@shared/hooks/useScrollAnimation";
import { useThemeContext } from "@shared/context/ThemeContext";
import kiniLogo from "../../../assets/Kini (7).svg";

// ─── Brand gradient ──────────────────────────────────────────────────────────
const BRAND_GRADIENT = "linear-gradient(135deg, #1F76BD 0%, #2D99AE 50%, #53B255 100%)";

// ─── Email validation ────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", to: ROUTES.PUBLIC.HOME },
  { label: "Courses", to: ROUTES.PUBLIC.UPSKILL_PROGRAM },
  { label: "About Us", to: ROUTES.PUBLIC.ABOUT },
  { label: "Contact", to: ROUTES.PUBLIC.CONTACT },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kiniedxhub", icon: FaInstagram },
  { label: "Threads", href: "https://www.threads.net/@kiniedxhub", icon: FaThreads },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kiniedxhub", icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebook },
  { label: "YouTube", href: "https://www.youtube.com/@KiniEdxHub", icon: FaYoutube },
  {
    label: "WhatsApp",
    href: "https://wa.me/9000198239?text=Hello! I'm interested in your programs.",
    icon: FaWhatsapp,
  },
];

const contactDetails = [
  { icon: Mail, label: "Email", value: "kiniedxhub@gmail.com", href: "mailto:kiniedxhub@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 90001 98239", href: "tel:+919000198239" },
  {
    icon: MapPin,
    label: "Address",
    lines: ["407, Capital Park Building", "Madhapur", "Hyderabad", "Telangana - 500081"],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms-conditions" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FooterLink({ to, children, isDark }) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex w-fit items-center text-sm transition-colors duration-300 ${
        isDark ? "text-white/55 hover:text-white" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ backgroundImage: BRAND_GRADIENT }}
      />
    </Link>
  );
}

function SocialIcon({ icon: Icon, label, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={{
        backgroundImage: BRAND_GRADIENT,
        boxShadow: "0 6px 18px rgba(29,114,190,0.28)",
      }}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </motion.a>
  );
}

function ContactIconBadge({ icon: Icon }) {
  return (
    <span
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white"
      style={{
        backgroundImage: BRAND_GRADIENT,
        boxShadow: "0 4px 12px rgba(29,114,190,0.22)",
      }}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

// ─── Newsletter with email validation ────────────────────────────────────────

function FooterNewsletter({ isDark }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error && EMAIL_REGEX.test(value)) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
    setPulseKey((k) => k + 1);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div>
      <h3 className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        Stay Updated
      </h3>
      <p className={`mt-1.5 max-w-sm text-sm leading-relaxed ${isDark ? "text-white/50" : "text-slate-600"}`}>
        Subscribe to receive course updates, career tips, and special offers.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:max-w-md">
        <div className="flex-1">
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-invalid={!!error}
            aria-describedby={error ? "footer-email-error" : undefined}
            className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none transition-colors ${
              error
                ? "border-red-500 bg-red-50 text-slate-900 placeholder:text-slate-400"
                : isDark
                  ? "border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-blue-400/50"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm"
            }`}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                id="footer-email-error"
                className="mt-1.5 text-xs font-medium text-red-500"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex-shrink-0 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300"
          style={{
            backgroundImage: BRAND_GRADIENT,
            boxShadow: "0 12px 30px rgba(29,114,190,0.28)",
          }}
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10">Subscribe</span>

          <AnimatePresence>
            {pulseKey > 0 && (
              <motion.span
                key={pulseKey}
                initial={{ scale: 0, opacity: 0.45 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-full bg-white/25"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <AnimatePresence>
        {subscribed && !error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            className="mt-2.5 text-xs font-medium text-emerald-500"
          >
            ✓ Subscribed! Check your inbox for updates.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export default function Footer() {
  const { isDark } = useThemeContext();

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-app-dark-gradient text-white"
          : "bg-slate-50 text-slate-900 border-t border-slate-200"
      }`}
    >
      {/* Top accent bar */}
      <div aria-hidden="true" className="h-[3px] w-full" style={{ backgroundImage: BRAND_GRADIENT }} />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full blur-[140px] ${
          isDark ? "bg-blue-500/10" : "bg-blue-500/5"
        }`}
      />

      {/* Main grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:gap-10 lg:px-8"
      >
        {/* Column 1 – Brand */}
        <motion.div variants={fadeUp}>
          <Link to={ROUTES.PUBLIC.HOME} className="inline-block">
            <img src={kiniLogo} alt="KiniEdXHub logo" className="block h-9 w-auto object-contain object-left sm:h-10" />
          </Link>
          <p className={`mt-4 max-w-xs text-sm leading-relaxed ${isDark ? "text-white/50" : "text-slate-600"}`}>
            Empowering students with industry-ready skills, expert mentorship, and AI-powered learning experiences.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socialLinks.map((s) => (
              <SocialIcon key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        {/* Column 2 – Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Quick Links
          </h3>
          <nav className="mt-4 flex flex-col gap-3" aria-label="Quick links">
            {quickLinks.map((link) => (
              <FooterLink key={link.label} to={link.to} isDark={isDark}>
                {link.label}
              </FooterLink>
            ))}
          </nav>
        </motion.div>

        {/* Column 3 – Contact */}
        <motion.div variants={fadeUp}>
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Contact Information
          </h3>
          <ul className="mt-4 flex flex-col gap-4">
            {contactDetails.map(({ icon: Icon, label, value, href, lines }) => (
              <li key={label} className="flex items-start gap-3">
                <ContactIconBadge icon={Icon} />
                <div className={`text-sm ${isDark ? "text-white/55" : "text-slate-600"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-white/35" : "text-slate-400"}`}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className={`mt-0.5 block transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 leading-relaxed">
                      {lines.map((line, i) => (
                        <span key={line}>{line}{i < lines.length - 1 && <br />}</span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Newsletter strip */}
      <div className={`relative border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <FooterNewsletter isDark={isDark} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`relative border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
            &copy; {new Date().getFullYear()} KiniEdXHub. All Rights Reserved.
          </p>
          <p className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>Made with ❤️ in India</p>
          <div className="flex items-center gap-5">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-xs transition-colors duration-300 ${
                  isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}