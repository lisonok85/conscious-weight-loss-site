
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Схема валидации формы восстановления пароля
const resetSchema = z.object({
  email: z.string().email("Введите корректный email")
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = (values: ResetFormValues) => {
    // В реальном приложении здесь будет API-запрос для отправки письма
    console.log("Форма восстановления отправлена:", values);
    
    // Имитация отправки письма
    toast({
      title: "Инструкции отправлены",
      description: "Проверьте вашу электронную почту для восстановления пароля",
    });
    
    setIsEmailSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Link to="/login" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к странице входа
          </Link>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
              <CardDescription>
                {isEmailSent 
                  ? "Инструкции для восстановления пароля отправлены на вашу почту" 
                  : "Введите ваш email для получения инструкций по восстановлению пароля"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEmailSent ? (
                <div className="text-center py-6">
                  <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
                  <p className="mb-4">Мы отправили инструкции для восстановления пароля на указанный email.</p>
                  <p className="text-sm text-muted-foreground">
                    Не получили письмо? Проверьте папку "Спам" или 
                    <button 
                      onClick={() => form.handleSubmit(onSubmit)()}
                      className="text-primary hover:underline ml-1"
                    >
                      отправьте еще раз
                    </button>
                  </p>
                </div>
              ) : (
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
                    
                    <Button type="submit" className="w-full">
                      Отправить инструкции
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                {isEmailSent ? (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="gap-2"
                  >
                    Вернуться к странице входа
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <div>
                    Вспомнили пароль?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Войти
                    </Link>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
