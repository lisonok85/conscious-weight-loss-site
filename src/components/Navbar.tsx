
import { Link, useNavigate } from "react-router-dom";
import { LeafyGreen, Salad, Camera, User, MessageCircle, MenuIcon, X, Database, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Получаем инициалы для аватара
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <LeafyGreen size={24} />
          <span className="text-xl font-bold hidden sm:inline">Мир осознанного похудения</span>
          <span className="text-xl font-bold sm:hidden">МОП</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  Главная
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/recipes" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  <Salad className="mr-2 size-4" /> Рецепты
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/stories" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  <User className="mr-2 size-4" /> Истории успеха
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/photos" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  <Camera className="mr-2 size-4" /> Фотографии
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/forum" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  <MessageCircle className="mr-2 size-4" /> Форум
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/food-database" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}>
                  <Database className="mr-2 size-4" /> База продуктов
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">{user?.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Личный кабинет</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="size-4" />
                  <span>Вход</span>
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register" className="flex items-center gap-1">
                  <UserPlus className="size-4" />
                  <span>Регистрация</span>
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="flex flex-col space-y-2 pt-4 pb-2 px-4">
            <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent" onClick={toggleMenu}>
              Главная
            </Link>
            <Link to="/recipes" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
              <Salad className="mr-2 size-4" /> Рецепты
            </Link>
            <Link to="/stories" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
              <User className="mr-2 size-4" /> Истории успеха
            </Link>
            <Link to="/photos" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
              <Camera className="mr-2 size-4" /> Фотографии
            </Link>
            <Link to="/forum" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
              <MessageCircle className="mr-2 size-4" /> Форум
            </Link>
            <Link to="/food-database" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
              <Database className="mr-2 size-4" /> База продуктов
            </Link>
            <div className="border-t border-border my-2"></div>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
                  <User className="mr-2 size-4" /> Личный кабинет
                </Link>
                <Button variant="outline" className="mt-2" onClick={() => { handleLogout(); toggleMenu(); }}>
                  <LogOut className="mr-2 size-4" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-md hover:bg-accent flex items-center" onClick={toggleMenu}>
                  <LogIn className="mr-2 size-4" /> Вход
                </Link>
                <div className="pt-2">
                  <Button asChild className="w-full" size="sm">
                    <Link to="/register" className="flex items-center justify-center gap-1" onClick={toggleMenu}>
                      <UserPlus className="size-4" />
                      <span>Регистрация</span>
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
