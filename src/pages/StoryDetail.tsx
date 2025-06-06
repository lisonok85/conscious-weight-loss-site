
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import AIImageGenerator from "@/components/AIImageGenerator";

// Это моковые данные, в реальном приложении вы бы загружали их с сервера
const storiesData = [
  {
    id: "1",
    title: "Мой путь к здоровому образу жизни",
    author: "Елена, 35 лет",
    description: "Как я потеряла 20 кг за год без диет и голодания",
    image: "/placeholder.svg",
    imagePrompt: "Фото до и после похудения, трансформация тела, здоровый образ жизни, успешное похудение -20кг",
    results: "-20 кг",
    time: "12 месяцев",
    content: `
      <p>Мой путь к осознанному похудению начался не с диеты, а с изменения отношения к еде и своему телу. Три года назад я весила почти 90 кг при росте 165 см и страдала от постоянной усталости, болей в спине и низкой самооценки.</p>
      
      <p>Я перепробовала десятки диет — от кето до интервального голодания. Каждый раз результат был одинаковым: быстрая потеря веса, а затем возвращение всех килограммов с "бонусом". Этот замкнутый круг казался бесконечным.</p>
      
      <p>Переломный момент наступил, когда я встретила диетолога, который предложил мне не считать калории, а просто научиться слушать своё тело. Мы работали над моими пищевыми привычками, эмоциональной связью с едой и образом жизни в целом.</p>
      
      <p>Вот ключевые принципы, которые изменили мою жизнь:</p>
      
      <ul>
        <li>Осознанное питание: я стала обращать внимание на чувство голода и насыщения</li>
        <li>Отказ от запретов: никакой "запрещенной" еды, только баланс и мера</li>
        <li>Регулярная активность: я нашла виды спорта, которые приносят удовольствие</li>
        <li>Работа со стрессом: научилась справляться с эмоциями без помощи еды</li>
      </ul>
      
      <p>Результаты не заставили себя ждать, но они были постепенными. За первый месяц я сбросила всего 2 кг, но заметила, что у меня появилось больше энергии. К концу третьего месяца ушло 7 кг, а через полгода — 12 кг.</p>
      
      <p>Самое удивительное, что впервые в жизни процесс похудения не был мучительным. Я не испытывала постоянного голода, не срывалась и не жила в ожидании "конца диеты".</p>
      
      <p>Сейчас, спустя год, мой вес стабилизировался на отметке 68 кг, и я чувствую себя прекрасно. Но главное не цифры на весах, а то, что я научилась жить в гармонии со своим телом.</p>
    `,
    publishDate: "15 марта 2023",
    likes: 142,
  },
  {
    id: "2",
    title: "Победа над эмоциональным перееданием",
    author: "Александр, 42 года",
    description: "История преодоления пищевой зависимости и обретения контроля",
    image: "/placeholder.svg",
    imagePrompt: "Человек выбирает здоровую пищу вместо нездоровой, преодоление пищевой зависимости, мужчина средних лет с похудением -15кг",
    results: "-15 кг",
    time: "8 месяцев",
    content: `
      <p>Я всегда использовал еду как способ справиться со стрессом. Осознанное питание помогло мне изменить эту привычку и найти здоровые способы управления эмоциями.</p>
      
      <p>Мой путь начался с понимания, что я не просто "люблю поесть" — у меня эмоциональная зависимость от еды. Каждый раз, когда я чувствовал тревогу, усталость или даже скуку, я автоматически тянулся к холодильнику.</p>
      
      <p>Первым шагом было ведение дневника питания, где я записывал не только что съел, но и почему. Очень быстро выяснилось, что больше половины приемов пищи не были связаны с физическим голодом.</p>
      
      <p>С помощью психолога я начал разрабатывать альтернативные стратегии борьбы со стрессом: медитация, физическая активность, творческие хобби. Постепенно еда перестала быть моим главным утешителем.</p>
      
      <p>В результате я не только сбросил 15 кг за 8 месяцев, но и обрел новое качество жизни. Сейчас я контролирую свое питание, а не оно контролирует меня.</p>
    `,
    publishDate: "27 мая 2023",
    likes: 98,
  },
  {
    id: "3",
    title: "От 100 кг к марафону",
    author: "Мария, 29 лет",
    description: "Моя трансформация из малоподвижного образа жизни в бегуна-марафонца",
    image: "/placeholder.svg",
    imagePrompt: "Женщина бежит марафон, от ожирения к спортивной форме, трансформация тела -30кг, бегун",
    results: "-30 кг",
    time: "18 месяцев",
    content: `
      <p>Три года назад я не могла пробежать и минуты. Сегодня я финишировала свой первый марафон. Моя история — пример того, как маленькие шаги могут привести к огромным переменам.</p>
      
      <p>Всю жизнь я ненавидела физкультуру и избегала любой активности. К 26 годам мой вес достиг 100 кг, а здоровье оставляло желать лучшего.</p>
      
      <p>Начала я с самого простого — ходьбы. Сначала по 15 минут в день, постепенно увеличивая время и интенсивность. Через три месяца я решилась на первую пробежку — всего 1 минуту бега, 2 минуты ходьбы. Так, чередуя, я пробегала около 2 км.</p>
      
      <p>Параллельно я начала менять питание, делая акцент на белковых продуктах и овощах, но без жестких ограничений. Я не отказывалась от любимых блюд полностью, а училась есть их осознанно и в меньших количествах.</p>
      
      <p>Через полгода я пробежала свой первый 5-километровый забег, а через год — полумарафон. А сегодня, спустя 18 месяцев, я финишировала полный марафон (42,2 км) с результатом 4:56:23.</p>
      
      <p>За это время я сбросила 30 кг, но главное — я полюбила свое тело за то, что оно может делать, а не за то, как оно выглядит.</p>
    `,
    publishDate: "10 июня 2023",
    likes: 215,
  },
  {
    id: "4",
    title: "Трансформация после 50",
    author: "Владимир, 53 года",
    description: "Как я сбросил вес и улучшил здоровье в зрелом возрасте",
    image: "/placeholder.svg",
    imagePrompt: "Пожилой мужчина в хорошей физической форме, трансформация тела после 50 лет, похудение -25кг, здоровый образ жизни",
    results: "-25 кг",
    time: "14 месяцев",
    content: `
      <p>Никогда не поздно начать заботиться о себе. В 52 года я решил изменить свою жизнь после пугающих результатов медицинского обследования.</p>
      
      <p>Врач поставил диагноз "преддиабет" и предупредил о высоком риске сердечно-сосудистых заболеваний. Это стало моим тревожным звонком.</p>
      
      <p>Я начал с консультации диетолога, который помог составить план питания с учетом моего возраста и состояния здоровья. Никаких экстремальных диет — только сбалансированное питание с упором на естественные продукты.</p>
      
      <p>Физическая активность поначалу ограничивалась ходьбой и плаванием, но постепенно я добавил силовые тренировки, адаптированные для моего возраста.</p>
      
      <p>Результаты превзошли все ожидания. За 14 месяцев я сбросил 25 кг, нормализовал уровень сахара в крови и значительно улучшил показатели холестерина. Врач был настолько впечатлен, что использует мой случай как пример для других пациентов.</p>
      
      <p>Главный урок, который я извлек: возраст — не препятствие для изменений, если подходить к процессу с умом и терпением.</p>
    `,
    publishDate: "3 августа 2023",
    likes: 189,
  }
];

const StoryDetail = () => {
  const { id } = useParams();
  const story = storiesData.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">История не найдена</h1>
            <p className="mb-6">К сожалению, запрашиваемая история не существует.</p>
            <Button asChild>
              <Link to="/stories">Вернуться к историям</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link to="/stories" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к историям
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
              {story.author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-medium">{story.author}</p>
              <p className="text-sm text-muted-foreground">{story.publishDate}</p>
            </div>
          </div>
          
          <div className="flex gap-4 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
              {story.results}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted">
              {story.time}
            </span>
          </div>
          
          <div className="aspect-video w-full bg-muted rounded-lg mb-8 overflow-hidden">
            <AIImageGenerator 
              prompt={story.imagePrompt}
              alt={story.title} 
              className="w-full h-full"
              fallbackSrc={story.image}
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
          
          <div className="flex justify-between items-center border-t pt-6 mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                <span>{story.likes}</span>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
            </div>
            <Button>Написать комментарий</Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default StoryDetail;
