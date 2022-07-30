<template>
  <div class="c1">
    <TopicNav v-model="listFilter" />
    <pre>{{ listFilter }}</pre>
  </div>
</template>

<script>
import TopicNav from "@/components/TopicNav.vue";

export default {
  name: "c1",
  components: {
    TopicNav,
  },
  data() {
    let id = 111;
    return {
      // /ark/ocean/api/get_paper
      list: [
        {
          name: "单选题",
          nodes: [{ id: id++ }, { id: id++ }, { id: id++ }],
        },
        {
          name: "填空题",
          nodes: [{ id: id++ }, { id: id++ }],
        },
      ],
    };
  },
  computed: {
    listFilter: {
      set(newVal) {
        console.log("拖拽后的数据：", newVal);
        this.list = newVal;
      },
      get() {
        return this.list.map((v, i) => ({
          ...v,
          isActive: true,
        }));
      },
    },
  },
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