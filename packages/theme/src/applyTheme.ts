import type { Theme, ThemeMode, ApplyThemeOptions } from "./types";

export const DEFAULT_PREFIX = "--fl";
export const DEFAULT_ATTRIBUTE = "data-theme";

const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === "object" && !Array.isArray(val);

function applyTokens(
  tokens: unknown,
  target: HTMLElement,
  prefix: string,
  path = ""
) {
  for (const [key, value] of Object.entries(
    tokens as Record<string, unknown>
  )) {
    const tokenPath = path ? `${path}-${toKebabCase(key)}` : toKebabCase(key);
    if (isObject(value)) {
      applyTokens(value, target, prefix, tokenPath);
    } else {
      target.style.setProperty(`${prefix}-${tokenPath}`, String(value));
    }
  }
}

export function applyTheme(
  theme: Theme,
  target: HTMLElement = document.documentElement,
  options: ApplyThemeOptions = {}
) {
  const { prefix = DEFAULT_PREFIX, attribute = DEFAULT_ATTRIBUTE } = options;
  target.setAttribute(attribute, theme.name);
  applyTokens(theme.tokens, target, prefix);
}

export function getThemeMode(target = document.documentElement): ThemeMode {
  return target.getAttribute(DEFAULT_ATTRIBUTE) === "dark" ? "dark" : "light";
}

export function isDark(target = document.documentElement): boolean {
  return getThemeMode(target) === "dark";
}
