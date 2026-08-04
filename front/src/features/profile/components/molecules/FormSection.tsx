import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs uppercase tracking-widest text-text-muted">{title}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}
