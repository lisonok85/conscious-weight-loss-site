
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AIImageGenerator from "@/components/AIImageGenerator";

const stories = [
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
              />
            </div>
            <Button className="bg-primary">Поделиться своей историей</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story) => (
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
                  <AIImageGenerator 
                    prompt={story.imagePrompt}
                    alt={story.title}
                    fallbackSrc={story.image}
                  />
                </div>
                <p className="text-muted-foreground line-clamp-3">
                  "{story.content}"
                </p>
              </ContentCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
