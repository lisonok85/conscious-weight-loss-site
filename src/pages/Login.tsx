
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";

// Схема валидации формы входа
const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
  remember: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в ваш личный кабинет!",
      });
      
      // Перенаправление в личный кабинет
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль. Пожалуйста, попробуйте снова.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Link>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
              <CardDescription>
                Войдите, чтобы получить доступ к личному кабинету
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="your@email.com" 
                              type="email" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Введите пароль" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10" 
                              {...field} 
                            />
                            <button 
                              type="button" 
                              className="absolute right-3 top-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Запомнить меня
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <Link to="/reset-password" className="text-sm text-primary hover:underline">
                      Забыли пароль?
                    </Link>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Зарегистрироваться
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
