
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const recipeCategories = [
  { id: "all", label: "Все рецепты" },
  { id: "breakfast", label: "Завтраки" },
  { id: "lunch", label: "Обеды" },
  { id: "dinner", label: "Ужины" },
  { id: "snacks", label: "Перекусы" },
];

const recipes = [
  {
    id: 1,
    title: "Овощной смузи-боул",
    description: "Питательный и низкокалорийный завтрак",
    image: "/placeholder.svg",
    calories: 250,
    time: "15 мин",
    category: "breakfast",
  },
  {
    id: 2,
    title: "Запеченная курица с травами",
    description: "Богатый белком и низкоуглеводный ужин",
    image: "/placeholder.svg",
    calories: 320,
    time: "45 мин",
    category: "dinner",
  },
  {
    id: 3,
    title: "Салат с киноа и авокадо",
    description: "Полезный обед с полным набором нутриентов",
    image: "/placeholder.svg",
    calories: 280,
    time: "20 мин",
    category: "lunch",
  },
  {
    id: 4,
    title: "Протеиновые оладьи без муки",
    description: "Идеальный завтрак для поддержания мышечной массы",
    image: "/placeholder.svg",
    calories: 310,
    time: "25 мин",
    category: "breakfast",
  },
  {
    id: 5,
    title: "Орехово-фруктовый батончик",
    description: "Энергетическая бомба без добавленного сахара",
    image: "/placeholder.svg",
    calories: 180,
    time: "10 мин",
    category: "snacks",
  },
  {
    id: 6,
    title: "Суп-пюре из брокколи",
    description: "Легкий и согревающий обед",
    image: "/placeholder.svg",
    calories: 210,
    time: "30 мин",
    category: "lunch",
  },
];

const Recipes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Полезные рецепты</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Коллекция вкусных и полезных рецептов для поддержания здорового образа жизни
              и осознанного похудения.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Поиск рецептов..." 
                className="pl-10 w-full md:w-[300px]"
              />
            </div>
            <Button className="bg-primary">Добавить рецепт</Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-8 w-full overflow-x-auto flex justify-start sm:justify-center">
              {recipeCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="min-w-max"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {recipeCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes
                    .filter(recipe => category.id === "all" || recipe.category === category.id)
                    .map((recipe) => (
                      <ContentCard
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        image={recipe.image}
                        link={`/recipes/${recipe.id}`}
                        footer={
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <span>{recipe.calories} ккал</span>
                            <span>{recipe.time}</span>
                          </div>
                        }
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
