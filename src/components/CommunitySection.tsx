
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Utensils, Users } from "lucide-react";

const CommunitySection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к сообществу</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Делитесь своими успехами, рецептами и фотографиями. Найдите поддержку и вдохновение 
            от единомышленников на пути к осознанному похудению.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">Делитесь рецептами</h3>
            <p className="text-muted-foreground mb-4">
              Публикуйте свои любимые полезные рецепты, которые помогают вам на пути к здоровому образу жизни.
            </p>
            <Button asChild variant="outline">
              <Link to="/recipes">Рецепты</Link>
            </Button>
          </div>

          <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">Истории успеха</h3>
            <p className="text-muted-foreground mb-4">
              Расскажите свою историю похудения, поделитесь опытом и вдохновите других на достижение результатов.
            </p>
            <Button asChild variant="outline">
              <Link to="/stories">Истории</Link>
            </Button>
          </div>

          <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">Фотографии</h3>
            <p className="text-muted-foreground mb-4">
              Добавляйте фотографии своего прогресса, любимых блюд и тренировок, чтобы мотивировать себя и других.
            </p>
            <Button asChild variant="outline">
              <Link to="/photos">Фотографии</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
