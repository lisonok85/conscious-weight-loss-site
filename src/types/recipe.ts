
export interface NutritionalInfo {
  protein: string;
  fats: string;
  carbs: string;
  fiber: string;
}

export interface Photo {
  prompt: string;
  alt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePrompt: string;
  author: string;
  calories: number;
  time: string;
  portions: number;
  category: string;
  ingredients: string[];
  steps: string[];
  nutritionalInfo: NutritionalInfo;
  publishDate: string;
  likes: number;
  additionalPhotos: Photo[];
}
