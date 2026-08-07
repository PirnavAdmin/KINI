import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider, useThemeContext } from "@shared/context/ThemeContext";
import { ModalProvider } from "@shared/context/ModalProvider";

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

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
        <ThemedToaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
