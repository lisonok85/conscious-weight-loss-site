
import { LeafyGreen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-4">
              <LeafyGreen size={20} />
              <span className="text-lg font-bold">Мир осознанного похудения</span>
            </div>
            <p className="text-muted-foreground">
              Платформа для обмена опытом и поддержки на пути к здоровому образу жизни и осознанному похудению.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-foreground hover:text-primary transition-colors">
                  Рецепты
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-foreground hover:text-primary transition-colors">
                  Истории успеха
                </Link>
              </li>
              <li>
                <Link to="/photos" className="text-foreground hover:text-primary transition-colors">
                  Фотографии
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <p className="text-muted-foreground mb-2">Присоединяйтесь к нашему сообществу</p>
            <p className="text-muted-foreground">info@mirpohudeniya.ru</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Мир осознанного похудения. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
