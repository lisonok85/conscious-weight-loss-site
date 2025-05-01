
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedContent from "@/components/FeaturedContent";
import CommunitySection from "@/components/CommunitySection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const isLoggedIn = localStorage.getItem("user") !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection 
          title="Мир осознанного похудения"
          description="Сообщество людей, стремящихся к здоровому образу жизни через правильное питание и осознанный подход к своему телу"
          ctaButton={
            isLoggedIn ? (
              <Button asChild size="lg">
                <Link to="/profile">Мой личный кабинет</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/register">Начать путь к здоровью</Link>
              </Button>
            )
          }
          secondaryButton={
            isLoggedIn ? (
              <Button variant="outline" asChild size="lg">
                <Link to="/recipes">Исследовать рецепты</Link>
              </Button>
            ) : (
              <Button variant="outline" asChild size="lg">
                <Link to="/login">Уже с нами? Войти</Link>
              </Button>
            )
          }
        />
        <FeaturedContent />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
