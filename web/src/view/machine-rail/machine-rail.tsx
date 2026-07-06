import React from "react";
import { Monitor, Plus } from "lucide-react";
import type { Machine } from "../../state/machines.ts";
import { className } from "../class-name.ts";

export interface RailTooltip {
  name: string;
  x: number;
  y: number;
}

interface MachineRailProps {
  machines: Machine[];
  railTooltip?: RailTooltip;
  selectedId?: string;
  onAddMachine: () => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    machine: Machine,
  ) => void;
  onHideTooltip: () => void;
  onSelectMachine: (machineId: string) => void;
  onShowTooltip: (target: HTMLElement, name: string) => void;
}

const machineRailClassName = [
  "[grid-column:1] [grid-row:2] grid [grid-template-rows:minmax(0,1fr)_auto]",
  "justify-items-center gap-0 min-h-0 overflow-hidden px-0 pb-0 pt-[8px]",
  "border-r border-r-white/24 bg-[rgba(247,247,248,0.46)] backdrop-blur-2xl",
  "shadow-[inset_1px_0_0_rgba(255,255,255,0.48),inset_-1px_0_0_rgba(18,25,38,0.05)]",
  "max-[680px]:hidden",
].join(" ");
const railListClassName = [
  "grid content-start justify-items-center gap-0",
  "w-full min-h-0 overflow-auto",
].join(" ");
const railItemFrameClassName = "grid h-[46px] w-full place-items-center";
const railMachineClassName = [
  "relative inline-flex appearance-none items-center justify-center w-[36px] min-w-[36px] h-[36px] min-h-[36px]",
  "cursor-pointer rounded-[12px] wgo-material-dock-control p-0",
  "[font-family:inherit]",
  "wgo-transition transition-[border-radius,background,color,border-color,box-shadow]",
  "[&.active]:border-white/78 [&.active]:bg-white/76 [&.active]:text-wgo-text",
  "[&.active]:[box-shadow:0_10px_28px_rgba(63,83,115,0.18),inset_0_1px_0_rgba(255,255,255,0.88)]",
  "[&.active_.machine-state-dot]:bg-[rgba(47,109,246,0.82)]",
].join(" ");
const machineAvatarClassName = "grid h-full w-full place-items-center";
const machineStateDotClassName = [
  "machine-state-dot absolute bottom-[5px] right-[5px] h-[5px] w-[5px] rounded-full",
  "bg-[rgba(77,96,126,0.58)]",
].join(" ");
const railActionClassName = [
  "relative inline-flex appearance-none items-center justify-center w-[34px] min-w-[34px] h-[34px] min-h-[34px]",
  "cursor-pointer rounded-[11px] wgo-material-dock-control p-0 text-wgo-text-3",
  "[font-family:inherit]",
  "wgo-transition transition-[border-radius,background,color,border-color]",
].join(" ");
const railActionFrameClassName = "grid h-[46px] w-full place-items-center";
const railTooltipClassName = [
  "fixed z-[40] translate-y-[-50%] rounded-wgo-md bg-[rgba(31,38,50,0.86)] text-white backdrop-blur-xl",
  "shadow-[0_12px_34px_rgba(18,25,38,0.22)]",
  "px-[9px] py-[6px] text-[13px] font-650 leading-none whitespace-nowrap pointer-events-none",
  "before:content-[''] before:absolute before:top-1/2 before:left-[-5px]",
  "before:w-[10px] before:h-[10px] before:bg-[rgba(31,38,50,0.86)]",
  "before:[transform:translateY(-50%)_rotate(45deg)]",
].join(" ");

export function MachineRail(
  {
    machines,
    railTooltip,
    selectedId,
    onAddMachine,
    onContextMenu,
    onHideTooltip,
    onSelectMachine,
    onShowTooltip,
  }: MachineRailProps,
) {
  return (
    <>
      <aside className={machineRailClassName} aria-label="Machine switcher">
        <nav className={railListClassName} aria-label="Machines">
          {machines.map((machine) => (
            <div key={machine.id} className={railItemFrameClassName}>
              <button
                type="button"
                className={className(
                  railMachineClassName,
                  machine.id === selectedId && "active",
                )}
                onClick={() =>
                  onSelectMachine(machine.id)}
                onMouseEnter={(event) =>
                  onShowTooltip(event.currentTarget, machine.name)}
                onMouseLeave={onHideTooltip}
                onFocus={(event) =>
                  onShowTooltip(event.currentTarget, machine.name)}
                onBlur={onHideTooltip}
                onContextMenu={(event) =>
                  onContextMenu(event, machine)}
                aria-label={machine.name}
              >
                <span className={machineAvatarClassName} aria-hidden="true">
                  <Monitor size={15} />
                </span>
                <span className={machineStateDotClassName} />
              </button>
            </div>
          ))}
        </nav>

        <div className={railActionFrameClassName}>
          <button
            type="button"
            className={railActionClassName}
            onClick={onAddMachine}
            title="Add machine"
            aria-label="Add machine"
          >
            <Plus size={18} />
          </button>
        </div>
      </aside>

      {railTooltip
        ? (
          <div
            className={railTooltipClassName}
            style={{ left: railTooltip.x, top: railTooltip.y }}
            role="tooltip"
          >
            {railTooltip.name}
          </div>
        )
        : null}
    </>
  );
}
