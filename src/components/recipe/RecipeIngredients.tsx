
import { Recipe } from "@/types/recipe";

interface RecipeIngredientsProps {
  recipe: Recipe;
}

const RecipeIngredients = ({ recipe }: RecipeIngredientsProps) => {
  return (
    <div className="bg-muted/30 p-6 rounded-lg h-fit">
      <h2 className="text-xl font-bold mb-4">Ингредиенты</h2>
      <p className="text-sm text-muted-foreground mb-4">
        На {recipe.portions} {recipe.portions === 1 ? 'порцию' : 'порции'}
      </p>
      
      <ul className="space-y-2 mb-6">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="h-5 w-5 rounded border flex-shrink-0 mt-0.5"></div>
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
      
      <h3 className="font-bold mb-2">Пищевая ценность (на порцию)</h3>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div>Белки: {recipe.nutritionalInfo.protein}</div>
        <div>Жиры: {recipe.nutritionalInfo.fats}</div>
        <div>Углеводы: {recipe.nutritionalInfo.carbs}</div>
        <div>Клетчатка: {recipe.nutritionalInfo.fiber}</div>
      </div>
    </div>
  );
};

export default RecipeIngredients;
