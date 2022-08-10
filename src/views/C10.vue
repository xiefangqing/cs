<template>
  <div class="c10">
    <condition-group v-bind="testProps"></condition-group>
  </div>
</template>

<script>
import ConditionGroup from '@/components/ConditionGroup.vue';

export default {
  name: 'C10',
  components: {
    ConditionGroup
  },
  data() {
    let key1 = 1000;
    let key2 = 2000;
    return {
      testProps: {
        // bodyStyle: { padding: '25px' }
        data: [
          {
            name: '来源',
            radio: key1,
            isTag: true,
            options: [
              { key: key1++, value: '全部' },
              { key: key1++, value: '平台题库' },
              { key: key1++, value: '校本题库' },
              { key: key1++, value: '个人题库' }
            ],
            options2: [
              { key: key1++, value: '王青老师' },
              { key: key1++, value: '开老师' },
              { key: key1++, value: '于环' }
            ]
          },
          {
            name: '题型',
            radio: key2,
            options: [
              { key: key2++, value: '全部' },
              { key: key2++, value: '单选题' },
              { key: key2++, value: '多选题' }
            ]
          }
        ]
      }
    };
  }
};
</script>
