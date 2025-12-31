import type { Theme, ThemeMode, ApplyThemeOptions } from "./types";
export declare const DEFAULT_PREFIX = "--fl";
export declare const DEFAULT_ATTRIBUTE = "fl-data-theme";
export declare function applyTheme(theme: Theme, target?: HTMLElement, options?: ApplyThemeOptions): void;
export declare function getThemeMode(target?: HTMLElement): ThemeMode;
export declare function isDark(target?: HTMLElement): boolean;
