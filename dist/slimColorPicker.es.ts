import { defineComponent, ref, watch, onMounted, nextTick, openBlock, createElementBlock, withModifiers, createElementVNode, normalizeStyle, normalizeClass, withDirectives, vShow, vModelSelect, createCommentVNode, vModelText, toDisplayString, Fragment, renderList } from "vue";
var tinycolor = { exports: {} };
(function(module) {
  (function(Math2) {
    var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
    function tinycolor3(color, opts) {
      color = color ? color : "";
      opts = opts || {};
      if (color instanceof tinycolor3) {
        return color;
      }
      if (!(this instanceof tinycolor3)) {
        return new tinycolor3(color, opts);
      }
      var rgb = inputToRGB(color);
      this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType;
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
      this._tc_id = tinyCounter++;
    }
    tinycolor3.prototype = {
      isDark: function() {
        return this.getBrightness() < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      isValid: function() {
        return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
        return this._format;
      },
      getAlpha: function() {
        return this._a;
      },
      getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      },
      getLuminance: function() {
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      },
      setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100 * this._a) / 100;
        return this;
      },
      toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
      },
      toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
      },
      toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
        return "#" + this.toHex(allow3Char);
      },
      toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function(allow4Char) {
        return "#" + this.toHex8(allow4Char);
      },
      toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
        if (this._a === 0) {
          return "transparent";
        }
        if (this._a < 1) {
          return false;
        }
        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
        var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";
        if (secondColor) {
          var s = tinycolor3(secondColor);
          secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }
        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
      },
      toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;
        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this._a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      },
      clone: function() {
        return tinycolor3(this.toString());
      },
      _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function() {
        return this._applyModification(lighten, arguments);
      },
      brighten: function() {
        return this._applyModification(brighten, arguments);
      },
      darken: function() {
        return this._applyModification(darken, arguments);
      },
      desaturate: function() {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
        return this._applyModification(greyscale, arguments);
      },
      spin: function() {
        return this._applyModification(spin, arguments);
      },
      _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
        return this._applyCombination(analogous, arguments);
      },
      complement: function() {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
        return this._applyCombination(tetrad, arguments);
      }
    };
    tinycolor3.fromRatio = function(color, opts) {
      if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
          if (color.hasOwnProperty(i)) {
            if (i === "a") {
              newColor[i] = color[i];
            } else {
              newColor[i] = convertToPercentage(color[i]);
            }
          }
        }
        color = newColor;
      }
      return tinycolor3(color, opts);
    };
    function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;
      if (typeof color == "string") {
        color = stringInputToObject(color);
      }
      if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s = convertToPercentage(color.s);
          v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s, v);
          ok = true;
          format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s = convertToPercentage(color.s);
          l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, s, l);
          ok = true;
          format = "hsl";
        }
        if (color.hasOwnProperty("a")) {
          a = color.a;
        }
      }
      a = boundAlpha(a);
      return {
        ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a
      };
    }
    function rgbToRgb(r, g, b) {
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    }
    function rgbToHsl(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, l = (max + min) / 2;
      if (max == min) {
        h = s = 0;
      } else {
        var d = max - min;
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
    function hslToRgb(h, s, l) {
      var r, g, b;
      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);
      function hue2rgb(p2, q2, t) {
        if (t < 0)
          t += 1;
        if (t > 1)
          t -= 1;
        if (t < 1 / 6)
          return p2 + (q2 - p2) * 6 * t;
        if (t < 1 / 2)
          return q2;
        if (t < 2 / 3)
          return p2 + (q2 - p2) * (2 / 3 - t) * 6;
        return p2;
      }
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, v = max;
      var d = max - min;
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
    function hsvToRgb(h, s, v) {
      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math2.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHex(r, g, b, allow3Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToHex(r, g, b, a, allow4Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
      ];
      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToArgbHex(r, g, b, a) {
      var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      return hex.join("");
    }
    tinycolor3.equals = function(color1, color2) {
      if (!color1 || !color2) {
        return false;
      }
      return tinycolor3(color1).toRgbString() == tinycolor3(color2).toRgbString();
    };
    tinycolor3.random = function() {
      return tinycolor3.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    };
    function desaturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor3(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor3(hsl);
    }
    function saturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor3(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor3(hsl);
    }
    function greyscale(color) {
      return tinycolor3(color).desaturate(100);
    }
    function lighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor3(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor3(hsl);
    }
    function brighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var rgb = tinycolor3(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
      return tinycolor3(rgb);
    }
    function darken(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor3(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor3(hsl);
    }
    function spin(color, amount) {
      var hsl = tinycolor3(color).toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor3(hsl);
    }
    function complement(color) {
      var hsl = tinycolor3(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor3(hsl);
    }
    function triad(color) {
      var hsl = tinycolor3(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor3(color),
        tinycolor3({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor3({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function tetrad(color) {
      var hsl = tinycolor3(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor3(color),
        tinycolor3({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor3({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor3({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function splitcomplement(color) {
      var hsl = tinycolor3(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor3(color),
        tinycolor3({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
        tinycolor3({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;
      var hsl = tinycolor3(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor3(color)];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor3(hsl));
      }
      return ret;
    }
    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor3(color).toHsv();
      var h = hsv.h, s = hsv.s, v = hsv.v;
      var ret = [];
      var modification = 1 / results;
      while (results--) {
        ret.push(tinycolor3({ h, s, v }));
        v = (v + modification) % 1;
      }
      return ret;
    }
    tinycolor3.mix = function(color1, color2, amount) {
      amount = amount === 0 ? 0 : amount || 50;
      var rgb1 = tinycolor3(color1).toRgb();
      var rgb2 = tinycolor3(color2).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return tinycolor3(rgba);
    };
    tinycolor3.readability = function(color1, color2) {
      var c1 = tinycolor3(color1);
      var c2 = tinycolor3(color2);
      return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };
    tinycolor3.isReadable = function(color1, color2, wcag2) {
      var readability = tinycolor3.readability(color1, color2);
      var wcag2Parms, out;
      out = false;
      wcag2Parms = validateWCAG2Parms(wcag2);
      switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
          out = readability >= 4.5;
          break;
        case "AAlarge":
          out = readability >= 3;
          break;
        case "AAAsmall":
          out = readability >= 7;
          break;
      }
      return out;
    };
    tinycolor3.mostReadable = function(baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors;
      level = args.level;
      size = args.size;
      for (var i = 0; i < colorList.length; i++) {
        readability = tinycolor3.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
          bestScore = readability;
          bestColor = tinycolor3(colorList[i]);
        }
      }
      if (tinycolor3.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
        return bestColor;
      } else {
        args.includeFallbackColors = false;
        return tinycolor3.mostReadable(baseColor, ["#fff", "#000"], args);
      }
    };
    var names = tinycolor3.names = {
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
    var hexNames = tinycolor3.hexNames = flip(names);
    function flip(o) {
      var flipped = {};
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          flipped[o[i]] = i;
        }
      }
      return flipped;
    }
    function boundAlpha(a) {
      a = parseFloat(a);
      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }
      return a;
    }
    function bound01(n, max) {
      if (isOnePointZero(n)) {
        n = "100%";
      }
      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n)));
      if (processPercent) {
        n = parseInt(n * max, 10) / 100;
      }
      if (Math2.abs(n - max) < 1e-6) {
        return 1;
      }
      return n % max / parseFloat(max);
    }
    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    }
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }
    function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
    }
    function isPercentage(n) {
      return typeof n === "string" && n.indexOf("%") != -1;
    }
    function pad2(c) {
      return c.length == 1 ? "0" + c : "" + c;
    }
    function convertToPercentage(n) {
      if (n <= 1) {
        n = n * 100 + "%";
      }
      return n;
    }
    function convertDecimalToHex(d) {
      return Math2.round(parseFloat(d) * 255).toString(16);
    }
    function convertHexToDecimal(h) {
      return parseIntFromHex(h) / 255;
    }
    var matchers = function() {
      var CSS_INTEGER = "[-\\+]?\\d+%?";
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
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
    }();
    function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
    }
    function stringInputToObject(color) {
      color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color == "transparent") {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }
      var match;
      if (match = matchers.rgb.exec(color)) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      if (match = matchers.rgba.exec(color)) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if (match = matchers.hsl.exec(color)) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      if (match = matchers.hsla.exec(color)) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if (match = matchers.hsv.exec(color)) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      if (match = matchers.hsva.exec(color)) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if (match = matchers.hex8.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex6.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      if (match = matchers.hex4.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          a: convertHexToDecimal(match[4] + "" + match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex3.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          format: named ? "name" : "hex"
        };
      }
      return false;
    }
    function validateWCAG2Parms(parms) {
      var level, size;
      parms = parms || { "level": "AA", "size": "small" };
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();
      if (level !== "AA" && level !== "AAA") {
        level = "AA";
      }
      if (size !== "small" && size !== "large") {
        size = "small";
      }
      return { "level": level, "size": size };
    }
    if (module.exports) {
      module.exports = tinycolor3;
    } else {
      window.tinycolor = tinycolor3;
    }
  })(Math);
})(tinycolor);
var tinycolor2 = tinycolor.exports;
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
  setup(props, { attrs, slots, emit, expose }) {
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
    let { h, s, l, a } = tinycolor2(props.modelValue).toHsl();
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
    onMounted(() => {
      document.addEventListener("click", (e) => {
        e.preventDefault();
        cancel();
      });
    });
    const init = () => {
      ctxSquare = refSquare.value.getContext("2d");
      initSquare();
      ctxBar = refBar.value.getContext("2d");
      initBar(ctxBar);
      if (format.value !== "hex") {
        generateBarAlpha();
      }
      outputColor(tinycolor2(inputValue.value).toHsl());
      changeInput();
    };
    const open = async () => {
      isShow.value = true;
      await nextTick(() => {
        setColorPanelPosition();
        console.log("step 4");
        init();
      });
      console.log("step 5");
    };
    const setColorPanelPosition = () => {
      let handlerLeft = refColorPanel.value.getBoundingClientRect().left;
      let handlerTop = refColorPanel.value.getBoundingClientRect().top;
      let colorPanelWidth = refColorPanel.value.clientWidth;
      let colorPaneHeight = refColorPanel.value.clientHeight;
      if (handlerLeft + props.width >= colorPanelWidth) {
        colorPickerLeft.value = -(colorPanelWidth + 6);
      } else {
        colorPickerLeft.value = props.width + 6;
      }
      if (handlerTop + props.width >= colorPaneHeight) {
        colorPickerTop.value = -(colorPaneHeight - props.width);
      }
      panelLeft = refPanel.value.getBoundingClientRect().left + colorPickerLeft.value;
      panelTop = refPanel.value.getBoundingClientRect().top + colorPickerTop.value;
    };
    const initSquare = () => {
      if (ctxSquare) {
        ctxSquare.clearRect(0, 0, squareWidth, squareHeight);
      }
      const gradientBase = ctxSquare.createLinearGradient(1, 1, squarePots.xEnd, 0);
      let { h: h2 } = tinycolor2(inputValue.value).toHsl();
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
            console.log("pos.x: ", pos2.x);
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
      let { h: h2, s: s2, l: l2 } = tinycolor2({
        r: imgData.data[0],
        g: imgData.data[1],
        b: imgData.data[2]
      }).toHsl();
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
      let tinyColor = tinycolor2(origin);
      tinyColor.setAlpha(alpha);
      let exchanged = "";
      console.log("format.value: ", format.value);
      switch (format.value) {
        case "hex":
          exchanged = tinyColor.toHex();
          break;
        case "rgb":
          exchanged = tinyColor.toRgbString();
          break;
        case "rgba":
          exchanged = tinyColor.toRgbString();
          break;
        case "hsl":
          exchanged = tinyColor.toHslString();
          break;
        case "hsla":
          exchanged = tinyColor.toHslString();
          break;
      }
      console.log("exchanged: ", exchanged);
      return exchanged;
    };
    const toHsl = () => {
      const tinyColor = tinycolor2(inputValue.value);
      alpha = tinyColor.getAlpha();
      return tinyColor.toHsl();
    };
    const setHandlers = () => {
      let { h: h2, s: s2, v } = tinycolor2(inputValue.value).toHsv();
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
        let { h: h2, s: s2, l: l2, a: a2 } = tinycolor2(colorBefore).toHsl();
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
      const tinyColor = tinycolor2(preset);
      format.value = tinyColor.getFormat();
      alpha = tinyColor.getAlpha();
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
const _hoisted_1 = { class: "slim-color-picker_panel_main" };
const _hoisted_2 = {
  ref: "refPanel",
  class: "panel_main_square"
};
const _hoisted_3 = { class: "panel_main_bar" };
const _hoisted_4 = { class: "slim-color-picker_panel_alpha" };
const _hoisted_5 = { class: "slim-color-picker_panel_form" };
const _hoisted_6 = { class: "panel_form_input" };
const _hoisted_7 = { class: "form_input_format" };
const _hoisted_8 = /* @__PURE__ */ createElementVNode("option", { value: "hex" }, "Hex", -1);
const _hoisted_9 = /* @__PURE__ */ createElementVNode("option", { value: "rgb" }, "RGB", -1);
const _hoisted_10 = /* @__PURE__ */ createElementVNode("option", { value: "hsl" }, "HSL", -1);
const _hoisted_11 = [
  _hoisted_8,
  _hoisted_9,
  _hoisted_10
];
const _hoisted_12 = {
  key: 0,
  class: "form_input_symbol"
};
const _hoisted_13 = { class: "panel_form_confirm" };
const _hoisted_14 = {
  key: 0,
  class: "slim-color-picker_panel_preset"
};
const _hoisted_15 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "slim-color-picker",
    onClick: _cache[14] || (_cache[14] = withModifiers(() => {
    }, ["stop"]))
  }, [
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
    _ctx.isShow ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref: "refColorPanel",
      class: normalizeClass(["slim-color-picker_panel", { dark: _ctx.theme === "dark" }]),
      style: normalizeStyle({
        left: `${_ctx.colorPickerLeft}px`,
        top: `${_ctx.colorPickerTop}px`
      })
    }, [
      createElementVNode("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
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
        createElementVNode("div", _hoisted_3, [
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
      withDirectives(createElementVNode("div", _hoisted_4, [
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
      createElementVNode("div", _hoisted_5, [
        createElementVNode("div", _hoisted_6, [
          createElementVNode("div", _hoisted_7, [
            withDirectives(createElementVNode("select", {
              class: "input_format_select",
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.format = $event),
              onChange: _cache[10] || (_cache[10] = (...args) => _ctx.changeFormat && _ctx.changeFormat(...args))
            }, _hoisted_11, 544), [
              [vModelSelect, _ctx.format]
            ])
          ]),
          _ctx.format === "hex" ? (openBlock(), createElementBlock("div", _hoisted_12, "#")) : createCommentVNode("", true),
          withDirectives(createElementVNode("input", {
            type: "text",
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.inputValue = $event),
            class: "form_input_input",
            onChange: _cache[12] || (_cache[12] = (...args) => _ctx.changeInput && _ctx.changeInput(...args))
          }, null, 544), [
            [vModelText, _ctx.inputValue]
          ])
        ]),
        createElementVNode("div", _hoisted_13, [
          createElementVNode("button", {
            type: "button",
            class: "form_confirm_btn",
            onClick: _cache[13] || (_cache[13] = withModifiers((...args) => _ctx.ok && _ctx.ok(...args), ["stop"]))
          }, toDisplayString(_ctx.okText), 1)
        ])
      ]),
      _ctx.presets.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14, [
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
          ], 8, _hoisted_15);
        }), 128))
      ])) : createCommentVNode("", true)
    ], 6)) : createCommentVNode("", true)
  ]);
}
var SlimColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SlimColorPicker };
