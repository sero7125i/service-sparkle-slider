import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CategorySlider from "@/components/CategorySlider";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CategorySlider />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
};

export default Index;
