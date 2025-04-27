
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AIImageGenerator from "@/components/AIImageGenerator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "@/components/ui/file-input";
import { useToast } from "@/components/ui/use-toast";

interface Story {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  imagePrompt: string;
  results: string;
  time: string;
  content: string;
}

const initialStories = [
  {
    id: 1,
    title: "Мой путь к здоровому образу жизни",
    author: "Елена, 35 лет",
    description: "Как я потеряла 20 кг за год без диет и голодания",
    image: "/placeholder.svg",
    imagePrompt: "Фото до и после похудения, трансформация тела, здоровый образ жизни, успешное похудение -20кг",
    results: "-20 кг",
    time: "12 месяцев",
    content: "Мой путь к осознанному похудению начался не с диеты, а с изменения отношения к еде и своему телу...",
  },
  {
    id: 2,
    title: "Победа над эмоциональным перееданием",
    author: "Александр, 42 года",
    description: "История преодоления пищевой зависимости и обретения контроля",
    image: "/placeholder.svg",
    imagePrompt: "Человек выбирает здоровую пищу вместо нездоровой, преодоление пищевой зависимости, мужчина средних лет с похудением -15кг",
    results: "-15 кг",
    time: "8 месяцев",
    content: "Я всегда использовал еду как способ справиться со стрессом. Осознанное питание помогло мне изменить это...",
  },
  {
    id: 3,
    title: "От 100 кг к марафону",
    author: "Мария, 29 лет",
    description: "Моя трансформация из малоподвижного образа жизни в бегуна-марафонца",
    image: "/placeholder.svg",
    imagePrompt: "Женщина бежит марафон, от ожирения к спортивной форме, трансформация тела -30кг, бегун",
    results: "-30 кг",
    time: "18 месяцев",
    content: "Три года назад я не могла пробежать и минуты. Сегодня я финишировала свой первый марафон...",
  },
  {
    id: 4,
    title: "Трансформация после 50",
    author: "Владимир, 53 года",
    description: "Как я сбросил вес и улучшил здоровье в зрелом возрасте",
    image: "/placeholder.svg",
    imagePrompt: "Пожилой мужчина в хорошей физической форме, трансформация тела после 50 лет, похудение -25кг, здоровый образ жизни",
    results: "-25 кг",
    time: "14 месяцев",
    content: "Никогда не поздно начать заботиться о себе. В 52 года я решил изменить свою жизнь...",
  },
];

const Stories = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Состояние для формы
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [results, setResults] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Создаем новую историю
    const newStory: Story = {
      id: stories.length + 1,
      title,
      author,
      description,
      image: photos.length > 0 ? URL.createObjectURL(photos[0]) : "/placeholder.svg",
      imagePrompt,
      results,
      time: timePeriod,
      content,
    };
    
    // Добавляем новую историю в список
    setStories([...stories, newStory]);
    
    // Сбрасываем форму
    resetForm();
    
    // Закрываем диалог
    setIsDialogOpen(false);
    
    // Показываем уведомление
    toast({
      title: "История успеха добавлена!",
      description: "Ваша история успешно опубликована. Спасибо за то, что поделились своим опытом!",
    });
  };
  
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setContent("");
    setResults("");
    setTimePeriod("");
    setImagePrompt("");
    setPhotos([]);
  };
  
  // Фильтрация историй по поисковому запросу
  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Истории успеха</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Вдохновляющие истории людей, которые изменили свою жизнь 
              через осознанное похудение и здоровый образ жизни.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Поиск историй..." 
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="bg-primary"
              onClick={() => setIsDialogOpen(true)}
            >
              Поделиться своей историей
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStories.map((story) => (
              <ContentCard
                key={story.id}
                title={story.title}
                description={story.description}
                link={`/stories/${story.id}`}
                className="h-full"
                footer={
                  <div className="flex flex-col">
                    <span className="font-medium">{story.author}</span>
                    <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="text-primary font-bold">{story.results}</span>
                      <span>{story.time}</span>
                    </div>
                  </div>
                }
              >
                <div className="aspect-video w-full mb-4 rounded-md overflow-hidden">
                  {story.image.startsWith("blob:") ? (
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AIImageGenerator 
                      prompt={story.imagePrompt}
                      alt={story.title}
                      fallbackSrc={story.image}
                    />
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-3">
                  "{story.content}"
                </p>
              </ContentCard>
            ))}
          </div>
        </div>
      </main>
      
      {/* Диалог для добавления истории успеха */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Поделитесь своей историей успеха</DialogTitle>
            <DialogDescription>
              Расскажите о своем пути к здоровому образу жизни и вдохновите других!
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок истории</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Мой путь к здоровому образу жизни" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="author">Автор</Label>
                <Input 
                  id="author" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Имя, возраст (например: Анна, 34 года)" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Краткое описание</Label>
                <Input 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Одно предложение, описывающее вашу историю" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="results">Результаты</Label>
                  <Input 
                    id="results" 
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    placeholder="Например: -15 кг" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="timePeriod">Период времени</Label>
                  <Input 
                    id="timePeriod" 
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    placeholder="Например: 6 месяцев" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="photos">Фотографии (до/после)</Label>
                <FileInput
                  onChange={setPhotos}
                  value={photos}
                  multiple={true}
                  accept="image/*"
                  maxSize={5}
                  label="Загрузите фотографии до и после"
                />
              </div>
              
              {photos.length === 0 && (
                <div>
                  <Label htmlFor="imagePrompt">Описание для ИИ-генерации изображения</Label>
                  <Textarea 
                    id="imagePrompt" 
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Опишите ваше преображение для генерации изображения ИИ (если не загружаете фото)"
                    className="resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Если вы не загружаете фотографии, мы сгенерируем изображение на основе вашего описания
                  </p>
                </div>
              )}
              
              <div>
                <Label htmlFor="content">Ваша история</Label>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Расскажите подробно о вашем пути, что помогло достичь результата, с какими трудностями вы столкнулись и как их преодолели..."
                  className="resize-none"
                  rows={10}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Опубликовать историю</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Stories;
