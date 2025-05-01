
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileInput } from "@/components/ui/file-input";
import { Separator } from "@/components/ui/separator";
import { 
  UserIcon, 
  Settings, 
  Heart, 
  Camera, 
  Book, 
  LogOut, 
  Save, 
  BarChart, 
  Medal, 
  Calendar 
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
      setProfileName(userData.name);
      setProfileEmail(userData.email);
      setAvatarPreview(userData.avatar || null);
    } else {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate("/login");
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
    });
    navigate("/login");
  };

  const handleAvatarChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: profileName,
        email: profileEmail,
        avatar: avatarPreview
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Профиль обновлен",
        description: "Изменения сохранены успешно",
      });
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return null; // Редирект на /login происходит в useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-64">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={avatarPreview || undefined} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <nav className="flex flex-col gap-2">
                    <Link to="/profile" className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary">
                      <UserIcon className="h-4 w-4" />
                      <span>Профиль</span>
                    </Link>
                    <Link to="/profile/progress" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <BarChart className="h-4 w-4" />
                      <span>Мой прогресс</span>
                    </Link>
                    <Link to="/profile/favorites" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Heart className="h-4 w-4" />
                      <span>Избранное</span>
                    </Link>
                    <Link to="/profile/achievements" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Medal className="h-4 w-4" />
                      <span>Достижения</span>
                    </Link>
                    <Link to="/profile/plans" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Calendar className="h-4 w-4" />
                      <span>Планы питания</span>
                    </Link>
                    <Separator className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 rounded-md text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Выйти</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </aside>
            
            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Профиль
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Настройки
                  </TabsTrigger>
                  <TabsTrigger value="photos">
                    <Camera className="h-4 w-4 mr-2" />
                    Фотографии
                  </TabsTrigger>
                  <TabsTrigger value="recipes">
                    <Book className="h-4 w-4 mr-2" />
                    Мои рецепты
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Личная информация</CardTitle>
                      <CardDescription>Управляйте вашим профилем и персональными данными</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Фото профиля</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={avatarPreview || undefined} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <FileInput
                            onChange={handleAvatarChange}
                            accept="image/*"
                            maxSize={2}
                            label="Изменить фото"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input 
                          id="name" 
                          value={profileName} 
                          onChange={(e) => setProfileName(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileEmail} 
                          onChange={(e) => setProfileEmail(e.target.value)} 
                        />
                      </div>
                      
                      <Button onClick={handleProfileSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        Сохранить изменения
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Настройки аккаунта</CardTitle>
                      <CardDescription>Управляйте настройками вашего аккаунта</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground py-8">
                        Настройки аккаунта будут доступны в будущих обновлениях.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="photos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Мои фотографии</CardTitle>
                      <CardDescription>Загруженные вами фотографии</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-center h-40 bg-muted rounded-md border border-dashed">
                          <Button variant="ghost">
                            <Camera className="h-6 w-6 mr-2" />
                            Загрузить фото
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recipes" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Мои рецепты</CardTitle>
                      <CardDescription>Рецепты, созданные вами</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground py-8">
                        У вас пока нет созданных рецептов. Нажмите кнопку ниже, чтобы создать свой первый рецепт.
                      </p>
                      <div className="flex justify-center">
                        <Button>Создать рецепт</Button>
                      </div>
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
