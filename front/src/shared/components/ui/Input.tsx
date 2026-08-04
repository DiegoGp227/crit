import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/shared/utils/cn";
import Label from "./Label";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-text-secondary";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children?: ReactNode;
}

export default function Input({
  label,
  optional,
  hint,
  error,
  children,
  className,
  ...inputProps
}: InputProps) {
  return (
    <label className="flex flex-col gap-2">
      <Label optional={optional}>{label}</Label>
      {children ?? <input className={cn(inputClass, className)} {...inputProps} />}
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : hint ? (
        <span className="text-xs text-text-dim">{hint}</span>
      ) : null}
    </label>
  );
}
