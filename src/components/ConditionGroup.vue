<template>
  <el-card
    :class="['condition-group', { plain }]"
    shadow="never"
    :body-style="bodyStyle"
  >
    <div class="group" v-for="group in data" :key="group.name">
      <span class="group-name">{{ group.name }}</span>
      <template v-if="group.isTag && group.name === '来源'">
        <el-button type="primary" icon="el-icon-plus" @click="addPoint"
          >添加</el-button
        >
        <el-tag
          v-for="tag in group.options"
          :key="tag.key"
          closable
          disable-transitions
          @close="closePoint(tag)"
        >
          <i class="el-icon-s-custom"></i>
          {{ tag.value }}
        </el-tag>
      </template>
      <template v-else-if="group.name === '更多'">
        <div class="select-box">
          <template v-for="item in group.options">
            <span>{{ item.name }}</span>
            <el-select v-model="item.selectVal" @change="handleRegionChange">
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </div>
      </template>
      <template v-else-if="group.name === '过滤'">
        <el-checkbox-group
          v-model="group.checkboxVal"
          @change="handleFilterChange"
        >
          <el-checkbox
            v-for="option in group.options"
            :key="option.key"
            :label="option.value"
          ></el-checkbox>
        </el-checkbox-group>
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
    // 朴素样式
    plain: {
      type: Boolean,
      default: false
    },
    // 条件数据
    data: Array
  },
  data() {
    return {};
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

  &.plain {
    .group {
      margin-left: 12px;
      &-name {
        color: #333;
        position: relative;
        &::before {
          content: '*';
          width: 8px;
          height: 20px;
          position: absolute;
          top: 0;
          left: -12px;
          color: #ff5353;
        }
      }
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #333;
    }
  }

  .group {
    margin-bottom: 16px;
    &-name {
      color: #666;
      margin-right: 40px;
    }
    &:last-of-type {
      margin-bottom: 0;
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

  &:not(.plain) .el-radio {
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
