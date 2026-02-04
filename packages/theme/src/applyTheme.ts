import type { Theme, ThemeMode, ApplyThemeOptions } from "./types";

export const DEFAULT_PREFIX = "--fl";
export const DEFAULT_ATTRIBUTE = "fl-data-theme";

const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === "object" && !Array.isArray(val);

type TokenMap = Record<string, string>;

function flattenTokens(tokens: unknown, prefix: string, path = "", out: TokenMap = {}): TokenMap {
  for (const [key, value] of Object.entries(
    tokens as Record<string, unknown>
  )) {
    const tokenPath = path ? `${path}-${toKebabCase(key)}` : toKebabCase(key);
    if (isObject(value)) {
      flattenTokens(value, prefix, tokenPath, out);
    } else {
      out[`${prefix}-${tokenPath}`] = String(value);
    }
  }
  return out;
}

const styleCache = new Map<string, { cssText: string; style: HTMLStyleElement }>();

function resolveTarget(target?: HTMLElement): HTMLElement | undefined {
  return target ?? (typeof document === "undefined" ? undefined : document.documentElement);
}

export function applyTheme(
  theme: Theme,
  target?: HTMLElement,
  options: ApplyThemeOptions = {}
) {
  const { prefix = DEFAULT_PREFIX, attribute = DEFAULT_ATTRIBUTE } = options;
  const resolvedTarget = resolveTarget(target);
  if (!resolvedTarget) return;

  const variables = flattenTokens(theme.tokens, prefix);
  const cssText = `[${attribute}="${theme.name}"]{${Object.entries(variables)
    .map(([name, value]) => `${name}: ${value};`)
    .join("")}}`;

  if (typeof document !== "undefined") {
    const key = `${prefix}|${attribute}|${theme.name}`;
    const cached = styleCache.get(key);
    if (!cached || cached.cssText !== cssText) {
      const styleEl = cached?.style ?? document.createElement("style");
      if (!cached) {
        styleEl.setAttribute("data-fluxuijs-theme", key);
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = cssText;
      styleCache.set(key, { cssText, style: styleEl });
    }
  }

  for (const name of Object.keys(variables)) {
    resolvedTarget.style.removeProperty(name);
  }
  resolvedTarget.setAttribute(attribute, theme.name);
}

export function getThemeMode(target?: HTMLElement): ThemeMode {
  const resolvedTarget = resolveTarget(target);
  if (!resolvedTarget) return "light";
  return resolvedTarget.getAttribute(DEFAULT_ATTRIBUTE) === "dark"
    ? "dark"
    : "light";
}

export function isDark(target?: HTMLElement): boolean {
  return getThemeMode(target) === "dark";
}
