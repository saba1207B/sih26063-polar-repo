import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
}

export function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  const sizes = {
    default: "max-w-[1440px]",
    wide: "max-w-[1600px]",
    narrow: "max-w-5xl",
  };

  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
