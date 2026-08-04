import type { HTMLAttributes } from "react";
import { cn } from "@/src/shared/utils/cn";
import Container from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Envuelve el contenido en el Container de ancho máximo (default: true). Usa false para secciones full-bleed como el Hero. */
  container?: boolean;
}

export default function Section({
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("flex w-full flex-col items-center py-20", className)}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
