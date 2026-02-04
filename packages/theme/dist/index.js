import { s as u, p as m, r as g, b as $, d as A } from "./index-Bn3lzX2I.js";
import { i as U } from "./index-Bn3lzX2I.js";
const y = {
  4: "4px",
  6: "6px",
  8: "8px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px"
}, h = {
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
}, x = {
  transition: {
    "300ease": "0.3s ease"
  }
}, k = {
  solid_1: "1px solid"
}, j = {
  name: "light",
  tokens: {
    colors: { ...$ },
    radius: g,
    padding: m,
    shadows: u,
    gap: y,
    font: h,
    motion: x,
    border: k
  }
}, S = {
  name: "dark",
  tokens: {
    colors: { ...A },
    radius: g,
    padding: m,
    shadows: u,
    gap: y,
    font: h,
    motion: x,
    border: k
  }
}, C = "--fl", b = "fl-data-theme", f = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), E = (e) => e !== null && typeof e == "object" && !Array.isArray(e);
function T(e, t, c = "", s = {}) {
  for (const [i, o] of Object.entries(
    e
  )) {
    const a = c ? `${c}-${f(i)}` : f(i);
    E(o) ? T(o, t, a, s) : s[`${t}-${a}`] = String(o);
  }
  return s;
}
const p = /* @__PURE__ */ new Map();
function w(e) {
  return e ?? (typeof document > "u" ? void 0 : document.documentElement);
}
function v(e, t, c = {}) {
  const { prefix: s = C, attribute: i = b } = c, o = w(t);
  if (!o) return;
  const a = T(e.tokens, s), l = `[${i}="${e.name}"]{${Object.entries(a).map(([n, r]) => `${n}: ${r};`).join("")}}`;
  if (typeof document < "u") {
    const n = `${s}|${i}|${e.name}`, r = p.get(n);
    if (!r || r.cssText !== l) {
      const d = r?.style ?? document.createElement("style");
      r || (d.setAttribute("data-fluxuijs-theme", n), document.head.appendChild(d)), d.textContent = l, p.set(n, { cssText: l, style: d });
    }
  }
  for (const n of Object.keys(a))
    o.style.removeProperty(n);
  o.setAttribute(i, e.name);
}
function z(e) {
  const t = w(e);
  return t && t.getAttribute(b) === "dark" ? "dark" : "light";
}
function M(e) {
  return z(e) === "dark";
}
typeof window < "u" && typeof document < "u" && v(j);
export {
  b as DEFAULT_ATTRIBUTE,
  C as DEFAULT_PREFIX,
  v as applyTheme,
  S as darkTheme,
  z as getThemeMode,
  M as isDark,
  j as lightTheme,
  U as tokens
};
//# sourceMappingURL=index.js.map
