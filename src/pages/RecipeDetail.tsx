
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { findRecipeById } from "@/data/recipes";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeGallery from "@/components/recipe/RecipeGallery";
import RecipeContent from "@/components/recipe/RecipeContent";
import RecipeIngredients from "@/components/recipe/RecipeIngredients";
import RecipeActions from "@/components/recipe/RecipeActions";
import RecipeNotFound from "@/components/recipe/RecipeNotFound";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = id ? findRecipeById(id) : undefined;

  if (!recipe) {
    return <RecipeNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <article className="container mx-auto px-4 max-w-4xl">
          <RecipeHeader recipe={recipe} />
          <RecipeGallery recipe={recipe} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <RecipeContent recipe={recipe} />
            </div>
            <RecipeIngredients recipe={recipe} />
          </div>
          
          <Separator className="mb-6" />
          <RecipeActions recipe={recipe} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
