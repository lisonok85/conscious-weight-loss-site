
import { Link } from "react-router-dom";
import { ArrowLeft, User, Clock, Flame } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeHeaderProps {
  recipe: Recipe;
}

const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Link to="/recipes" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться к рецептам
        </Link>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-primary" />
          <span>Автор: {recipe.author}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span>{recipe.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Flame className="w-4 h-4 text-primary" />
          <span>{recipe.calories} ккал</span>
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
