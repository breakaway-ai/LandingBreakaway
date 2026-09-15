import type { ReactNode } from "react";
import { layoutContainerClass, pageContainerClass } from "@/lib/layout";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "layout" | "content";
};

export default function PageContainer({
  children,
  className,
  width = "content",
}: PageContainerProps) {
  const baseClass = width === "layout" ? layoutContainerClass : pageContainerClass;

  return (
    <div className={className ? `${baseClass} ${className}` : baseClass}>
      {children}
    </div>
  );
}
