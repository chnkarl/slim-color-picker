var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, ref, watch, nextTick, resolveDirective, openBlock, createElementBlock, createElementVNode, normalizeStyle, withModifiers, withDirectives, normalizeClass, vShow, vModelSelect, createCommentVNode, vModelText, toDisplayString, Fragment, renderList } from "vue";
var clickout = {
  beforeMount(el, binding) {
    const callback = binding.value;
    const directiveClass = "directive-clickout";
    el.clickEvent = function(event) {
      const elementIsActive = event.target === el || el.contains(event.target);
      if (elementIsActive) {
        el.classList.add(directiveClass);
      } else {
        if (el.classList.contains(directiveClass)) {
          el.classList.remove(directiveClass);
        }
        callback({ el, event });
      }
    };
    document.addEventListener("click", el.clickEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickEvent);
  }
};
let trimLeft = /^\s+/;
let trimRight = /\s+$/;
let mathRound = Math.round;
let mathMin = Math.min;
let mathMax = Math.max;
let names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
class SlimColor {
  constructor() {
    __publicField(this, "_originalInput");
    __publicField(this, "_r");
    __publicField(this, "_g");
    __publicField(this, "_b");
    __publicField(this, "_a");
    __publicField(this, "_roundA");
    __publicField(this, "_ok", false);
    __publicField(this, "rgb");
    __publicField(this, "_format");
    __publicField(this, "matchers");
  }
  init(color = "") {
    this.matchers = this.getMathers();
    let rgb = this.inputToRGB(color);
    this._originalInput = color;
    this._r = rgb.r;
    this._g = rgb.g;
    this._b = rgb.b;
    this._a = rgb.a;
    this._roundA = mathRound(100 * this._a / 100);
    this._format = rgb.format;
    if (this._r < 1) {
      this._r = mathRound(this._r);
    }
    if (this._g < 1) {
      this._g = mathRound(this._g);
    }
    if (this._b < 1) {
      this._b = mathRound(this._b);
    }
    this._ok = rgb.ok;
  }
  inputToRGB(color) {
    let rgb = { r: 0, g: 0, b: 0 };
    let a = 1;
    let s = null;
    let v = null;
    let l = null;
    let ok = false;
    let format = "";
    if (typeof color == "string") {
      color = this.stringInputToObject(color);
    }
    if (typeof color == "object") {
      if (this.isValidCSSUnit(color.r) && this.isValidCSSUnit(color.g) && this.isValidCSSUnit(color.b)) {
        rgb = this.rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substring(-1) === "%" ? "prgb" : "rgb";
      } else if (this.isValidCSSUnit(color.h) && this.isValidCSSUnit(color.s) && this.isValidCSSUnit(color.v)) {
        s = this.convertToPercentage(color.s);
        v = this.convertToPercentage(color.v);
        rgb = this.hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (this.isValidCSSUnit(color.h) && this.isValidCSSUnit(color.s) && this.isValidCSSUnit(color.l)) {
        s = this.convertToPercentage(color.s);
        l = this.convertToPercentage(color.l);
        rgb = this.hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }
      if (color.hasOwnProperty("a")) {
        a = color.a;
      }
    }
    a = this.boundAlpha(a);
    return {
      ok,
      format: color.format || format,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a
    };
  }
  getMathers() {
    let CSS_INTEGER = "[-\\+]?\\d+%?";
    let CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
    let CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
    let PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    let PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }
  stringInputToObject(color) {
    color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
    let named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color == "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    let match;
    if (match = this.matchers.rgb.exec(color)) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    if (match = this.matchers.rgba.exec(color)) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if (match = this.matchers.hsl.exec(color)) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    if (match = this.matchers.hsla.exec(color)) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if (match = this.matchers.hsv.exec(color)) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    if (match = this.matchers.hsva.exec(color)) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if (match = this.matchers.hex8.exec(color)) {
      return {
        r: this.parseIntFromHex(match[1]),
        g: this.parseIntFromHex(match[2]),
        b: this.parseIntFromHex(match[3]),
        a: this.convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }
    if (match = this.matchers.hex6.exec(color)) {
      return {
        r: this.parseIntFromHex(match[1]),
        g: this.parseIntFromHex(match[2]),
        b: this.parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }
    if (match = this.matchers.hex4.exec(color)) {
      return {
        r: this.parseIntFromHex(match[1] + "" + match[1]),
        g: this.parseIntFromHex(match[2] + "" + match[2]),
        b: this.parseIntFromHex(match[3] + "" + match[3]),
        a: this.convertHexToDecimal(match[4] + "" + match[4]),
        format: named ? "name" : "hex8"
      };
    }
    if (match = this.matchers.hex3.exec(color)) {
      return {
        r: this.parseIntFromHex(match[1] + "" + match[1]),
        g: this.parseIntFromHex(match[2] + "" + match[2]),
        b: this.parseIntFromHex(match[3] + "" + match[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  isValidCSSUnit(color) {
    return !!this.matchers.CSS_UNIT.exec(color);
  }
  rgbToRgb(r, g, b) {
    return {
      r: this.bound01(r, 255) * 255,
      g: this.bound01(g, 255) * 255,
      b: this.bound01(b, 255) * 255
    };
  }
  convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }
    return n;
  }
  hsvToRgb(h, s, v) {
    h = this.bound01(h, 360) * 6;
    s = this.bound01(s, 100);
    v = this.bound01(v, 100);
    let i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  hslToRgb(h, s, l) {
    let r, g, b;
    h = this.bound01(h, 360);
    s = this.bound01(s, 100);
    l = this.bound01(l, 100);
    function hue2rgb(p, q, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p + (q - p) * 6 * t;
      if (t < 1 / 2)
        return q;
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    if (s === 0) {
      r = g = b = l;
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  convertHexToDecimal(h) {
    return this.parseIntFromHex(h) / 255;
  }
  bound01(n, max) {
    if (this.isOnePointZero(n)) {
      n = "100%";
    }
    let processPercent = this.isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));
    if (processPercent) {
      n = parseInt((n * max).toString(), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    return n % max / parseFloat(max);
  }
  isOnePointZero(n) {
    return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
  }
  isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") != -1;
  }
  toHsl() {
    let hsl = this.rgbToHsl(this._r, this._g, this._b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
  }
  rgbToHsl(r, g, b) {
    r = this.bound01(r, 255);
    g = this.bound01(g, 255);
    b = this.bound01(b, 255);
    let max = mathMax(r, g, b), min = mathMin(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  setAlpha(value) {
    this._a = this.boundAlpha(value);
    this._roundA = mathRound(100 * this._a) / 100;
    return this;
  }
  toHex(allow3Char = false) {
    return this.rgbToHex(this._r, this._g, this._b, allow3Char);
  }
  rgbToHex(r, g, b, allow3Char) {
    let hex = [
      this.pad2(mathRound(r).toString(16)),
      this.pad2(mathRound(g).toString(16)),
      this.pad2(mathRound(b).toString(16))
    ];
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  pad2(c) {
    return c.length == 1 ? "0" + c : "" + c;
  }
  toRgbString() {
    return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
  }
  toHslString() {
    let hsl = this.rgbToHsl(this._r, this._g, this._b);
    let h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  }
  getAlpha() {
    return this._a;
  }
  toHsv() {
    let hsv = this.rgbToHsv(this._r, this._g, this._b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
  }
  rgbToHsv(r, g, b) {
    r = this.bound01(r, 255);
    g = this.bound01(g, 255);
    b = this.bound01(b, 255);
    let max = mathMax(r, g, b), min = mathMin(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max == min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, v };
  }
  getFormat() {
    return this._format;
  }
}
var SlimColorPicker_vue_vue_type_style_index_0_scope_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "hsl(216, 100%, 50%)"
    },
    initFormat: {
      type: String,
      default: "hex"
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    theme: {
      type: String,
      default: "light"
    },
    okText: {
      type: String,
      default: "OK"
    },
    radius: {
      type: Number,
      default: 0
    },
    presets: {
      type: Array,
      default: []
    }
  },
  directives: { clickout },
  setup(props, { attrs, slots, emit, expose }) {
    let slimColor = new SlimColor();
    slimColor.init(props.modelValue);
    let format = ref(props.initFormat);
    let refColorPanel = ref(null);
    let refHandler = ref(null);
    let refPanel = ref(null);
    let refSquare = ref(null);
    let refBarAlpha = ref(null);
    let refBarAlphaHandler = ref(null);
    let refBar = ref(null);
    let refBarHandler = ref(null);
    let squarePointX = ref(279);
    let squarePointY = ref(1);
    let squareWidth = 280;
    let squareHeight = 180;
    let squarePots = {
      xBegin: 0,
      xEnd: 280,
      yBegin: 0,
      yEnd: 180
    };
    let barWidth = 12;
    let barHeight = 180;
    let barPots = {
      xBegin: 0,
      xEnd: 12,
      yBegin: 0,
      yEnd: 180
    };
    let barAlphaWidth = 280;
    let barAlphaHeight = 12;
    let barAlphaPots = {
      xBegin: 0,
      xEnd: 280,
      yBegin: 0,
      yEnd: 12
    };
    let barHandlerTop = ref(0);
    let barAlphaHandlerLeft = ref(180);
    let ctxSquare;
    let ctxBar;
    let ctxBarAlpha;
    let { h, s, l, a } = slimColor.toHsl();
    let hue = h;
    let saturation = s;
    let lightness = l;
    let alpha = a;
    let inputValue = ref(props.modelValue);
    let previewColor = ref(`hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`);
    let colorPickerLeft = ref(0);
    let colorPickerTop = ref(0);
    let isShow = ref(false);
    let panelLeft;
    let panelTop;
    let colorBefore = props.modelValue;
    watch(inputValue, () => {
      emit("change", inputValue.value);
    });
    const init = () => {
      ctxSquare = refSquare.value.getContext("2d");
      initSquare();
      ctxBar = refBar.value.getContext("2d");
      initBar(ctxBar);
      if (format.value !== "hex") {
        generateBarAlpha();
      }
      slimColor.init(props.modelValue);
      outputColor(slimColor.toHsl());
      changeInput();
    };
    const open = async () => {
      isShow.value = true;
      await nextTick(() => {
        setColorPanelPosition();
        init();
      });
    };
    const setColorPanelPosition = () => {
      let handlerLeft = refHandler.value.getBoundingClientRect().left;
      let handlerTop = refHandler.value.getBoundingClientRect().top;
      let colorPanelWidth = refColorPanel.value.clientWidth;
      let colorPaneHeight = refColorPanel.value.clientHeight;
      if (handlerLeft + props.width >= colorPanelWidth) {
        colorPickerLeft.value = handlerLeft - (colorPanelWidth + 6);
      } else {
        colorPickerLeft.value = handlerLeft + props.width + 6;
      }
      if (handlerTop + props.height >= colorPaneHeight) {
        colorPickerTop.value = handlerTop - colorPaneHeight + props.height;
      } else {
        colorPickerTop.value = handlerTop;
      }
      panelLeft = refPanel.value.getBoundingClientRect().left + colorPickerLeft.value;
      panelTop = refPanel.value.getBoundingClientRect().top + colorPickerTop.value;
    };
    const initSquare = () => {
      if (ctxSquare) {
        ctxSquare.clearRect(0, 0, squareWidth, squareHeight);
      }
      const gradientBase = ctxSquare.createLinearGradient(1, 1, squarePots.xEnd, 0);
      slimColor.init(inputValue.value);
      let { h: h2 } = slimColor.toHsl();
      gradientBase.addColorStop(1, `hsl(${h2}, 100%, 50%)`);
      gradientBase.addColorStop(0, "hsl(0, 0%, 100%)");
      ctxSquare.fillStyle = gradientBase;
      ctxSquare.fillRect(0, 0, squareWidth, squareHeight);
      let my_gradient1 = ctxSquare.createLinearGradient(1, 1, 0, squarePots.yEnd);
      my_gradient1.addColorStop(0, `hsl(0, 0%, 0%, 0)`);
      my_gradient1.addColorStop(1, "hsl(0, 0%, 0%, 1)");
      ctxSquare.fillStyle = my_gradient1;
      ctxSquare.fillRect(0, 0, squareWidth, squareHeight);
    };
    const initBar = (ctxBarAlpha2) => {
      let gradientBar = ctxBarAlpha2.createLinearGradient(0, 0, barPots.xEnd, barPots.yEnd);
      gradientBar.addColorStop(0, "#f00");
      gradientBar.addColorStop(1 / 6, "#ff0");
      gradientBar.addColorStop(2 / 6, "#0f0");
      gradientBar.addColorStop(3 / 6, "#0ff");
      gradientBar.addColorStop(4 / 6, "#00f");
      gradientBar.addColorStop(5 / 6, "#f0f");
      gradientBar.addColorStop(1, "#f00");
      ctxBarAlpha2.fillStyle = gradientBar;
      ctxBarAlpha2.fillRect(0, 0, barWidth, barHeight);
    };
    const initBarAlpha = () => {
      if (ctxBarAlpha) {
        ctxBarAlpha.clearRect(0, 0, barAlphaWidth, barAlphaHeight);
      }
      let gradientBar = ctxBarAlpha.createLinearGradient(0, 0, barAlphaPots.xEnd, barAlphaPots.yEnd);
      gradientBar.addColorStop(0, `hsl(${hue}, 100%, 50%, 0)`);
      gradientBar.addColorStop(1, `hsl(${hue}, 100%, 50%, 1)`);
      ctxBarAlpha.fillStyle = gradientBar;
      ctxBarAlpha.fillRect(0, 0, barAlphaWidth, barAlphaHeight);
    };
    const clickSquare = (e) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: e.clientY - panelTop
      };
      if (pos.x >= 0 && pos.x < squareWidth && pos.y >= 0 && pos.y < squareHeight) {
        squarePointX.value = pos.x;
        squarePointY.value = pos.y;
        let { h: h2, s: s2, l: l2 } = getPointHsl(ctxSquare, pos);
        outputColor({ h: h2, s: s2, l: l2 });
      }
    };
    const mouseDownSquare = (e) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: e.clientY - panelTop
      };
      if (pos.x >= 0 && pos.x < squareWidth && pos.y >= 0 && pos.y < squareHeight) {
        document.onmousemove = function(e2) {
          let pos2 = {
            x: e2.clientX - panelLeft,
            y: e2.clientY - panelTop
          };
          pos2.x = pos2.x < 0 ? 0 : pos2.x > squareWidth - 1 ? squareWidth - 1 : pos2.x;
          pos2.y = pos2.y < 0 ? 0 : pos2.y > squareHeight ? squareHeight : pos2.y;
          squarePointX.value = pos2.x;
          squarePointY.value = pos2.y;
          let { h: h2, s: s2, l: l2 } = getPointHsl(ctxSquare, pos2);
          outputColor({ h: h2, s: s2, l: l2 });
        };
      }
      document.onmouseup = function(e2) {
        document.onmouseup = document.onmousemove = null;
      };
    };
    const clickBar = (e) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop
      };
      if (pos.x >= 0 && pos.x < barWidth && pos.y >= 0 && pos.y < barHeight) {
        pos.y = pos.y < 0 ? 0 : pos.y > barHeight - 1 ? barHeight - 1 : pos.y;
        barHandlerTop.value = pos.y;
        let { h: h2, s: s2, l: l2 } = getPointHsl(ctxBar, pos);
        inputValue.value = `hsl(${h2}, 100%, 50%)`;
        outputColor({ h: h2, s: s2, l: l2 });
        initSquare();
        if (format.value !== "hex") {
          hue = h2;
          initBarAlpha();
        }
        let {
          h: lastH,
          s: lastS,
          l: lastL
        } = getPointHsl(ctxSquare, {
          x: squarePointX.value,
          y: squarePointY.value
        });
        previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${lastL * 100}%, ${alpha})`;
      }
    };
    const mouseDownBar = (e) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop
      };
      if (pos.y >= 0 && pos.y < barHeight) {
        document.onmousemove = function(e2) {
          let pos2 = {
            x: 0,
            y: e2.clientY - panelTop
          };
          pos2.y = pos2.y < 0 ? 0 : pos2.y > barHeight - 1 ? barHeight - 1 : pos2.y;
          barHandlerTop.value = pos2.y;
          let { h: h2, s: s2, l: l2 } = getPointHsl(ctxBar, pos2);
          inputValue.value = `hsl(${h2}, 100%, 50%)`;
          outputColor({ h: h2, s: s2, l: l2 });
          initSquare();
          if (format.value !== "hex") {
            hue = h2;
            initBarAlpha();
          }
          let {
            h: lastH,
            s: lastS,
            l: lastL
          } = getPointHsl(ctxSquare, {
            x: squarePointX.value,
            y: squarePointY.value
          });
          previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${lastL * 100}%, ${alpha})`;
        };
      }
      document.onmouseup = function(e2) {
        document.onmouseup = document.onmousemove = null;
      };
    };
    const mouseDownBarHandler = (e) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop
      };
      if (pos.y >= 0 && pos.y < barHeight) {
        document.onmousemove = function(e2) {
          let pos2 = {
            x: 0,
            y: e2.clientY - panelTop
          };
          pos2.y = pos2.y < 0 ? 0 : pos2.y > barHeight - 1 ? barHeight - 1 : pos2.y;
          barHandlerTop.value = pos2.y;
          let { h: h2, s: s2, l: l2 } = getPointHsl(ctxBar, pos2);
          inputValue.value = `hsl(${h2}, 100%, 50%)`;
          initSquare();
          outputColor({ h: h2, s: s2, l: l2 });
          if (format.value !== "hex") {
            hue = h2;
            initBarAlpha();
          }
          let {
            h: lastH,
            s: lastS,
            l: lastL
          } = getPointHsl(ctxSquare, {
            x: squarePointX.value,
            y: squarePointY.value
          });
          previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${lastL * 100}%, ${alpha})`;
        };
      }
      document.onmouseup = function(e2) {
        document.onmouseup = document.onmousemove = null;
      };
    };
    const clickBarAlpha = (e) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0
      };
      if (pos.x >= 0 && pos.x < barAlphaWidth && pos.y >= 0 && pos.y < barAlphaHeight) {
        pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;
        barAlphaHandlerLeft.value = pos.x;
        alpha = parseFloat((pos.x / barAlphaWidth).toFixed(2));
        let { h: h2, s: s2, l: l2 } = getPointHsl(ctxSquare, {
          x: squarePointX.value,
          y: squarePointY.value
        });
        outputColor({ h: h2, s: s2, l: l2 });
      }
    };
    const mouseDownBarAlpha = (e) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0
      };
      pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;
      if (pos.x >= 0 && pos.x <= barAlphaWidth && pos.y >= 0 && pos.y <= barAlphaHeight) {
        document.onmousemove = function(e2) {
          let pos2 = {
            x: e2.clientX - panelLeft,
            y: 0
          };
          pos2.x = pos2.x < 0 ? 0 : pos2.x > barAlphaWidth ? barAlphaWidth : pos2.x;
          if (pos2.x >= 0 && pos2.x <= barAlphaWidth && pos2.y >= 0 && pos2.y <= barAlphaHeight) {
            pos2.x = pos2.x < 0 ? 0 : pos2.x > barAlphaWidth ? barAlphaWidth : pos2.x;
            barAlphaHandlerLeft.value = pos2.x;
            alpha = parseFloat((pos2.x / barAlphaWidth).toFixed(2));
            let { h: h2, s: s2, l: l2 } = getPointHsl(ctxSquare, {
              x: squarePointX.value,
              y: squarePointY.value
            });
            outputColor({ h: h2, s: s2, l: l2 });
          }
        };
      }
      document.onmouseup = function(e2) {
        document.onmouseup = document.onmousemove = null;
      };
    };
    const mouseDownBarAlphaHandler = (e) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0
      };
      pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;
      if (pos.x >= 0 && pos.x <= barAlphaWidth && pos.y >= 0 && pos.y <= barAlphaHeight) {
        document.onmousemove = function(e2) {
          let pos2 = {
            x: e2.clientX - panelLeft,
            y: 0
          };
          if (pos2.x >= 0 && pos2.x <= barAlphaWidth && pos2.y >= 0 && pos2.y <= barAlphaHeight) {
            pos2.x = pos2.x < 0 ? 0 : pos2.x > barAlphaWidth ? barAlphaWidth : pos2.x;
            barAlphaHandlerLeft.value = pos2.x;
            alpha = parseFloat((pos2.x / barAlphaWidth).toFixed(2));
            let { h: h2, s: s2, l: l2 } = getPointHsl(ctxSquare, {
              x: squarePointX.value,
              y: squarePointY.value
            });
            outputColor({ h: h2, s: s2, l: l2 });
          }
        };
      }
      document.onmouseup = function(e2) {
        document.onmouseup = document.onmousemove = null;
      };
    };
    const getPosTop = (hue2) => {
      return Math.round(hue2 * (refSquare.value.offsetHeight - refBarHandler.value.offsetHeight / 2) / 360);
    };
    const getPointHsl = (ctx, pos) => {
      let imgData = ctx.getImageData(pos.x, pos.y, 1, 1);
      slimColor.init({
        r: imgData.data[0],
        g: imgData.data[1],
        b: imgData.data[2]
      });
      let { h: h2, s: s2, l: l2 } = slimColor.toHsl();
      return { h: h2, s: s2, l: l2 };
    };
    const changeInput = () => {
      if (!inputValue)
        return;
      let { h: h2, s: s2, l: l2 } = toHsl();
      initSquare();
      if (format.value !== "hex") {
        hue = h2;
        initBarAlpha();
      }
      previewColor.value = `hsl(${h2}, ${s2 * 100}%, ${l2 * 100}%, ${alpha})`;
      setHandlers();
    };
    const outputColor = (hsl) => {
      if (inputValue.value === "")
        return;
      let exchangedValue = exchangeFormat(hsl);
      inputValue.value = exchangedValue;
      previewColor.value = `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%, ${alpha})`;
    };
    const exchangeFormat = (origin) => {
      slimColor.init(origin);
      slimColor.setAlpha(alpha);
      let exchanged = "";
      switch (format.value) {
        case "hex":
          exchanged = slimColor.toHex();
          break;
        case "rgb":
          exchanged = slimColor.toRgbString();
          break;
        case "rgba":
          exchanged = slimColor.toRgbString();
          break;
        case "hsl":
          exchanged = slimColor.toHslString();
          break;
        case "hsla":
          exchanged = slimColor.toHslString();
          break;
      }
      return exchanged;
    };
    const toHsl = () => {
      slimColor.init(inputValue.value);
      alpha = slimColor.getAlpha();
      return slimColor.toHsl();
    };
    const setHandlers = () => {
      slimColor.init(inputValue.value);
      let { h: h2, s: s2, v } = slimColor.toHsv();
      let posY = getPosTop(h2);
      barHandlerTop.value = posY;
      barAlphaHandlerLeft.value = alpha * barAlphaWidth;
      let saturation2 = Math.max(0, Math.min(100, s2));
      let value = Math.max(0, Math.min(100, v));
      squarePointX.value = saturation2 * (squareWidth - 1);
      squarePointY.value = (1 - value) * squareHeight;
    };
    const changeFormat = () => {
      if (!inputValue)
        return;
      inputValue.value = exchangeFormat(inputValue.value);
      let { h: h2, s: s2, l: l2, a: a2 } = toHsl();
      if (format.value !== "hex") {
        hue = h2;
        generateBarAlpha();
      } else {
        alpha = a2;
        previewColor.value = `hsl(${h2}, ${s2 * 100}%, ${l2 * 100}%, ${alpha})`;
        barAlphaHandlerLeft.value = alpha * barAlphaWidth;
      }
    };
    const generateBarAlpha = () => {
      ctxBarAlpha = refBarAlpha.value.getContext("2d");
      initBarAlpha();
    };
    const ok = () => {
      colorBefore = inputValue.value;
      emit("update:modelValue", inputValue.value);
    };
    const cancel = () => {
      if (isShow.value) {
        slimColor.init(colorBefore);
        let { h: h2, s: s2, l: l2, a: a2 } = slimColor.toHsl();
        alpha = a2;
        outputColor({ h: h2, s: s2, l: l2 });
        hide();
      }
    };
    const hide = () => {
      isShow.value = false;
      colorPickerLeft.value = 0;
      colorPickerTop.value = 0;
    };
    const choosePreset = (preset) => {
      colorBefore = inputValue.value;
      inputValue.value = preset;
      slimColor.init(preset);
      format.value = slimColor.getFormat();
      console.log("format.value: ", format.value);
      alpha = slimColor.getAlpha();
      changeFormat();
      changeInput();
    };
    return {
      refColorPanel,
      refHandler,
      refBarHandler,
      refPanel,
      refSquare,
      refBar,
      refBarAlpha,
      refBarAlphaHandler,
      squareWidth,
      squareHeight,
      squarePots,
      barWidth,
      barHeight,
      barPots,
      barAlphaWidth,
      barAlphaHeight,
      barAlphaPots,
      inputValue,
      changeInput,
      previewColor,
      squarePointX,
      squarePointY,
      clickSquare,
      mouseDownSquare,
      clickBar,
      mouseDownBar,
      barHandlerTop,
      clickBarAlpha,
      mouseDownBarAlpha,
      mouseDownBarAlphaHandler,
      mouseDownBarHandler,
      barAlphaHandlerLeft,
      format,
      changeFormat,
      colorPickerTop,
      colorPickerLeft,
      open,
      isShow,
      ok,
      cancel,
      choosePreset
    };
  }
});
const _hoisted_1 = { class: "slim-color-picker" };
const _hoisted_2 = { class: "slim-color-picker_panel_main" };
const _hoisted_3 = {
  ref: "refPanel",
  class: "panel_main_square"
};
const _hoisted_4 = { class: "panel_main_bar" };
const _hoisted_5 = { class: "slim-color-picker_panel_alpha" };
const _hoisted_6 = { class: "slim-color-picker_panel_form" };
const _hoisted_7 = { class: "panel_form_input" };
const _hoisted_8 = { class: "form_input_format" };
const _hoisted_9 = /* @__PURE__ */ createElementVNode("option", { value: "hex" }, "Hex", -1);
const _hoisted_10 = /* @__PURE__ */ createElementVNode("option", { value: "rgb" }, "RGB", -1);
const _hoisted_11 = /* @__PURE__ */ createElementVNode("option", { value: "hsl" }, "HSL", -1);
const _hoisted_12 = [
  _hoisted_9,
  _hoisted_10,
  _hoisted_11
];
const _hoisted_13 = {
  key: 0,
  class: "form_input_symbol"
};
const _hoisted_14 = { class: "panel_form_confirm" };
const _hoisted_15 = {
  key: 0,
  class: "slim-color-picker_panel_preset"
};
const _hoisted_16 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickout = resolveDirective("clickout");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "slim-color-picker_handler",
      style: normalizeStyle({
        width: `${_ctx.width}px`,
        height: `${_ctx.height}px`,
        borderRadius: `${_ctx.radius}px`
      })
    }, [
      createElementVNode("div", {
        ref: "refHandler",
        class: "slim-color-picker_handler_inner",
        style: normalizeStyle({
          width: `${_ctx.width}px`,
          height: `${_ctx.height}px`,
          background: _ctx.previewColor,
          borderRadius: `${_ctx.radius}px`
        }),
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.open && _ctx.open(...args), ["stop"]))
      }, null, 4)
    ], 4),
    _ctx.isShow ? withDirectives((openBlock(), createElementBlock("div", {
      key: 0,
      ref: "refColorPanel",
      class: normalizeClass(["slim-color-picker_panel", { dark: _ctx.theme === "dark" }]),
      style: normalizeStyle({
        left: `${_ctx.colorPickerLeft}px`,
        top: `${_ctx.colorPickerTop}px`
      })
    }, [
      createElementVNode("div", _hoisted_2, [
        createElementVNode("div", _hoisted_3, [
          createElementVNode("canvas", {
            ref: "refSquare",
            width: "280",
            height: "180",
            class: "main_square_canvas",
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.clickSquare && _ctx.clickSquare(...args), ["stop"])),
            onMousedown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.mouseDownSquare && _ctx.mouseDownSquare(...args), ["stop"]))
          }, null, 544),
          createElementVNode("div", {
            class: "main_square_point",
            style: normalizeStyle({
              left: `${_ctx.squarePointX}px`,
              top: `${_ctx.squarePointY}px`
            })
          }, null, 4)
        ], 512),
        createElementVNode("div", _hoisted_4, [
          createElementVNode("canvas", {
            ref: "refBar",
            width: "12",
            height: "180",
            class: "main_bar_canvas",
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.clickBar && _ctx.clickBar(...args), ["stop"])),
            onMousedown: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.mouseDownBar && _ctx.mouseDownBar(...args), ["stop"]))
          }, null, 544),
          createElementVNode("div", {
            ref: "refBarHandler",
            class: "main_bar_handler",
            style: normalizeStyle({ top: `${_ctx.barHandlerTop}px` }),
            onMousedown: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.mouseDownBarHandler && _ctx.mouseDownBarHandler(...args), ["stop"]))
          }, null, 36)
        ])
      ]),
      withDirectives(createElementVNode("div", _hoisted_5, [
        createElementVNode("canvas", {
          ref: "refBarAlpha",
          width: "280",
          height: "12",
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.clickBarAlpha && _ctx.clickBarAlpha(...args), ["stop"])),
          onMousedown: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.mouseDownBarAlpha && _ctx.mouseDownBarAlpha(...args), ["stop"]))
        }, null, 544),
        createElementVNode("div", {
          ref: "refBarAlphaHandler",
          class: "panel_alpha_handler",
          style: normalizeStyle({ left: `${_ctx.barAlphaHandlerLeft}px` }),
          onMousedown: _cache[8] || (_cache[8] = (...args) => _ctx.mouseDownBarAlphaHandler && _ctx.mouseDownBarAlphaHandler(...args))
        }, null, 36)
      ], 512), [
        [vShow, _ctx.format !== "hex"]
      ]),
      createElementVNode("div", _hoisted_6, [
        createElementVNode("div", _hoisted_7, [
          createElementVNode("div", _hoisted_8, [
            withDirectives(createElementVNode("select", {
              class: "input_format_select",
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.format = $event),
              onChange: _cache[10] || (_cache[10] = (...args) => _ctx.changeFormat && _ctx.changeFormat(...args))
            }, _hoisted_12, 544), [
              [vModelSelect, _ctx.format]
            ])
          ]),
          _ctx.format === "hex" ? (openBlock(), createElementBlock("div", _hoisted_13, "#")) : createCommentVNode("", true),
          withDirectives(createElementVNode("input", {
            type: "text",
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.inputValue = $event),
            class: "form_input_input",
            onChange: _cache[12] || (_cache[12] = (...args) => _ctx.changeInput && _ctx.changeInput(...args))
          }, null, 544), [
            [vModelText, _ctx.inputValue]
          ])
        ]),
        createElementVNode("div", _hoisted_14, [
          createElementVNode("button", {
            type: "button",
            class: "form_confirm_btn",
            onClick: _cache[13] || (_cache[13] = withModifiers((...args) => _ctx.ok && _ctx.ok(...args), ["stop"]))
          }, toDisplayString(_ctx.okText), 1)
        ])
      ]),
      _ctx.presets.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_15, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.presets, (preset, p) => {
          return openBlock(), createElementBlock("div", {
            class: "panel_preset_item",
            key: p,
            onClick: ($event) => _ctx.choosePreset(preset)
          }, [
            createElementVNode("div", {
              class: "preset_item_inner",
              style: normalizeStyle({
                background: `${preset}`
              })
            }, null, 4)
          ], 8, _hoisted_16);
        }), 128))
      ])) : createCommentVNode("", true)
    ], 6)), [
      [_directive_clickout, _ctx.cancel]
    ]) : createCommentVNode("", true)
  ]);
}
var SlimColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SlimColorPicker as default };
