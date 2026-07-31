# Convenciones del front

## Layout

- Toda sección usa el componente `Section` (`src/shared/components/ui/Section.tsx`).
- El contenido se envuelve automáticamente en `Container` (`max-w-content` = **1152px**, centrado, `px-6`). Usa `container={false}` solo para secciones full-bleed (ej. Hero).
- **No** se usan alturas fijas (`h-170`, `h-screen`). El alto lo define el contenido: padding vertical estándar `py-24` (6rem) que ya trae `Section`. Solo el Hero usa `min-h-screen`.
- **No** usar números mágicos para anchos (`w-[55%]`, `w-200`, `w-67.5`). Preferir `grid`/`flex` con `gap`, o tokens de layout.

## Componentes base (`src/shared/components/ui/`)

| Componente | Uso |
|---|---|
| `Section` | Contenedor de sección (ancho completo + padding vertical) |
| `Container` | Ancho máximo del contenido (1152px, centrado) |
| `Button` | Botones; variantes `primary` / `ghost` / `surface`, tamaños `sm` / `md` / `lg` |

No repetir clases sueltas de estos patrones (`bg-surface-raised rounded-2xl`, botones con estilos inline): usar los componentes.

## Utilidades CSS (`src/style/global.css`)

- `card` — superficie estándar (`rounded-2xl bg-surface-raised`).
- `badge` — chip/etiqueta/pill (base `inline-flex … text-xs font-medium`); se combina con `className` para color/borde (ej. `badge border … text-text-secondary`).

Agregar una utilidad solo cuando el patrón se repita 3+ veces; si es un solo uso, usar clases directamente.

## Tokens (en `src/style/global.css`)

- Layout: `--max-width-content` (1152px).
- Colores: prefijos semánticos — `--color-bg-*`, `--color-surface-*`, `--color-border-*`, `--color-text-*`, `--color-accent-*`, `--color-cta` (amarillo de marca para CTA/acciones, con `--color-cta-ink` para el texto).
- `text-text-secondary` es solo para **texto**; para fondos amarillos de CTA usar `bg-cta`.
- No introducir valores hardcodeados si existe un token.

## General

- `cn()` (`src/shared/utils/cn.ts`, clsx + tailwind-merge) para combinar `className`.
- Radios estándar: `rounded-2xl` para componentes y utilidades (`Button`, `card`, `badge`); `rounded-full` solo para elementos circulares.
- No agregar `"use client"` a un archivo a menos que use hooks de cliente; mantener los server components como tales.
