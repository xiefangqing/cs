<template>
  <div class="topic-search">
    <div class="btn-group">
      <button @click="switchTopic" :class="{ active: isActive }">试题</button>
      <button @click="switchPaper">试卷</button>
    </div>
    <input type="text" placeholder="请输入试题/知识点关键字" />
    <div class="icon"></div>
  </div>
</template>

<script>
export default {
  name: 'TopicSearch',
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    switchTopic() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-search {
  display: flex;
  width: 420px;
  height: 32px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;

  .btn-group > button {
    width: 60px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    cursor: pointer;

    &.active {
      background: #e6f1fc;
      border-radius: 6px 0px 0px 6px;
      border: 1px solid #00a0e9;
    }
  }

  > input {
    width: 0; /* 为了让兄弟元素的width能够撑开 */
    flex: 1;
    border-color: transparent;
    padding: 4px;
    border: none;
  }

  .icon {
    cursor: pointer;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00a0e9 url('../assets/sousuo.png') no-repeat center;
  }
}
</style>
