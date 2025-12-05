export * from "./types";
export * from "./themes";
export * from "./applyTheme";
export * as tokens from "./tokens";

import { lightTheme } from "./themes";
import { applyTheme } from "./applyTheme";

if (typeof window !== "undefined" && typeof document !== "undefined") {
  applyTheme(lightTheme);
}
