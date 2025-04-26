
import { Button } from "@/components/ui/button";
import { Heart, Share2, Printer } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeActionsProps {
  recipe: Recipe;
}

const RecipeActions = ({ recipe }: RecipeActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Heart className="w-4 h-4" />
          <span>{recipe.likes}</span>
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Поделиться
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="w-4 h-4 mr-2" />
          Распечатать
        </Button>
      </div>
      <Button>Сохранить в избранное</Button>
    </div>
  );
};

export default RecipeActions;
