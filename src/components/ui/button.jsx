import React from 'react';
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      outline: "border-2 border-red-500 text-red-500 hover:bg-red-50"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
