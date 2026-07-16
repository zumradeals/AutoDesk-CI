import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'popular' | 'promo' | 'new' | 'neutral' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const variants = {
    popular: 'bg-amber-100 text-amber-800 border border-amber-200',
    promo: 'bg-red-100 text-red-700 border border-red-200',
    new: 'bg-blue-100 text-blue-700 border border-blue-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
