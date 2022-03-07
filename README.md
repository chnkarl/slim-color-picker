
![a color picker component for Vue3](https://github.com/chnkarl/slim-color-picker/blob/main/public/image/readme/focus.png?raw=true)


# slim-color-picker
a color picker component for Vue3 


# Install
```
npm i slim-color-picker
```

```
yarn add slim-color-picker
```

# Usage

```
<template>

  <SlimColorPicker 
    :width="30"
    :height="30"
    theme="light"
    initFormat="hex"
    okText="ok"
    :radius="4"
    :presets="presets"
    v-model="color"
    @change="onChange" 
  />

</template>

<script lang="ts">

import { defineComponent, ref, reactive } from 'vue';

import SlimColorPicker from 'slim-color-picker'
import 'slim_color_picker/dist/style.css'

export default defineComponent({
  components: { SlimColorPicker },
  setup(props, { attrs, slots, emit, expose }) {

    let color = ref<string>('0066ff)');

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
      'hsla(209, 100%, 56%, 0.73)'
    ])

    watch(color, (newValue) => {
      console.log('color: ', newValue);
    });

    const onChange = (value) => {
      console.log('value: ', value);
    };

    return {
      color,
      changeColor,
      presets
    };
  },
});
</script>
```

# Property

Property|Require|Type|Default|Description
:--|:--:|:--:|:--:|:--
v-model|true|string|-|confirmed color value
width|false|number|30|trigger handler width
height|false|number|39|trigger handler height
theme|false|string|light| light | dark
initFormat|false|string|hex| hex | rgb | hsl
okText|false|string|OK| confirm btn text
radius|false|number|0| trigger handler border-radius
presets|false|array|[]| preset colors for choose


# Event

Property|Description|Arguments
:--|:--:|:-
change|callback when click color panel & bar |function(e)

# Thanks
Thank you [tinycolor2](https://github.com/clearbladeplatform/tinycolor2) for the color format conversion component that makes our development more efficient.