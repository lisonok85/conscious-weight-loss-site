
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, Plus, ThumbsUp, Clock, Users, 
  MessageCircle, Search, Star, Salad, Activity, 
  HeartPulse, Scale, Brain 
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  icon: React.ReactNode;
}

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isFeatured?: boolean;
  isHot?: boolean;
  category: string;
}

const Forum = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("diet");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories: ForumCategory[] = [
    { 
      id: "diet", 
      name: "Питание и диеты", 
      description: "Обсуждение планов питания, диет и режимов", 
      topics: 127, 
      icon: <Salad className="h-6 w-6 text-green-500" />
    },
    { 
      id: "exercise", 
      name: "Физическая активность", 
      description: "Тренировки, упражнения и спорт", 
      topics: 84, 
      icon: <Activity className="h-6 w-6 text-blue-500" />
    },
    { 
      id: "health", 
      name: "Здоровье и медицина", 
      description: "Медицинские аспекты похудения", 
      topics: 63, 
      icon: <HeartPulse className="h-6 w-6 text-red-500" />
    },
    { 
      id: "progress", 
      name: "Прогресс и результаты", 
      description: "Отслеживание результатов и мотивация", 
      topics: 92, 
      icon: <Scale className="h-6 w-6 text-purple-500" />
    },
    { 
      id: "psychology", 
      name: "Психология похудения", 
      description: "Психологические аспекты и поддержка", 
      topics: 51, 
      icon: <Brain className="h-6 w-6 text-orange-500" />
    }
  ];

  const topics: ForumTopic[] = [
    {
      id: "1",
      title: "Интервальное голодание: делимся опытом",
      author: "ЗдоровоеПитание",
      replies: 48,
      views: 1204,
      lastActivity: "15 минут назад",
      isFeatured: true,
      category: "diet"
    },
    {
      id: "2",
      title: "Как справиться с тягой к сладкому?",
      author: "СладкоежкаНаДиете",
      replies: 35,
      views: 987,
      lastActivity: "2 часа назад",
      isHot: true,
      category: "psychology"
    },
    {
      id: "3",
      title: "Безопасное снижение веса после 40",
      author: "ВторойДыхание",
      replies: 27,
      views: 756,
      lastActivity: "вчера",
      category: "health"
    },
    {
      id: "4",
      title: "Кето диета и физические нагрузки",
      author: "КетоСпортсмен",
      replies: 19,
      views: 543,
      lastActivity: "2 дня назад",
      category: "exercise"
    },
    {
      id: "5",
      title: "Плато в снижении веса: как преодолеть?",
      author: "НеСдаюсь",
      replies: 42,
      views: 1122,
      lastActivity: "3 дня назад",
      isHot: true,
      category: "progress"
    },
    {
      id: "6",
      title: "Дневник питания: лучшие приложения",
      author: "ТехноКулинар",
      replies: 23,
      views: 605,
      lastActivity: "4 дня назад",
      category: "diet"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Поиск выполнен",
      description: `Результаты поиска для: ${searchQuery}`,
    });
  };

  const handleCreateTopic = () => {
    if (newTopicTitle.trim() && newTopicContent.trim()) {
      // В реальном приложении здесь был бы запрос к API для сохранения новой темы
      toast({
        title: "Тема создана",
        description: "Ваша тема успешно опубликована на форуме",
      });
      
      setNewTopicTitle("");
      setNewTopicContent("");
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Форум</h1>
            <p className="text-muted-foreground mt-1">
              Общайтесь с единомышленниками, делитесь опытом и получайте поддержку
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск по форуму..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Создать тему
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Создать новую тему</DialogTitle>
                  <DialogDescription>
                    Поделитесь своими мыслями или задайте вопрос сообществу
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="topic-title" className="text-sm font-medium">
                      Заголовок темы*
                    </label>
                    <Input
                      id="topic-title"
                      placeholder="Введите заголовок темы..."
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="topic-category" className="text-sm font-medium">
                      Категория*
                    </label>
                    <select
                      id="topic-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newTopicCategory}
                      onChange={(e) => setNewTopicCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="topic-content" className="text-sm font-medium">
                      Содержание*
                    </label>
                    <Textarea
                      id="topic-content"
                      placeholder="Опишите свой вопрос или поделитесь мыслями..."
                      rows={6}
                      value={newTopicContent}
                      onChange={(e) => setNewTopicContent(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreateTopic}>Опубликовать</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discussions">
              <MessageSquare className="mr-2 h-4 w-4" />
              Обсуждения
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Users className="mr-2 h-4 w-4" />
              Категории
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-4">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Тема</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Ответы</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-24 hidden sm:table-cell">Просмотры</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-36 hidden md:table-cell">Активность</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTopics.length > 0 ? (
                      filteredTopics.map((topic) => (
                        <tr key={topic.id} className="hover:bg-muted/50">
                          <td className="px-4 py-4">
                            <Link to={`/forum/${topic.id}`} className="flex items-start">
                              <div className="mr-3 mt-0.5">
                                <MessageCircle className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground hover:text-primary hover:underline flex items-center">
                                  {topic.title}
                                  {topic.isFeatured && (
                                    <Star className="ml-2 h-4 w-4 text-yellow-500" />
                                  )}
                                  {topic.isHot && (
                                    <span className="ml-2 text-xs text-white bg-red-500 rounded-full px-2 py-0.5">
                                      HOT
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Автор: {topic.author}
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="text-sm font-medium">{topic.replies}</div>
                          </td>
                          <td className="px-4 py-4 text-center hidden sm:table-cell">
                            <div className="text-sm text-muted-foreground">{topic.views}</div>
                          </td>
                          <td className="px-4 py-4 text-right hidden md:table-cell">
                            <div className="text-sm text-muted-foreground flex items-center justify-end">
                              <Clock className="mr-1 h-3 w-3" />
                              {topic.lastActivity}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center">
                          <div className="text-muted-foreground">
                            Нет тем, соответствующих вашему запросу
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Закреплённые темы</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 text-red-500 mr-1" />
                  <span>Популярные темы</span>
                </div>
              </div>
              <div>
                Всего тем: {topics.length}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category) => (
                <div key={category.id} className="bg-card rounded-lg shadow-sm p-5 hover:shadow transition-shadow">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {category.icon}
                    </div>
                    <div>
                      <Link to={`/forum?category=${category.id}`} className="text-lg font-medium text-foreground hover:text-primary hover:underline">
                        {category.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span>{category.topics} тем</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
