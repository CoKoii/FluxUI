import { s as c, p, r as d, b as k, d as x } from "./index-Bn3lzX2I.js";
import { i as S } from "./index-Bn3lzX2I.js";
const l = {
  4: "4px",
  6: "6px",
  8: "8px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px"
}, m = {
  family: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    '"PingFang SC"',
    '"Microsoft YaHei"',
    "sans-serif"
  ].join(", "),
  weight100: 100,
  weight200: 200,
  weight300: 300,
  weight400: 400,
  weight500: 500,
  weight600: 600,
  weight700: 700,
  weight800: 800,
  weight900: 900,
  size12: "12px",
  size13: "13px",
  size14: "14px",
  size16: "16px",
  size20: "20px"
}, u = {
  transition: {
    "300ease": "0.3s ease"
  }
}, f = {
  solid_1: "1px solid"
}, y = {
  name: "light",
  tokens: {
    colors: { ...k },
    radius: d,
    padding: p,
    shadows: c,
    gap: l,
    font: m,
    motion: u,
    border: f
  }
}, z = {
  name: "dark",
  tokens: {
    colors: { ...x },
    radius: d,
    padding: p,
    shadows: c,
    gap: l,
    font: m,
    motion: u,
    border: f
  }
}, w = "--fl", g = "fl-data-theme", r = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), b = (e) => e !== null && typeof e == "object" && !Array.isArray(e);
function h(e, t, o, s = "") {
  for (const [n, i] of Object.entries(
    e
  )) {
    const a = s ? `${s}-${r(n)}` : r(n);
    b(i) ? h(i, t, o, a) : t.style.setProperty(`${o}-${a}`, String(i));
  }
}
function T(e, t = document.documentElement, o = {}) {
  const { prefix: s = w, attribute: n = g } = o;
  t.setAttribute(n, e.name), h(e.tokens, t, s);
}
function A(e = document.documentElement) {
  return e.getAttribute(g) === "dark" ? "dark" : "light";
}
function $(e = document.documentElement) {
  return A(e) === "dark";
}
typeof window < "u" && typeof document < "u" && T(y);
export {
  g as DEFAULT_ATTRIBUTE,
  w as DEFAULT_PREFIX,
  T as applyTheme,
  z as darkTheme,
  A as getThemeMode,
  $ as isDark,
  y as lightTheme,
  S as tokens
};
//# sourceMappingURL=index.js.map
