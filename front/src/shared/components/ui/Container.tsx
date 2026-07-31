import type { HTMLAttributes } from "react";
import { cn } from "@/src/shared/utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6", className)} {...props} />
  );
}
