import Navbar     from "../components/common/Navbar";
import Hero       from "../components/landing/Hero";
import Features   from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Stats      from "../components/landing/Stats";
import Team       from "../components/landing/Team";
import CTABanner  from "../components/landing/CTABanner";
import Footer     from "../components/common/Footer";

export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Team />
      <CTABanner />
      <Footer />
    </div>
  );
}
