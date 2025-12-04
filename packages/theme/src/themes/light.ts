import type { Theme } from "../types";
import { baseColors } from "../tokens/colors";
import { radius } from "../tokens/radius";
import { padding } from "../tokens/padding";
import { shadows } from "../tokens/shadows";
import { gap } from "../tokens/gap";
import { font } from "../tokens/font";
import { motion } from "../tokens/motion";

export const lightTheme: Theme = {
  name: "light",
  tokens: {
    colors: { ...baseColors },
    radius,
    padding,
    shadows,
    gap,
    font,
    motion,
  },
};
