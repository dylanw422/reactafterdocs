import React from "react";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  return (
    <code
      className={`px-1 border text-primary rounded-md w-min bg-primary-foreground text-sm font-bold ${className}`}
    >
      {children}
    </code>
  );
}
