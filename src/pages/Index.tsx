
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedContent from "@/components/FeaturedContent";
import CommunitySection from "@/components/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedContent />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
