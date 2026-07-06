import { defineConfig, presetUno } from "unocss";

const preflightStyles = String.raw`
:root {
  --wgo-bg-canvas: #f2f2f3;
  --wgo-canvas-background: #f2f2f3;
  --wgo-canvas-grain: none;
  --wgo-bg-primary: #fcfcfd;
  --wgo-bg-secondary: #f5f5f6;
  --wgo-bg-tertiary: #eceef1;
  --wgo-bg-hover: rgba(20, 30, 48, 0.065);
  --wgo-bg-active: rgba(20, 30, 48, 0.105);
  --wgo-bg-overlay: rgba(23, 23, 23, 0.42);

  --wgo-chrome: #0d1117;
  --wgo-chrome-muted: #1a202b;
  --wgo-chrome-hover: rgba(255, 255, 255, 0.115);
  --wgo-chrome-active: rgba(255, 255, 255, 0.16);
  --wgo-chrome-text: rgba(255, 255, 255, 0.88);
  --wgo-chrome-text-muted: rgba(255, 255, 255, 0.58);

  --wgo-text-primary: #151922;
  --wgo-text-secondary: #4b5565;
  --wgo-text-tertiary: #737d8c;
  --wgo-text-muted: #a1a9b6;
  --wgo-text-inverse: #ffffff;

  --wgo-accent: #2f6df6;
  --wgo-accent-hover: #4f83ff;
  --wgo-accent-soft: rgba(47, 109, 246, 0.09);
  --wgo-accent-muted: rgba(47, 109, 246, 0.16);
  --wgo-focus: rgba(47, 109, 246, 0.5);

  --wgo-success: #16a34a;
  --wgo-success-soft: rgba(22, 163, 74, 0.1);
  --wgo-warning: #b7791f;
  --wgo-warning-soft: rgba(183, 121, 31, 0.12);
  --wgo-danger: #dc2626;
  --wgo-danger-soft: rgba(220, 38, 38, 0.09);

  --wgo-border-subtle: rgba(18, 25, 38, 0.045);
  --wgo-border-light: rgba(18, 25, 38, 0.085);
  --wgo-border-medium: rgba(18, 25, 38, 0.14);
  --wgo-border-strong: rgba(18, 25, 38, 0.22);

  --wgo-shadow-sm: 0 1px 2px rgba(18, 25, 38, 0.06), 0 1px 1px rgba(18, 25, 38, 0.03);
  --wgo-shadow-md: 0 7px 18px rgba(18, 25, 38, 0.075), 0 1px 3px rgba(18, 25, 38, 0.045);
  --wgo-shadow-lg: 0 24px 58px rgba(18, 25, 38, 0.18), 0 5px 16px rgba(18, 25, 38, 0.08);
  --wgo-shadow-pane: 0 0 0 0.5px rgba(18, 25, 38, 0.1), 0 2px 5px rgba(18, 25, 38, 0.07), 0 18px 42px rgba(18, 25, 38, 0.11);
  --wgo-shadow-window:
    0 34px 90px rgba(19, 27, 42, 0.21),
    0 10px 30px rgba(19, 27, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.76);

  --wgo-material-chrome-bg: rgba(246, 246, 247, 0.56);
  --wgo-material-floating-bg: rgba(255, 255, 255, 0.72);
  --wgo-material-window-bg: rgba(248, 248, 249, 0.5);
  --wgo-pane-bg: rgba(253, 253, 253, 0.94);
  --wgo-pane-head-bg: rgba(241, 241, 242, 0.74);
  --wgo-pane-border: rgba(18, 25, 38, 0.085);
  --wgo-table-bg: rgba(253, 253, 253, 0.965);
  --wgo-table-head-bg: rgba(246, 246, 247, 0.92);

  --wgo-radius-xs: 4px;
  --wgo-radius-sm: 5px;
  --wgo-radius-md: 6px;
  --wgo-radius-lg: 8px;
  --wgo-radius-xl: 12px;
  --wgo-radius-2xl: 16px;

  --wgo-font-native: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  --wgo-font-mono: "SF Mono", "JetBrains Mono", "Fira Code", ui-monospace, monospace;

  --wgo-duration-fast: 100ms;
  --wgo-duration-base: 150ms;
  --wgo-duration-slow: 250ms;
  --wgo-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*,
::before,
::after {
  box-sizing: border-box;
  border-color: var(--wgo-border-light);
  border-style: solid;
  border-width: 0;
}

html,
body,
#root {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

html {
  font-size: 13px;
}

body {
  background: var(--wgo-bg-canvas);
  color: var(--wgo-text-primary);
  font-family: var(--wgo-font-native);
  letter-spacing: 0;
}

.workbench-pane-root,
.workbench-pane-root div:has(.workbench-pane) {
  overflow: visible !important;
}

.machine-title-button.checking .machine-title-text {
  background: linear-gradient(
    100deg,
    #20242d 0%,
    #20242d 42%,
    #9fb7ff 50%,
    #20242d 58%,
    #20242d 100%
  );
  background-clip: text;
  background-size: 320% 100%;
  color: transparent;
  -webkit-background-clip: text;
  animation: machine-title-shimmer 1.8s linear infinite;
}

@keyframes machine-title-shimmer {
  from {
    background-position: 160% 0;
  }

  to {
    background-position: -160% 0;
  }
}

`;

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      "wgo-canvas": "var(--wgo-bg-canvas)",
      "wgo-surface": "var(--wgo-bg-primary)",
      "wgo-surface-2": "var(--wgo-bg-secondary)",
      "wgo-surface-3": "var(--wgo-bg-tertiary)",
      "wgo-hover": "var(--wgo-bg-hover)",
      "wgo-active": "var(--wgo-bg-active)",
      "wgo-overlay": "var(--wgo-bg-overlay)",
      "wgo-chrome": "var(--wgo-chrome)",
      "wgo-chrome-muted": "var(--wgo-chrome-muted)",
      "wgo-chrome-hover": "var(--wgo-chrome-hover)",
      "wgo-chrome-active": "var(--wgo-chrome-active)",
      "wgo-chrome-text": "var(--wgo-chrome-text)",
      "wgo-chrome-subtle": "var(--wgo-chrome-text-muted)",
      "wgo-text": "var(--wgo-text-primary)",
      "wgo-text-2": "var(--wgo-text-secondary)",
      "wgo-text-3": "var(--wgo-text-tertiary)",
      "wgo-muted": "var(--wgo-text-muted)",
      "wgo-inverse": "var(--wgo-text-inverse)",
      "wgo-accent": "var(--wgo-accent)",
      "wgo-accent-hover": "var(--wgo-accent-hover)",
      "wgo-accent-soft": "var(--wgo-accent-soft)",
      "wgo-accent-muted": "var(--wgo-accent-muted)",
      "wgo-focus": "var(--wgo-focus)",
      "wgo-success": "var(--wgo-success)",
      "wgo-success-soft": "var(--wgo-success-soft)",
      "wgo-warning": "var(--wgo-warning)",
      "wgo-warning-soft": "var(--wgo-warning-soft)",
      "wgo-danger": "var(--wgo-danger)",
      "wgo-danger-soft": "var(--wgo-danger-soft)",
      "wgo-border-subtle": "var(--wgo-border-subtle)",
      "wgo-border": "var(--wgo-border-light)",
      "wgo-border-medium": "var(--wgo-border-medium)",
      "wgo-border-strong": "var(--wgo-border-strong)",
    },
    borderRadius: {
      "wgo-xs": "var(--wgo-radius-xs)",
      "wgo-sm": "var(--wgo-radius-sm)",
      "wgo-md": "var(--wgo-radius-md)",
      "wgo-lg": "var(--wgo-radius-lg)",
      "wgo-xl": "var(--wgo-radius-xl)",
      "wgo-2xl": "var(--wgo-radius-2xl)",
    },
    boxShadow: {
      "wgo-sm": "var(--wgo-shadow-sm)",
      "wgo-md": "var(--wgo-shadow-md)",
      "wgo-lg": "var(--wgo-shadow-lg)",
      "wgo-pane": "var(--wgo-shadow-pane)",
      "wgo-panel-inset": "inset -1px 0 0 var(--wgo-border-subtle)",
      "wgo-row-top": "inset 0 1px 0 var(--wgo-border-light)",
      "wgo-cell-top-left":
        "inset 1px 0 0 var(--wgo-border-light), inset 0 1px 0 var(--wgo-border-light)",
      "wgo-active-pane":
        "inset 0 0 0 1px rgba(37, 99, 235, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.74)",
      "wgo-active-tab":
        "inset 0 1px 0 rgba(37, 99, 235, 0.2), inset 1px 0 0 rgba(37, 99, 235, 0.14), inset -1px 0 0 rgba(37, 99, 235, 0.14)",
    },
    fontFamily: {
      wgo: "var(--wgo-font-native)",
      "wgo-mono": "var(--wgo-font-mono)",
    },
  },
  shortcuts: {
    "wgo-transition":
      "[transition:background_var(--wgo-duration-fast)_var(--wgo-ease-out),color_var(--wgo-duration-fast)_var(--wgo-ease-out),border-color_var(--wgo-duration-fast)_var(--wgo-ease-out),box-shadow_var(--wgo-duration-fast)_var(--wgo-ease-out)]",
    "wgo-icon-button":
      "inline-flex appearance-none items-center justify-center cursor-pointer border-0 rounded-wgo-md bg-transparent p-0 leading-none font-wgo text-wgo-text-3 hover:bg-wgo-hover hover:text-wgo-text-2 active:bg-wgo-active wgo-transition",
    "wgo-surface-card":
      "border border-wgo-border bg-wgo-surface rounded-wgo-xl shadow-wgo-md",
    "wgo-material-chrome":
      "border-white/22 bg-[var(--wgo-material-chrome-bg)] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.66),inset_0_-1px_0_rgba(18,25,38,0.04)]",
    "wgo-material-dock-control":
      "border border-white/34 bg-white/24 text-wgo-text-2 backdrop-blur-xl hover:border-white/56 hover:bg-white/44 hover:text-wgo-text",
    "wgo-material-shell":
      "bg-[rgba(253,253,253,0.9)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_1px_0_0_rgba(255,255,255,0.36)]",
    "wgo-material-body": "bg-[rgba(249,249,250,0.82)]",
    "wgo-material-toolbar":
      "border-b border-b-white/28 bg-white/46 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(18,25,38,0.04)]",
    "wgo-material-status":
      "border-t border-t-black/6 bg-white/42 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.58)]",
    "wgo-material-row": "rounded-wgo-md hover:bg-white/44 wgo-transition",
    "wgo-material-row-selected":
      "bg-[rgba(96,133,190,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(18,25,38,0.04)]",
    "wgo-material-icon-well":
      "border border-black/5 bg-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
    "wgo-material-dark-shell":
      "bg-[rgba(16,20,30,0.78)] text-[#d8dee9] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    "wgo-material-dark-body": "bg-[rgba(8,12,20,0.4)]",
    "wgo-material-dark-toolbar":
      "border-b border-b-white/10 bg-white/8 text-[#d8dee9] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    "wgo-material-dark-status":
      "border-t border-t-white/8 bg-black/14 text-[#9aa6b8] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
    "wgo-material-dark-row":
      "border-b border-b-white/7 hover:bg-white/6 wgo-transition",
    "wgo-material-floating":
      "border border-white/42 bg-[var(--wgo-material-floating-bg)] backdrop-blur-2xl shadow-[0_24px_70px_rgba(18,25,38,0.22),0_4px_16px_rgba(18,25,38,0.1),inset_0_1px_0_rgba(255,255,255,0.82)]",
    "wgo-material-window":
      "border border-white/46 bg-[var(--wgo-material-window-bg)] backdrop-blur-2xl shadow-[var(--wgo-shadow-window)]",
  },
  preflights: [
    {
      getCSS: () => preflightStyles,
    },
  ],
});
