
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Компонент для защиты маршрутов, требующих авторизации
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  // Показываем загрузку, пока проверяем авторизацию
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если пользователь авторизован, показываем содержимое защищенного маршрута
  return <>{children}</>;
};

export default ProtectedRoute;
