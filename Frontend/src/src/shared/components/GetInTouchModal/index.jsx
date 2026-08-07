import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  Award,
  CheckCircle2,
  Loader2,
  Star,
  Users,
  X,
} from "lucide-react";
import useFocusTrap from "@shared/components/navbar/useFocusTrap";
import { useThemeContext } from "@shared/context/ThemeContext";
import { EASE_PREMIUM } from "@shared/hooks/useScrollAnimation";
import { getInTouchDefaultValues, getInTouchSchema, SUBJECT_OPTIONS } from "@shared/schemas/getInTouchSchema";
import { submitGetInTouch } from "@shared/services/getInTouchService";
import Button from "@shared/components/ui/Button";

const benefits = [
  "Free Career Counselling",
  "Personalized Course Roadmap",
  "Scholarship Information",
  "Placement Guidance",
];

const trustStats = [
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Users, value: "20,000+", label: "Students" },
  { icon: Award, value: "500+", label: "Hiring Partners" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE_PREMIUM } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.2, ease: EASE_PREMIUM } },
};

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs font-medium text-red-500">
      {message}
    </p>
  );
}

export default function GetInTouchModal({ isOpen, onClose, onSubmitted }) {
  const { isDark } = useThemeContext();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const previousFocusRef = useRef(null);
  const focusTrapRef = useFocusTrap(isOpen);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getInTouchSchema),
    defaultValues: getInTouchDefaultValues,
    mode: "onBlur",
  });

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const submitValues = useCallback(
    async (values) => {
      setStatus("submitting");
      try {
        await submitGetInTouch(values);
        setStatus("success");
        toast.success("Thank you for contacting us. Our team will reach out shortly.");
        window.setTimeout(() => {
          onSubmitted?.();
          reset();
          setStatus("idle");
        }, 1800);
      } catch {
        setStatus("error");
        toast.error("Something went wrong. Please try again.");
      }
    },
    [onSubmitted, reset],
  );

  const onSubmit = handleSubmit(submitValues);
  const handleRetry = useCallback(() => submitValues(getValues()), [getValues, submitValues]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus save / restore
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
    } else if (previousFocusRef.current?.focus) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // ESC closes
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Reset transient submit state whenever the modal is reopened
  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  const inputClass = (hasError) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
      hasError
        ? "border-red-400"
        : isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
          : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
    }`;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Scroll lives on this wrapper (not the flex-centered dialog
              itself) so a dialog taller than the viewport can still be
              scrolled to from the top — centering an overflowing flex
              item clips its leading edge with no way to reach it. */}
          <div className="fixed inset-0 overflow-y-auto p-4">
            <div className="flex min-h-screen items-center justify-center">
              <motion.div
                ref={focusTrapRef}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="dialog"
                aria-modal="true"
                aria-labelledby="get-in-touch-heading"
                className={`relative grid w-full sm:max-w-[680px] grid-cols-1 rounded-3xl shadow-elevated sm:grid-cols-[0.9fr_1.1fr] ${
                  isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
                }`}
              >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* LEFT — benefits panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 p-6 text-white sm:p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" aria-hidden="true" />

              <div className="relative">
                <h2 id="get-in-touch-heading" className="text-xl font-extrabold leading-tight sm:text-2xl">
                  🚀 Ready to Start Your Tech Career?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Speak with our career experts and receive personalized guidance.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
                  {trustStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="text-center">
                        <Icon className="mx-auto h-3.5 w-3.5 text-white/80" aria-hidden="true" />
                        <p className="mt-1 text-sm font-extrabold">{stat.value}</p>
                        <p className="text-[10px] text-white/70">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — form / status */}
            <div className="p-6 sm:p-7">
              {status === "success" ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500/15"
                  >
                    <CheckCircle2 className="h-9 w-9 text-secondary-500" aria-hidden="true" />
                  </motion.div>
                  <h3 className={`mt-4 text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    Thank you!
                  </h3>
                  <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Our team will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Get In Touch</h3>

                  <div className="mt-4 space-y-3.5">
                    <div>
                      <label htmlFor="git-name" className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="git-name"
                        type="text"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "git-name-error" : undefined}
                        className={inputClass(!!errors.name)}
                        placeholder="Your full name"
                        {...register("name")}
                      />
                      <FieldError id="git-name-error" message={errors.name?.message} />
                    </div>

                    <div>
                      <label htmlFor="git-email" className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="git-email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "git-email-error" : undefined}
                        className={inputClass(!!errors.email)}
                        placeholder="you@example.com"
                        {...register("email")}
                      />
                      <FieldError id="git-email-error" message={errors.email?.message} />
                    </div>

                    <div>
                      <label htmlFor="git-mobile" className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="git-mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        aria-invalid={!!errors.mobileNumber}
                        aria-describedby={errors.mobileNumber ? "git-mobile-error" : undefined}
                        className={inputClass(!!errors.mobileNumber)}
                        placeholder="10-digit mobile number"
                        {...register("mobileNumber")}
                      />
                      <FieldError id="git-mobile-error" message={errors.mobileNumber?.message} />
                    </div>

                    <div>
                      <label htmlFor="git-subject" className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Subject
                      </label>
                      <select
                        id="git-subject"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "git-subject-error" : undefined}
                        className={inputClass(!!errors.subject)}
                        defaultValue=""
                        {...register("subject")}
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {SUBJECT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FieldError id="git-subject-error" message={errors.subject?.message} />
                    </div>

                    <div>
                      <label htmlFor="git-message" className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="git-message"
                        rows={3}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "git-message-error" : undefined}
                        className={`${inputClass(!!errors.message)} resize-none`}
                        placeholder="Tell us what you're looking for (min. 20 characters)"
                        {...register("message")}
                      />
                      <FieldError id="git-message-error" message={errors.message?.message} />
                    </div>

                    {status === "error" && (
                      <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                        <p>We couldn&apos;t submit your request. Please try again.</p>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="mt-1.5 font-bold underline underline-offset-2"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="submit"
                      disabled={isSubmitting || status === "submitting"}
                      className="flex-1"
                    >
                      {status === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleClose} disabled={status === "submitting"}>
                      Maybe Later
                    </Button>
                  </div>
                </form>
              )}
            </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
