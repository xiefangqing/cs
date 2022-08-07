<template>
  <el-cascader
    v-bind="$attrs"
    v-on="$listeners"
    class="t-cascader"
    popper-class="t-cascader-pop"
  >
    <slot></slot>
  </el-cascader>
</template>

<script>
// 样式重置
export default {
  name: 'TopicCascader'
};
</script>

<style lang="scss">
$mainColor: #333;
$iconColor: #999;
$activeColor: #00a0e9;
$activeBgColor: #e6f6fd;
$borderColor: #e8e8e8;
$shadowColor: #cecece;

.t-cascader {
  width: 324px;
  &,
  .el-input__inner,
  .el-input__icon {
    height: 32px;
    line-height: 32px;
  }
  .el-input__inner {
    color: $mainColor;
    padding-left: 12px;
    border-radius: 6px;
    border-color: $borderColor;
  }
  &:not(.is-disabled):hover .el-input__inner {
    border-color: $borderColor;
  }
  .el-input.is-focus .el-input__inner {
    border-color: $activeColor;
  }
  .el-icon-arrow-down:before {
    content: '\e790';
  }
  .el-input__suffix {
    color: $iconColor;
  }
}

.t-cascader-pop {
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 0px 6px 1px $shadowColor;
  margin-top: 6px !important;
  .el-cascader-menu {
    color: $mainColor;
    min-width: 162px;
    max-width: 162px;
    border-color: $borderColor;
    &__wrap {
      height: calc(236px + 17px);
    }
  }
  .el-cascader-node {
    padding: 0 20px;
    height: 32px;
    line-height: 32px;
    &__label {
      padding: 0;
    }
    &__postfix {
      color: $iconColor;
    }
  }
  .el-cascader-node:not(.is-disabled),
  .el-cascader-node:not(.is-disabled) {
    &:hover,
    &:focus {
      color: $activeColor;
      background: $activeBgColor;
    }
  }
  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    color: $activeColor;
    font-weight: normal;
    background: $activeBgColor;
  }
  .popper__arrow,
  .el-cascader-node__prefix {
    display: none;
  }
}
</style>
