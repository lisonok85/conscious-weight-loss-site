import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Тип для представления пользователя
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';  // Добавлено поле роли
  isLoggedIn: boolean;
}

// Интерфейс контекста авторизации
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Создаем контекст с начальным значением
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Собственный хук для использования контекста авторизации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

// Свойства для AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Компонент-провайдер контекста авторизации
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Ошибка при парсинге данных пользователя:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Функция для авторизации
  const login = async (email: string, password: string) => {
    // В реальном приложении здесь будет API-запрос для аутентификации
    // Имитация задержки запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Эмуляция входа администратора
    const isAdmin = email.includes('admin');
    
    // Создаем тестового пользователя
    const newUser: User = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      role: isAdmin ? 'admin' : 'user',  // Устанавливаем роль
      isLoggedIn: true
    };
    
    // Сохраняем пользователя в состоянии
    setUser(newUser);
    
    // Сохраняем данные в localStorage для сохранения сессии
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Функция для выхода из аккаунта
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Функция для обновления данных пользователя
  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Значение контекста
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};