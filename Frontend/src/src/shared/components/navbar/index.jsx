import { Suspense, lazy, useCallback, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Moon, Sun, UserPlus, X } from "lucide-react";
import { ROUTES } from "@shared/constants/routeConstants";
import { useThemeContext } from "@shared/context/ThemeContext";
import Button from "@shared/components/ui/Button";
import kiniLogo from "../../../assets/Kini (7).svg";

const RegisterModal = lazy(() => import("../RegisterModal"));

const navItems = [
  { label: "Home", to: ROUTES.PUBLIC.HOME },
  { label: "About Us", to: ROUTES.PUBLIC.ABOUT },
  { label: "Programs", to: ROUTES.PUBLIC.UPSKILL_PROGRAM },
  { label: "Contact Us", to: ROUTES.PUBLIC.CONTACT },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [hasOpenedRegister, setHasOpenedRegister] = useState(false);
  const { isDark, toggleTheme } = useThemeContext();

  const openRegister = useCallback(() => {
    setHasOpenedRegister(true);
    setIsRegisterOpen(true);
    setMenuOpen(false);
  }, []);
  const closeRegister = useCallback(() => setIsRegisterOpen(false), []);

  const linkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      isActive
        ? isDark
          ? "bg-primary-500/15 text-primary-300"
          : "bg-primary-50 text-primary-700"
        : isDark
          ? "text-white/70 hover:bg-white/10 hover:text-white"
          : "text-ink-900/70 hover:bg-primary-50/60 hover:text-primary-700",
    ].join(" ");

  const iconButtonClass = isDark
    ? "border-white/10 text-white/80 hover:bg-white/10"
    : "border-ink-900/10 text-ink-900/70 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700";

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${isDark ? "border-white/5 bg-ink-950/85" : "border-ink-900/5 bg-porcelain/85"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.PUBLIC.HOME} className="flex shrink-0 items-center gap-3">
          <img
            src={kiniLogo}
            alt="Kini Edu Hub logo"
            className="block h-9 w-auto max-w-none object-contain object-left sm:h-10 lg:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop Register button with gradient */}
          <div className="hidden md:block">
            <Button
              type="button"
              onClick={openRegister}
              className="register-btn !h-11 !px-5 !rounded-full !border-0 !text-white shadow-[0_12px_30px_rgba(30,115,189,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(30,115,189,0.35)]"
            >
              <UserPlus className="h-[18px] w-[18px]" aria-hidden="true" />
              Register
            </Button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${iconButtonClass}`}
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${iconButtonClass}`}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 md:hidden ${
          isDark ? "border-white/10 bg-ink-950" : "border-ink-900/5 bg-porcelain"
        } ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {/* Mobile Register button with same gradient */}
          <Button
            type="button"
            onClick={openRegister}
            className="register-btn mt-2 w-full justify-center !h-11 !px-5 !rounded-full !border-0 !text-white shadow-[0_12px_30px_rgba(30,115,189,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(30,115,189,0.35)]"
          >
            <UserPlus className="h-[18px] w-[18px]" aria-hidden="true" />
            Register
          </Button>
        </div>
      </div>

      {hasOpenedRegister && (
        <Suspense fallback={null}>
          <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
        </Suspense>
      )}

      {/* Global style to apply gradient to .register-btn */}
      <style>{`
        .register-btn {
          background: linear-gradient(90deg, #1E73BD 0%, #2890B8 35%, #35A89D 65%, #58B347 100%) !important;
        }
        .register-btn:hover {
          background: linear-gradient(90deg, #1A65A8 0%, #2382A5 35%, #2E9A8C 65%, #4D9E3F 100%) !important;
        }
      `}</style>
    </header>
  );
}