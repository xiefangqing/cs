<template>
  <div class="c9">
    <button @click="showDialog = true">知识点弹窗</button>
    <select-point v-model="showDialog" :points="points"></select-point>
  </div>
</template>

<script>
import SelectPoint from '@/components/SelectPoint.vue';

export default {
  name: 'C9',
  components: {
    SelectPoint
  },
  data() {
    return {
      showDialog: true,
      points: [
        { id: 111, text: '用科学计数法表示绝对值大于10的数' },
        { id: 222, text: '实际问题' },
        { id: 333, text: '集合见的基本关系' }
      ]
    };
  }
};
</script>
