
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContentCardProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  linkText?: string;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const ContentCard = ({
  title,
  description,
  image,
  link,
  linkText = "Подробнее",
  footer,
  className = "",
  children,
}: ContentCardProps) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {(link || footer) && (
        <CardFooter className="flex justify-between items-center">
          {footer}
          {link && (
            <Button variant="ghost" asChild className="group px-2">
              <Link to={link} className="flex items-center text-primary">
                {linkText}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ContentCard;
