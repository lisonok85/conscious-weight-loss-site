
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, ArrowLeft, ThumbsUp, Flag, Share, Bookmark, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
    joinDate: string;
    postCount: number;
  };
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  isInitialPost?: boolean;
}

const ForumTopic = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");
  
  // В реальном приложении эти данные были бы получены из API
  const topicData = {
    id: id,
    title: "Интервальное голодание: делимся опытом",
    category: "Питание и диеты",
    views: 1204,
    created: "3 дня назад",
    status: "open"
  };

  const posts: ForumPost[] = [
    {
      id: "1",
      author: {
        name: "ЗдоровоеПитание",
        avatar: "/placeholder.svg",
        role: "Автор темы",
        joinDate: "Май 2022",
        postCount: 157
      },
      content: `<p>Привет всем любителям здорового образа жизни!</p>
                <p>Я практикую интервальное голодание по схеме 16/8 уже 4 месяца и хочу поделиться своими результатами. За это время удалось сбросить 7 кг, улучшить сон и повысить уровень энергии в течение дня.</p>
                <p>Мой режим:</p>
                <ul>
                  <li>Окно питания: с 12:00 до 20:00</li>
                  <li>Строгое соблюдение периода голодания</li>
                  <li>Во время голодания: только вода, черный кофе или зеленый чай без добавок</li>
                </ul>
                <p>Что заметил:</p>
                <ul>
                  <li>Первая неделя была сложной, постоянно хотелось есть по утрам</li>
                  <li>После адаптации исчезло чувство голода по утрам</li>
                  <li>Улучшилась концентрация в первой половине дня</li>
                  <li>Пропали вечерние перекусы перед сном</li>
                </ul>
                <p>Кто-нибудь еще практикует интервальное голодание? Какие у вас результаты и опыт? Буду рад обсудить!</p>`,
      date: "3 дня назад",
      likes: 42,
      isInitialPost: true
    },
    {
      id: "2",
      author: {
        name: "ФитнесТренер",
        avatar: "/placeholder.svg",
        joinDate: "Февраль 2020",
        postCount: 856
      },
      content: `<p>Спасибо за интересную тему!</p>
                <p>Я рекомендую интервальное голодание многим своим клиентам, особенно тем, кто имеет проблемы с лишним весом и инсулинорезистентностью.</p>
                <p>Хочу добавить несколько профессиональных наблюдений:</p>
                <ol>
                  <li>Схема 16/8 действительно самая популярная и физиологически обоснованная</li>
                  <li>При совмещении с тренировками лучше тренироваться в конце голодного периода, перед первым приёмом пищи</li>
                  <li>Важно не переедать в окно питания и не "наверстывать" калории</li>
                </ol>
                <p>Из личного опыта: практикую 5:2 (5 дней обычного питания, 2 дня с сильным ограничением калорий), это даёт больше гибкости в социальной жизни.</p>`,
      date: "3 дня назад",
      likes: 28
    },
    {
      id: "3",
      author: {
        name: "НачинающийХудеющий",
        avatar: "/placeholder.svg",
        joinDate: "Октябрь 2023",
        postCount: 12
      },
      content: `<p>А не вредно ли пропускать завтрак? Всегда слышал, что это самый важный приём пищи.</p>
                <p>Как быть со спортом? Я обычно бегаю по утрам, не будет ли проблем с энергией?</p>`,
      date: "2 дня назад",
      likes: 5
    },
    {
      id: "4",
      author: {
        name: "ДокторНутрициолог",
        avatar: "/placeholder.svg",
        role: "Эксперт",
        joinDate: "Июнь 2018",
        postCount: 1243
      },
      content: `<p>Спешу развеять миф о завтраке как "самом важном приёме пищи". Это маркетинговый ход производителей хлопьев и других "завтраков", появившийся в начале XX века.</p>
                <p>С точки зрения физиологии нет никакой необходимости есть сразу после пробуждения. Наоборот, продление ночного голодания (которое уже естественным образом происходит во время сна) даёт организму время на клеточное самоочищение (аутофагию).</p>
                <p><strong>@НачинающийХудеющий</strong>, что касается утренних пробежек:</p>
                <ul>
                  <li>Если это лёгкий бег, организм отлично справится, используя жировые запасы</li>
                  <li>Для высокоинтенсивных тренировок может потребоваться корректировка окна питания</li>
                  <li>Обязательно слушайте своё тело и корректируйте режим под себя</li>
                </ul>
                <p>Постепенно организм адаптируется, и вы заметите, что можете тренироваться натощак без проблем с энергией.</p>`,
      date: "2 дня назад",
      likes: 37
    },
    {
      id: "5",
      author: {
        name: "ЗдоровоеПитание",
        avatar: "/placeholder.svg",
        role: "Автор темы",
        joinDate: "Май 2022",
        postCount: 157
      },
      content: `<p><strong>@НачинающийХудеющий</strong>, полностью согласен с <strong>@ДокторНутрициолог</strong>. Когда я только начинал, тоже переживал насчёт энергии.</p>
                <p>Но сейчас даже силовые тренировки могу проводить натощак и чувствую себя отлично. Организм действительно адаптируется через 2-3 недели.</p>
                <p>Попробуйте начать постепенно, смещая время первого приёма пищи на час позже каждые несколько дней.</p>`,
      date: "1 день назад",
      likes: 12
    }
  ];

  const handleSubmitReply = () => {
    if (replyContent.trim() === "") {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите текст ответа",
        variant: "destructive",
      });
      return;
    }

    // В реальном приложении здесь был бы API запрос
    toast({
      title: "Ответ опубликован",
      description: "Ваш ответ успешно добавлен в обсуждение",
    });
    setReplyContent("");
  };

  const handleLikePost = (postId: string) => {
    // В реальном приложении здесь был бы API запрос
    toast({
      description: "Вы поставили лайк сообщению",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/forum" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Вернуться к форуму
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">{topicData.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                <span>Категория: {topicData.category}</span>
                <span className="flex items-center">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {posts.length} сообщений
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  Создано: {topicData.created}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Сохранить
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="discussion" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discussion">
              <MessageSquare className="mr-2 h-4 w-4" />
              Обсуждение
            </TabsTrigger>
            <TabsTrigger value="related">
              <MessageSquare className="mr-2 h-4 w-4" />
              Похожие темы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussion">
            <div className="space-y-6">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className={`bg-card rounded-lg shadow-sm p-5 ${post.isInitialPost ? 'border-l-4 border-primary' : ''}`}
                  id={`post-${post.id}`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Автор */}
                    <div className="w-full md:w-48 flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{post.author.name}</span>
                        {post.author.role && (
                          <span className="text-xs text-primary">{post.author.role}</span>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>Регистрация: {post.author.joinDate}</div>
                          <div>Сообщений: {post.author.postCount}</div>
                        </div>
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">#{post.id}</span>
                      </div>
                      
                      <div 
                        className="prose prose-sm max-w-none mb-6" 
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={post.isLiked ? "text-primary" : ""}
                          >
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {post.likes}
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setReplyContent(`<blockquote>${post.author.name} писал(а):\n...\n</blockquote>\n\n`);
                              // Прокрутка к редактору ответа
                              document.getElementById('reply-editor')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            Цитировать
                          </Button>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Flag className="mr-1 h-4 w-4" />
                          Пожаловаться
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-card rounded-lg shadow-sm p-5" id="reply-editor">
                <h3 className="text-lg font-medium mb-4">Ответить в теме</h3>
                <Textarea
                  placeholder="Напишите ваш ответ..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-32 mb-4"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitReply}>
                    Отправить ответ
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Похожие темы</h3>
              <div className="space-y-4">
                <div className="p-4 border-b border-border">
                  <Link to="/forum/20" className="text-primary hover:underline">
                    Циклическое кето и интервальное голодание: совместимы ли?
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    15 ответов • Последнее сообщение: вчера
                  </div>
                </div>
                <div className="p-4 border-b border-border">
                  <Link to="/forum/45" className="text-primary hover:underline">
                    24-часовое голодание раз в неделю: польза или вред?
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    32 ответа • Последнее сообщение: 3 дня назад
                  </div>
                </div>
                <div className="p-4 border-b border-border">
                  <Link to="/forum/67" className="text-primary hover:underline">
                    Добавки и витамины при интервальном голодании
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    8 ответов • Последнее сообщение: неделю назад
                  </div>
                </div>
                <div className="p-4">
                  <Link to="/forum/89" className="text-primary hover:underline">
                    Как правильно выходить из длительного голодания
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    27 ответов • Последнее сообщение: 2 недели назад
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ForumTopic;
