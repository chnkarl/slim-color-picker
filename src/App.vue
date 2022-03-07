<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SlimColorPicker from './components/SlimColorPicker.vue';
import { ref, reactive } from 'vue';

let color = ref<string>('#0066ff');
let color2 = ref<string>('#ff0000');
let color3 = ref<string>('rgba(0, 209, 2, 0.72)');
let color4 = ref<string>('rgba(132, 0, 209, 0.5)');

const presets = reactive([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
]);
</script>

<template>
  <div>
    <!-- 左上 -->
    <div style="position: relative; top: 50px; left: 200px">
      <SlimColorPicker :width="30" :height="30" v-model="color" />
    </div>

    <!-- 左下 -->
    <div style="position: relative; top: 610px; left: 200px">
      <SlimColorPicker
        :width="30"
        :height="30"
        initFormat="rgb"
        :presets="presets"
        v-model="color3"
      />
    </div>

    <!-- 右上 -->
    <div style="position: relative; top: 50px; left: 940px">
      <SlimColorPicker
        :width="30"
        :height="30"
        theme="dark"
        v-model="color2"
        :presets="presets"
      />
    </div>

    <!-- 右下 -->
    <div style="position: relative; top: 610px; left: 940px">
      <SlimColorPicker
        :width="30"
        :height="30"
        initFormat="hsl"
        theme="dark"
        v-model="color4"
        :presets="presets"
      />
    </div>
  </div>
</template>

<style></style>
