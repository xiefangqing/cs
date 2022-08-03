<template>
  <div class="c4">
    <topic-card
      v-for="(item, index) in cardData"
      :key="item.id"
      :data="item"
      :idx="index + 1"
      :btns="['e','d','x','f', 's', 'a', 'b']"
      @open-similar="openSimilar"
      @open-basket="openBasket"
      @open-rewrite="openRewrite"
      @open-edit="openEdit"
      @remove="removeTopic"
      @delete="deleteTopic"
    ></topic-card>
  </div>
</template>

<script>
import TopicCard from '@/components/TopicCard.vue';

export default {
  name: 'C4',
  components: {
    TopicCard
  },
  data() {
    return {
      cardData: [
        {
          id: 111,
          fav: true,
          type: '填空题',
          difficulty: '一般',
          groupNum: 2,
          score: '90%',
          year: 2021,
          position: '温州',
          paperName: '鳌江期中考试',
          value: 8,
          shared: true,
          my_resources: true,
          answer: ['B'],
          hint: '解析',
          update_time: '2022-8-2',
          points: [
            { id: 1, name: '用科学计数法表示绝对值大于10的数' },
            { id: 2, name: '实际问题与一元二次方程' },
            { id: 3, name: '实数的混合运算' },
            { id: 4, name: '勾股定理的应用' }
          ]
        },
        {
          id: 222,
          fav: false,
          type: '解答题',
          score: '60%',
          difficulty: '难',
          groupNum: 8,
          year: 2008,
          position: '北京',
          paperName: '育秀期末考试',
          value: 3,
          shared: false,
          my_resources: true,
          update_time: '2022-7-28',
          answer: ['B', 'A'],
          hint: '解析',
          points: [
            { id: 1, name: '垂线的认识' },
            { id: 2, name: '全等三角形的性质' }
          ]
        }
      ]
    };
  },
  methods: {
    openSimilar(topic) {
      console.log('打开相似题', topic);
    },
    openBasket(topic) {
      console.log('打开试题篮', topic);
    },
    openRewrite(topic) {
      console.log('打开改编页面', topic);
    },
    removeTopic(topic) {
      console.log('将选中的试题移出当前试卷', topic);
    },
    deleteTopic(topic) {
      console.log('删除试题', topic);
    },
    openEdit(topic) {
      console.log('打开试题编辑页面', topic);
    }
  }
};
</script>
