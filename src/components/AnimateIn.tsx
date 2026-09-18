import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateIn({ children, delay = 0, className = "" }: AnimateInProps) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  // CSS stagger can be applied via child index if needed, but for simplicity we rely on native CSS
  return (
    <div className={`animate-fade-in-up ${className}`}>
      {children}
    </div>
  );
}
