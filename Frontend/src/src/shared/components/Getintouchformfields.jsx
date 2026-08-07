import { useCallback, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { getInTouchDefaultValues, getInTouchSchema, SUBJECT_OPTIONS } from "@shared/schemas/getInTouchSchema";
import { submitGetInTouch } from "@shared/services/getInTouchService";
import Button from "@shared/components/ui/Button";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs font-medium text-red-500">
      {message}
    </p>
  );
}

/**
 * The real Get In Touch form: same react-hook-form + zod validation and the
 * same submitGetInTouch API call that GetInTouchModal already used. Lives
 * here so it can be dropped in either behind a modal (GetInTouchModal) or
 * directly on a page with no click required (e.g. the Contact sidebar) —
 * one submission path, no duplicated logic between the two.
 *
 * @param {() => void} [onSubmitted] - called ~1.8s after a successful
 *   submit (after the success state has been visible for a beat). In the
 *   modal this is what closes it; inline, it's optional.
 * @param {string|null} [heading] - form heading. Pass null/omit to suppress
 *   it when the surrounding layout already has its own heading.
 */
export default function GetInTouchFormFields({ onSubmitted, heading = null }) {
  const { isDark } = useThemeContext();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const uid = useId();

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

  const inputClass = (hasError) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
      hasError
        ? "border-red-400"
        : isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
          : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
    }`;

  if (status === "success") {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
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
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {heading && (
        <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{heading}</h3>
      )}

      <div className={`${heading ? "mt-4" : ""} space-y-3.5`}>
        <div>
          <label htmlFor={`${uid}-name`} className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
            {...register("name")}
          />
          <FieldError id={`${uid}-name-error`} message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
            {...register("email")}
          />
          <FieldError id={`${uid}-email-error`} message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-mobile`} className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-mobile`}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            aria-invalid={!!errors.mobileNumber}
            aria-describedby={errors.mobileNumber ? `${uid}-mobile-error` : undefined}
            className={inputClass(!!errors.mobileNumber)}
            placeholder="10-digit mobile number"
            {...register("mobileNumber")}
          />
          <FieldError id={`${uid}-mobile-error`} message={errors.mobileNumber?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-subject`} className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Subject
          </label>
          <select
            id={`${uid}-subject`}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? `${uid}-subject-error` : undefined}
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
          <FieldError id={`${uid}-subject-error`} message={errors.subject?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className={`mb-1.5 block text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            rows={3}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            className={`${inputClass(!!errors.message)} resize-none`}
            placeholder="Tell us what you're looking for (min. 20 characters)"
            {...register("message")}
          />
          <FieldError id={`${uid}-message-error`} message={errors.message?.message} />
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

      <div className="mt-5">
        <Button type="submit" disabled={isSubmitting || status === "submitting"} className="w-full">
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}