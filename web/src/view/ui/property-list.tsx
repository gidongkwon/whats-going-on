import type { HTMLAttributes, ReactNode } from "react";
import { className as joinClassName } from "../class-name.ts";

const propertyListClassName = [
  "@container m-0 grid min-w-0 grid-cols-1 overflow-hidden",
  "rounded-[10px] border border-white/34 bg-[rgba(255,255,255,0.32)]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.64),inset_0_-1px_0_rgba(18,25,38,0.02)]",
  "backdrop-blur-xl",
  "[&>div+div]:border-t [&>div+div]:border-t-[rgba(18,25,38,0.04)]",
].join(" ");

const propertyListItemClassName = [
  "grid min-w-0 bg-transparent",
  "@[520px]:grid-cols-[minmax(120px,180px)_minmax(0,1fr)]",
  "[&_dt]:m-0 [&_dt]:box-border [&_dt]:min-w-0 [&_dt]:bg-[rgba(248,248,249,0.34)]",
  "[&_dt]:px-[10px] [&_dt]:py-[7px] [&_dt]:text-[12px]",
  "[&_dt]:font-650 [&_dt]:text-wgo-text-3",
  "@[520px]:[&_dt]:py-[10px]",
].join(" ");

const propertyListItemWhiteClassName = "[&_dt]:!bg-transparent";
const propertyListValueCellClassName = [
  "m-0 box-border grid min-w-0 w-full self-stretch justify-self-stretch",
  "justify-items-start gap-[7px] bg-[rgba(255,255,255,0.22)] p-[10px]",
  "text-[13px] text-wgo-text [overflow-wrap:anywhere]",
].join(" ");

const propertyValueClassName = [
  "inline-block max-w-full rounded-[6px] border border-white/34",
  "bg-[rgba(247,247,248,0.66)] px-[6px] font-wgo-mono",
  "leading-[1.45] text-wgo-text-2 [overflow-wrap:anywhere]",
].join(" ");

export interface PropertyListProps extends HTMLAttributes<HTMLDListElement> {
}

export function PropertyList({ className, ...props }: PropertyListProps) {
  return (
    <dl
      {...props}
      className={joinClassName(propertyListClassName, className)}
    />
  );
}

export interface PropertyListItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  valueClassName?: string;
  variant?: "default" | "white";
}

export function PropertyListItem(
  {
    children,
    className,
    label,
    valueClassName,
    variant = "default",
    ...props
  }: PropertyListItemProps,
) {
  return (
    <div
      {...props}
      className={joinClassName(
        propertyListItemClassName,
        variant === "white" && propertyListItemWhiteClassName,
        className,
      )}
    >
      <dt>{label}</dt>
      <dd
        className={joinClassName(
          propertyListValueCellClassName,
          valueClassName,
        )}
      >
        {children}
      </dd>
    </div>
  );
}

export interface PropertyValueProps extends HTMLAttributes<HTMLElement> {
}

export function PropertyValue({ className, ...props }: PropertyValueProps) {
  return (
    <code
      {...props}
      className={joinClassName(propertyValueClassName, className)}
    />
  );
}
