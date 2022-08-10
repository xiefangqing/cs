<template>
  <el-dialog
    title="知识点设置"
    custom-class="select-point"
    :visible.sync="innerVisible"
  >
    <div class="body-content">
      <div class="left">
        <div style="margin-bottom: 24px">
          <span class="title">
            已选择
            <span style="color: #00a0e9">{{ innerPoints.length }}</span>
            个知识点
          </span>
          <span class="extra">（限5个）</span>
        </div>
        <div class="point">
          <el-tag
            v-for="point in innerPoints"
            :key="point.id"
            closable
            disable-transitions
            @close="closeTag(point)"
            >{{ point.text }}</el-tag
          >
        </div>
      </div>
      <div class="right">
        <el-radio-group v-model="findMethod">
          <el-radio-button label="按知识点查找"></el-radio-button>
          <el-radio-button label="按章节查找"></el-radio-button>
        </el-radio-group>
        <el-input
          class="filter-input"
          v-model="filterText"
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          clearable
        ></el-input>
        <el-tree
          :data="data"
          :props="treeProps"
          node-key="id"
          show-checkbox
          default-expand-all
          highlight-current
          check-strictly
          :default-checked-keys="defaultCheckedKeys"
          :filter-node-method="filterNode"
          @check="limitSelectNumber"
          @check-change="checkChange"
          ref="tree"
          v-slot="{ node, data }"
        >
          <div>
            <i
              v-if="node.isLeaf"
              class="el-icon-folder-remove"
              style="margin-right: 8px"
            ></i>
            <span>{{ node.label }}</span>
          </div>
        </el-tree>
      </div>
    </div>
    <template #footer>
      <el-button @click="innerVisible = false">取消</el-button>
      <el-button type="primary" @click="setupPoint">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'SelectPoint',
  model: {
    prop: 'visible',
    event: 'dialog-visible'
  },
  props: {
    // 是否显示Dialog
    visible: {
      type: Boolean,
      default: false
    },
    // 已选择的知识点
    points: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      filterText: '',
      findMethod: '按知识点查找',
      data: [],
      treeProps: {
        children: 'children',
        label: 'label',
        disabled(data, node) {
          // 只能选最末级
          return !node.isLeaf;
        }
      },
      innerPoints: this.points
    };
  },
  computed: {
    innerVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('dialog-visible', val);
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    findMethod: {
      handler: 'getList',
      immediate: true
    }
  },
  methods: {
    // 获取知识点/章节列表
    getList() {
      this.filterText = '';
      if (this.findMethod === '按知识点查找') {
        this.data = [
          {
            id: 1,
            label: '知识点一级 1',
            children: [
              {
                id: 3,
                label: '二级 1-1',
                children: [
                  {
                    id: 111,
                    label: '用科学计数法表示绝对值大于10的数'
                  },
                  {
                    id: 222,
                    label: '实际问题'
                  }
                ]
              },
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 333,
                    label: '集合见的基本关系'
                  },
                  {
                    id: 666,
                    label: '实际问题'
                  },
                  {
                    id: 777,
                    label: '实际问题'
                  },
                  {
                    id: 888,
                    label: '实际问题'
                  }
                ]
              }
            ]
          }
        ];
      } else {
        this.data = [
          {
            id: 1,
            label: '章节一级 1',
            children: [
              {
                id: 3,
                label: '二级 1-1',
                children: [
                  {
                    id: 111,
                    label: '用科学计数法表示绝对值大于10的数'
                  },
                  {
                    id: 222,
                    label: '实际问题'
                  }
                ]
              },
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 333,
                    label: '集合见的基本关系'
                  },
                  {
                    id: 666,
                    label: '实际问题'
                  },
                  {
                    id: 777,
                    label: '实际问题'
                  },
                  {
                    id: 888,
                    label: '实际问题'
                  }
                ]
              }
            ]
          }
        ];
      }
      // 知识点默认选中
      const selectArr = this.innerPoints.map(p => p.id);
      this.defaultCheckedKeys = selectArr;
    },
    // 过滤文件夹
    filterNode(value, data) {
      if (!value) return true;
      return data.label.includes(value);
    },
    // 当复选框被点击的时候触发
    limitSelectNumber(data, status) {
      // 限制最多选择5个文件夹
      if (status.checkedKeys.length > 5) {
        this.$refs.tree.setCheckedKeys(
          status.checkedKeys.filter(t => t !== data.id)
        );
        this.$message({
          type: 'error',
          message: '最多只能选择5个知识点！'
        });
      }
    },
    // 关闭指定标签
    closeTag(point) {
      this.innerPoints = this.innerPoints.filter(p => p.id !== point.id);
      this.$refs.tree.setChecked(point.id, false);
    },
    // 选中状态变化触发
    checkChange(data, isSelect) {
      if (isSelect) {
        this.innerPoints.push({
          id: data.id,
          text: data.label
        });
      } else {
        this.closeTag(data);
      }
    },
    // 设置知识点
    setupPoint() {
      this.innerVisible = false;
      console.log('设置知识点！');
    }
  }
};
</script>

<style lang="scss">
.select-point {
  width: 920px;
  color: #333;
  font-size: 14px;
  border-radius: 6px;

  .el-dialog__header {
    padding: 16px 30px;
    border-bottom: 1px solid #eee;
    .el-dialog__title {
      color: #000;
      font-size: 16px;
    }
    .el-dialog__headerbtn {
      right: 30px;
      font-size: 14px;
      line-height: 0;
      .el-dialog__close {
        color: #333;
      }
    }
  }

  .el-dialog__body {
    padding: 20px 20px 24px;
    border-bottom: 1px solid #e8e8e8;
    .body-content {
      height: 551px;
      overflow: auto;
      border-radius: 6px 6px 0 0;
      border: 1px solid #cecece;
      display: flex;
      > div {
        flex: 1;
      }
      .left {
        padding: 24px 20px;
        border-right: 1px solid #cecece;
        .title {
          color: #333;
          font-weight: bold;
          margin-right: 15px;
        }
        .extra {
          color: #666;
          font-size: 12px;
        }
        .point {
          display: flex;
          flex-flow: wrap;
          gap: 16px 12px;
        }
        .el-tag {
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #cecece;
          background-color: #f8f8f8;
          color: #333;
          .el-tag__close {
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
      }
      .right {
        padding: 20px;
        .el-radio-group {
          width: 100%;
        }
        .el-radio-button {
          width: 50%;
          margin-bottom: 16px;
          &__inner {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #222;
            background-color: #fff;
          }
          &__orig-radio:checked + .el-radio-button__inner {
            color: #00a0e9;
            border-color: #00a0e9;
          }
        }
        .filter-input {
          margin-bottom: 6px;
          .el-input__inner {
            height: 32px;
            border-radius: 6px;
            border: 1px solid #cecece;
            padding-left: 38px;
          }
          .el-input__icon {
            width: calc(38px - 5px);
            line-height: 32px;
          }
        }

        .el-tree {
          height: calc(432px - 6px);
          border-radius: 6px;
          overflow: auto;
          color: #333;

          > .el-tree-node {
            border-bottom: 1px solid #e8e8e8;
          }

          &-node__content {
            height: 36px;
            > label.el-checkbox {
              margin-right: 16px;
            }
            > .el-tree-node__expand-icon {
              padding: 16px;
              margin-left: 8px;
            }
          }

          .el-checkbox__inner {
            width: 16px;
            height: 16px;
            &::after {
              width: 5px;
              height: 9px;
            }
          }

          &-node__expand-icon {
            color: #999;
            font-size: 14px;
            &.is-leaf {
              color: transparent;
              cursor: default;
            }
            &.expanded {
              transform: rotate(180deg);
            }
          }

          .el-icon-caret-right:before {
            content: '\e6e1';
          }

          &--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content {
            color: #00a0e9;
            background-color: #e6f6fd;
          }
        }
      }
    }
  }

  .el-dialog__footer {
    padding: 16px 20px;
    .el-button {
      width: 58px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
