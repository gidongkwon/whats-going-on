import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
  useEffect,
} from "react";
import { className as joinClassName } from "../class-name.ts";

const menuClassName = [
  "grid gap-[3px] border border-white/48 bg-[rgba(255,255,255,0.76)]",
  "rounded-[11px] p-[5px] backdrop-blur-2xl",
  "shadow-[0_26px_76px_rgba(18,25,38,0.22),0_7px_20px_rgba(18,25,38,0.1),inset_0_1px_0_rgba(255,255,255,0.86)]",
].join(" ");
const menuItemClassName = [
  "inline-flex h-[27px] min-h-[27px] w-full appearance-none",
  "items-center justify-start gap-[8px] rounded-[7px] border border-transparent bg-transparent",
  "px-[8px] text-left text-[12.5px] font-620 text-wgo-text-2 [font-family:inherit]",
  "wgo-transition cursor-pointer hover:border-white/56 hover:bg-[rgba(52,70,96,0.08)] hover:text-wgo-text",
  "active:bg-[rgba(52,70,96,0.13)]",
  "focus-visible:border-white/70 focus-visible:bg-[rgba(52,70,96,0.1)] focus-visible:outline-0",
  "disabled:cursor-not-allowed disabled:opacity-48",
].join(" ");
const dangerMenuItemClassName = [
  "text-wgo-danger",
  "hover:border-[rgba(220,38,38,0.16)] hover:bg-wgo-danger-soft hover:text-wgo-danger",
  "focus-visible:border-[rgba(220,38,38,0.22)] focus-visible:bg-wgo-danger-soft",
  "[&_svg]:text-wgo-danger",
].join(" ");
const viewportMargin = 8;
const menuBorderSize = 2;
const menuPaddingBlock = 6;
const menuItemGap = 2;
export const floatingMenuItemHeightPx = 27;

export interface FloatingMenuPosition {
  left: number;
  top: number;
  maxHeight?: number;
}

export interface FloatingMenuProps {
  children: ReactNode;
  className?: string;
  menuRef?: RefObject<HTMLDivElement | null>;
  position?: FloatingMenuPosition;
  role?: string;
  strategy?: "absolute" | "fixed";
  style?: CSSProperties;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
}

export interface FloatingMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
}

export interface FloatingMenuSize {
  itemCount: number;
  width: number;
}

export function FloatingMenu(
  {
    children,
    className,
    menuRef,
    position,
    role = "menu",
    strategy = "fixed",
    style,
    onMouseDown,
  }: FloatingMenuProps,
) {
  return (
    <div
      ref={menuRef}
      className={joinClassName(
        menuClassName,
        className,
      )}
      role={role}
      style={{ position: strategy, ...position, ...style }}
      onMouseDown={(event) => {
        event.stopPropagation();
        onMouseDown?.(event);
      }}
    >
      {children}
    </div>
  );
}

export function FloatingMenuItem(
  { className, danger, type = "button", ...props }: FloatingMenuItemProps,
) {
  return (
    <button
      {...props}
      type={type}
      role={props.role ?? "menuitem"}
      className={joinClassName(
        menuItemClassName,
        danger && dangerMenuItemClassName,
        className,
      )}
    />
  );
}

export function floatingMenuHeight(itemCount: number): number {
  return menuBorderSize + menuPaddingBlock +
    itemCount * floatingMenuItemHeightPx +
    Math.max(0, itemCount - 1) * menuItemGap;
}

export function clampFloatingMenuPosition(
  left: number,
  top: number,
  { itemCount, width }: FloatingMenuSize,
): FloatingMenuPosition {
  return {
    left: clampViewportPosition(left, width, globalThis.innerWidth),
    top: clampViewportPosition(
      top,
      floatingMenuHeight(itemCount),
      globalThis.innerHeight,
    ),
  };
}

export function rightAlignedFloatingMenuPosition(
  rect: DOMRect,
  { itemCount, width }: FloatingMenuSize,
  gap = 0,
): FloatingMenuPosition {
  return clampFloatingMenuPosition(
    rect.right - width,
    rect.bottom + gap,
    { itemCount, width },
  );
}

export function floatingMenuPositionFromRect(
  rect: DOMRect,
  {
    itemCount,
    maxHeight = 360,
    minHeight = 120,
    width,
  }: FloatingMenuSize & { maxHeight?: number; minHeight?: number },
  gap = 0,
): FloatingMenuPosition {
  const estimatedHeight = Math.min(maxHeight, floatingMenuHeight(itemCount));
  const left = clampViewportPosition(
    rect.right - width,
    width,
    globalThis.innerWidth,
  );
  const belowMaxHeight = globalThis.innerHeight - rect.bottom - gap -
    viewportMargin;
  const aboveMaxHeight = rect.top - gap - viewportMargin;
  const openAbove = belowMaxHeight < minHeight &&
    aboveMaxHeight > belowMaxHeight;
  const availableHeight = openAbove ? aboveMaxHeight : belowMaxHeight;
  const maxMenuHeight = Math.max(
    Math.min(minHeight, Math.max(0, availableHeight)),
    Math.min(estimatedHeight, availableHeight),
  );
  const top = openAbove
    ? Math.max(viewportMargin, rect.top - gap - maxMenuHeight)
    : rect.bottom + gap;

  return { left, top, maxHeight: maxMenuHeight };
}

export function useFloatingMenuDismiss(
  open: boolean,
  menuRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  options?: { closeOnScroll?: boolean },
) {
  useEffect(() => {
    if (!open) return;

    function closeOnPointer(event: MouseEvent) {
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      onClose();
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    function closeOnResize() {
      onClose();
    }

    function closeOnScroll(event: Event) {
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      onClose();
    }

    globalThis.addEventListener("mousedown", closeOnPointer);
    globalThis.addEventListener("keydown", closeOnEscape);
    globalThis.addEventListener("resize", closeOnResize);
    if (options?.closeOnScroll) {
      globalThis.addEventListener("scroll", closeOnScroll, true);
    }
    return () => {
      globalThis.removeEventListener("mousedown", closeOnPointer);
      globalThis.removeEventListener("keydown", closeOnEscape);
      globalThis.removeEventListener("resize", closeOnResize);
      if (options?.closeOnScroll) {
        globalThis.removeEventListener("scroll", closeOnScroll, true);
      }
    };
  }, [menuRef, onClose, open, options?.closeOnScroll]);
}

function clampViewportPosition(
  value: number,
  size: number,
  viewportSize: number,
): number {
  const max = viewportSize - size - viewportMargin;
  if (max < viewportMargin) return viewportMargin;
  return Math.max(viewportMargin, Math.min(value, max));
}
