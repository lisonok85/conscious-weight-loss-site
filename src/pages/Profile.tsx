
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
import { User, Settings, LogOut, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Настройки аккаунта</CardTitle>
                      <CardDescription>
                        Управляйте настройками вашего аккаунта
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Настройки будут доступны в следующих обновлениях.
                      </p>
                    </CardContent>
                  </Card>
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
