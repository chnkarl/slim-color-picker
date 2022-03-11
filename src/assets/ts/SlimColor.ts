let trimLeft = /^\s+/;
let trimRight = /\s+$/;
let mathRound = Math.round;
let mathMin = Math.min;
let mathMax = Math.max;

let names = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  burntsienna: 'ea7e5d',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '663399',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
};

class SlimColor {
  _originalInput: any;
  _r: any;
  _g: any;
  _b: any;
  _a: any;
  _roundA: any;
  _ok: boolean = false;
  rgb: any
  _format: any

  matchers: any

  init (color: any = '') {

    this.matchers = this.getMathers()

    let rgb = this.inputToRGB(color);
    this._originalInput = color
    this._r = rgb.r
    this._g = rgb.g
    this._b = rgb.b
    this._a = rgb.a
    this._roundA = mathRound((100 * this._a) / 100);
    this._format = rgb.format;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
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

  // Given a string or object, convert that input to RGB
  // Possible string inputs:
  //
  //     "red"
  //     "#f00" or "f00"
  //     "#ff0000" or "ff0000"
  //     "#ff000000" or "ff000000"
  //     "rgb 255 0 0" or "rgb (255, 0, 0)"
  //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
  //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
  //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
  //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
  //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
  //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
  
  inputToRGB(color) {
    let rgb = { r: 0, g: 0, b: 0 };
    let a:any = 1;
    let s:any = null;
    let v:any = null;
    let l:any = null;
    let ok = false;
    let format = '';

    if (typeof color == 'string') {
      color = this.stringInputToObject(color);
    }

    if (typeof color == 'object') {
      if (
        this.isValidCSSUnit(color.r) &&
        this.isValidCSSUnit(color.g) &&
        this.isValidCSSUnit(color.b)
      ) {
        rgb = this.rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substring(-1) === '%' ? 'prgb' : 'rgb';
      } else if (
        this.isValidCSSUnit(color.h) &&
        this.isValidCSSUnit(color.s) &&
        this.isValidCSSUnit(color.v)
      ) {
        s = this.convertToPercentage(color.s);
        v = this.convertToPercentage(color.v);
        rgb = this.hsvToRgb(color.h, s, v);
        ok = true;
        format = 'hsv';
      } else if (
        this.isValidCSSUnit(color.h) &&
        this.isValidCSSUnit(color.s) &&
        this.isValidCSSUnit(color.l)
      ) {
        s = this.convertToPercentage(color.s);
        l = this.convertToPercentage(color.l);
        rgb = this.hslToRgb(color.h, s, l);
        ok = true;
        format = 'hsl';
      }

      if (color.hasOwnProperty('a')) {
        a = color.a;
      }
    }

    a = this.boundAlpha(a);

    return {
      ok: ok,
      format: color.format || format,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a: a,
    };
  }

  getMathers () {
    // <http://www.w3.org/TR/css3-values/#integers>
    let CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    let CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    let CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
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
   }
  }

  // `stringInputToObject`
  // Permissive string parsing.  Take in a number of formats, and output an object
  // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
  stringInputToObject(color) {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
    let named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color == 'transparent') {
      return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    let match: any;
    if ((match = this.matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = this.matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = this.matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = this.matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = this.matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = this.matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = this.matchers.hex8.exec(color))) {
        return {
            r: this.parseIntFromHex(match[1]),
            g: this.parseIntFromHex(match[2]),
            b: this.parseIntFromHex(match[3]),
            a: this.convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = this.matchers.hex6.exec(color))) {
        return {
            r: this.parseIntFromHex(match[1]),
            g: this.parseIntFromHex(match[2]),
            b: this.parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = this.matchers.hex4.exec(color))) {
        return {
            r: this.parseIntFromHex(match[1] + '' + match[1]),
            g: this.parseIntFromHex(match[2] + '' + match[2]),
            b: this.parseIntFromHex(match[3] + '' + match[3]),
            a: this.convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = this.matchers.hex3.exec(color))) {
        return {
            r: this.parseIntFromHex(match[1] + '' + match[1]),
            g: this.parseIntFromHex(match[2] + '' + match[2]),
            b: this.parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
  }

  // `isValidCSSUnit`
  // Take in a single string / number and check to see if it looks like a CSS unit
  // (see `matchers` above for definition).
  isValidCSSUnit(color: any) {
    return !!this.matchers.CSS_UNIT.exec(color);
  }

  // Conversion Functions
  // --------------------

  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

  // `rgbToRgb`
  // Handle bounds / percentage checking to conform to CSS color spec
  // <http://www.w3.org/TR/css3-color/>
  // *Assumes:* r, g, b in [0, 255] or [0, 1]
  // *Returns:* { r, g, b } in [0, 255]
  rgbToRgb(r: number, g: number, b: number) {
    return {
      r: this.bound01(r, 255) * 255,
      g: this.bound01(g, 255) * 255,
      b: this.bound01(b, 255) * 255,
    };
  }

  // Replace a decimal with it's percentage value
  convertToPercentage(n: any) {
    if (n <= 1) {
      n = n * 100 + '%';
    }

    return n;
  }

  // `hsvToRgb`
  // Converts an HSV color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
  hsvToRgb(h: number, s: number, v: number) {
    h = this.bound01(h, 360) * 6;
    s = this.bound01(s, 100);
    v = this.bound01(v, 100);

    let i = Math.floor(h),
      f = h - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      mod = i % 6,
      r = [v, q, p, p, t, v][mod],
      g = [t, v, v, q, p, p][mod],
      b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  // Return a valid alpha value [0,1] with all invalid values being set to 1
  boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }

    return a;
  }

  // `hslToRgb`
  // Converts an HSL color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
  hslToRgb(h, s, l) {
    let r, g, b;

    h = this.bound01(h, 360);
    s = this.bound01(s, 100);
    l = this.bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  // Parse a base-16 hex value into a base-10 integer
  parseIntFromHex(val) {
    return parseInt(val, 16);
  }

  // Converts a hex value to a decimal
  convertHexToDecimal(h) {
    return (this.parseIntFromHex(h) / 255);
  }

  // Take input from [0, n] and return it as [0, 1]
  bound01(n: any, max: any) {
    if (this.isOnePointZero(n)) { n = "100%"; }

    let processPercent = this.isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt((n * max).toString(), 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
  }

  // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
  isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  // Check to see if string passed in is a percentage
  isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  }

  toHsl () {
    let hsl = this.rgbToHsl(this._r, this._g, this._b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
  }
    
  // `rgbToHsl`
  // Converts an RGB color value to HSL.
  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
  // *Returns:* { h, s, l } in [0,1]
  rgbToHsl(r, g, b) {

    r = this.bound01(r, 255);
    g = this.bound01(g, 255);
    b = this.bound01(b, 255);

    let max = mathMax(r, g, b), min = mathMin(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
  }

  setAlpha (value) {
    this._a = this.boundAlpha(value);
    this._roundA = mathRound(100*this._a) / 100;
    return this;
  }

  toHex (allow3Char: boolean = false) {
    return this.rgbToHex(this._r, this._g, this._b, allow3Char);
  }

  // `rgbToHex`
  // Converts an RGB color to hex
  // Assumes r, g, and b are contained in the set [0, 255]
  // Returns a 3 or 6 character hex
  rgbToHex(r, g, b, allow3Char) {

    let hex = [
        this.pad2(mathRound(r).toString(16)),
        this.pad2(mathRound(g).toString(16)),
        this.pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
  }

  // Force a hex value to have 2 characters
  pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
  }

  toRgbString () {
    return (this._a == 1) ?
      "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
      "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
  }

  toHslString () {
    let hsl = this.rgbToHsl(this._r, this._g, this._b);
    let h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
    return (this._a == 1) ?
      "hsl("  + h + ", " + s + "%, " + l + "%)" :
      "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
  }

  getAlpha () {
    return this._a;
  }
 
  toHsv () {
    let hsv = this.rgbToHsv(this._r, this._g, this._b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
  }

  // `rgbToHsv`
  // Converts an RGB color value to HSV
  // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
  // *Returns:* { h, s, v } in [0,1]
  rgbToHsv (r, g, b) {

    r = this.bound01(r, 255);
    g = this.bound01(g, 255);
    b = this.bound01(b, 255);

    let max = mathMax(r, g, b), min = mathMin(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
  }

  getFormat () {
    return this._format;
  }

}

export default SlimColor