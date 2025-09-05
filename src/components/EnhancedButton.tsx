import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  glow?: boolean;
  pulse?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className,
  glow = false,
  pulse = false,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "transition-all duration-300 transform hover:scale-105",
        glow && "shadow-lg hover:shadow-xl hover:shadow-primary/25",
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};