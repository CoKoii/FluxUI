import type { Theme } from "../types";
import { radius } from "../tokens/radius";
import { spacing } from "../tokens/spacing";
import { shadows } from "../tokens/shadows";
import { darkColors } from "../tokens/colors-dark";

export const darkTheme: Theme = {
  name: "dark",
  tokens: {
    colors: { ...darkColors },
    radius,
    spacing,
    shadows,
  },
};
