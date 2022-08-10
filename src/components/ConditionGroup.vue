<template>
  <el-card class="condition-group" shadow="never" :body-style="bodyStyle">
    <div class="group" v-for="group in data" :key="group.name">
      <span class="group-name">{{ group.name }}</span>
      <template v-if="group.isTag">
        <el-button type="primary" icon="el-icon-plus" @click="addPoint"
          >添加</el-button
        >
        <el-tag
          v-for="tag in group.options2"
          :key="tag.key"
          closable
          disable-transitions
          @close="closePoint(tag)"
        >
          <i class="el-icon-s-custom"></i>
          {{ tag.value }}
        </el-tag>
      </template>
      <el-radio-group v-else v-model="group.radio" @change="handleRadioChange">
        <el-radio
          v-for="option in group.options"
          :key="option.key"
          :label="option.key"
          >{{ option.value }}</el-radio
        >
      </el-radio-group>
    </div>
    <div class="group">
      <span class="group-name">更多</span>
      <div class="select-box">
        <span>地区</span>
        <el-select v-model="regionVal" @change="handleRegionChange">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>年份</span>
        <el-select v-model="yearVal" @change="handleYearChange">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="group">
      <span class="group-name">过滤</span>
      <el-checkbox-group v-model="filterList" @change="handleFilterChange">
        <el-checkbox label="我已组卷"></el-checkbox>
        <el-checkbox label="本年级已组卷"></el-checkbox>
        <el-checkbox label="我已布置作业"></el-checkbox>
        <el-checkbox label="本年级已布置作业"></el-checkbox>
      </el-checkbox-group>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ConditionGroup',
  props: {
    // 设置 el-card__body 的样式
    bodyStyle: {
      type: Object,
      default() {
        return {
          padding: '20px 24px'
        };
      }
    },
    // 条件数据
    data: Array,
    // 显示更多
    showMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // radio1: 0,
      // radio2: 0
      options1: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      regionVal: '全部',
      yearVal: '全部',
      filterList: []
    };
  },
  methods: {
    handleRadioChange(val) {
      console.log(val);
    },
    handleRegionChange(val) {
      console.log(val);
    },
    handleYearChange(val) {
      console.log(val);
    },
    handleFilterChange(val) {
      console.log(val);
    },
    addPoint() {
      console.log('弹出知识点弹窗！');
    },
    closePoint(tag) {
      console.log('移除：', tag.value);
    }
  }
};
</script>

<style lang="scss">
.condition-group {
  color: #333;
  font-size: 14px;
  border-radius: 4px;
  .group {
    margin-bottom: 16px;
    &-name {
      color: #666;
      margin-right: 40px;
    }
    &:last-of-type {
      margin: 0;
    }
  }
  .el-button,
  .el-tag {
    margin-right: 12px;
  }
  .el-button {
    height: 32px;
    padding: 6px 16px;
    &--primary {
      background: #00a0e9;
      border: none;
    }
    & [class*='el-icon-'] + span {
      margin-left: 8px;
    }
  }

  .el-tag {
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #cecece;
    background-color: #f8f8f8;
    color: #333;
    font-size: 14px;
    .el-icon-s-custom {
      color: #999;
      margin-right: 8px;
    }
    .el-icon-close {
      position: static;
      width: 10px;
      height: 10px;
      line-height: 10px;
      color: #999;
      margin-left: 8px;
      &:hover {
        color: #000;
        background-color: transparent;
      }
    }
  }

  .el-radio {
    color: #333;
    padding: 6px 10px;
    margin-right: 12px;
    &.is-checked {
      height: 32px;
      line-height: calc(32px - 2 * 6px);
      text-align: center;
      background: #00a0e9;
      border-radius: 4px;
      .el-radio__label {
        color: white;
      }
    }
    &__input {
      display: none;
    }
    &__label {
      padding: 0;
    }
  }
  .select-box {
    display: inline-block;
    > span {
      margin-right: 8px;
    }
    .el-select {
      margin-right: 24px;
      width: 120px;
      &,
      .el-input__inner,
      .el-input__icon {
        height: 32px;
        line-height: 32px;
      }
      .el-input__inner {
        color: #333;
        padding-left: 15px;
        border-radius: 6px;
        border-color: #e8e8e8;
      }
      .el-input.is-focus .el-input__inner {
        border-color: #00a0e9;
      }
      .el-icon-arrow-up:before {
        content: '\e78f';
      }
      &__caret {
        color: #999;
      }
    }
  }
  .el-checkbox-group {
    display: inline-block;
    .el-checkbox {
      color: #333;
      margin-right: 24px;
      &__label {
        padding-left: 8px;
      }
    }
  }
}
</style>
