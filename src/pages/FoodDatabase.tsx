
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Database, Search, Filter, PieChart, Clock, ChevronDown, 
  Apple, Beef, Coffee, Egg, Cheese, Fish, Wheat, 
  Gauge, ScrollText, Carrot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, AccordionContent, 
  AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Типы для продуктов питания
interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  fiber: number;
  sugar: number;
  sodium: number;
  serving: string;
  servingWeight: number;
  glycemicIndex?: number | null;
  image: string;
  description: string;
}

// Категории продуктов
interface FoodCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [caloriesRange, setCaloriesRange] = useState([0, 1000]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState("name-asc");
  const itemsPerPage = 20;

  // Категории продуктов
  const categories: FoodCategory[] = [
    { id: "fruits", name: "Фрукты", icon: <Apple className="h-5 w-5 text-red-500" />, count: 38 },
    { id: "vegetables", name: "Овощи", icon: <Carrot className="h-5 w-5 text-orange-500" />, count: 45 },
    { id: "meat", name: "Мясо", icon: <Beef className="h-5 w-5 text-rose-700" />, count: 27 },
    { id: "dairy", name: "Молочные продукты", icon: <Cheese className="h-5 w-5 text-yellow-500" />, count: 19 },
    { id: "grains", name: "Крупы и злаки", icon: <Wheat className="h-5 w-5 text-amber-700" />, count: 23 },
    { id: "seafood", name: "Морепродукты", icon: <Fish className="h-5 w-5 text-blue-500" />, count: 16 },
    { id: "eggs", name: "Яйца", icon: <Egg className="h-5 w-5 text-yellow-400" />, count: 5 },
    { id: "beverages", name: "Напитки", icon: <Coffee className="h-5 w-5 text-brown-500" />, count: 31 },
  ];

  // База данных продуктов (имитация)
  const foodDatabase: FoodItem[] = [
    {
      id: "1",
      name: "Яблоко",
      category: "fruits",
      calories: 52,
      proteins: 0.3,
      fats: 0.2,
      carbs: 14,
      fiber: 2.4,
      sugar: 10.4,
      sodium: 1,
      serving: "1 среднее",
      servingWeight: 100,
      glycemicIndex: 38,
      image: "/placeholder.svg",
      description: "Яблоки богаты антиоксидантами, клетчаткой, витаминами C и K. Они способствуют снижению риска сердечно-сосудистых заболеваний и помогают контролировать уровень сахара в крови."
    },
    {
      id: "2",
      name: "Куриная грудка",
      category: "meat",
      calories: 165,
      proteins: 31,
      fats: 3.6,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      sodium: 74,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: null,
      image: "/placeholder.svg",
      description: "Куриная грудка — постное мясо, богатое белком. Является отличным источником витаминов группы B и минералов, таких как фосфор и селен."
    },
    {
      id: "3",
      name: "Гречневая крупа",
      category: "grains",
      calories: 343,
      proteins: 13.2,
      fats: 3.4,
      carbs: 71.5,
      fiber: 10.1,
      sugar: 0,
      sodium: 10,
      serving: "100 г (сухой вес)",
      servingWeight: 100,
      glycemicIndex: 51,
      image: "/placeholder.svg",
      description: "Гречка отличается высоким содержанием растительного белка, клетчатки и важных микроэлементов. Она богата антиоксидантами, содержит рутин, который укрепляет сосуды."
    },
    {
      id: "4",
      name: "Брокколи",
      category: "vegetables",
      calories: 34,
      proteins: 2.8,
      fats: 0.4,
      carbs: 7,
      fiber: 2.6,
      sugar: 1.7,
      sodium: 33,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: 15,
      image: "/placeholder.svg",
      description: "Брокколи богата витаминами C, K, фолиевой кислотой и калием. Содержит уникальные фитохимические вещества, которые могут снизить риск развития рака."
    },
    {
      id: "5",
      name: "Лосось",
      category: "seafood",
      calories: 208,
      proteins: 20.4,
      fats: 13.4,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      sodium: 59,
      serving: "100 г филе",
      servingWeight: 100,
      glycemicIndex: null,
      image: "/placeholder.svg",
      description: "Лосось — ценный источник омега-3 жирных кислот, высококачественного белка и витамина D. Регулярное употребление лосося связано с улучшением здоровья сердца и мозга."
    },
    {
      id: "6",
      name: "Творог 5%",
      category: "dairy",
      calories: 121,
      proteins: 18,
      fats: 5,
      carbs: 3,
      fiber: 0,
      sugar: 3,
      sodium: 41,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: 30,
      image: "/placeholder.svg",
      description: "Творог богат легкоусвояемым белком и кальцием. Содержит фосфор, необходимый для здоровья костей, и пробиотики, полезные для пищеварительной системы."
    },
    {
      id: "7",
      name: "Черника",
      category: "fruits",
      calories: 57,
      proteins: 0.7,
      fats: 0.3,
      carbs: 14.5,
      fiber: 2.4,
      sugar: 10,
      sodium: 1,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: 53,
      image: "/placeholder.svg",
      description: "Черника богата антиоксидантами, особенно антоцианами, которые положительно влияют на здоровье глаз и когнитивные функции. Содержит витамины C и K."
    },
    {
      id: "8",
      name: "Овсянка",
      category: "grains",
      calories: 389,
      proteins: 16.9,
      fats: 6.9,
      carbs: 66.3,
      fiber: 10.6,
      sugar: 0,
      sodium: 2,
      serving: "100 г (сухой вес)",
      servingWeight: 100,
      glycemicIndex: 55,
      image: "/placeholder.svg",
      description: "Овсянка содержит растворимую клетчатку бета-глюкан, которая помогает снизить уровень холестерина. Богата антиоксидантами, витаминами группы B и минералами."
    }
  ];

  // Дополнительные продукты для расширения базы
  const additionalFoods: FoodItem[] = [
    {
      id: "9",
      name: "Творог обезжиренный",
      category: "dairy",
      calories: 79,
      proteins: 18,
      fats: 0.1,
      carbs: 1.8,
      fiber: 0,
      sugar: 1.8,
      sodium: 40,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: 25,
      image: "/placeholder.svg",
      description: "Обезжиренный творог — источник белка с минимальным содержанием жира. Идеален для диетического питания и наращивания мышечной массы."
    },
    {
      id: "10",
      name: "Бананы",
      category: "fruits",
      calories: 89,
      proteins: 1.1,
      fats: 0.3,
      carbs: 22.8,
      fiber: 2.6,
      sugar: 12.2,
      sodium: 1,
      serving: "1 средний",
      servingWeight: 118,
      glycemicIndex: 51,
      image: "/placeholder.svg",
      description: "Бананы богаты калием, который поддерживает здоровье сердца и нормализует кровяное давление. Содержат витамин B6, марганец и клетчатку."
    },
    {
      id: "11",
      name: "Говядина нежирная",
      category: "meat",
      calories: 187,
      proteins: 26.3,
      fats: 8.9,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      sodium: 65,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: null,
      image: "/placeholder.svg",
      description: "Нежирная говядина — отличный источник высококачественного белка, железа, цинка и витаминов группы B, включая B12, необходимый для здоровья нервной системы."
    },
    {
      id: "12",
      name: "Индейка (грудка)",
      category: "meat",
      calories: 157,
      proteins: 29.6,
      fats: 3.6,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      sodium: 63,
      serving: "100 г",
      servingWeight: 100,
      glycemicIndex: null,
      image: "/placeholder.svg",
      description: "Грудка индейки содержит множество важных витаминов и минералов, включая витамины группы B, селен и цинк. Отличается высоким содержанием белка при низком содержании жира."
    }
  ];

  // Объединение всех продуктов для демонстрации
  const allFoods = [...foodDatabase, ...additionalFoods];

  // Фильтрация продуктов по запросу и категории
  const filteredFoods = allFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
    const matchesCalories = food.calories >= caloriesRange[0] && food.calories <= caloriesRange[1];
    return matchesSearch && matchesCategory && matchesCalories;
  });

  // Сортировка продуктов
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    switch(sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "calories-asc":
        return a.calories - b.calories;
      case "calories-desc":
        return b.calories - a.calories;
      case "protein-desc":
        return b.proteins - a.proteins;
      case "carbs-asc":
        return a.carbs - b.carbs;
      default:
        return 0;
    }
  });

  // Пагинация
  const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);
  const currentItems = sortedFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Обработчик для просмотра деталей продукта
  const handleViewFoodDetails = (food: FoodItem) => {
    setSelectedFood(food);
  };

  // Найти категорию по ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Обработчик сброса фильтров
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setCaloriesRange([0, 1000]);
    setSortOption("name-asc");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
              <Database className="h-6 w-6" /> База продуктов питания
            </h1>
            <p className="text-muted-foreground mt-1">
              Подробная информация о калорийности и пищевой ценности продуктов
            </p>
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Искать по названию продукта..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button 
                variant="outline" 
                className="w-full lg:w-auto flex items-center gap-2"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <Filter className="h-4 w-4" />
                Фильтры
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full lg:w-auto">
                    Сортировать
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                    По алфавиту (А-Я)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                    По алфавиту (Я-А)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("calories-asc")}>
                    По калориям (мин-макс)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("calories-desc")}>
                    По калориям (макс-мин)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("protein-desc")}>
                    По белкам (макс-мин)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("carbs-asc")}>
                    По углеводам (мин-макс)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {isFilterMenuOpen && (
            <div className="bg-background border border-border rounded-md p-4 mt-2">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Категории продуктов</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge 
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )}
                    >
                      {category.icon}
                      {category.name} ({category.count})
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Калорийность на 100г (ккал)</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={caloriesRange}
                    min={0}
                    max={1000}
                    step={10}
                    value={caloriesRange}
                    onValueChange={setCaloriesRange}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{caloriesRange[0]} ккал</span>
                    <span>{caloriesRange[1]} ккал</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Результаты поиска и список продуктов */}
        <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 bg-muted/30 border-b border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Продукты ({filteredFoods.length})</h2>
              {selectedCategory && (
                <Badge variant="outline">
                  Категория: {getCategoryName(selectedCategory)}
                </Badge>
              )}
            </div>
          </div>

          {currentItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Продукт</TableHead>
                  <TableHead className="text-center">Калории</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Белки</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Жиры</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Углеводы</TableHead>
                  <TableHead className="text-center">Порция</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-md overflow-hidden">
                          <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="text-xs text-muted-foreground">{getCategoryName(food.category)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm font-medium">
                        {food.calories}
                        <span className="text-xs font-normal text-muted-foreground ml-1">ккал</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <div className="text-sm">{food.proteins}г</div>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <div className="text-sm">{food.fats}г</div>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <div className="text-sm">{food.carbs}г</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-xs text-muted-foreground">{food.serving}</div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewFoodDetails(food)}
                          >
                            Детали
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          {selectedFood && (
                            <>
                              <DialogHeader>
                                <DialogTitle className="text-xl">{selectedFood.name}</DialogTitle>
                                <DialogDescription>
                                  {getCategoryName(selectedFood.category)} • {selectedFood.serving} ({selectedFood.servingWeight}г)
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="bg-muted rounded-lg overflow-hidden h-28 md:h-full">
                                  <img 
                                    src={selectedFood.image} 
                                    alt={selectedFood.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                
                                <div className="md:col-span-2 space-y-4">
                                  <div className="text-sm text-muted-foreground">
                                    {selectedFood.description}
                                  </div>
                                  
                                  <div className="grid grid-cols-4 gap-2 mt-2">
                                    <div className="bg-muted/50 rounded p-2 text-center">
                                      <div className="text-lg font-medium">{selectedFood.calories}</div>
                                      <div className="text-xs text-muted-foreground">ккал</div>
                                    </div>
                                    <div className="bg-blue-100 dark:bg-blue-950/30 rounded p-2 text-center">
                                      <div className="text-lg font-medium">{selectedFood.proteins}г</div>
                                      <div className="text-xs text-muted-foreground">белки</div>
                                    </div>
                                    <div className="bg-yellow-100 dark:bg-yellow-950/30 rounded p-2 text-center">
                                      <div className="text-lg font-medium">{selectedFood.fats}г</div>
                                      <div className="text-xs text-muted-foreground">жиры</div>
                                    </div>
                                    <div className="bg-green-100 dark:bg-green-950/30 rounded p-2 text-center">
                                      <div className="text-lg font-medium">{selectedFood.carbs}г</div>
                                      <div className="text-xs text-muted-foreground">углеводы</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator className="my-4" />
                              
                              <h3 className="text-sm font-medium mb-2">Подробная пищевая ценность (на 100г):</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Клетчатка:</span>
                                    <span>{selectedFood.fiber}г</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Сахара:</span>
                                    <span>{selectedFood.sugar}г</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Натрий:</span>
                                    <span>{selectedFood.sodium}мг</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  {selectedFood.glycemicIndex && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Гликемический индекс:</span>
                                      <span>{selectedFood.glycemicIndex}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">
                По вашему запросу ничего не найдено
              </div>
              <Button variant="outline" onClick={handleResetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}

          {filteredFoods.length > itemsPerPage && (
            <div className="p-4 border-t border-border">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                    // Определение номера страницы для отображения пагинации
                    let pageNum = index + 1;
                    
                    // Если текущая страница > 3, смещаем отображаемые номера
                    if (currentPage > 3 && totalPages > 5) {
                      pageNum = currentPage - 2 + index;
                      
                      // Корректировка для последних страниц
                      if (currentPage > totalPages - 2) {
                        pageNum = totalPages - 4 + index;
                      }
                    }
                    
                    // Проверка на выход за границы
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={pageNum === currentPage}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {/* Дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Гликемический индекс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Гликемический индекс (ГИ) показывает, как быстро углеводы из продукта повышают уровень сахара в крови:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Низкий ГИ:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">0-55</span>
                </div>
                <div className="flex justify-between">
                  <span>Средний ГИ:</span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">56-69</span>
                </div>
                <div className="flex justify-between">
                  <span>Высокий ГИ:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">70-100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Макронутриенты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Рекомендуемое соотношение макронутриентов при снижении веса:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Белки:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">25-35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Жиры:</span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">20-35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Углеводы:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">40-50%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-primary" />
                Полезная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">
                    Как рассчитать суточную калорийность?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Базовый метод: вес (кг) × 22 × коэффициент активности (1.2-1.9).
                    Для снижения веса: создайте дефицит 15-20% от полученного значения.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">
                    Какой должен быть размер порции?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Белок: размером с ладонь (100-150г).
                    Углеводы: размером с кулак (50-80г).
                    Жиры: размером с большой палец (10-15г).
                    Овощи: размером с обе ладони.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodDatabase;
