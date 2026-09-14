import type { ReactNode } from "react";
import { pageContainerClass } from "@/lib/layout";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={className ? `${pageContainerClass} ${className}` : pageContainerClass}>
      {children}
    </div>
  );
}
