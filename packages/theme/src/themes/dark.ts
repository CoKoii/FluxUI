import type { Theme } from "../types";
import { radius } from "../tokens/radius";
import { padding } from "../tokens/padding";
import { shadows } from "../tokens/shadows";
import { darkColors } from "../tokens/colors-dark";
import { gap } from "../tokens/gap";
import { font } from "../tokens/font";

export const darkTheme: Theme = {
  name: "dark",
  tokens: {
    colors: { ...darkColors },
    radius,
    padding,
    shadows,
    gap,
    font,
  },
};
