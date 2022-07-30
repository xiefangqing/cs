<template>
  <div class="topic-search">
    <div class="btn-group">
      <button :class="{'active': isActive}">试题</button>
      <button>试卷</button>
    </div>
    <input class="search-input">
    <div class="search-addon"></div>
  </div>
</template>

<script>
export default {
  name: "TopicSearch",
  data() {
    return {
      isActive: true
    };
  },
};
</script>

<style scoped>
.topic-search {
  display: flex;
  width: 420px;
  height: 32px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  overflow: hidden;
}

.btn-group {
  height: 100%;
}

.btn-group > button {
  width: 60px;
  height: 100%;
  cursor: pointer;
  border: none;
  border-right: 1px solid #DCDFE6;
  background-color: #fff;
}

.btn-group > button.active {
  background: #E6F1FC;
  border: 1px solid #00A0E9;
  border-radius: 6px 0 0 6px;
}

.search-input {
  width: 0;  /* 为了让兄弟元素的width能够撑开 */
  flex: 1;
  border-color: transparent;
  padding: 4px;
  border: none;
}

.search-addon {
  width: 38px;
  background: #00A0E9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>