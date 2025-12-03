import type { FluxTheme } from "../types.ts";
import { radius } from "../tokens/radius.ts";
import { spacing } from "../tokens/spacing.ts";
import { shadows } from "../tokens/shadows.ts";

export const darkTheme: FluxTheme = {
  name: "dark",
  tokens: {
    colors: {
      primary: "#E4C070",
      primarySoft: "#3A2B17",
      primaryText: "#F6E2B8",

      bg: "#17120B",
      bgSoft: "#241A0E",
      text: "#F3E4C7",
      border: "#4A3823",
    },
    radius,
    spacing,
    shadows,
  },
};
