import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ModalOverlay from "@shared/components/ModalOverlay";
import { useThemeContext } from "@shared/context/ThemeContext";
import { registerDefaultValues, registerSchema } from "@shared/schemas/registerSchema";
import { submitRegister } from "@shared/services/registerService";
import Button from "@shared/components/ui/Button";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-0.5 text-[11px] font-medium text-rose-500 animate-fadeIn">
      {message}
    </p>
  );
}

export default function RegisterModal({ isOpen, onClose, course, onSuccess }) {
  const { isDark } = useThemeContext();
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
    mode: "onBlur",
  });

  const submitValues = useCallback(
    async (values) => {
      setStatus("submitting");
      try {
        // API expects `program` alongside the form fields — it isn't
        // something the user types, it comes from whichever course this
        // modal was opened for, so it's merged in here rather than being
        // a form field.
        await submitRegister({ ...values, program: course?.title ?? "" });
        setStatus("success");
        toast.success("Registration completed successfully.");
        if (onSuccess) {
          onSuccess();
          reset();
          setStatus("idle");
        } else {
          window.setTimeout(() => {
            onClose?.();
            reset();
            setStatus("idle");
          }, 1500);
        }
      } catch {
        setStatus("error");
        toast.error("Something went wrong. Please try again.");
      }
    },
    [course, onClose, onSuccess, reset],
  );

  const onSubmit = handleSubmit(submitValues);
  const handleRetry = useCallback(() => submitValues(getValues()), [getValues, submitValues]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  const inputClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2 text-xs outline-none transition-all duration-200 shadow-sm ${
      hasError
        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
        : isDark
          ? "border-slate-800 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-slate-600 focus:bg-slate-900/80 focus:ring-2 focus:ring-slate-700/20"
          : "border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
    }`;

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose} labelledBy="register-modal-heading">
      <div className={`relative overflow-hidden rounded-xl ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        {/* Subtle decorative gradient background flare */}
        <div className="absolute -right-20 -top-20 h-32 w-32 rounded-full bg-slate-500/10 blur-2xl pointer-events-none" />

        {status === "success" ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center text-center p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
              <CheckCircle2 className="h-7 w-7 text-emerald-500 animate-bounce" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-bold tracking-tight">
              Registration completed successfully
            </h3>
            <p className={`mt-1 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              We&apos;re excited to have you on board. Redirecting shortly...
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="p-0.5">
            <div className="space-y-0.5">
              <h2 id="register-modal-heading" className="text-base font-bold tracking-tight">
                Create your account
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Enter your details to get started with the program.
              </p>
            </div>

            {course && (
              <div
                className={`mt-3.5 flex items-center gap-2.5 rounded-lg border px-3 py-2 shadow-sm ${
                  isDark 
                    ? "border-slate-700 bg-slate-900/60 text-slate-200" 
                    : "border-slate-200 bg-slate-100/70 text-slate-800"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-800 text-slate-200 dark:bg-slate-800">
                  <GraduationCap className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Selected Program</p>
                  <p className="text-[11px] font-bold leading-tight">{course.title}</p>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="reg-name" className={`mb-1 block text-[11px] font-semibold tracking-wide ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "reg-name-error" : undefined}
                  className={inputClass(!!errors.name)}
                  placeholder="Alex Johnson"
                  {...register("name")}
                />
                <FieldError id="reg-name-error" message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="reg-email" className={`mb-1 block text-[11px] font-semibold tracking-wide ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "reg-email-error" : undefined}
                  className={inputClass(!!errors.email)}
                  placeholder="alex@company.com"
                  {...register("email")}
                />
                <FieldError id="reg-email-error" message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="reg-mobile" className={`mb-1 block text-[11px] font-semibold tracking-wide ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  aria-invalid={!!errors.mobileNumber}
                  aria-describedby={errors.mobileNumber ? "reg-mobile-error" : undefined}
                  className={inputClass(!!errors.mobileNumber)}
                  placeholder="9876543210"
                  {...register("mobileNumber")}
                />
                <FieldError id="reg-mobile-error" message={errors.mobileNumber?.message} />
              </div>

              <div>
                <label htmlFor="reg-qualification" className={`mb-1 block text-[11px] font-semibold tracking-wide ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Degree Details <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-qualification"
                  type="text"
                  aria-invalid={!!errors.qualification}
                  aria-describedby={errors.qualification ? "reg-qualification-error" : undefined}
                  className={inputClass(!!errors.qualification)}
                  placeholder="B.Tech Computer Science, 2024"
                  {...register("qualification")}
                />
                <FieldError id="reg-qualification-error" message={errors.qualification?.message} />
              </div>

              {status === "error" && (
                <div role="alert" className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2 text-[11px] font-medium text-rose-500 animate-fadeIn">
                  <p>We couldn&apos;t submit your registration. Please check your network connection.</p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-0.5 font-bold underline underline-offset-2 hover:opacity-85"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || status === "submitting"}
              className={`mt-5 w-full rounded-lg py-2 text-xs font-medium tracking-wide transition-all shadow-sm ${
                isDark
                  ? "bg-slate-100 text-slate-900 hover:bg-white active:bg-slate-200"
                  : "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950"
              }`}
            >
              {status === "submitting" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Creating account...
                </span>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        )}
      </div>
    </ModalOverlay>
  );
}