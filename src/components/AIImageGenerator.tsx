
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface AIImageGeneratorProps {
  prompt: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

const API_ENDPOINT = "https://api.openai.com/v1/images/generations"; // Заглушка для примера

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  prompt,
  alt,
  width = 512,
  height = 512,
  className = "",
  fallbackSrc = "/placeholder.svg"
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Симуляция запроса к API генерации изображений
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API для генерации изображения
    // Например с помощью OpenAI или Stable Diffusion API
    
    // Симуляция загрузки для демонстрации
    const simulateImageGeneration = async () => {
      if (!prompt) return;
      
      setLoading(true);
      setError(false);
      
      try {
        // Имитация запроса к API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // В реальном приложении здесь был бы код получения URL изображения от API
        // const response = await fetch(API_ENDPOINT, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${API_KEY}`,
        //   },
        //   body: JSON.stringify({
        //     prompt,
        //     n: 1,
        //     size: `${width}x${height}`,
        //   }),
        // });
        // const data = await response.json();
        // setImageSrc(data.data[0].url);
        
        // Для демонстрации используем fallback изображение
        setImageSrc(fallbackSrc);
      } catch (err) {
        console.error('Ошибка при генерации изображения:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    simulateImageGeneration();
  }, [prompt, width, height, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-sm font-medium">Генерация изображения...</span>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <p className="text-destructive text-sm">Не удалось сгенерировать изображение</p>
        </div>
      )}
      
      <img 
        src={imageSrc} 
        alt={alt}
        className={`w-full h-full object-cover ${loading || error ? 'opacity-50' : 'opacity-100'}`}
        style={{ aspectRatio: `${width}/${height}` }}
      />
    </div>
  );
};

export default AIImageGenerator;
