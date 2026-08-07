import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SIZES = {
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-sm gap-2",
};

const VARIANTS = {
  primary:
    "bg-ink-900 text-white font-semibold shadow-glow dark:bg-white dark:text-ink-900",
  secondary:
    "border border-ink-900/15 bg-white text-ink-900 font-semibold hover:bg-ink-900/[0.03] dark:bg-white/5 dark:text-white dark:border-white/15 dark:hover:bg-white/10",
  ghost:
    "text-brand-indigo font-semibold hover:bg-brand-indigo/5 dark:text-primary-300 dark:hover:bg-white/5",
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950";

/**
 * Polymorphic CTA button: renders a react-router <Link> when given `to`,
 * a plain <a> when given `href`, otherwise a <button>. Centralizes the
 * gradient/outline/ghost styles that were previously hand-copied per
 * section.
 */
const Button = forwardRef(function Button(
  { to, href, variant = "primary", size = "md", icon: Icon, className = "", children, ...props },
  ref,
) {
  const classes = `inline-flex items-center justify-center rounded-pill transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 ${FOCUS_RING} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
    </>
  );
  const motionProps = props.disabled
    ? {}
    : { whileHover: { y: -2, scale: 1.02 }, whileTap: { scale: 0.97 } };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link ref={ref} to={to} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a ref={ref} href={href} className={classes} {...motionProps} {...props}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} type="button" className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
});

export default Button;
