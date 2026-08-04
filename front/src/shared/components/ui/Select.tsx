import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/src/shared/utils/cn";
import Label from "./Label";

const selectClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-border-yellow";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  optional?: boolean;
  children: ReactNode;
}

export default function Select({
  label,
  optional,
  className,
  children,
  ...selectProps
}: SelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <Label optional={optional}>{label}</Label>
      <select className={cn(selectClass, className)} {...selectProps}>
        {children}
      </select>
    </label>
  );
}
