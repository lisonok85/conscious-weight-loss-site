
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Eye
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  // Получаем инициалы для аватара
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
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
                    <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
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
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">
                    <User className="mr-2 h-4 w-4" />
                    Профиль
                  </TabsTrigger>
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
                                className="absolute right-3 top-2.5 text-muted-foreground"
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
    </div>
  );
};

export default Profile;
