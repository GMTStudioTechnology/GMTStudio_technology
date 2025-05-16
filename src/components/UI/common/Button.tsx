import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  external = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = "font-medium rounded-full transition-all duration-300 flex items-center justify-center";
  
  // Size classes
  const sizeClasses = {
    sm: "text-sm px-4 py-2 gap-1.5",
    md: "text-base px-6 py-3 gap-2",
    lg: "text-lg px-8 py-4 gap-2.5"
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/20",
    secondary: "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20",
    outline: "border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400",
    ghost: "text-gray-300 hover:bg-white/5",
    link: "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline px-0 py-0"
  };
  
  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";
  
  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = twMerge(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    (disabled || isLoading) ? disabledClasses : "",
    widthClasses,
    className
  );
  
  // Animation variants
  const hoverAnimation = {
    scale: variant === 'link' ? 1 : 1.05,
    transition: { duration: 0.2 }
  };
  
  const tapAnimation = {
    scale: variant === 'link' ? 0.98 : 0.95,
    transition: { duration: 0.1 }
  };
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-4 w-4 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Button content
  const buttonContent = (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span className={isLoading ? "opacity-0" : ""}>{children}</span>
      {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </>
  );
  
  // Render link or button
  if (href) {
    return external ? (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
      >
        {buttonContent}
      </motion.a>
    ) : (
      <motion.div
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
      >
        <Link
          to={href}
          className={buttonClasses}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      className={buttonClasses}
      whileHover={!disabled && !isLoading ? hoverAnimation : {}}
      whileTap={!disabled && !isLoading ? tapAnimation : {}}
      disabled={disabled || isLoading}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button; 