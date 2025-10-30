import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  image: string;
  description: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Neon Speed Racing',
    category: 'Гонки',
    rating: 4.8,
    downloads: '10M+',
    size: '250 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
    description: 'Футуристические гонки с неоновой графикой'
  },
  {
    id: 2,
    title: 'Legends of Mystic',
    category: 'RPG',
    rating: 4.9,
    downloads: '15M+',
    size: '1.2 GB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
    description: 'Эпическая фэнтези RPG с магией и приключениями'
  },
  {
    id: 3,
    title: 'Puzzle Blast',
    category: 'Головоломки',
    rating: 4.7,
    downloads: '50M+',
    size: '120 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
    description: 'Увлекательные головоломки для всей семьи'
  },
  {
    id: 4,
    title: 'Battle Royale Arena',
    category: 'Экшен',
    rating: 4.6,
    downloads: '100M+',
    size: '800 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
    description: 'Многопользовательская королевская битва'
  },
  {
    id: 5,
    title: 'Magic Kingdom',
    category: 'Стратегия',
    rating: 4.5,
    downloads: '20M+',
    size: '500 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
    description: 'Постройте своё волшебное королевство'
  },
  {
    id: 6,
    title: 'Color Match',
    category: 'Головоломки',
    rating: 4.4,
    downloads: '30M+',
    size: '80 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
    description: 'Собирайте цветные комбинации'
  }
];

const reviews = [
  { id: 1, user: 'Алексей М.', rating: 5, text: 'Отличный каталог игр! Нашёл много интересного для себя', game: 'Neon Speed Racing' },
  { id: 2, user: 'Мария К.', rating: 5, text: 'Удобно скачивать, всё работает быстро', game: 'Legends of Mystic' },
  { id: 3, user: 'Дмитрий П.', rating: 4, text: 'Хороший выбор игр, регулярно появляются новинки', game: 'Puzzle Blast' },
  { id: 4, user: 'Елена С.', rating: 5, text: 'Интуитивный интерфейс, легко найти то что нужно', game: 'Battle Royale Arena' }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const categories = ['Все', 'Гонки', 'RPG', 'Головоломки', 'Экшен', 'Стратегия'];

  const filteredGames = selectedCategory === 'Все' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Gamepad2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                GameHub
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#top" className="hover:text-primary transition-colors">Топ игр</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Лучшие игры для<br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                твоего телефона
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Скачивай топовые игры абсолютно бесплатно. Новинки каждый день!
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg px-8 animate-pulse-glow">
                <Icon name="Download" size={24} className="mr-2" />
                Начать скачивание
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Play" size={24} className="mr-2" />
                Смотреть трейлер
              </Button>
            </div>
            <div className="mt-12 flex gap-8 justify-center text-center">
              <div className="animate-slide-up">
                <div className="text-3xl font-bold text-primary">100M+</div>
                <div className="text-muted-foreground">Скачиваний</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold text-secondary">5000+</div>
                <div className="text-muted-foreground">Игр</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-accent">4.8★</div>
                <div className="text-muted-foreground">Рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Каталог игр</h2>
          
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                <Card 
                  className="overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in border-border bg-card cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary">
                      {game.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {game.title}
                      <div className="flex items-center gap-1 text-accent">
                        <Icon name="Star" size={18} className="fill-accent" />
                        <span className="text-sm">{game.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Icon name="Download" size={16} />
                        {game.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="HardDrive" size={16} />
                        {game.size}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="top" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <Icon name="TrendingUp" size={36} className="inline mr-2 text-accent" />
            Топ игр недели
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {games.slice(0, 4).map((game, index) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                <Card 
                  className="flex overflow-hidden hover:border-primary transition-all duration-300 animate-scale-in bg-card border-border cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-32 flex-shrink-0">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-bold mb-1">{game.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{game.category}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-accent">
                        <Icon name="Star" size={14} className="fill-accent" />
                        {game.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Download" size={14} />
                        {game.downloads}
                      </span>
                    </div>
                    <Button size="sm" className="mt-3 bg-gradient-to-r from-primary to-secondary">
                      Скачать
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <Icon name="MessageSquare" size={36} className="inline mr-2 text-secondary" />
            Отзывы пользователей
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card 
                key={review.id}
                className="animate-fade-in bg-card border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-bold">
                        {review.user[0]}
                      </div>
                      <div>
                        <CardTitle className="text-base">{review.user}</CardTitle>
                        <CardDescription className="text-xs">{review.game}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-accent" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gamepad2" size={24} className="text-primary" />
            <span className="font-bold text-foreground">GameHub</span>
          </div>
          <p>© 2024 GameHub. Все права защищены.</p>
          <div className="flex gap-6 justify-center mt-4">
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;