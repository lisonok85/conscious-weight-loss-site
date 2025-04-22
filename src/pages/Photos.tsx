
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartIcon } from "lucide-react";

const photos = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Моя трансформация",
    author: "Анна К.",
    likes: 124,
    category: "progress"
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Здоровый обед",
    author: "Максим Д.",
    likes: 89,
    category: "food"
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "До и После",
    author: "Алексей П.",
    likes: 245,
    category: "progress"
  },
  {
    id: 4,
    image: "/placeholder.svg",
    title: "Утренняя тренировка",
    author: "Ольга С.",
    likes: 56,
    category: "workout"
  },
  {
    id: 5,
    image: "/placeholder.svg",
    title: "Низкокалорийный десерт",
    author: "Мария Л.",
    likes: 112,
    category: "food"
  },
  {
    id: 6,
    image: "/placeholder.svg",
    title: "Йога на закате",
    author: "Татьяна В.",
    likes: 78,
    category: "workout"
  },
  {
    id: 7,
    image: "/placeholder.svg",
    title: "Мой прогресс за 6 месяцев",
    author: "Денис К.",
    likes: 193,
    category: "progress"
  },
  {
    id: 8,
    image: "/placeholder.svg",
    title: "Белковый завтрак",
    author: "Виктория З.",
    likes: 67,
    category: "food"
  },
];

const photoCategories = [
  { id: "all", label: "Все фото" },
  { id: "progress", label: "Прогресс" },
  { id: "food", label: "Еда" },
  { id: "workout", label: "Тренировки" },
];

const Photos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Фотографии</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Вдохновляющие фотографии трансформаций, здоровых блюд и тренировок
              от нашего сообщества.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Button className="bg-primary">Загрузить фото</Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-8 w-full overflow-x-auto flex justify-start sm:justify-center">
              {photoCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="min-w-max"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {photoCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {photos
                    .filter(photo => category.id === "all" || photo.category === category.id)
                    .map((photo) => (
                      <div key={photo.id} className="group relative overflow-hidden rounded-lg">
                        <img 
                          src={photo.image} 
                          alt={photo.title} 
                          className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <h3 className="text-white font-medium">{photo.title}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-white/80 text-sm">{photo.author}</span>
                            <div className="flex items-center gap-1 text-white/80 text-sm">
                              <HeartIcon size={14} />
                              <span>{photo.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Photos;
