<template>
  <div class="slim-color-picker">
    <!-- 暴露在外部被可以点击的选择元素 -->
    <div
      class="slim-color-picker_handler"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
      }"
    >
      <div
        ref="refHandler"
        class="slim-color-picker_handler_inner"
        :style="{
          width: `${width}px`,
          height: `${height}px`,
          background: previewColor,
          borderRadius: `${radius}px`,
        }"
        @click.stop="open"
      ></div>
    </div>

    <!-- 弹框颜色选择板 -->
    <div
      ref="refColorPanel"
      class="slim-color-picker_panel"
      :class="{ dark: theme === 'dark' }"
      v-clickout="cancel"
      v-if="isShow"
      :style="{
        left: `${colorPickerLeft}px`,
        top: `${colorPickerTop}px`,
      }"
    >
      <div class="slim-color-picker_panel_main">
        <div ref="refPanel" class="panel_main_square">
          <!-- square 主色版 -->
          <canvas
            ref="refSquare"
            width="280"
            height="180"
            class="main_square_canvas"
            @click.stop="clickSquare"
            @mousedown.stop="mouseDownSquare"
          ></canvas>
          <!-- 点击和移动时的位置圆圈 -->
          <div
            class="main_square_point"
            :style="{
              left: `${squarePointX}px`,
              top: `${squarePointY}px`,
            }"
          ></div>
        </div>

        <!-- bar 柱状色版 -->
        <div class="panel_main_bar">
          <canvas
            ref="refBar"
            width="12"
            height="180"
            class="main_bar_canvas"
            @click.stop="clickBar"
            @mousedown.stop="mouseDownBar"
          ></canvas>

          <div
            ref="refBarHandler"
            class="main_bar_handler"
            :style="{ top: `${barHandlerTop}px` }"
            @mousedown.stop="mouseDownBarHandler"
          ></div>
        </div>
      </div>

      <div class="slim-color-picker_panel_alpha" v-show="format !== 'hex'">
        <canvas
          ref="refBarAlpha"
          width="280"
          height="12"
          @click.stop="clickBarAlpha"
          @mousedown.stop="mouseDownBarAlpha"
        ></canvas>
        <div
          ref="refBarAlphaHandler"
          class="panel_alpha_handler"
          :style="{ left: `${barAlphaHandlerLeft}px` }"
          @mousedown="mouseDownBarAlphaHandler"
        ></div>
      </div>

      <div class="slim-color-picker_panel_form">
        <div class="panel_form_input">
          <div class="form_input_format">
            <select
              class="input_format_select"
              v-model="format"
              @change="changeFormat"
            >
              <option value="hex">Hex</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
            </select>
          </div>

          <div class="form_input_symbol" v-if="format === 'hex'">#</div>
          <input
            type="text"
            v-model="inputValue"
            class="form_input_input"
            @change="changeInput"
          />
        </div>

        <div class="panel_form_confirm">
          <button type="button" class="form_confirm_btn" @click.stop="ok">
            {{ okText }}
          </button>
        </div>
      </div>

      <div class="slim-color-picker_panel_preset" v-if="presets.length > 0">
        <!-- 预置颜色 -->
        <div
          class="panel_preset_item"
          v-for="(preset, p) in presets"
          :key="p"
          @click="choosePreset(preset)"
        >
          <div
            class="preset_item_inner"
            :style="{
              background: `${preset}`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  getCurrentInstance,
  Ref,
  nextTick,
} from 'vue';

import tinycolor2 from 'tinycolor2';

import clickout from '../assets/ts/directives/clickout'

interface Pos {
  x: number;
  y: number;
}

export default defineComponent({
  props: {
    modelValue: {
      // 接收 v-model　的传值，实际上是　v-model:modelValue
      type: String,
      default: 'hsl(216, 100%, 50%)',
    },
    initFormat: {
      type: String,
      default: 'hex', // rgb / hex / hsl / hsv
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 50,
    },
    theme: {
      type: String,
      default: 'light', // light / dark
    },
    okText: {
      // 确认按钮的文字
      type: String,
      default: 'OK',
    },
    radius: {
      // handler 的圆角
      type: Number,
      default: 0,
    },
    presets: {
      type: Array, // 预置颜色
      default: [],
    },
  },
  directives: { clickout },
  setup(props, { attrs, slots, emit, expose }) {
    let format = ref<string>(props.initFormat);

    let refColorPanel: any = ref(null);
    let refHandler: any = ref(null);

    let refPanel: any = ref(null);
    let refSquare: any = ref(null);

    let refBarAlpha: any = ref(null);
    let refBarAlphaHandler: any = ref(null);

    let refBar: any = ref(null);
    let refBarHandler: any = ref(null);

    let squarePointX = ref<number>(279);
    let squarePointY = ref<number>(1);

    let squareWidth = 280;
    let squareHeight = 180;
    let squarePots: any = {
      xBegin: 0,
      xEnd: 280,
      yBegin: 0,
      yEnd: 180,
    };

    let barWidth = 12;
    let barHeight = 180;
    let barPots: any = {
      xBegin: 0,
      xEnd: 12,
      yBegin: 0,
      yEnd: 180,
    };

    let barAlphaWidth = 280;
    let barAlphaHeight = 12;
    let barAlphaPots: any = {
      xBegin: 0,
      xEnd: 280,
      yBegin: 0,
      yEnd: 12,
    };

    let barHandlerTop = ref<number>(0);

    let barAlphaHandlerLeft = ref<number>(180);

    let ctxSquare: CanvasRenderingContext2D;

    let ctxBar: CanvasRenderingContext2D;

    let ctxBarAlpha: CanvasRenderingContext2D;

    let { h, s, l, a } = tinycolor2(props.modelValue).toHsl();

    // 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
    let hue: number = h;

    // 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-1的数值。
    let saturation: number = s;

    // 明度（V），亮度（L），取 0-1。
    let lightness: number = l;

    // 透明度
    let alpha: number = a;

    // 输入的颜色值
    let inputValue = ref<string>(props.modelValue);

    // 预览选中颜色框的颜色
    let previewColor = ref<string>(
      `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`,
    );

    let colorPickerLeft = ref<number>(0);
    let colorPickerTop = ref<number>(0);

    let isShow = ref<boolean>(false);

    let panelLeft: number;
    let panelTop: number;

    // 点击确认前的颜色，用于取消时恢复
    let colorBefore = props.modelValue;

    // 监听颜色变化，告知父组件接受
    watch(inputValue, () => {
      emit('change', inputValue.value);
    });

    const init = () => {
      ctxSquare = refSquare.value.getContext(
        '2d',
      ) as unknown as CanvasRenderingContext2D;

      initSquare();

      ctxBar = refBar.value.getContext(
        '2d',
      ) as unknown as CanvasRenderingContext2D;

      initBar(ctxBar);

      if (format.value !== 'hex') {
        generateBarAlpha();
      }

      outputColor(tinycolor2(inputValue.value).toHsl());
      changeInput();
    };

    const open = async () => {

      isShow.value = true;

      await nextTick(() => {
        setColorPanelPosition();
        init();
      })
    };

    // 画板定位
    const setColorPanelPosition = () => {
      // color picker panel 左边距离左边距离
      let handlerLeft = refColorPanel.value.getBoundingClientRect().left;

      // color picker panel 底部边距离顶部
      let handlerTop = refColorPanel.value.getBoundingClientRect().top;

      // 色板的宽
      let colorPanelWidth = refColorPanel.value.clientWidth;
      let colorPaneHeight = refColorPanel.value.clientHeight;

      // 看右边宽度是否可以放置
      if (handlerLeft + props.width >= colorPanelWidth) {
        colorPickerLeft.value = -(colorPanelWidth + 6);
      } else {
        colorPickerLeft.value = props.width + 6;
      }

      if (handlerTop + props.width >= colorPaneHeight) {
        colorPickerTop.value = -(colorPaneHeight - props.width);
      }

      panelLeft =
        refPanel.value.getBoundingClientRect().left + colorPickerLeft.value;

      panelTop =
        refPanel.value.getBoundingClientRect().top + colorPickerTop.value;
    };

    // 颜色选择板
    const initSquare = () => {
      if (ctxSquare) {
        ctxSquare.clearRect(0, 0, squareWidth, squareHeight);
      }

      // 底色填充，也就是（举例红色）到白色
      const gradientBase: CanvasGradient = ctxSquare.createLinearGradient(
        1,
        1,
        squarePots.xEnd,
        0,
      );

      let { h } = tinycolor2(inputValue.value).toHsl();

      gradientBase.addColorStop(1, `hsl(${h}, 100%, 50%)`);
      gradientBase.addColorStop(0, 'hsl(0, 0%, 100%)');
      ctxSquare.fillStyle = gradientBase;
      ctxSquare.fillRect(0, 0, squareWidth, squareHeight);

      // 第二次填充，黑色到透明
      let my_gradient1 = ctxSquare.createLinearGradient(
        1,
        1,
        0,
        squarePots.yEnd,
      );
      my_gradient1.addColorStop(0, `hsl(0, 0%, 0%, 0)`);
      my_gradient1.addColorStop(1, 'hsl(0, 0%, 0%, 1)');
      ctxSquare.fillStyle = my_gradient1;
      ctxSquare.fillRect(0, 0, squareWidth, squareHeight);
    };

    const initBar = (ctxBarAlpha: any) => {
      let gradientBar = ctxBarAlpha.createLinearGradient(
        0,
        0,
        barPots.xEnd,
        barPots.yEnd,
      );
      gradientBar.addColorStop(0, '#f00');
      gradientBar.addColorStop(1 / 6, '#ff0');
      gradientBar.addColorStop(2 / 6, '#0f0');
      gradientBar.addColorStop(3 / 6, '#0ff');
      gradientBar.addColorStop(4 / 6, '#00f');
      gradientBar.addColorStop(5 / 6, '#f0f');
      gradientBar.addColorStop(1, '#f00');

      ctxBarAlpha.fillStyle = gradientBar;
      ctxBarAlpha.fillRect(0, 0, barWidth, barHeight);
    };

    const initBarAlpha = () => {
      if (ctxBarAlpha) {
        // 清空上一次的底色，避免重复画颜色重合
        ctxBarAlpha.clearRect(0, 0, barAlphaWidth, barAlphaHeight);
      }

      let gradientBar = ctxBarAlpha.createLinearGradient(
        0,
        0,
        barAlphaPots.xEnd,
        barAlphaPots.yEnd,
      );

      gradientBar.addColorStop(0, `hsl(${hue}, 100%, 50%, 0)`);
      gradientBar.addColorStop(1, `hsl(${hue}, 100%, 50%, 1)`);

      ctxBarAlpha.fillStyle = gradientBar;
      ctxBarAlpha.fillRect(0, 0, barAlphaWidth, barAlphaHeight);
    };

    const clickSquare = (e: any) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: e.clientY - panelTop,
      };

      if (
        pos.x >= 0 &&
        pos.x < squareWidth &&
        pos.y >= 0 &&
        pos.y < squareHeight
      ) {
        // 更改鼠标点击位置
        squarePointX.value = pos.x;
        squarePointY.value = pos.y;

        let { h, s, l } = getPointHsl(ctxSquare, pos);

        outputColor({ h, s, l });
      }
    };

    const mouseDownSquare = (e: any) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: e.clientY - panelTop,
      };

      if (
        pos.x >= 0 &&
        pos.x < squareWidth &&
        pos.y >= 0 &&
        pos.y < squareHeight
      ) {
        document.onmousemove = function (e: any) {
          let pos = {
            x: e.clientX - panelLeft,
            y: e.clientY - panelTop,
          };

          pos.x =
            pos.x < 0 ? 0 : pos.x > squareWidth - 1 ? squareWidth - 1 : pos.x;

          pos.y = pos.y < 0 ? 0 : pos.y > squareHeight ? squareHeight : pos.y;

          // 更改鼠标点击位置
          squarePointX.value = pos.x;
          squarePointY.value = pos.y;

          let { h, s, l } = getPointHsl(ctxSquare, pos);

          outputColor({ h, s, l });
        };
      }

      document.onmouseup = function (e: any) {
        document.onmouseup = document.onmousemove = null;
      };
    };

    const clickBar = (e: any) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop,
      };

      if (pos.x >= 0 && pos.x < barWidth && pos.y >= 0 && pos.y < barHeight) {
        pos.y = pos.y < 0 ? 0 : pos.y > barHeight - 1 ? barHeight - 1 : pos.y;

        // 更改鼠标点击位置
        barHandlerTop.value = pos.y;

        // 获取 bar 的颜色值
        let { h, s, l } = getPointHsl(ctxBar, pos);

        inputValue.value = `hsl(${h}, 100%, 50%)`;

        outputColor({ h, s, l });

        initSquare();

        if (format.value !== 'hex') {
          hue = h;

          initBarAlpha();
        }

        // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
        let {
          h: lastH,
          s: lastS,
          l: lastL,
        } = getPointHsl(ctxSquare, {
          x: squarePointX.value,
          y: squarePointY.value,
        });

        previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${
          lastL * 100
        }%, ${alpha})`;
      }
    };

    const mouseDownBar = (e: any) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop,
      };

      if (pos.x >= 0 && pos.x < barWidth && pos.y >= 0 && pos.y < barHeight) {
        document.onmousemove = function (e: any) {
          let pos = {
            x: 0,
            y: e.clientY - panelTop,
          };

          pos.y = pos.y < 0 ? 0 : pos.y > barHeight - 1 ? barHeight - 1 : pos.y;

          // 更改鼠标点击位置
          barHandlerTop.value = pos.y;

          // 获取 bar 的颜色值
          let { h, s, l } = getPointHsl(ctxBar, pos);

          inputValue.value = `hsl(${h}, 100%, 50%)`;

          outputColor({ h, s, l });

          initSquare();

          if (format.value !== 'hex') {
            hue = h;

            initBarAlpha();
          }

          // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
          let {
            h: lastH,
            s: lastS,
            l: lastL,
          } = getPointHsl(ctxSquare, {
            x: squarePointX.value,
            y: squarePointY.value,
          });

          previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${
            lastL * 100
          }%, ${alpha})`;
        };
      }

      document.onmouseup = function (e: any) {
        document.onmouseup = document.onmousemove = null;
      };
    };

    const mouseDownBarHandler = (e: any) => {
      let pos = {
        x: 0,
        y: e.clientY - panelTop,
      };

      if (pos.x >= 0 && pos.x < barWidth && pos.y >= 0 && pos.y < barHeight) {
        document.onmousemove = function (e: any) {
          let pos = {
            x: 0,
            y: e.clientY - panelTop,
          };

          pos.y = pos.y < 0 ? 0 : pos.y > barHeight - 1 ? barHeight - 1 : pos.y;

          // 更改鼠标点击位置
          barHandlerTop.value = pos.y;

          let { h, s, l } = getPointHsl(ctxBar, pos);

          inputValue.value = `hsl(${h}, 100%, 50%)`;

          initSquare();

          outputColor({ h, s, l });

          if (format.value !== 'hex') {
            hue = h;

            initBarAlpha();
          }

          // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
          let {
            h: lastH,
            s: lastS,
            l: lastL,
          } = getPointHsl(ctxSquare, {
            x: squarePointX.value,
            y: squarePointY.value,
          });

          previewColor.value = `hsl(${lastH}, ${lastS * 100}%, ${
            lastL * 100
          }%, ${alpha})`;
        };
      }

      document.onmouseup = function (e: any) {
        document.onmouseup = document.onmousemove = null;
      };
    };

    const clickBarAlpha = (e: any) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0,
      };

      if (
        pos.x >= 0 &&
        pos.x < barAlphaWidth &&
        pos.y >= 0 &&
        pos.y < barAlphaHeight
      ) {
        pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

        // 更改鼠标点击位置
        barAlphaHandlerLeft.value = pos.x;

        // 计算透明度
        alpha = parseFloat((pos.x / barAlphaWidth).toFixed(2));

        // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
        let { h, s, l } = getPointHsl(ctxSquare, {
          x: squarePointX.value,
          y: squarePointY.value,
        });

        outputColor({ h, s, l });
      }
    };

    const mouseDownBarAlpha = (e: any) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0,
      };

      pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

      if (
        pos.x >= 0 &&
        pos.x <= barAlphaWidth &&
        pos.y >= 0 &&
        pos.y <= barAlphaHeight
      ) {
        document.onmousemove = function (e: any) {
          let pos = {
            x: e.clientX - panelLeft,
            y: 0,
          };

          pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

          if (
            pos.x >= 0 &&
            pos.x <= barAlphaWidth &&
            pos.y >= 0 &&
            pos.y <= barAlphaHeight
          ) {
            pos.x =
              pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

            // 更改鼠标点击位置
            barAlphaHandlerLeft.value = pos.x;

            // 计算透明度
            alpha = parseFloat((pos.x / barAlphaWidth).toFixed(2));

            // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
            let { h, s, l } = getPointHsl(ctxSquare, {
              x: squarePointX.value,
              y: squarePointY.value,
            });

            outputColor({ h, s, l });
          }
        };
      }

      document.onmouseup = function (e: any) {
        document.onmouseup = document.onmousemove = null;
      };
    };

    const mouseDownBarAlphaHandler = (e: any) => {
      let pos = {
        x: e.clientX - panelLeft,
        y: 0,
      };

      pos.x = pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

      if (
        pos.x >= 0 &&
        pos.x <= barAlphaWidth &&
        pos.y >= 0 &&
        pos.y <= barAlphaHeight
      ) {
        document.onmousemove = function (e: any) {
          let pos = {
            x: e.clientX - panelLeft,
            y: 0,
          };

          if (
            pos.x >= 0 &&
            pos.x <= barAlphaWidth &&
            pos.y >= 0 &&
            pos.y <= barAlphaHeight
          ) {

            pos.x =
              pos.x < 0 ? 0 : pos.x > barAlphaWidth ? barAlphaWidth : pos.x;

            // 更改鼠标点击位置
            barAlphaHandlerLeft.value = pos.x;

            // 计算透明度
            alpha = parseFloat((pos.x / barAlphaWidth).toFixed(2));

            // 传入的 squarePoint 参数，记录的是左后一次 square 点击的位置参数
            let { h, s, l } = getPointHsl(ctxSquare, {
              x: squarePointX.value,
              y: squarePointY.value,
            });

            outputColor({ h, s, l });
          }
        };
      }

      document.onmouseup = function (e: any) {
        document.onmouseup = document.onmousemove = null;
      };
    };

    const getPosTop = (hue: number) => {
      return Math.round(
        (hue *
          (refSquare.value.offsetHeight -
            refBarHandler.value.offsetHeight / 2)) /
          360,
      );
    };

    const getPointHsl = (ctx: CanvasRenderingContext2D, pos: Pos) => {
      let imgData = ctx.getImageData(pos.x, pos.y, 1, 1);

      let { h, s, l } = tinycolor2({
        r: imgData.data[0],
        g: imgData.data[1],
        b: imgData.data[2],
      }).toHsl();

      return { h, s, l };
    };

    // 用户输入值改变
    const changeInput = () => {
      if (!inputValue) return;

      let { h, s, l } = toHsl();

      // 更新 square 色板的颜色
      initSquare();

      if (format.value !== 'hex') {
        hue = h;

        initBarAlpha();
      }

      // 更新预览格子的颜色
      previewColor.value = `hsl(${h}, ${s * 100}%, ${l * 100}%, ${alpha})`;

      // 移动 handler 位置
      setHandlers();
    };

    const outputColor = (hsl: Hsl) => {
      if (inputValue.value === '') return;

      let exchangedValue: string = exchangeFormat(hsl);

      inputValue.value = exchangedValue;

      previewColor.value = `hsl(${hsl.h}, ${hsl.s * 100}%, ${
        hsl.l * 100
      }%, ${alpha})`;
    };

    interface Hsl {
      h: number;
      s: number;
      l: number;
    }

    /**
     * 将 rgb 颜色转换为其他格式颜色
     *
     * @param hsl
     */
    const exchangeFormat = (origin: any) => {
      let tinyColor = tinycolor2(origin);

      tinyColor.setAlpha(alpha);

      let exchanged: string = '';

      switch (format.value) {
        case 'hex':
          exchanged = tinyColor.toHex();
          break;

        case 'rgb':
          exchanged = tinyColor.toRgbString();
          break;

        case 'rgba':
          exchanged = tinyColor.toRgbString();
          break;

        case 'hsl':
          exchanged = tinyColor.toHslString();
          break;

        case 'hsla':
          exchanged = tinyColor.toHslString();
          break;
      }

      return exchanged;
    };

    const toHsl = () => {
      const tinyColor = tinycolor2(inputValue.value);

      alpha = tinyColor.getAlpha();

      return tinyColor.toHsl();
    };

    // 设置颜色选择板点击个颜色位置的 handler
    const setHandlers = () => {
      // - 移动 point 位置
      let { h, s, v } = tinycolor2(inputValue.value).toHsv();

      let posY = getPosTop(h);

      barHandlerTop.value = posY;

      barAlphaHandlerLeft.value = alpha * barAlphaWidth;

      let saturation = Math.max(0, Math.min(100, s));
      let value = Math.max(0, Math.min(100, v));

      squarePointX.value = saturation * (squareWidth - 1);
      squarePointY.value = (1 - value) * squareHeight;
    };

    const changeFormat = () => {
      if (!inputValue) return;

      inputValue.value = exchangeFormat(inputValue.value);

      let { h, s, l, a } = toHsl();

      if (format.value !== 'hex') {
        hue = h;

        generateBarAlpha();
      } else {
        alpha = a;

        previewColor.value = `hsl(${h}, ${s * 100}%, ${l * 100}%, ${alpha})`;

        barAlphaHandlerLeft.value = alpha * barAlphaWidth;
      }
    };

    const generateBarAlpha = () => {
      ctxBarAlpha = refBarAlpha.value.getContext(
        '2d',
      ) as unknown as CanvasRenderingContext2D;

      initBarAlpha();
    };

    const ok = () => {
      colorBefore = inputValue.value;

      emit('update:modelValue', inputValue.value);
    };

    const cancel = () => {
      if (isShow.value) {
        let { h, s, l, a } = tinycolor2(colorBefore).toHsl();

        alpha = a;

        outputColor({ h, s, l });

        hide();

      }
    };

    const hide = () => {
      isShow.value = false;

      // 归零画板的偏移距离，否则二次打开会出现偏移错误
      colorPickerLeft.value = 0;
      colorPickerTop.value = 0;
    };

    /**
     * 选择预定义的颜色
     * @param preset 选中的颜色
     *
     */
    const choosePreset = (preset: any) => {
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
  },
});
</script>

<style lang="less" scope>
// @import url('@/assets/styles/public/public.less');

.slim-color-picker {
  position: relative;

  .slim-color-picker_handler {
    background: url('/image/static/color_picker_alpha.png') repeat;
    outline: #dddddd solid 1px;
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: pointer;
  }

  .slim-color-picker_panel {
    position: absolute;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border: solid 1px rgb(228, 231, 237);
    border-radius: 2px;
    background: #ffffff;
    z-index: 10000000000;
    line-height: 0px;

    .slim-color-picker_panel_main {
      position: relative;
      display: flex;

      .panel_main_square {
        .main_square_canvas {
          position: relative;
        }
        .main_square_point {
          width: 4px;
          height: 4px;
          outline: 2px solid #ffffff;
          border-radius: 50px;
          margin-left: -1px;
          margin-top: -1px;
          position: absolute;
          left: 280px;
          top: 0px;
          box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px #0000004d,
            0 0 1px 2px #0006;
          transform: translate(-2px, -2px);
        }
      }

      .panel_main_bar {
        margin-left: 10px;
        position: relative;

        .main_bar_handler {
          position: absolute;
          cursor: pointer;
          box-sizing: border-box;
          left: -1px;
          top: 0;
          width: 14px;
          height: 4px;
          border-radius: 1px;
          background: #fff;
          border: 1px solid #f0f0f0;
          box-shadow: 0 0 2px #0009;
          z-index: 1;

          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
    .slim-color-picker_panel_alpha {
      margin-top: 10px;
      width: calc(100% - 22px);
      position: relative;
      background: url('/image/static/color_picker_alpha.png') repeat-x;

      .panel_alpha_handler {
        position: absolute;
        cursor: pointer;
        box-sizing: border-box;
        left: 280px;
        top: -1px;
        width: 4px;
        height: 14px;
        border-radius: 1px;
        background: #fff;
        border: 1px solid #f0f0f0;
        box-shadow: 0 0 2px #0009;
        z-index: 1;

        &:hover {
          transform: scale(1.3);
        }
      }
    }

    .slim-color-picker_panel_form {
      margin-top: 10px;
      display: flex;
      align-items: center;
      height: 30px;
      max-width: 100%;

      .panel_form_preview {
        width: 30px;
        height: inherit;
        border: solid 1px #dddddd;
      }

      .panel_form_input {
        height: 100%;
        flex-grow: 1;
        border: solid 1px #dddddd;
        display: flex;
        align-items: center;
        font-size: 14px;

        .form_input_format {
          padding-left: 6px;
          padding-right: 6px;
          .input_format_select {
            font-weight: 500;
            height: 30px;
            background: transparent;
            font-size: 14px;
            border: none;
            cursor: pointer;
            outline: none;
          }
        }

        .form_input_symbol {
          padding: 0px 0px 0px 6px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .form_input_input {
          background: transparent;
          color: #000000;
          width: 100%;
          height: 27px;
          margin-left: 2px;
          display: flex;
          align-items: center;
          padding-bottom: 1px;
          border: none;
          outline: none;
        }
      }

      .panel_form_confirm {
        .form_confirm_btn {
          padding-left: 12px;
          font-weight: 600;
          border: none;
          height: 30px;
          background: transparent;
          cursor: pointer;

          &:hover {
            color: rgba(0, 0, 0, 0.7);
            transform: scale(1.2);
          }

          &:active {
            color: #000000;
          }
        }
      }
    }

    .slim-color-picker_panel_preset {
      display: grid;
      grid-template-columns: repeat(auto-fill, 22px);
      grid-column-gap: 6px;
      grid-row-gap: 6px;
      margin-top: 10px;
      .panel_preset_item {
        background: url('/image/static/color_picker_alpha.png') repeat;
        outline: #dddddd solid 1px;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
        }

        .preset_item_inner {
          height: 22px;
        }
      }
    }

    &.dark {
      background: #1a1a1a;

      .panel_form_preview {
        border: solid 1px rgba(255, 255, 255, 0.3);
      }

      .panel_form_input {
        border: solid 1px rgba(255, 255, 255, 0.3);
        color: #ffffff;

        .form_input_input {
          color: #ffffff;
          letter-spacing: 1px;
        }

        .input_format_select {
          color: #ffffff;
          margin: -2px;

          option {
            color: #1a1a1a;
          }
        }
      }

      .form_confirm_btn {
        color: #ffffff;
        &:hover {
          color: rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }

        &:active {
          color: #ffffff;
        }
      }
    }

    .panel_preset_item {
      outline: rgba(255, 255, 255, 0.3) solid 1px;
    }
  }
}
</style>
