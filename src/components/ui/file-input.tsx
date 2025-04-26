
import React, { useState, useRef } from "react";
import { Button } from "./button";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileInputProps {
  onChange: (files: File[]) => void;
  value?: File[];
  multiple?: boolean;
  className?: string;
  maxSize?: number; // в мегабайтах
  accept?: string;
  label?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ 
    onChange, 
    value = [], 
    multiple = false, 
    className,
    maxSize = 5, // по умолчанию 5MB
    accept = "image/*",
    label = "Выберите файл или перетащите его сюда"
  }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const fileArray = Array.from(e.target.files);
        validateAndAddFiles(fileArray);
      }
    };

    const validateAndAddFiles = (files: File[]) => {
      const newErrors: string[] = [];
      const validFiles = files.filter(file => {
        // Проверка размера файла
        if (file.size > maxSize * 1024 * 1024) {
          newErrors.push(`Файл ${file.name} больше ${maxSize}MB`);
          return false;
        }
        
        // Проверка типа файла
        if (accept !== "*" && !file.type.match(accept.replace(/\*/g, ".*"))) {
          newErrors.push(`Файл ${file.name} имеет неподдерживаемый формат`);
          return false;
        }
        
        return true;
      });
      
      setErrors(newErrors);
      
      if (validFiles.length > 0) {
        onChange(multiple ? [...value, ...validFiles] : [validFiles[0]]);
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files.length > 0) {
        const fileArray = Array.from(e.dataTransfer.files);
        validateAndAddFiles(fileArray);
      }
    };

    const removeFile = (indexToRemove: number) => {
      onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
      <div className={className}>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={ref || fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple={multiple}
            accept={accept}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">
              Максимальный размер: {maxSize}MB
            </p>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mt-2">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500">{error}</p>
            ))}
          </div>
        )}

        {value.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {value.map((file, index) => (
              <div 
                key={index} 
                className="group relative aspect-square rounded-md overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="truncate text-xs text-white">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
