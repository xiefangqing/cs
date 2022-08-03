<template>
  <div class="topic-search">
    <el-radio-group v-model="searchRange" text-color="#00a0e9" fill="#e6f1fc">
      <el-radio-button label="试题"></el-radio-button>
      <el-radio-button label="试卷"></el-radio-button>
    </el-radio-group>
    <el-input v-model="searchVal" :placeholder="placeholderText">
      <el-button
        @click="search"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'TopicSearch',
  data() {
    return {
      searchRange: '试题',
      searchVal: ''
    };
  },
  computed: {
    placeholderText() {
      return this.searchRange === '试题'
        ? '请输入试题/知识点关键字'
        : '请输入试卷名称';
    }
  },
  methods: {
    search() {
      this.$emit('search', {
        searchRange: this.searchRange,
        searchVal: this.searchVal
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-search {
  display: flex;
  width: 420px;
  height: 32px;
  font-size: 14px;

  ::v-deep() {
    .el-radio-group {
      display: flex;

      .el-radio-button {
        box-shadow: none !important;
      }

      .el-radio-button__inner {
        height: 100%;
        display: flex;
        align-items: center;
        border: 1px solid #e8e8e8;
        color: #666;
        border-radius: 0;
      }

      .el-radio-button.is-active .el-radio-button__inner {
        border: 1px solid #00a0e9 !important;
      }

      .el-radio-button:first-of-type .el-radio-button__inner {
        border-radius: 6px 0 0 6px;
      }
    }

    .el-input {
      height: 100%;

      &__inner {
        height: 100%;
        border: 1px solid #e8e8e8;
        border-radius: 0;
        border-left: 0;
      }

      .el-input-group__append {
        border: 1px solid #e8e8e8;
        border-left: 0;
        background: #00a0e9;
        color: white;
        border-radius: 0 6px 6px 0;

        > button {
          width: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
