import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import GameEmbed from '@/components/GameEmbed';

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  image: string;
  description: string;
  fullDescription: string;
  developer: string;
  version: string;
  updated: string;
  screenshots: string[];
  requirements: {
    os: string;
    storage: string;
    ram: string;
  };
  features: string[];
  downloadUrl: string;
  playableInBrowser?: boolean;
}

const gamesData: Record<number, Game> = {
  1: {
    id: 1,
    title: 'Neon Speed Racing',
    category: 'Гонки',
    rating: 4.8,
    downloads: '10M+',
    size: '250 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
    description: 'Футуристические гонки с неоновой графикой',
    fullDescription: 'Погрузитесь в мир футуристических гонок с потрясающей неоновой графикой! Neon Speed Racing предлагает невероятную динамику, множество уникальных трасс и возможность кастомизации вашего болида. Соревнуйтесь с игроками со всего мира в режиме онлайн или проходите карьерный режим, открывая новые машины и улучшения.',
    developer: 'SpeedTech Games',
    version: '2.5.1',
    updated: '15 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '300 MB свободного места',
      ram: '2 GB RAM'
    },
    features: [
      'Онлайн-мультиплеер',
      'Карьерный режим',
      'Кастомизация автомобилей',
      'Динамическая погода',
      'Поддержка геймпада'
    ],
    downloadUrl: '#'
  },
  2: {
    id: 2,
    title: 'Legends of Mystic',
    category: 'RPG',
    rating: 4.9,
    downloads: '15M+',
    size: '1.2 GB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
    description: 'Эпическая фэнтези RPG с магией и приключениями',
    fullDescription: 'Отправьтесь в эпическое приключение в мире магии и легенд! Legends of Mystic - это масштабная RPG с захватывающим сюжетом, множеством квестов и уникальной боевой системой. Создайте своего героя, изучайте магические заклинания, собирайте легендарную экипировку и сражайтесь с могущественными боссами.',
    developer: 'Mystic Studios',
    version: '3.2.0',
    updated: '20 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg'
    ],
    requirements: {
      os: 'Android 9.0+',
      storage: '1.5 GB свободного места',
      ram: '3 GB RAM'
    },
    features: [
      'Открытый мир',
      'Система крафта',
      'PvP арена',
      'Гильдии',
      'Регулярные обновления'
    ],
    downloadUrl: '#'
  },
  3: {
    id: 3,
    title: 'Puzzle Blast',
    category: 'Головоломки',
    rating: 4.7,
    downloads: '50M+',
    size: '120 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
    description: 'Увлекательные головоломки для всей семьи',
    fullDescription: 'Самая увлекательная головоломка года! Puzzle Blast предлагает тысячи уровней с нарастающей сложностью, красочную графику и множество бонусов. Собирайте цветные комбинации, используйте специальные усилители и соревнуйтесь с друзьями за лучший результат.',
    developer: 'Puzzle Games Inc',
    version: '1.8.3',
    updated: '10 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg'
    ],
    requirements: {
      os: 'Android 7.0+',
      storage: '150 MB свободного места',
      ram: '1 GB RAM'
    },
    features: [
      '5000+ уровней',
      'Ежедневные задания',
      'Турниры',
      'Социальные функции',
      'Офлайн режим'
    ],
    downloadUrl: '#'
  },
  4: {
    id: 4,
    title: 'Battle Royale Arena',
    category: 'Экшен',
    rating: 4.6,
    downloads: '100M+',
    size: '800 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
    description: 'Многопользовательская королевская битва',
    fullDescription: 'Окунитесь в мир интенсивных PvP сражений! Battle Royale Arena предлагает 100 игроков на карте, множество оружия и тактик для победы. Выживайте, находите лучшую экипировку и станьте последним выжившим в этой захватывающей королевской битве.',
    developer: 'Battle Games Co',
    version: '4.1.2',
    updated: '25 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '1 GB свободного места',
      ram: '4 GB RAM'
    },
    features: [
      '100 игроков онлайн',
      'Множество режимов',
      'Голосовой чат',
      'Система рангов',
      'Сезонные события'
    ],
    downloadUrl: '#'
  },
  5: {
    id: 5,
    title: 'Magic Kingdom',
    category: 'Стратегия',
    rating: 4.5,
    downloads: '20M+',
    size: '500 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
    description: 'Постройте своё волшебное королевство',
    fullDescription: 'Станьте правителем волшебного королевства! Стройте здания, развивайте экономику, тренируйте армию и защищайте свои земли от врагов. Magic Kingdom сочетает стратегию, строительство и фэнтези-элементы в одной увлекательной игре.',
    developer: 'Kingdom Games',
    version: '2.3.4',
    updated: '18 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '600 MB свободного места',
      ram: '2 GB RAM'
    },
    features: [
      'Стратегическое строительство',
      'Альянсы игроков',
      'PvE кампания',
      'Магические герои',
      'События и турниры'
    ],
    downloadUrl: '#'
  },
  6: {
    id: 6,
    title: 'Color Match',
    category: 'Головоломки',
    rating: 4.4,
    downloads: '30M+',
    size: '80 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
    description: 'Собирайте цветные комбинации',
    fullDescription: 'Простая, но затягивающая головоломка! Color Match предлагает расслабляющий геймплей, красивую графику и приятную музыку. Собирайте цветные комбинации, зарабатывайте очки и расслабляйтесь после рабочего дня.',
    developer: 'Color Games',
    version: '1.5.2',
    updated: '12 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg'
    ],
    requirements: {
      os: 'Android 7.0+',
      storage: '100 MB свободного места',
      ram: '1 GB RAM'
    },
    features: [
      'Расслабляющий геймплей',
      'Красивая графика',
      'Приятная музыка',
      'Без рекламы',
      'Офлайн режим'
    ],
    downloadUrl: '#'
  },
  4: {
    id: 4,
    title: 'Brawl Stars',
    category: 'Экшен',
    rating: 4.9,
    downloads: '500M+',
    size: '350 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/bae3a5e8-e77c-40e9-a799-906e0dc83885.jpg',
    description: 'Командные бои 3 на 3 с уникальными героями',
    fullDescription: 'Присоединяйся к миллионам игроков в Brawl Stars! Выбирай из десятков уникальных бойцов с супер-способностями. Сражайся в быстрых 3-минутных матчах в командах 3 на 3 или в режиме королевской битвы. Собирай и улучшай персонажей, открывай новые режимы и карты. Яркая графика и динамичный геймплей не оставят равнодушным!',
    developer: 'Supercell',
    version: '48.175',
    updated: '28 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/bae3a5e8-e77c-40e9-a799-906e0dc83885.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/bae3a5e8-e77c-40e9-a799-906e0dc83885.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/bae3a5e8-e77c-40e9-a799-906e0dc83885.jpg'
    ],
    requirements: {
      os: 'Android 7.0+',
      storage: '400 MB свободного места',
      ram: '2 GB RAM'
    },
    features: [
      'Командные бои 3v3',
      'Режим королевской битвы',
      '60+ уникальных бойцов',
      'Регулярные обновления',
      'Киберспортивные турниры'
    ],
    downloadUrl: '#',
    playableInBrowser: true
  },
  5: {
    id: 5,
    title: 'PUBG Mobile',
    category: 'Экшен',
    rating: 4.6,
    downloads: '1B+',
    size: '800 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/3ad9dc05-b162-4086-b417-93e624b78aa0.jpg',
    description: 'Легендарная королевская битва на 100 игроков',
    fullDescription: 'Оригинальная королевская битва теперь на мобильных устройствах! PUBG Mobile предлагает невероятную графику, реалистичную физику и интенсивный геймплей. 100 игроков высаживаются на огромную карту, собирают оружие и сражаются до последнего выжившего. Различные режимы игры, огромный арсенал оружия и регулярные обновления.',
    developer: 'KRAFTON',
    version: '3.4.0',
    updated: '25 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/3ad9dc05-b162-4086-b417-93e624b78aa0.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/3ad9dc05-b162-4086-b417-93e624b78aa0.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/3ad9dc05-b162-4086-b417-93e624b78aa0.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '1 GB свободного места',
      ram: '3 GB RAM'
    },
    features: [
      '100 игроков онлайн',
      'Реалистичная графика',
      'Множество карт',
      'Голосовой чат',
      'Кланы и ранговые бои'
    ],
    downloadUrl: '#',
    playableInBrowser: true
  },
  6: {
    id: 6,
    title: 'Free Fire',
    category: 'Экшен',
    rating: 4.5,
    downloads: '1B+',
    size: '600 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/9185e2d1-4cee-4347-82ef-65434a291714.jpg',
    description: 'Быстрые 10-минутные сражения до последнего',
    fullDescription: 'Free Fire - это быстрая королевская битва, где каждая игра длится всего 10 минут! 50 игроков высаживаются на остров и сражаются за выживание. Уникальные персонажи с особыми навыками, огромный арсенал оружия и транспорта. Идеально подходит для тех, кто ценит динамику и не хочет тратить много времени на одну игру.',
    developer: 'Garena',
    version: '1.102.1',
    updated: '22 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/9185e2d1-4cee-4347-82ef-65434a291714.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/9185e2d1-4cee-4347-82ef-65434a291714.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/9185e2d1-4cee-4347-82ef-65434a291714.jpg'
    ],
    requirements: {
      os: 'Android 7.0+',
      storage: '700 MB свободного места',
      ram: '2 GB RAM'
    },
    features: [
      'Быстрые 10-мин матчи',
      'Уникальные персонажи',
      '50 игроков на карте',
      'Командный режим',
      'Еженедельные события'
    ],
    downloadUrl: '#',
    playableInBrowser: true
  },
  7: {
    id: 7,
    title: 'Battle Royale Arena',
    category: 'Экшен',
    rating: 4.6,
    downloads: '100M+',
    size: '800 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
    description: 'Многопользовательская королевская битва',
    fullDescription: 'Окунитесь в мир интенсивных PvP сражений! Battle Royale Arena предлагает 100 игроков на карте, множество оружия и тактик для победы.',
    developer: 'Battle Games Co',
    version: '4.1.2',
    updated: '25 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/684cd25f-5179-4a66-90ee-9353ca74baee.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '1 GB свободного места',
      ram: '4 GB RAM'
    },
    features: [
      '100 игроков онлайн',
      'Множество режимов',
      'Голосовой чат',
      'Система рангов',
      'Сезонные события'
    ],
    downloadUrl: '#'
  },
  8: {
    id: 8,
    title: 'Magic Kingdom',
    category: 'Стратегия',
    rating: 4.5,
    downloads: '20M+',
    size: '500 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
    description: 'Постройте своё волшебное королевство',
    fullDescription: 'Станьте правителем волшебного королевства! Стройте здания, развивайте экономику, тренируйте армию и защищайте свои земли от врагов.',
    developer: 'Kingdom Games',
    version: '2.3.4',
    updated: '18 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/b79c270d-4d8c-40a7-9a49-8e59786cfc77.jpg'
    ],
    requirements: {
      os: 'Android 8.0+',
      storage: '600 MB свободного места',
      ram: '2 GB RAM'
    },
    features: [
      'Стратегическое строительство',
      'Альянсы игроков',
      'PvE кампания',
      'Магические герои',
      'События и турниры'
    ],
    downloadUrl: '#'
  },
  9: {
    id: 9,
    title: 'Color Match',
    category: 'Головоломки',
    rating: 4.4,
    downloads: '30M+',
    size: '80 MB',
    image: 'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
    description: 'Собирайте цветные комбинации',
    fullDescription: 'Простая, но затягивающая головоломка! Color Match предлагает расслабляющий геймплей, красивую графику и приятную музыку.',
    developer: 'Color Games',
    version: '1.5.2',
    updated: '12 октября 2024',
    screenshots: [
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg',
      'https://cdn.poehali.dev/projects/0e42aa32-0c99-4ce0-ad74-73486c720d70/files/18969d4f-8494-4c5e-a0d2-08434ed28eb1.jpg'
    ],
    requirements: {
      os: 'Android 7.0+',
      storage: '100 MB свободного места',
      ram: '1 GB RAM'
    },
    features: [
      'Расслабляющий геймплей',
      'Красивая графика',
      'Приятная музыка',
      'Без рекламы',
      'Офлайн режим'
    ],
    downloadUrl: '#'
  }
};

const GameDetail = () => {
  const { id } = useParams();
  const game = gamesData[Number(id)];
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast({
            title: "Скачивание завершено!",
            description: `${game.title} успешно загружен на ваше устройство`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Игра не найдена</CardTitle>
            <CardDescription>К сожалению, запрашиваемая игра не существует</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="ArrowLeft" size={24} />
              <div className="flex items-center gap-2">
                <Icon name="Gamepad2" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  GameHub
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden animate-fade-in border-border bg-card">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-primary text-lg px-4 py-2">
                  {game.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{game.title}</CardTitle>
                    <CardDescription className="text-base">{game.developer}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg">
                    <Icon name="Star" size={24} className="fill-accent text-accent" />
                    <span className="text-2xl font-bold">{game.rating}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {game.playableInBrowser && (
              <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <GameEmbed gameTitle={game.title} gameId={game.id} />
              </div>
            )}

            <Tabs defaultValue="about" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Описание</TabsTrigger>
                <TabsTrigger value="screenshots">Скриншоты</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>О игре</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{game.fullDescription}</p>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-lg">Основные возможности</h3>
                      <ul className="space-y-2">
                        {game.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Icon name="Check" size={18} className="text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="screenshots">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Скриншоты игры</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {game.screenshots.map((screenshot, index) => (
                        <div 
                          key={index} 
                          className="relative h-48 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                          <img 
                            src={screenshot} 
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Отзывы пользователей</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>5 звёзд</span>
                        <Progress value={75} className="w-48" />
                        <span className="text-muted-foreground">75%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>4 звезды</span>
                        <Progress value={15} className="w-48" />
                        <span className="text-muted-foreground">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>3 звезды</span>
                        <Progress value={5} className="w-48" />
                        <span className="text-muted-foreground">5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>2 звезды</span>
                        <Progress value={3} className="w-48" />
                        <span className="text-muted-foreground">3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>1 звезда</span>
                        <Progress value={2} className="w-48" />
                        <span className="text-muted-foreground">2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24 animate-scale-in border-border bg-card">
              <CardHeader>
                <CardTitle>Скачать игру</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-pulse-glow disabled:opacity-50"
                >
                  <Icon name={isDownloading ? "Loader2" : "Download"} size={24} className={`mr-2 ${isDownloading ? 'animate-spin' : ''}`} />
                  {isDownloading ? `Скачивание ${downloadProgress}%` : 'Скачать'}
                </Button>
                
                {isDownloading && (
                  <Progress value={downloadProgress} className="w-full" />
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Размер</span>
                    <span className="font-semibold">{game.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Загрузок</span>
                    <span className="font-semibold">{game.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Версия</span>
                    <span className="font-semibold">{game.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Обновлено</span>
                    <span className="font-semibold">{game.updated}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-3">Системные требования</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Icon name="Smartphone" size={16} className="mt-0.5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">ОС</div>
                        <div className="font-medium">{game.requirements.os}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="HardDrive" size={16} className="mt-0.5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Память</div>
                        <div className="font-medium">{game.requirements.storage}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Cpu" size={16} className="mt-0.5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">RAM</div>
                        <div className="font-medium">{game.requirements.ram}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Icon name="Share2" size={18} />
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="py-8 border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gamepad2" size={24} className="text-primary" />
            <span className="font-bold text-foreground">GameHub</span>
          </div>
          <p>© 2024 GameHub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default GameDetail;