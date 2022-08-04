<template>
  <div class="c6">
    <t-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
    ></t-cascader>
  </div>
</template>

<script>
import TCascader from '@/components/TCascader.vue';

export default {
  name: 'C6',
  components: {
    TCascader
  },
  data() {
    return {
      value: [],
      options: [
        {
          value: 'xiaoxue',
          label: '小学',
          children: [
            { value: 'yuwen', label: '语文' },
            {
              value: 'shuxue',
              label: '长文本测试长文本测试长文本测试长文本测试'
            }
          ]
        },
        {
          value: 'chuzhong',
          label: '初中',
          children: [
            { value: 'yuwen', label: '语文' },
            { value: 'shuxue', label: '数学' },
            { value: 'wuli', label: '物理' },
            { value: 'huaxue', label: '化学' }
          ]
        },
        {
          value: 'gaozhong',
          label: '高中',
          children: [
            { value: 'yuwen', label: '语文' },
            { value: 'shuxue', label: '数学' },
            { value: 'yinyu', label: '历史' },
            { value: 'wuli', label: '物理' }
          ]
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
