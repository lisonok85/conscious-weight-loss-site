
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import AIImageGenerator from "@/components/AIImageGenerator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FileInput } from "@/components/ui/file-input";

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
    imagePrompt: "Здоровый завтрак, смузи-боул с фруктами и ягодами, фуд-фотография, яркие цвета",
    calories: 250,
    time: "15 мин",
    category: "breakfast",
  },
  {
    id: 2,
    title: "Запеченная курица с травами",
    description: "Богатый белком и низкоуглеводный ужин",
    image: "/placeholder.svg",
    imagePrompt: "Запеченная куриная грудка с травами и лимоном, здоровая еда, фуд-фотография",
    calories: 320,
    time: "45 мин",
    category: "dinner",
  },
  {
    id: 3,
    title: "Салат с киноа и авокадо",
    description: "Полезный обед с полным набором нутриентов",
    image: "/placeholder.svg",
    imagePrompt: "Салат с киноа, авокадо и овощами, здоровое питание, фуд-фотография",
    calories: 280,
    time: "20 мин",
    category: "lunch",
  },
  {
    id: 4,
    title: "Протеиновые оладьи без муки",
    description: "Идеальный завтрак для поддержания мышечной массы",
    image: "/placeholder.svg",
    imagePrompt: "Протеиновые оладьи с ягодами, здоровый завтрак, без муки, фуд-фотография",
    calories: 310,
    time: "25 мин",
    category: "breakfast",
  },
  {
    id: 5,
    title: "Орехово-фруктовый батончик",
    description: "Энергетическая бомба без добавленного сахара",
    image: "/placeholder.svg",
    imagePrompt: "Домашние энергетические батончики с орехами и сухофруктами, здоровый перекус, фуд-фотография",
    calories: 180,
    time: "10 мин",
    category: "snacks",
  },
  {
    id: 6,
    title: "Суп-пюре из брокколи",
    description: "Легкий и согревающий обед",
    image: "/placeholder.svg",
    imagePrompt: "Крем-суп из брокколи, здоровое питание, фуд-фотография, зеленый цвет",
    calories: 210,
    time: "30 мин",
    category: "lunch",
  },
];

// Схема валидации для формы добавления рецепта
const recipeFormSchema = z.object({
  title: z.string().min(3, "Название должно содержать минимум 3 символа").max(100, "Слишком длинное название"),
  description: z.string().min(10, "Описание должно содержать минимум 10 символов").max(500, "Слишком длинное описание"),
  ingredients: z.string().min(10, "Ингредиенты должны содержать минимум 10 символов"),
  instructions: z.string().min(10, "Инструкции должны содержать минимум 10 символов"),
  category: z.string().min(1, "Выберите категорию"),
  calories: z.string().min(1, "Укажите калорийность"),
  time: z.string().min(1, "Укажите время приготовления"),
  imagePrompt: z.string().min(10, "Описание для генерации изображения должно содержать минимум 10 символов"),
  photos: z.array(z.instanceof(File)).optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

const Recipes = () => {
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipesList, setRecipesList] = useState(recipes);
  const { toast } = useToast();

  // Инициализация формы
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      category: "",
      calories: "",
      time: "",
      imagePrompt: "",
      photos: [],
    },
  });

  // Обработка отправки формы
  const onSubmit = (data: RecipeFormValues) => {
    // Создаем новый рецепт
    const newRecipe = {
      id: recipesList.length + 1,
      title: data.title,
      description: data.description,
      image: data.photos && data.photos.length > 0 
        ? URL.createObjectURL(data.photos[0]) 
        : "/placeholder.svg",
      imagePrompt: data.imagePrompt,
      calories: parseInt(data.calories),
      time: data.time,
      category: data.category,
      ingredients: data.ingredients,
      instructions: data.instructions,
      photos: data.photos ? Array.from(data.photos).map(file => URL.createObjectURL(file)) : [],
    };

    // Добавляем рецепт в список
    setRecipesList([...recipesList, newRecipe]);
    
    // Закрываем диалог и сбрасываем форму
    setIsAddRecipeOpen(false);
    form.reset();
    
    // Показываем уведомление об успехе
    toast({
      title: "Рецепт добавлен!",
      description: "Ваш рецепт успешно опубликован на сайте",
    });
  };

  // Фильтрация рецептов по поисковому запросу
  const filteredRecipes = recipesList.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              className="bg-primary" 
              onClick={() => setIsAddRecipeOpen(true)}
            >
              Добавить рецепт
            </Button>
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
                  {filteredRecipes
                    .filter(recipe => category.id === "all" || recipe.category === category.id)
                    .map((recipe) => (
                      <ContentCard
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        link={`/recipes/${recipe.id}`}
                        footer={
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <span>{recipe.calories} ккал</span>
                            <span>{recipe.time}</span>
                          </div>
                        }
                      >
                        <div className="aspect-video w-full mb-4 rounded-md overflow-hidden">
                          {recipe.photos && recipe.photos.length > 0 ? (
                            <img 
                              src={recipe.photos[0]} 
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <AIImageGenerator 
                              prompt={recipe.imagePrompt}
                              alt={recipe.title}
                              fallbackSrc={recipe.image}
                            />
                          )}
                        </div>
                      </ContentCard>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Диалог добавления рецепта */}
      <Dialog open={isAddRecipeOpen} onOpenChange={setIsAddRecipeOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новый рецепт</DialogTitle>
            <DialogDescription>
              Поделитесь своим полезным рецептом с сообществом любителей здорового питания
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название рецепта</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: Запеченный лосось с авокадо" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Краткое описание</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Опишите рецепт в нескольких предложениях"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категория</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="breakfast">Завтраки</SelectItem>
                          <SelectItem value="lunch">Обеды</SelectItem>
                          <SelectItem value="dinner">Ужины</SelectItem>
                          <SelectItem value="snacks">Перекусы</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Калории</FormLabel>
                        <FormControl>
                          <Input placeholder="ккал" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Время</FormLabel>
                        <FormControl>
                          <Input placeholder="30 мин" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="photos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фотографии блюда</FormLabel>
                    <FormControl>
                      <FileInput
                        value={field.value}
                        onChange={field.onChange}
                        multiple={true}
                        maxSize={10}
                        accept="image/*"
                        label="Загрузите фото вашего блюда или перетащите их сюда"
                      />
                    </FormControl>
                    <FormDescription>
                      Добавьте до 5 фотографий вашего блюда. Максимальный размер файла: 10MB.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ингредиенты</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Перечислите все ингредиенты, по одному на строку"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Укажите количество каждого ингредиента.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Инструкции по приготовлению</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Подробно опишите процесс приготовления, шаг за шагом"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imagePrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание для генерации изображения</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Опишите, как должно выглядеть готовое блюдо для ИИ-генерации изображения (если не загружаете своё фото)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Если вы не загружаете собственное фото, подробное описание поможет ИИ сгенерировать изображение вашего блюда
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddRecipeOpen(false)}
                  className="mr-2"
                >
                  Отмена
                </Button>
                <Button type="submit">Опубликовать рецепт</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recipes;
