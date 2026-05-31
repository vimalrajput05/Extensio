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
      <Link
        to="/dashboard"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default HomePage;