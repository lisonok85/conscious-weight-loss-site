
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIImageGenerator from "@/components/AIImageGenerator";
import { Photo, Recipe } from "@/types/recipe";

interface RecipeGalleryProps {
  recipe: Recipe;
}

const RecipeGallery = ({ recipe }: RecipeGalleryProps) => {
  // Добавляем основное фото в список всех фото для подсчета
  const totalPhotos = recipe.additionalPhotos.length + 1;
  
  return (
    <Tabs defaultValue="main" className="mb-8">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="main">Основное фото</TabsTrigger>
        <TabsTrigger value="gallery">Галерея ({totalPhotos})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="main">
        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
          <AIImageGenerator 
            prompt={recipe.imagePrompt}
            alt={recipe.title} 
            className="w-full h-full"
            fallbackSrc={recipe.image}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Основное фото в галерее */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <AIImageGenerator 
              prompt={recipe.imagePrompt}
              alt={recipe.title} 
              className="w-full h-full"
              fallbackSrc={recipe.image}
            />
          </div>
          
          {/* Дополнительные фото */}
          {recipe.additionalPhotos.map((photo, index) => (
            <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
              <AIImageGenerator 
                prompt={photo.prompt}
                alt={photo.alt} 
                className="w-full h-full"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RecipeGallery;
