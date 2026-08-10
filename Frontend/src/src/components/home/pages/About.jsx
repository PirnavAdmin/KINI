import { Suspense, lazy } from "react";

import Navbar from "@shared/components/navbar";

import CTASection from "../components/about/CTASection.jsx";
import ComparisonSection from "../components/about/ComparisonSection.jsx";
import FoundersSection from "../components/about/FoundersSection.jsx";
import Hero from "../components/about/Hero.jsx";
import JourneySection from "../components/about/JourneySection.jsx";
import LearningEcosystem from "../components/about/LearningEcosystem.jsx";
import MissionVision from "../components/about/MissionVision.jsx";
import StorySection from "../components/about/StorySection.jsx";
import TrustSection from "../components/about/TrustSection.jsx";

const Footer = lazy(() => import("@shared/components/Footer"));

const aboutSections = [
  Hero,
  TrustSection,
  StorySection,
  MissionVision,
  LearningEcosystem,
  ComparisonSection,
  JourneySection,
  
  CTASection,
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:bg-none">
        {aboutSections.map((Section) => (
          <div
            key={Section.name}
            className="bg-white/50 backdrop-blur-sm transition-colors duration-300 hover:bg-white/70 dark:bg-transparent dark:backdrop-blur-none dark:hover:bg-transparent"
          >
            <Section />
          </div>
        ))}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
