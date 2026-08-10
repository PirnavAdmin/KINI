import { Suspense, lazy, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import Navbar from "@shared/components/navbar";
import WhatsAppButton from "@shared/components/WhatsAppButton";
import useLeadPopup from "@shared/hooks/useLeadPopup";

import Hero from "../components/Hero";
import CardFlip from "../components/CardFlip";
import { FaCode, FaServer, FaBrain } from "react-icons/fa";
import CareerRoadmapGenerator from "../components/Careerroadmapgenerator";

const Footer = lazy(() => import("@shared/components/Footer"));
const ProjectNew = lazy(() => import("./ProjectNew"));
const TrustedCompanies = lazy(() => import("../components/TrustedCompanies"));
const StudentJourney = lazy(() => import("../components/StudentJourney"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const DashboardShowcase = lazy(() => import("../components/DashboardShowcase"));
const Categories = lazy(() => import("../components/Categories"));
const FeaturedCourses = lazy(() => import("../components/FeaturedCourses"));
const LearningPaths = lazy(() => import("../components/LearningPaths"));
const Stats = lazy(() => import("../components/Stats"));
const ExpertMentors = lazy(() => import("../components/ExpertMentors"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Newsletter = lazy(() => import("../components/Newsletter"));
const CTA = lazy(() => import("../components/CTA"));
const EnquiryWidget = lazy(() => import("./EnquiryWidget"));
const GetInTouchModal = lazy(() => import("@shared/components/GetInTouchModal"));

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedSection({ children, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [loadRest, setLoadRest] = useState(false);
  const [loadWidgets, setLoadWidgets] = useState(false);
  const leadPopup = useLeadPopup();

  const handleOpenEnquiry = useCallback(() => setIsEnquiryOpen(true), []);
  const handleCloseEnquiry = useCallback(() => setIsEnquiryOpen(false), []);

  useEffect(() => {
    const contentTimer = window.setTimeout(() => setLoadRest(true), 50);
    const widgetTimer = window.setTimeout(() => setLoadWidgets(true), 1400);

    return () => {
      window.clearTimeout(contentTimer);
      window.clearTimeout(widgetTimer);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="relative z-10">
        <main className="overflow-x-clip">
          <Hero />

          {loadRest && (
            <Suspense fallback={null}>
              <AnimatedSection>
                <CareerRoadmapGenerator/>
              </AnimatedSection>
              <AnimatedSection>
                <FeaturedCourses />
              </AnimatedSection>
              <AnimatedSection>
                <TrustedCompanies />
              </AnimatedSection>
              <AnimatedSection>
                <StudentJourney />
              </AnimatedSection>
              <AnimatedSection>
                <WhyChooseUs />
              </AnimatedSection>
              <AnimatedSection>
                <Categories />
              </AnimatedSection>
            </Suspense>
          )}

          {/* Isolated in its own Suspense: this section depends on a
              third-party Lottie CDN (lottie.host) that can suspend
              indefinitely if slow/unreachable. Kept separate so that
              failure can't blank out every other section, which shared
              one Suspense boundary with it previously. */}
          {loadRest && (
            <Suspense fallback={null}>
              <AnimatedSection>
                <ProjectNew />
              </AnimatedSection>
            </Suspense>
          )}

          {loadRest && (
            <Suspense fallback={null}>
              {/* CARD FLIP */}
             <section className="py-16 md:py-20 bg-white dark:bg-app-dark-gradient">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF4FC] dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-[#085FA7] dark:text-blue-300">
        <div className="w-2 h-2 rounded-full bg-[#085FA7] dark:bg-blue-300 animate-pulse" />
        Choose Your Path
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
        Explore Our{" "}
        <span className="bg-gradient-to-r from-[#085FA7] to-[#5CA347] bg-clip-text text-transparent">
          Career Tracks
        </span>
      </h2>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <CardFlip
        title="Frontend"
        subtitle="Master Modern Web Development"
        description="Build beautiful, responsive interfaces with React, Next.js, and modern CSS frameworks."
        features={[
          "React & Next.js",
          "TypeScript Mastery",
          "Responsive Design",
          "State Management",
          "API Integration",
        ]}
        icon={FaCode}
      />
      <CardFlip
        title="Backend"
        subtitle="Build Scalable Systems"
        description="Design robust APIs, manage databases, and deploy cloud-native server applications at scale."
        features={[
          "Node.js & Express",
          "REST & GraphQL APIs",
          "Database Design",
          "Authentication",
          "Cloud Deployment",
        ]}
        icon={FaServer}
      />
      <CardFlip
        title="AI"
        subtitle="Shape the Future"
        description="Master machine learning, deep learning, and build intelligent applications that solve real problems."
        features={[
          "Python & ML",
          "Neural Networks",
          "NLP & Computer Vision",
          "TensorFlow & PyTorch",
          "AI Deployment",
        ]}
        icon={FaBrain}
      />
    </div>
  </div>
</section>

              <AnimatedSection>
                <LearningPaths />
              </AnimatedSection>
              <AnimatedSection>
                <Stats />
              </AnimatedSection>
            
              <AnimatedSection>
                <Testimonials />
              </AnimatedSection>
              <AnimatedSection>
                <Newsletter />
              </AnimatedSection>
              <AnimatedSection>
                <CTA onOpenEnquiry={handleOpenEnquiry} />
              </AnimatedSection>
            </Suspense>
          )}
        </main>

        {loadRest && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>

      {loadWidgets && (
        <Suspense fallback={null}>
          <EnquiryWidget isOpen={isEnquiryOpen} onClose={handleCloseEnquiry} />
         <GetInTouchModal isOpen={leadPopup.isOpen} onClose={leadPopup.close} />
        </Suspense>
      )}
      <WhatsAppButton />
    </>
  );
}

export default Home;