<template>
  <div class="c5">
    <paper-card
      v-for="item in cardData"
      :key="item.id"
      :data="item"
      :btns="['t', 'c', 'e', 's', 'a', 'd', 'f']"
    ></paper-card>
  </div>
</template>

<script>
import PaperCard from '@/components/PaperCard.vue';

export default {
  name: 'C5',
  components: {
    PaperCard
  },
  data() {
    return {
      cardData: [
        {
          id: 111,
          grade: '七年级上',
          year: 2018,
          position: '平阳',
          type: '期中考试',
          topic_num: 30,
          update_time: '2022-8-2',
          paper_name: '全国统一大卷',
          level: '中等',
          download_num: 9284,
          my_resources: true,
          shared: true,
          fav: true,
          is_not_analysis: true
        },
        {
          id: 222,
          grade: '六年级下',
          year: 2018,
          position: '鳌江',
          type: '期末考试',
          topic_num: 45,
          update_time: '2022-7-2',
          paper_name: '平阳期末测试卷',
          level: '一般',
          download_num: 6666,
          my_resources: true,
          shared: false,
          fav: false,
          is_not_analysis: false
        }
      ]
    };
  }
};
</script>
