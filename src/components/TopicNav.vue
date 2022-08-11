<template>
  <draggable
    class="topic"
    v-model="topicList"
    v-bind="dragOptions"
    @end="topicDragEnd"
  >
    <div class="topic-item" v-for="(item, index) in topicList" :key="item.id">
      <div class="topic-title" @dblclick="editTitle(item)">
        {{ toChineseNumber(index + 1) }}、
        <span v-if="!item.isEdit">{{ item.name }}</span>
        <el-input
          v-else
          v-model="item.name"
          @blur="item.isEdit = false"
          @keydown.native.enter="item.isEdit = false"
          ref="inp"
        ></el-input>
      </div>
      <!-- <el-collapse-transition> -->
      <draggable
        class="topic-nav"
        v-show="item.isActive"
        v-model="item.nodes"
        v-bind="dragOptions"
        @end="nodeDragEnd"
      >
        <span
          class="nav-number"
          v-for="(item2, index2) in item.nodes"
          :key="item2.id"
          @click="handleNumClick(item2)"
        >
          {{ getIndex(index, index2) }}
        </span>
      </draggable>
      <!-- </el-collapse-transition> -->
    </div>
  </draggable>
</template>

<script>
// vuedraggable是用drag and drop实现拖放的，而不是鼠标事件，所以无法限制拖拽区域
import Draggable from 'vuedraggable';

export default {
  name: 'TopicNav',
  components: {
    Draggable
  },
  model: {
    prop: 'list',
    event: 'update:list'
  },
  props: {
    // 要传入的题目列表数据
    list: Array,
    default() {
      return [];
    }
  },
  data() {
    return {
      topicList: this.list,
      dragOptions: {
        // 类名在拖动过程中添加
        dragClass: 'topic-dragging',
        // 动画时间
        animation: 200,
        // 缓动函数
        easing: 'ease-in-out'
      }
    };
  },
  watch: {
    topicList(newVal) {
      this.$emit('update:list', newVal);
    }
  },
  methods: {
    // 编辑标题
    editTitle(item) {
      this.$set(item, 'isEdit', true);
      this.$nextTick(() => {
        this.$refs.inp[0].focus();
      });
    },
    // toggleNavDisplay(item) {
    //   item.isActive = !item.isActive;
    // },
    // 点击数字导航
    handleNumClick(item) {
      this.$emit('nav', item);
    },
    // 题目拖动结束
    topicDragEnd(e) {
      this.$emit('topic-drag-end', e);
    },
    // 小题拖动结束
    nodeDragEnd(e) {
      this.$emit('node-drag-end', e);
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
    // 数字转汉字（TODO: 移到公共）
    toChineseNumber(n) {
      if (!Number.isInteger(n) && n < 0) {
        throw Error('请输入自然数');
      }
      const digits = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九'
      ];
      const positions = [
        '',
        '十',
        '百',
        '千',
        '万',
        '十万',
        '百万',
        '千万',
        '亿',
        '十亿',
        '百亿',
        '千亿'
      ];
      const charArray = String(n).split('');
      let result = '';
      let prevIsZero = false;
      // 处理0
      for (let i = 0; i < charArray.length; i++) {
        const ch = charArray[i];
        if (ch !== '0' && !prevIsZero) {
          result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
        } else if (ch === '0') {
          prevIsZero = true;
        } else if (ch !== '0' && prevIsZero) {
          result +=
            '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
        }
      }
      // 处理十
      if (n < 100) {
        result = result.replace('一十', '十');
      }
      return result;
    }
  }
};
</script>

<style lang="scss">
$--title-color: #333;
$--number-color: #666;
$--number-border-color: #e8e8e8;
$--number-hover-color: rgba(45, 115, 245, 0.08);
$--topic-dragging-color: blue;

.topic {
  font-size: 14px;
  line-height: 20px;
  user-select: none;

  &-item {
    margin-bottom: 20px;
  }

  &-title {
    display: flex;
    color: $--title-color;
    padding-bottom: 16px;
    .el-input__inner {
      height: 32px;
    }
  }

  &-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 14px;
  }

  .nav-number {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    line-height: calc(32px - 1px * 2);
    text-align: center;
    color: $--number-color;
    border-radius: 4px;
    border: 1px solid $--number-border-color;
    cursor: pointer;

    &:hover {
      background-color: $--number-hover-color;
    }
  }

  // 拖动中样式
  &-dragging {
    border: 1px dashed $--topic-dragging-color;
  }
}

// 展开收起过渡效果
// .collapse-transition {
//   transition: all 0.3s ease-in-out;
// }
</style>
