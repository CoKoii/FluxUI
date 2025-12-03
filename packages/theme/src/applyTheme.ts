import type { FluxTheme } from "./types";

export const THEME_VAR_PREFIX = "--fl";

export function applyTheme(
  theme: FluxTheme,
  target: HTMLElement = document.documentElement
) {
  recursivelyApplyTokens("", theme.tokens, target);
}

function recursivelyApplyTokens(path: string, value: any, target: HTMLElement) {
  Object.entries(value).forEach(([key, val]) => {
    const newPath = path ? `${path}-${toKebab(key)}` : toKebab(key);

    if (isObject(val)) {
      recursivelyApplyTokens(newPath, val, target);
    } else {
      target.style.setProperty(`${THEME_VAR_PREFIX}-${newPath}`, String(val));
    }
  });
}

function isObject(val: unknown): val is Record<string, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function toKebab(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
