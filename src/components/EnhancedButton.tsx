import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  glow?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "transition-colors",
        glow && "hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};