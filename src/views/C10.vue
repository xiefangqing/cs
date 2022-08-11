<template>
  <div class="c10">
    <condition-group
      v-bind="testProps"
      @condition-change="conditionChange"
    ></condition-group>
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
    let key3 = 3000;
    return {
      testProps: {
        // bodyStyle: { padding: '25px' },
        // plain: true,
        data: [
          {
            name: '来源',
            radio: key1,
            // isTag: true,
            // options: [
            //   { key: key1++, value: '全部' },
            //   { key: key1++, value: '平台题库' },
            //   { key: key1++, value: '校本题库' },
            //   { key: key1++, value: '个人题库' }
            // ],
            options: [
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
          },
          {
            name: '更多',
            options: [
              {
                name: '地区',
                selectVal: '全部',
                options: [
                  {
                    value: '选项1',
                    label: '黄金糕'
                  },
                  {
                    value: '选项2',
                    label: '双皮奶'
                  }
                ]
              },
              {
                name: '年份',
                selectVal: '全部',
                options: [
                  {
                    value: '选项1',
                    label: '黄金糕'
                  },
                  {
                    value: '选项2',
                    label: '双皮奶'
                  }
                ]
              }
            ]
          },
          {
            name: '过滤',
            radio: key3,
            checkboxVal: [],
            options: [
              { key: key3++, value: '我已组卷' },
              { key: key3++, value: '本年级已组卷' },
              { key: key3++, value: '我已布置作业' },
              { key: key3++, value: '本年级已布置作业' }
            ]
          }
        ]
      }
    };
  },
  methods: {
    conditionChange(val) {
      console.log(val);
    }
  }
};
</script>
