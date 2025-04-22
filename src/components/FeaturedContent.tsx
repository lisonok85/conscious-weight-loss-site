
import ContentCard from "./ContentCard";

const FeaturedContent = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: "Овощной смузи-боул",
      description: "Питательный и низкокалорийный завтрак",
      image: "/placeholder.svg",
      calories: 250,
      time: "15 мин",
      link: "/recipes"
    },
    {
      id: 2,
      title: "Запеченная курица с травами",
      description: "Богатый белком и низкоуглеводный ужин",
      image: "/placeholder.svg",
      calories: 320,
      time: "45 мин",
      link: "/recipes"
    },
    {
      id: 3,
      title: "Салат с киноа и авокадо",
      description: "Полезный обед с полным набором нутриентов",
      image: "/placeholder.svg",
      calories: 280,
      time: "20 мин",
      link: "/recipes"
    }
  ];

  const featuredStories = [
    {
      id: 1,
      title: "Мой путь к здоровому образу жизни",
      author: "Елена, 35 лет",
      description: "Как я потеряла 20 кг за год без диет и голодания",
      image: "/placeholder.svg",
      results: "-20 кг",
      time: "12 месяцев",
      link: "/stories"
    },
    {
      id: 2,
      title: "Победа над эмоциональным перееданием",
      author: "Александр, 42 года",
      description: "История преодоления пищевой зависимости и обретения контроля",
      image: "/placeholder.svg",
      results: "-15 кг",
      time: "8 месяцев",
      link: "/stories"
    }
  ];

  return (
    <div className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Популярные рецепты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featuredRecipes.map((recipe) => (
            <ContentCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              link={recipe.link}
              footer={
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span>{recipe.calories} ккал</span>
                  <span>{recipe.time}</span>
                </div>
              }
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Истории успеха</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredStories.map((story) => (
            <ContentCard
              key={story.id}
              title={story.title}
              description={story.description}
              image={story.image}
              link={story.link}
              className="md:flex md:flex-row h-full"
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
              <p className="text-muted-foreground line-clamp-3">
                "Мой путь к осознанному похудению начался не с диеты, а с изменения отношения к еде и своему телу..."
              </p>
            </ContentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
