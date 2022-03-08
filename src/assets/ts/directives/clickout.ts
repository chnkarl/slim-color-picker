export default {
  // 指令: 绑定点击元素外部执行相应的回调事件
  // 例如：点击弹框外部，关闭弹框
  beforeMount(el, binding) {
    const callback = binding.value;
    const directiveClass = 'directive-clickout';

    // 创建点击事件
    el.clickEvent = function(event) {

      // 点击事件针对当前元素及其包含的子元素
      const elementIsActive = event.target === el || el.contains(event.target);
      
      // 如果当前元素或子元素被点击
      if ( elementIsActive ) {

        // 给元素的 class 加上一个标识 class：directive-clickout
        el.classList.add(directiveClass);
      } else {
        // 如果点击的不是当前元素或其子元素
        if ( el.classList.contains(directiveClass) ) {
          // 如果已经点击过当前元素或其子元素，就删除对应的标识
          el.classList.remove(directiveClass);
        }
        // 执行回调事件
        callback({el, event});
      }
    }

    // 挂载元素及其子元素的点击事件
    document.addEventListener('click', el.clickEvent);
  },

  unmounted(el) {
    // 卸载元素及其子元素的点击事件
    document.removeEventListener('click', el.clickEvent);
  }
}
