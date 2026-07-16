import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary: 'bg-navy text-white hover:bg-navy-dark focus:ring-navy',
      secondary: 'bg-white text-navy border-2 border-navy hover:bg-gray-50 focus:ring-navy',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
      whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5a] focus:ring-[#25D366] shadow-md',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
