<template>
  <div class="c8">
    <button @click="showDialog1 = true">题库选题-收藏</button>
    <button @click="showDialog2 = true">样本资源-来源</button>
    <topic-fav v-model="showDialog1" :data="data" :treeProps="treeProps"></topic-fav>
    <topic-fav v-model="showDialog2" title="来源" :data="data" :treeProps="treeProps"></topic-fav>
  </div>
</template>

<script>
import TopicFav from '@/components/TopicFav.vue';

export default {
  name: 'C8',
  components: {
    TopicFav
  },
  data() {
    let id = 1000;
    return {
      showDialog1: true,
      showDialog2: false,
      data: [
        {
          id: id++,
          label: '默认收藏夹'
        },
        {
          id: id++,
          label: '一级 1',
          children: [
            {
              id: id++,
              label: '二级 1-1',
              children: [
                {
                  id: id++,
                  label: '三级 1-1-1'
                },
                {
                  id: id++,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: id++,
          label: '一级 2',
          children: [
            {
              id: id++,
              label: '二级 2-1'
            },
            {
              id: id++,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: id++,
          label: '一级 3',
          children: [
            {
              id: id++,
              label: '二级 3-1'
            },
            {
              id: id++,
              label: '二级 3-2'
            },
            {
              id: id++,
              label: '二级 3-3'
            },
            {
              id: id++,
              label: '二级 3-4'
            }
          ]
        }
      ],
      treeProps: {
        children: 'children',
        label: 'label'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.c8 {
  > button {
    margin-right: 12px;
  }
}
</style>
