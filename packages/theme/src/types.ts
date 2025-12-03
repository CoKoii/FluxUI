export type ThemeMode = "light" | "dark";

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface LayoutColors {
  background: string;
  foreground: string;
  divider: string;
  focus: string;
}

export interface ContentColors {
  content1: string;
  content2: string;
  content3: string;
  content4: string;
}

export interface SemanticColors {
  default: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ColorTokens {
  white?: string;
  black?: string;
  blue?: ColorScale;
  purple?: ColorScale;
  green?: ColorScale;
  red?: ColorScale;
  pink?: ColorScale;
  yellow?: ColorScale;
  cyan?: ColorScale;
  zinc?: ColorScale;
  layout?: LayoutColors;
  content?: ContentColors;
  semantic?: SemanticColors;
  default?: ColorScale;
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  [key: string]: unknown;
}

export interface RadiusTokens {
  sm?: string;
  md?: string;
  lg?: string;
  full?: string;
}

export interface SpacingTokens {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
}

export interface ShadowTokens {
  sm?: string;
  md?: string;
}

export interface ThemeTokens {
  colors?: ColorTokens;
  radius?: RadiusTokens;
  spacing?: SpacingTokens;
  shadows?: ShadowTokens;
}

export interface Theme {
  name: string;
  tokens: ThemeTokens;
}

export interface ApplyThemeOptions {
  prefix?: string;
  attribute?: string;
}
