import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}
