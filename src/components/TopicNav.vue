<template>
  <draggable
    class="topic"
    v-model="topicList"
    v-bind="dragOptions"
    @end="topicDragEnd"
  >
    <div class="topic-item" v-for="(item, index) in topicList" :key="item.id">
      <div class="topic-title" @click="toggleNavDisplay(item)">
        {{ toChinesNum(index + 1) }}、{{ item.name }}
      </div>
      <el-collapse-transition>
        <draggable
          class="topic-nav"
          v-show="item.isActive"
          v-model="item.nodes"
          v-bind="dragOptions"
          @end="numberDragEnd"
        >
          <span
            class="nav-number"
            v-for="(item2, index2) in item.nodes"
            :key="item2.id"
          >
            {{ getIndex(index, index2) }}
          </span>
        </draggable>
      </el-collapse-transition>
    </div>
  </draggable>
</template>

<script>
// 拖拽组件
import Draggable from "vuedraggable";
export default {
  name: "TopicNav",
  components: {
    Draggable,
  },
  model: {
    prop: "list",
    event: "update:list",
  },
  props: {
    // 要传入的题目列表数据
    list: Array,
  },
  data() {
    return {
      topicList: this.list,
      dragOptions: {
        // 类名在拖动过程中添加
        dragClass: "dragging",
        // 动画时间
        animation: 150,
      },
    };
  },
  methods: {
    toggleNavDisplay(item) {
      item.isActive = !item.isActive;
    },
    // 题目拖动结束
    topicDragEnd(e) {
      this.$emit("update:list", this.topicList);
      this.$emit("topic-drag-end", e);
    },
    // 小题拖动结束
    numberDragEnd(e) {
      this.$emit("update:list", this.topicList);
      this.$emit("number-drag-end", e);
    },
    // 得到连续序号
    getIndex(parentIndex, childIndex) {
      let index = 1;
      for (let i = 0; i < parentIndex; i++) {
        index += this.topicList[i].nodes.length;
      }
      index += childIndex;
      return index;
    },
    // 数字转汉字（先这样写）
    toChinesNum(num) {
      return "零一二三四五六七八九".charAt(num);
    },
  },
};
</script>

<style scoped>
.collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}

.topic {
  width: 250px;
  user-select: none;
}

.topic-item {
  border: 1px dashed #c2c6ca;
  padding: 16px;
  margin-bottom: 20px;
}

.topic-title {
  padding-bottom: 16px;
}

.topic-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 14px;
}

.nav-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  background-color: white;
}

.nav-number:hover {
  background-color: rgba(45, 115, 245, 0.08);
}

.dragging {
  border: 1px dashed blue;
  cursor: move;
}
</style>
