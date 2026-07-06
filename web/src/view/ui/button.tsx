import type { ButtonHTMLAttributes } from "react";
import { className as joinClassName } from "../class-name.ts";

const buttonClassName = [
  "inline-flex min-h-[32px] appearance-none items-center justify-center gap-[7px]",
  "rounded-[7px] border border-white/38 bg-[rgba(255,255,255,0.42)] px-[10px]",
  "cursor-pointer text-wgo-text [font:inherit] font-620 backdrop-blur-xl",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(18,25,38,0.026),0_1px_2px_rgba(18,25,38,0.045)]",
  "wgo-transition hover:border-white/58 hover:bg-[rgba(255,255,255,0.58)] hover:text-wgo-text",
  "active:bg-[rgba(235,235,236,0.56)] active:shadow-[inset_0_1px_2px_rgba(18,25,38,0.055),inset_0_1px_0_rgba(255,255,255,0.48)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-wgo-accent focus-visible:outline-offset-1",
  "disabled:cursor-not-allowed disabled:opacity-46 disabled:hover:bg-[rgba(255,255,255,0.42)]",
].join(" ");

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button(
  { className, type = "button", ...props }: ButtonProps,
) {
  return (
    <button
      {...props}
      type={type}
      className={joinClassName(buttonClassName, className)}
    />
  );
}
