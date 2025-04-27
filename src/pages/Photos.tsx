
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartIcon, Upload, X, Camera } from "lucide-react";
import AIImageGenerator from "@/components/AIImageGenerator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const photos = [
  {
    id: 1,
    image: "/placeholder.svg",
    imagePrompt: "До и после похудения, трансформация тела -20кг, фотография в полный рост",
    title: "Моя трансформация",
    author: "Анна К.",
    likes: 124,
    category: "progress"
  },
  {
    id: 2,
    image: "/placeholder.svg",
    imagePrompt: "Здоровый обед, белок, овощи, полезная еда, низкокалорийная, фуд-фотография",
    title: "Здоровый обед",
    author: "Максим Д.",
    likes: 89,
    category: "food"
  },
  {
    id: 3,
    image: "/placeholder.svg",
    imagePrompt: "До и после похудения мужчины, трансформация тела -25кг, сравнение фотографий",
    title: "До и После",
    author: "Алексей П.",
    likes: 245,
    category: "progress"
  },
  {
    id: 4,
    image: "/placeholder.svg",
    imagePrompt: "Утренняя тренировка на свежем воздухе, йога, женщина занимается спортом",
    title: "Утренняя тренировка",
    author: "Ольга С.",
    likes: 56,
    category: "workout"
  },
  {
    id: 5,
    image: "/placeholder.svg",
    imagePrompt: "Низкокалорийный десерт с ягодами, здоровые сладости без сахара, фуд-фотография",
    title: "Низкокалорийный десерт",
    author: "Мария Л.",
    likes: 112,
    category: "food"
  },
  {
    id: 6,
    image: "/placeholder.svg",
    imagePrompt: "Йога на закате, женщина в позе воина, медитация, спокойствие, природа",
    title: "Йога на закате",
    author: "Татьяна В.",
    likes: 78,
    category: "workout"
  },
  {
    id: 7,
    image: "/placeholder.svg",
    imagePrompt: "Прогресс похудения за 6 месяцев, коллаж фотографий, трансформация тела мужчины -30кг",
    title: "Мой прогресс за 6 месяцев",
    author: "Денис К.",
    likes: 193,
    category: "progress"
  },
  {
    id: 8,
    image: "/placeholder.svg",
    imagePrompt: "Белковый завтрак с яйцами и авокадо, здоровое питание, фуд-фотография",
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

interface PhotoUploadFormData {
  title: string;
  category: string;
  author: string;
  file: File | null;
  aiPrompt: string;
}

const Photos = () => {
  const [allPhotos, setAllPhotos] = useState(photos);
  const [formData, setFormData] = useState<PhotoUploadFormData>({
    title: "",
    category: "progress",
    author: "",
    file: null,
    aiPrompt: ""
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, загрузите изображение",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер файла - 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, загрузите изображение",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер файла - 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClearFile = () => {
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, file: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите название",
        variant: "destructive"
      });
      return;
    }

    if (!formData.author.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите автора",
        variant: "destructive"
      });
      return;
    }

    if (!formData.file && !formData.aiPrompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите фото или введите описание для ИИ-генерации",
        variant: "destructive"
      });
      return;
    }

    // Create new photo object
    const newPhoto = {
      id: Date.now(),
      image: formData.file ? URL.createObjectURL(formData.file) : "/placeholder.svg",
      imagePrompt: formData.aiPrompt || "Фото пользователя",
      title: formData.title,
      author: formData.author,
      likes: 0,
      category: formData.category
    };

    // Add to photos array
    setAllPhotos(prev => [newPhoto, ...prev]);
    
    // Reset form
    setFormData({
      title: "",
      category: "progress",
      author: "",
      file: null,
      aiPrompt: ""
    });
    setPreviewUrl(null);
    setOpen(false);

    // Success notification
    toast({
      title: "Успешно!",
      description: "Ваше фото было загружено",
    });
  };

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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">Загрузить фото</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Загрузить фото</DialogTitle>
                  <DialogDescription>
                    Поделитесь своими фотографиями с сообществом.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Название
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="author" className="text-right">
                        Автор
                      </Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Категория
                      </Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="progress">Прогресс</SelectItem>
                          <SelectItem value="food">Еда</SelectItem>
                          <SelectItem value="workout">Тренировки</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        Фото
                      </Label>
                      <div className="col-span-3">
                        {!previewUrl ? (
                          <div 
                            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2 text-sm text-gray-600">
                              <label htmlFor="file-upload" className="font-medium text-primary hover:underline">
                                Загрузите фото
                              </label>
                              <p>или перетащите файл сюда</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF до 5MB
                            </p>
                            <Input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-lg" 
                            />
                            <button 
                              type="button"
                              onClick={handleClearFile}
                              className="absolute top-2 right-2 bg-black/70 p-1 rounded-full"
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {!formData.file && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="aiPrompt" className="text-right">
                          ИИ-описание
                        </Label>
                        <Input
                          id="aiPrompt"
                          name="aiPrompt"
                          value={formData.aiPrompt}
                          onChange={handleInputChange}
                          placeholder="Опишите изображение для ИИ-генерации"
                          className="col-span-3"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Опубликовать</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                  {allPhotos
                    .filter(photo => category.id === "all" || photo.category === category.id)
                    .map((photo) => (
                      <div key={photo.id} className="group relative overflow-hidden rounded-lg">
                        {photo.image.startsWith("data:") || photo.image.startsWith("blob:") ? (
                          <img 
                            src={photo.image} 
                            alt={photo.title}
                            className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <AIImageGenerator 
                            prompt={photo.imagePrompt}
                            alt={photo.title}
                            fallbackSrc={photo.image}
                            className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                          />
                        )}
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
