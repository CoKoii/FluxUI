import type { Theme } from "../types";
import { baseColors } from "../tokens/colors";
import { radius } from "../tokens/radius";
import { spacing } from "../tokens/spacing";
import { shadows } from "../tokens/shadows";

export const lightTheme: Theme = {
  name: "light",
  tokens: {
    colors: { ...baseColors },
    radius,
    spacing,
    shadows,
  },
};
