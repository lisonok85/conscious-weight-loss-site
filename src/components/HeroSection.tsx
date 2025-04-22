
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-background py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-foreground">
              Мир <span className="text-primary">осознанного</span> похудения
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Делитесь своим опытом, рецептами и результатами. Вдохновляйтесь историями других и находите поддержку на пути к здоровому образу жизни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="text-md">
                <Link to="/stories">Истории успеха</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-md">
                <Link to="/recipes" className="flex items-center">
                  Полезные рецепты
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl transform md:rotate-1 transition hover:rotate-0">
              <img 
                src="/placeholder.svg" 
                alt="Здоровое питание" 
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 p-6 bg-background rounded-xl shadow-lg transform -rotate-3 transition hover:rotate-0 hidden md:block">
              <div className="text-sm font-medium mb-1">Прогресс</div>
              <div className="text-2xl font-bold text-primary">-15 кг</div>
              <div className="text-xs text-muted-foreground">за 6 месяцев</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
