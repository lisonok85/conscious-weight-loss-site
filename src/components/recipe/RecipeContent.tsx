
import { Recipe } from "@/types/recipe";

interface RecipeContentProps {
  recipe: Recipe;
}

const RecipeContent = ({ recipe }: RecipeContentProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Описание</h2>
      <p className="mb-6">{recipe.description}</p>
      
      <h2 className="text-xl font-bold mb-4">Приготовление</h2>
      <ol className="space-y-3 mb-6">
        {recipe.steps.map((step, index) => (
          <li key={index} className="pl-6 relative">
            <span className="absolute left-0 font-bold">{index + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeContent;
