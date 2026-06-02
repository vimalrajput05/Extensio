import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "../components/FeaturesSection";
import ProFeatures from "../components/ProFeatures";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <ProFeatures />
      <Footer />
      
    </div>
  );
}

export default HomePage;