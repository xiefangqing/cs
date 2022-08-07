<template>
  <div class="c1">
    <!-- <topic-nav :list.sync="list" /> -->
    <topic-nav
      v-model="list"
      @nav="nav"
      @node-drag-end="nodeDragEnd"
      @topic-drag-end="topicDragEnd"
    />
    <pre>{{ list }}</pre>
  </div>
</template>

<script>
import TopicNav from '@/components/TopicNav.vue';

export default {
  name: 'C1',
  components: {
    TopicNav
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    let id = 111;
    const data = [
      {
        name: '单选题',
        nodes: [{ id: id++ }, { id: id++ }, { id: id++ }]
      },
      {
        name: '填空题',
        nodes: [{ id: id++ }, { id: id++ }]
      }
    ];
    // 处理数据
    this.list = data.map(obj => ({
      ...obj,
      isActive: true
    }));
  },
  methods: {
    nav(node) {
      console.log('导航到：', node.id);
    },
    nodeDragEnd(e) {
      console.log('小题拖动结束：', e);
    },
    topicDragEnd(e) {
      console.log('题目拖动结束：', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.c1 {
  display: flex;

  pre {
    margin-left: 40px;
  }
}
</style>
