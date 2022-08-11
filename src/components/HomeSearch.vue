<template>
  <div class="home-search">
    <el-radio-group v-model="searchRange">
      <el-radio-button label="试题"></el-radio-button>
      <el-radio-button label="试卷"></el-radio-button>
    </el-radio-group>
    <el-input
      v-model="searchVal"
      :placeholder="placeholderText"
      @keydown.native.enter="search"
    >
      <el-button @click="search" slot="append"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
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

<style lang="scss">
.home-search {
  display: flex;
  width: 420px;
  height: 32px;
  font-size: 14px;

  .el-radio-group {
    display: flex;
  }

  .el-radio-button {
    &__inner {
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e8e8e8;
      color: #666;
    }
    &:first-of-type .el-radio-button__inner {
      border-radius: 6px 0px 0px 6px;
    }
    &:last-of-type .el-radio-button__inner {
      border-radius: 0;
    }
  }

  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #00a0e9;
    background: #e6f1fc;
    border: 1px solid #00a0e9;
    box-shadow: none;
  }

  .el-input {
    height: 100%;

    &__inner {
      height: 100%;
      border-radius: 0;
      border: 1px solid #e8e8e8;
      border-left: none;
      padding: 0 12px;
      color: #333;
      &::placeholder {
        color: #999;
      }
    }

    &-group__append {
      border: 1px solid #e8e8e8;
      border-left: 0;
      background: #00a0e9 url('../assets/sousuo.png') no-repeat center;
      border-radius: 0 6px 6px 0;
      width: 38px;
      height: 32px;
      padding: 0;
      .el-button {
        height: 100%;
        padding: 10px 18px;
        margin: 0;
      }
    }
  }
}
</style>
