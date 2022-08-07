<template>
  <div class="c6">
    <topic-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
    ></topic-cascader>
  </div>
</template>

<script>
import TopicCascader from '@/components/TopicCascader.vue';

export default {
  name: 'C6',
  components: {
    TopicCascader
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
