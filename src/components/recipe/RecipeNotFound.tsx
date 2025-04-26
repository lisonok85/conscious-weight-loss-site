
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RecipeNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Рецепт не найден</h1>
          <p className="mb-6">К сожалению, запрашиваемый рецепт не существует.</p>
          <Button asChild>
            <Link to="/recipes">Вернуться к рецептам</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeNotFound;
