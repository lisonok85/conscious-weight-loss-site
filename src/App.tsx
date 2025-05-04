
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Recipes from "./pages/Recipes";
import Stories from "./pages/Stories";
import Photos from "./pages/Photos";
import StoryDetail from "./pages/StoryDetail";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import ForumTopic from "./pages/ForumTopic";
import FoodDatabase from "./pages/FoodDatabase";
import ResetPassword from "./pages/ResetPassword";

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/:id" element={<ForumTopic />} />
              <Route path="/food-database" element={<FoodDatabase />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
