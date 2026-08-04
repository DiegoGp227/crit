import type { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  optional?: boolean;
}

export default function Label({ children, optional }: LabelProps) {
  return (
    <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
      {children}
      {optional && (
        <span className="ml-1.5 font-medium normal-case text-text-secondary">
          (opcional)
        </span>
      )}
    </span>
  );
}
