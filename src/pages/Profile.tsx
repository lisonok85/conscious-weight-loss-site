import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Settings, 
  LogOut, 
  Save,
  Bell,
  Lock,
  Shield,
  EyeOff,
  Eye,
  Weight,
  Trophy,
  Utensils,
  CalendarRange,
  Camera,
  BarChart3,
  PlusCircle,
  Star,
  CheckCircle2,
  Calendar,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

// Тип для записи о весе
interface WeightRecord {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

// Тип для достижения пользователя
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: JSX.Element;
  completed: boolean;
}

// Тип для записи в дневнике питания
interface FoodRecord {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: { name: string; calories: number; amount: string; weight: number }[];
  calories: number;
  totalWeight: number;
  note?: string;
}

// Тип для продукта питания
interface FoodItem {
  name: string;
  calories: number;
  amount: string;
  weight: number;
}

// Тип для данных о посетителях
interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  firstVisit: string;
  lastVisit: string;
  totalVisits: number;
  avgTimeOnSite: string;
  platform: string;
  browser: string;
  country: string;
  city: string;
}

// Тип для данных о популярных страницах
interface PageView {
  path: string;
  title: string;
  viewCount: number;
  avgTimeOnPage: string;
  bounceRate: string;
}

// Тип для данных о популярных интересах
interface Interest {
  category: string;
  visitorCount: number;
  percentage: number;
  trending: 'up' | 'down' | 'stable';
  change: number;
}

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Проверка роли администратора
  const isAdmin = user?.role === 'admin';
  
  // Состояния для профиля
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Состояния для настроек
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [hideActivity, setHideActivity] = useState(false);
  
  // Состояния для смены пароля
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Состояния для трекера веса
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([
    { id: '1', date: '2025-04-30', weight: 82.5, note: 'Начало пути' },
    { id: '2', date: '2025-05-01', weight: 82.0, note: 'После первой тренировки' },
    { id: '3', date: '2025-05-03', weight: 81.6, note: 'Соблюдал питание два дня' }
  ]);
  const [newWeight, setNewWeight] = useState('');
  const [newWeightNote, setNewWeightNote] = useState('');
  
  // Состояния для достижений
  const [achievements, setAchievements] = useState<Achievement[]>([
    { 
      id: '1', 
      title: 'Первый шаг', 
      description: 'Зарегистрироваться в приложении', 
      date: '2025-04-30', 
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, 
      completed: true 
    },
    { 
      id: '2', 
      title: 'Неделя без срывов', 
      description: 'Соблюдать план питания 7 дней подряд', 
      date: '', 
      icon: <Star className="h-5 w-5 text-amber-500" />, 
      completed: false 
    },
    { 
      id: '3', 
      title: '-5 кг', 
      description: 'Потерять первые 5 кг от начального веса', 
      date: '', 
      icon: <Trophy className="h-5 w-5 text-blue-500" />, 
      completed: false 
    }
  ]);
  
  // Состояния для дневника питания
  const [foodRecords, setFoodRecords] = useState<FoodRecord[]>([
    {
      id: '1',
      date: '2025-05-03',
      mealType: 'breakfast',
      foods: [
        { name: 'Овсянка', calories: 150, amount: '100г', weight: 100 },
        { name: 'Яблоко', calories: 52, amount: '1 шт', weight: 150 }
      ],
      calories: 202,
      totalWeight: 250,
      note: 'Хороший завтрак'
    },
    {
      id: '2',
      date: '2025-05-03',
      mealType: 'lunch',
      foods: [
        { name: 'Куриная грудка', calories: 165, amount: '100г', weight: 100 },
        { name: 'Рис бурый', calories: 111, amount: '100г', weight: 100 },
        { name: 'Овощной салат', calories: 45, amount: '100г', weight: 100 }
      ],
      calories: 321,
      totalWeight: 300,
      note: ''
    }
  ]);
  
  // Состояние диалога добавления приема пищи
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  
  // Состояния для новой записи в дневнике питания
  const [newMealType, setNewMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [newMealDate, setNewMealDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMealNote, setNewMealNote] = useState('');
  const [newFoodItems, setNewFoodItems] = useState<FoodItem[]>([
    { name: '', calories: 0, amount: '', weight: 0 }
  ]);
  
  // Состояния для данных администратора
  const [dateRange, setDateRange] = useState('week');
  const [visitorData, setVisitorData] = useState<Visitor[]>([
    {
      id: 'v1',
      ip: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      firstVisit: '2025-04-25T14:32:21',
      lastVisit: '2025-05-06T09:15:43',
      totalVisits: 14,
      avgTimeOnSite: '5m 23s',
      platform: 'Windows',
      browser: 'Chrome',
      country: 'Россия',
      city: 'Москва'
    },
    {
      id: 'v2',
      ip: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
      firstVisit: '2025-04-26T08:12:33',
      lastVisit: '2025-05-05T19:45:12',
      totalVisits: 8,
      avgTimeOnSite: '3m 47s',
      platform: 'iOS',
      browser: 'Safari',
      country: 'Россия',
      city: 'Санкт-Петербург'
    },
    {
      id: 'v3',
      ip: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      firstVisit: '2025-04-28T16:03:27',
      lastVisit: '2025-05-06T11:22:18',
      totalVisits: 6,
      avgTimeOnSite: '7m 12s',
      platform: 'macOS',
      browser: 'Chrome',
      country: 'Россия',
      city: 'Новосибирск'
    },
    {
      id: 'v4',
      ip: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36',
      firstVisit: '2025-04-30T10:48:19',
      lastVisit: '2025-05-04T14:32:41',
      totalVisits: 4,
      avgTimeOnSite: '2m 34s',
      platform: 'Android',
      browser: 'Chrome',
      country: 'Россия',
      city: 'Екатеринбург'
    },
    {
      id: 'v5',
      ip: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
      firstVisit: '2025-05-01T19:22:45',
      lastVisit: '2025-05-05T21:18:37',
      totalVisits: 3,
      avgTimeOnSite: '4m 58s',
      platform: 'Windows',
      browser: 'Firefox',
      country: 'Россия',
      city: 'Казань'
    }
  ]);
  
  const [popularPages, setPopularPages] = useState<PageView[]>([
    {
      path: '/recipes',
      title: 'Рецепты',
      viewCount: 1245,
      avgTimeOnPage: '3m 42s',
      bounceRate: '23%'
    },
    {
      path: '/stories',
      title: 'Истории успеха',
      viewCount: 876,
      avgTimeOnPage: '5m 18s',
      bounceRate: '15%'
    },
    {
      path: '/food-database',
      title: 'База продуктов питания',
      viewCount: 723,
      avgTimeOnPage: '4m 05s',
      bounceRate: '18%'
    },
    {
      path: '/forum',
      title: 'Форум',
      viewCount: 645,
      avgTimeOnPage: '7m 32s',
      bounceRate: '12%'
    },
    {
      path: '/photos',
      title: 'Фотографии',
      viewCount: 514,
      avgTimeOnPage: '2m 54s',
      bounceRate: '27%'
    }
  ]);
  
  const [userInterests, setUserInterests] = useState<Interest[]>([
    {
      category: 'Похудение',
      visitorCount: 1876,
      percentage: 68,
      trending: 'up',
      change: 12
    },
    {
      category: 'Здоровое питание',
      visitorCount: 1545,
      percentage: 56,
      trending: 'up',
      change: 8
    },
    {
      category: 'Фитнес',
      visitorCount: 1230,
      percentage: 45,
      trending: 'stable',
      change: 1
    },
    {
      category: 'Рецепты без глютена',
      visitorCount: 856,
      percentage: 31,
      trending: 'up',
      change: 15
    },
    {
      category: 'Низкокалорийные десерты',
      visitorCount: 745,
      percentage: 27,
      trending: 'down',
      change: 3
    },
    {
      category: 'Интервальное голодание',
      visitorCount: 678,
      percentage: 25,
      trending: 'up',
      change: 22
    },
    {
      category: 'Кето диета',
      visitorCount: 554,
      percentage: 20,
      trending: 'down',
      change: 5
    }
  ]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из своего аккаунта",
    });
  };
  
  const handleSaveProfile = () => {
    updateUser({ name, email });
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные были успешно сохранены",
    });
  };

  const handleSaveNotificationSettings = () => {
    // В реальном приложении тут был бы запрос к API
    toast({
      title: "Настройки уведомлений сохранены",
      description: "Ваши предпочтения по уведомлениям были обновлены",
    });
  };

  const handleSavePrivacySettings = () => {
    // В реальном приложении тут был бы запрос к API
    toast({
      title: "Настройки приватности сохранены",
      description: "Ваши настройки приватности были обновлены",
    });
  };

  const handleChangePassword = () => {
    // Валидация
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новый пароль и подтверждение не совпадают",
        variant: "destructive"
      });
      return;
    }

    // В реальном приложении тут был бы запрос к API
    toast({
      title: "Пароль изменен",
      description: "Ваш пароль был успешно обновлен",
    });

    // Очистка полей
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Функция для добавления новой записи о весе
  const handleAddWeightRecord = () => {
    if (!newWeight || isNaN(parseFloat(newWeight))) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный вес",
        variant: "destructive"
      });
      return;
    }
    
    const newRecord: WeightRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      note: newWeightNote
    };
    
    setWeightRecords([...weightRecords, newRecord]);
    setNewWeight('');
    setNewWeightNote('');
    
    toast({
      title: "Вес добавлен",
      description: `Запись о весе ${newWeight} кг успешно добавлена`,
    });
  };
  
  // Функция для удаления записи о весе
  const handleDeleteWeightRecord = (id: string) => {
    setWeightRecords(weightRecords.filter(record => record.id !== id));
    toast({
      title: "Запись удалена",
      description: "Запись о весе была удалена",
    });
  };
  
  // Функция для обновления значения продукта в новой записи
  const handleFoodItemChange = (index: number, field: keyof FoodItem, value: string) => {
    const updatedItems = [...newFoodItems];
    
    if (field === 'calories' || field === 'weight') {
      updatedItems[index][field] = value === '' ? 0 : parseInt(value, 10);
    } else {
      updatedItems[index][field] = value;
    }
    
    setNewFoodItems(updatedItems);
  };
  
  // Функция для добавления нового продукта в запись
  const handleAddFoodItem = () => {
    setNewFoodItems([
      ...newFoodItems, 
      { name: '', calories: 0, amount: '', weight: 0 }
    ]);
  };
  
  // Функция для удаления продукта из записи
  const handleRemoveFoodItem = (index: number) => {
    if (newFoodItems.length > 1) {
      const updatedItems = [...newFoodItems];
      updatedItems.splice(index, 1);
      setNewFoodItems(updatedItems);
    }
  };
  
  // Функция для создания новой записи в дневнике питания
  const handleAddMeal = () => {
    // Проверка наличия продуктов
    if (newFoodItems.some(item => !item.name || item.calories <= 0 || !item.amount || item.weight <= 0)) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля для каждого продукта",
        variant: "destructive"
      });
      return;
    }
    
    // Подсчет общего количества калорий и веса
    const totalCalories = newFoodItems.reduce((sum, item) => sum + item.calories, 0);
    const totalWeight = newFoodItems.reduce((sum, item) => sum + item.weight, 0);
    
    // Создание новой записи
    const newRecord: FoodRecord = {
      id: Date.now().toString(),
      date: newMealDate,
      mealType: newMealType,
      foods: [...newFoodItems],
      calories: totalCalories,
      totalWeight: totalWeight,
      note: newMealNote
    };
    
    // Добавление записи
    setFoodRecords([...foodRecords, newRecord]);
    
    // Сброс полей формы
    setNewMealType('breakfast');
    setNewMealDate(new Date().toISOString().split('T')[0]);
    setNewMealNote('');
    setNewFoodItems([{ name: '', calories: 0, amount: '', weight: 0 }]);
    
    // Закрытие диалога
    setShowAddMealDialog(false);
    
    toast({
      title: "Прием пищи добавлен",
      description: `Запись успешно добавлена в дневник питания`,
    });
  };
  
  // Функция для удаления приема пищи
  const handleDeleteMeal = (id: string) => {
    setFoodRecords(foodRecords.filter(record => record.id !== id));
    toast({
      title: "Запись удалена",
      description: "Прием пищи был удален из дневника",
    });
  };
  
  // Функция экспорта данных о посетителях
  const handleExportVisitorData = () => {
    // В реальном приложении здесь был бы код для экспорта в CSV/Excel
    toast({
      title: "Экспорт данных",
      description: "Данные о посетителях экспортированы в CSV",
    });
  };
  
  // Получаем инициалы для аватара
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };
  
  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  // Вычисление прогресса по достижениям
  const achievementProgress = Math.round((achievements.filter(a => a.completed).length / achievements.length) * 100);
  
  // Получение текущего веса (последняя запись)
  const currentWeight = weightRecords.length > 0 
    ? weightRecords[weightRecords.length - 1].weight 
    : 0;
  
  // Получение начального веса (первая запись)
  const initialWeight = weightRecords.length > 0 
    ? weightRecords[0].weight 
    : 0;
  
  // Вычисление разницы в весе
  const weightDifference = initialWeight - currentWeight;
  
  // Вычисление общего количества калорий за сегодня
  const today = new Date().toISOString().split('T')[0];
  const todayCalories = foodRecords
    .filter(record => record.date === today)
    .reduce((sum, record) => sum + record.calories, 0);
    
  // Вычисление общего веса съеденного за сегодня
  const todayTotalWeight = foodRecords
    .filter(record => record.date === today)
    .reduce((sum, record) => sum + record.totalWeight, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Боковая панель с информацией о пользователе */}
            <div className="col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                    
                    {isAdmin && (
                      <Badge className="mb-2 bg-primary/20 text-primary">Администратор</Badge>
                    )}
                    
                    {currentWeight > 0 && (
                      <div className="mb-4 text-center">
                        <p className="text-sm text-muted-foreground">Текущий вес</p>
                        <p className="text-xl font-semibold">{currentWeight} кг</p>
                        {weightDifference > 0 && (
                          <Badge variant="outline" className="mt-1 bg-green-100 text-green-800">
                            -{weightDifference.toFixed(1)} кг
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <Button variant="outline" className="w-full mb-2" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Основное содержимое с вкладками */}
            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4 flex flex-wrap">
                  <TabsTrigger value="profile">
                    <User className="mr-2 h-4 w-4" />
                    Профиль
                  </TabsTrigger>
                  <TabsTrigger value="weight">
                    <Weight className="mr-2 h-4 w-4" />
                    Мой вес
                  </TabsTrigger>
                  <TabsTrigger value="achievements">
                    <Trophy className="mr-2 h-4 w-4" />
                    Достижения
                  </TabsTrigger>
                  <TabsTrigger value="food-diary">
                    <Utensils className="mr-2 h-4 w-4" />
                    Дневник питания
                  </TabsTrigger>
                  {isAdmin && (
                    <TabsTrigger value="analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Аналитика
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                  </TabsTrigger>
                </TabsList>
                
                {/* Вкладка профиля */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Информация профиля</CardTitle>
                      <CardDescription>
                        Здесь вы можете изменить основную информацию о себе
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input 
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить изменения
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Вкладка Мой вес */}
                <TabsContent value="weight">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Weight className="mr-2 h-5 w-5" />
                          Трекер веса
                        </CardTitle>
                        <CardDescription>
                          Отслеживайте изменения вашего веса и следите за прогрессом
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {weightRecords.length > 0 ? (
                          <div className="space-y-4">
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                              <div className="bg-muted rounded-lg p-4">
                                <h3 className="text-sm font-semibold mb-1">Начальный вес</h3>
                                <p className="text-2xl font-bold">{initialWeight} кг</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(weightRecords[0].date)}
                                </p>
                              </div>
                              <div className="bg-muted rounded-lg p-4">
                                <h3 className="text-sm font-semibold mb-1">Текущий вес</h3>
                                <p className="text-2xl font-bold">{currentWeight} кг</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(weightRecords[weightRecords.length - 1].date)}
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">История изменений</h3>
                              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                {weightRecords.map((record, index) => (
                                  <div 
                                    key={record.id} 
                                    className="flex items-start justify-between p-3 border rounded-md"
                                  >
                                    <div>
                                      <div className="flex items-center">
                                        <p className="font-medium">{record.weight} кг</p>
                                        {index > 0 && (
                                          <Badge 
                                            variant="outline" 
                                            className={`ml-2 ${record.weight < weightRecords[index-1].weight ? 'bg-green-100 text-green-800' : record.weight > weightRecords[index-1].weight ? 'bg-red-100 text-red-800' : ''}`}
                                          >
                                            {record.weight < weightRecords[index-1].weight && '-'}
                                            {record.weight > weightRecords[index-1].weight && '+'}
                                            {Math.abs(record.weight - weightRecords[index-1].weight).toFixed(1)} кг
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {formatDate(record.date)}
                                      </p>
                                      {record.note && (
                                        <p className="text-sm mt-1">{record.note}</p>
                                      )}
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={() => handleDeleteWeightRecord(record.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">У вас пока нет записей о весе</p>
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Добавить новую запись</h3>
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="new-weight">Вес (кг)</Label>
                              <Input 
                                id="new-weight"
                                type="number"
                                step="0.1"
                                placeholder="Например: 75.5"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-weight-note">Примечание (необязательно)</Label>
                              <Input 
                                id="new-weight-note"
                                placeholder="Например: После тренировки"
                                value={newWeightNote}
                                onChange={(e) => setNewWeightNote(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleAddWeightRecord}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Добавить запись
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Вкладка Достижения */}
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5" />
                        Мои достижения
                      </CardTitle>
                      <CardDescription>
                        Отслеживайте свой прогресс и разблокируйте достижения
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Progress value={achievementProgress} className="flex-1" />
                        <span className="text-sm font-medium">{achievementProgress}%</span>
                      </div>
                      
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                        {achievements.map((achievement) => (
                          <div 
                            key={achievement.id}
                            className={`border rounded-lg p-4 ${achievement.completed ? 'bg-primary/10 border-primary/30' : 'bg-muted'}`}
                          >
                            <div className="flex items-start">
                              <div className="mr-3">
                                {achievement.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.description}
                                </p>
                                {achievement.completed && (
                                  <Badge 
                                    variant="outline" 
                                    className="mt-2 bg-primary/20 text-primary"
                                  >
                                    Выполнено {achievement.date ? formatDate(achievement.date) : ''}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Вкладка Дневник питания */}
                <TabsContent value="food-diary">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Utensils className="mr-2 h-5 w-5" />
                        Дневник питания
                      </CardTitle>
                      <CardDescription>
                        Отслеживайте свое питание и подсчитывайте калории
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div className="bg-muted rounded-lg p-4">
                          <h3 className="text-sm font-semibold mb-1">Сегодня потреблено</h3>
                          <p className="text-2xl font-bold">{todayCalories} ккал</p>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">Цель: 2000 ккал</p>
                            <p className="text-xs font-medium">Вес: {todayTotalWeight} г</p>
                          </div>
                          <Progress 
                            value={(todayCalories / 2000) * 100} 
                            className="mt-2" 
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Записи за сегодня</h3>
                        {foodRecords.filter(record => record.date === today).length > 0 ? (
                          <div className="space-y-3">
                            {foodRecords
                              .filter(record => record.date === today)
                              .map(record => (
                                <div key={record.id} className="border rounded-md p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center">
                                        <h4 className="font-medium">
                                          {record.mealType === 'breakfast' && 'Завтрак'}
                                          {record.mealType === 'lunch' && 'Обед'}
                                          {record.mealType === 'dinner' && 'Ужин'}
                                          {record.mealType === 'snack' && 'Перекус'}
                                        </h4>
                                        <Badge className="ml-2">{record.calories} ккал</Badge>
                                        <Badge variant="outline" className="ml-2">{record.totalWeight} г</Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {record.foods.map(food => food.name).join(', ')}                                      </p>
                                    </div>
                                    <div className="flex">
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => handleDeleteMeal(record.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">На сегодня записей нет</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setShowAddMealDialog(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Добавить прием пищи
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Вкладка Аналитика - для администраторов */}
                {isAdmin && (
                  <TabsContent value="analytics">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5" />
                            Аналитика посещений
                          </CardTitle>
                          <CardDescription>
                            Статистика посещений и интересы пользователей сайта
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <select 
                                className="border rounded-md p-2"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                              >
                                <option value="today">Сегодня</option>
                                <option value="week">Неделя</option>
                                <option value="month">Месяц</option>
                                <option value="quarter">Квартал</option>
                              </select>
                            </div>
                            <Button variant="outline" onClick={handleExportVisitorData}>
                              Экспорт данных
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <h3 className="text-sm font-semibold mb-1">Уникальные посетители</h3>
                              <p className="text-3xl font-bold">2,847</p>
                              <div className="flex items-center justify-center mt-1 text-xs text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293H8a1 1 0 010-2h5a1 1 0 011 1v5a1 1 0 01-2 0V6z" clipRule="evenodd" />
                                </svg>
                                <span>+12.5%</span>
                              </div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <h3 className="text-sm font-semibold mb-1">Просмотры страниц</h3>
                              <p className="text-3xl font-bold">14,389</p>
                              <div className="flex items-center justify-center mt-1 text-xs text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293H8a1 1 0 010-2h5a1 1 0 011 1v5a1 1 0 01-2 0V6z" clipRule="evenodd" />
                                </svg>
                                <span>+8.7%</span>
                              </div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <h3 className="text-sm font-semibold mb-1">Среднее время на сайте</h3>
                              <p className="text-3xl font-bold">4m 23s</p>
                              <div className="flex items-center justify-center mt-1 text-xs text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293H8a1 1 0 010-2h5a1 1 0 011 1v5a1 1 0 01-2 0V6z" clipRule="evenodd" />
                                </svg>
                                <span>+15.2%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Популярные страницы</h3>
                            <div className="border rounded-lg overflow-hidden">
                              <table className="w-full">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Страница</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">Просмотры</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">Ср. время</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">Отказы</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {popularPages.map((page, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                      <td className="px-4 py-2">
                                        <div className="font-medium">{page.title}</div>
                                        <div className="text-xs text-muted-foreground">{page.path}</div>
                                      </td>
                                      <td className="px-4 py-2 text-center">{page.viewCount}</td>
                                      <td className="px-4 py-2 text-center">{page.avgTimeOnPage}</td>
                                      <td className="px-4 py-2 text-center">{page.bounceRate}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Посетители сайта
                          </CardTitle>
                          <CardDescription>
                            Информация о пользователях и их активности
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm font-medium">Посетитель</th>
                                  <th className="px-4 py-2 text-center text-sm font-medium">Посещений</th>
                                  <th className="px-4 py-2 text-center text-sm font-medium">Время на сайте</th>
                                  <th className="px-4 py-2 text-center text-sm font-medium">Платформа</th>
                                  <th className="px-4 py-2 text-center text-sm font-medium">Местоположение</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {visitorData.map((visitor, index) => (
                                  <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                    <td className="px-4 py-2">
                                      <div className="font-medium truncate max-w-xs">{visitor.ip}</div>
                                      <div className="text-xs text-muted-foreground">
                                        Последний визит: {new Date(visitor.lastVisit).toLocaleString()}
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">{visitor.totalVisits}</td>
                                    <td className="px-4 py-2 text-center">{visitor.avgTimeOnSite}</td>
                                    <td className="px-4 py-2 text-center">
                                      <div>{visitor.platform}</div>
                                      <div className="text-xs text-muted-foreground">{visitor.browser}</div>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                      <div>{visitor.country}</div>
                                      <div className="text-xs text-muted-foreground">{visitor.city}</div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5" />
                            Интересы пользователей
                          </CardTitle>
                          <CardDescription>
                            Анализ предпочтений и интересов посетителей
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                              {userInterests.map((interest, index) => (
                                <div key={index} className="relative">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{interest.category}</span>
                                    <span className="text-sm text-muted-foreground">{interest.percentage}%</span>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2.5">
                                    <div 
                                      className="bg-primary h-2.5 rounded-full" 
                                      style={{ width: `${interest.percentage}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex mt-1 text-xs">
                                    <span className="text-muted-foreground">{interest.visitorCount} посетителей</span>
                                    <div className={`ml-auto flex items-center ${interest.trending === 'up' ? 'text-green-600' : interest.trending === 'down' ? 'text-red-600' : 'text-yellow-600'}`}>
                                      {interest.trending === 'up' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                                          <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293H8a1 1 0 010-2h5a1 1 0 011 1v5a1 1 0 01-2 0V6z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                      {interest.trending === 'down' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                                          <path fillRule="evenodd" d="M8 13a1 1 0 011 1v1.586l4.293-4.293a1 1 0 011.414 1.414L10.414 15H12a1 1 0 010 2H7a1 1 0 01-1-1v-5a1 1 0 012 0v1z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                      {interest.trending === 'stable' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                                          <path fillRule="evenodd" d="M4 9a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                      <span>{interest.change}%</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="border rounded-lg p-4 bg-muted/20">
                              <h3 className="text-lg font-medium mb-2">Рекомендации по контенту</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="bg-green-100 text-green-800 p-1 rounded-full flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p>Создайте больше контента про <strong>интервальное голодание</strong> - интерес вырос на 22%</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-green-100 text-green-800 p-1 rounded-full flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p>Обратите внимание на растущий интерес к <strong>рецептам без глютена</strong> - рост на 15%</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-red-100 text-red-800 p-1 rounded-full flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p>Интерес к <strong>кето диете</strong> снижается - падение на 5%</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-yellow-100 text-yellow-800 p-1 rounded-full flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p>87% пользователей посещают сайт с мобильных устройств - убедитесь, что контент оптимизирован</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                )}
                
                {/* Вкладка настроек */}
                <TabsContent value="settings">
                  <div className="space-y-6">
                    {/* Настройки уведомлений */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Bell className="mr-2 h-5 w-5" />
                          Настройки уведомлений
                        </CardTitle>
                        <CardDescription>
                          Управляйте тем, как вы получаете уведомления
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email уведомления</Label>
                            <p className="text-sm text-muted-foreground">
                              Получать уведомления на email
                            </p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-notifications">Системные уведомления</Label>
                            <p className="text-sm text-muted-foreground">
                              Показывать уведомления в приложении
                            </p>
                          </div>
                          <Switch
                            id="system-notifications"
                            checked={systemNotifications}
                            onCheckedChange={setSystemNotifications}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveNotificationSettings}>
                          <Save className="mr-2 h-4 w-4" />
                          Сохранить настройки
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Настройки приватности */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Shield className="mr-2 h-5 w-5" />
                          Приватность
                        </CardTitle>
                        <CardDescription>
                          Настройте видимость вашего профиля для других пользователей
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="private-profile">Приватный профиль</Label>
                            <p className="text-sm text-muted-foreground">
                              Скрыть ваш профиль от других пользователей
                            </p>
                          </div>
                          <Switch
                            id="private-profile"
                            checked={profilePrivate}
                            onCheckedChange={setProfilePrivate}
                          />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="hide-activity">Скрыть активность</Label>
                            <p className="text-sm text-muted-foreground">
                              Скрыть вашу активность на форуме и в комментариях
                            </p>
                          </div>
                          <Switch
                            id="hide-activity"
                            checked={hideActivity}
                            onCheckedChange={setHideActivity}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSavePrivacySettings}>
                          <Save className="mr-2 h-4 w-4" />
                          Сохранить настройки
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Смена пароля */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lock className="mr-2 h-5 w-5" />
                          Изменение пароля
                        </CardTitle>
                        <CardDescription>
                          Обновите ваш пароль для повышения безопасности
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Alert className="bg-muted">
                          <AlertDescription>
                            Рекомендуется периодически менять пароль для обеспечения безопасности вашего аккаунта
                          </AlertDescription>
                        </Alert>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Текущий пароль</Label>
                            <div className="relative">
                              <Input 
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Введите текущий пароль"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                              />
                              <button 
                                type="button" 
                                className="absolute right-3 top-2.5 text-muted-foreground"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Новый пароль</Label>
                            <div className="relative">
                              <Input 
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Введите новый пароль"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                              <button 
                                type="button" 
                                class="absolute right-3 top-2.5 text-muted-foreground"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                            <Input 
                              id="confirm-password"
                              type="password"
                              placeholder="Подтвердите новый пароль"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleChangePassword}>
                          <Save className="mr-2 h-4 w-4" />
                          Изменить пароль
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Диалог добавления приема пищи */}
      <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
        <DialogContent className="max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить прием пищи</DialogTitle>
            <DialogDescription>
              Запишите что вы съели и получите подсчет калорий и веса
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meal-type">Тип приема пищи</Label>
                <select 
                  id="meal-type"
                  className="w-full border rounded-md p-2"
                  value={newMealType}
                  onChange={(e) => setNewMealType(e.target.value as any)}
                >
                  <option value="breakfast">Завтрак</option>
                  <option value="lunch">Обед</option>
                  <option value="dinner">Ужин</option>
                  <option value="snack">Перекус</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal-date">Дата</Label>
                <Input 
                  id="meal-date"
                  type="date"
                  value={newMealDate}
                  onChange={(e) => setNewMealDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                Продукты
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddFoodItem}
                  type="button"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Добавить продукт
                </Button>
              </Label>
              
              <div className="space-y-3">
                {newFoodItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Название продукта"
                      value={item.name}
                      onChange={(e) => handleFoodItemChange(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Ккал"
                      type="number"
                      value={item.calories || ''}
                      onChange={(e) => handleFoodItemChange(index, 'calories', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      placeholder="100г"
                      value={item.amount}
                      onChange={(e) => handleFoodItemChange(index, 'amount', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      placeholder="Вес (г)"
                      type="number"
                      value={item.weight || ''}
                      onChange={(e) => handleFoodItemChange(index, 'weight', e.target.value)}
                      className="w-24"
                    />
                    {newFoodItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFoodItem(index)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meal-note">Примечание (необязательно)</Label>
              <Textarea 
                id="meal-note"
                placeholder="Например: Был очень голоден"
                value={newMealNote}
                onChange={(e) => setNewMealNote(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMealDialog(false)}>Отмена</Button>
            <Button onClick={handleAddMeal}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;