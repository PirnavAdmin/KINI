import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider, useThemeContext } from "@shared/context/ThemeContext";
import { ModalProvider } from "@shared/context/ModalProvider";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import KiniChatbot from "./components/home/components/Kinichatbot";

const Home = lazy(() => import("./components/home/pages/Home"));
const About = lazy(() => import("./components/home/pages/About"));
const Blog = lazy(() => import("./components/home/pages/Blog"));
const Career = lazy(() => import("./components/home/pages/Career"));
const Contact = lazy(() => import("./components/home/pages/Contact"));
const Mentors = lazy(() => import("./components/home/pages/Mentors"));
const FAQ = lazy(() => import("./components/home/pages/FAQ"));
const Features = lazy(() => import("./components/home/pages/Features"));
const MissionVision = lazy(() => import("./components/home/pages/MissionVision"));
const WhoWeAre = lazy(() => import("./components/home/pages/WhoWeAre"));
const OrganizationStructure = lazy(() => import("./components/home/pages/OrganizationStructure"));
const TeamGallery = lazy(() => import("./components/home/pages/TeamGallery"));
const WhyChooseUs = lazy(() => import("./components/home/pages/WhyChooseUs"));
const WhyChooseUsAbout = lazy(() => import("./components/home/pages/WhyChooseUsAbout"));
const FounderSection = lazy(() => import("./components/home/pages/FounderSection"));
const StudentReviews = lazy(() => import("./components/home/pages/StudentReviews"));
const SuccessStories = lazy(() => import("./components/home/pages/SuccessStories"));
const Lightfall = lazy(() => import("./components/home/pages/Lightfall"));
const PremiumELearning = lazy(() => import("./components/home/pages/PremiumELearning"));
const UpskillCourseProgram = lazy(() => import("./components/home/pages/UpskillCourseProgram"));
const PremiumDashboard = lazy(() => import("./components/home/pages/PremiumDashboard"));
const ProjectNew = lazy(() => import("./components/home/pages/ProjectNew"));
const AIEngineeringImmersive = lazy(() => import("./components/home/components/AIEngineeringImmersive"));
const TermsAndConditions = lazy(() => import("./components/home/pages/legal/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./components/home/pages/legal/PrivacyPolicy"));
const NotFound = lazy(() => import("./components/home/pages/NotFound"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function ThemedToaster() {
  const { isDark } = useThemeContext();
  return <Toaster theme={isDark ? "dark" : "light"} position="top-center" richColors closeButton />;
}

// ─── Floating WhatsApp Button ──────────────────────────────────────────────
// Moved to bottom-24 so it sits above the Kini chatbot launcher
function WhatsAppButton() {
  const { isDark } = useThemeContext();
  const phoneNumber = "919000198239"; // Replace with your number (without +)
  const message = "Hello! I'm interested in your programs.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-green-500/30 transition-colors duration-200"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      }}
    >
      <FaWhatsapp className="h-7 w-7 text-white" aria-hidden="true" />
    </motion.a>
  );
}

// ─── Themed Kini Chatbot (reads isDark from ThemeContext) ──────────────────
// function ThemedChatbot() {
//   const { isDark } = useThemeContext();
//   return <KiniChatbot isDark={isDark} />;
// }

// ─── App Routes ─────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/features" element={<Features />} />
        <Route path="/mission-vision" element={<MissionVision />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/organization-structure" element={<OrganizationStructure />} />
        <Route path="/team-gallery" element={<TeamGallery />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/why-choose-us-about" element={<WhyChooseUsAbout />} />
        <Route path="/founder-section" element={<FounderSection />} />
        <Route path="/student-reviews" element={<StudentReviews />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/lightfall" element={<Lightfall />} />
        <Route path="/upskill-program" element={<UpskillCourseProgram />} />
        <Route path="/admissions" element={<UpskillCourseProgram />} />
        <Route path="/courses" element={<PremiumELearning />} />
        <Route path="/courses/:slug" element={<PremiumELearning />} />
        <Route path="/course-curriculum/:slug" element={<PremiumELearning />} />
        <Route path="/ai-engineering-immersive" element={<AIEngineeringImmersive />} />
        <Route path="/project-new" element={<ProjectNew />} />
        <Route path="/placement" element={<Career />} />
        <Route path="/students" element={<SuccessStories />} />
        <Route path="/dashboard" element={<PremiumDashboard />} />
        <Route path="/premium-dashboard" element={<PremiumDashboard />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ModalProvider>
          <AppRoutes />

          {/* WhatsApp button — sits above the chatbot launcher */}
          <WhatsAppButton />

          {/* Kini AI Chatbot — fixed bottom-right, theme-aware */}
          {/* <ThemedChatbot /> */}
        </ModalProvider>
        <ThemedToaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;