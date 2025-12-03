import type { FluxTheme } from "../types.ts";
import { baseColors } from "../tokens/colors.ts";
import { radius } from "../tokens/radius.ts";
import { spacing } from "../tokens/spacing.ts";
import { shadows } from "../tokens/shadows.ts";

export const lightTheme: FluxTheme = {
  name: "light",
  tokens: {
    colors: {
      ...baseColors,
    },
    radius,
    spacing,
    shadows,
  },
};
