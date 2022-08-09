<template>
  <el-dialog custom-class="topic-fav" :visible.sync="innerVisible">
    <template #title>
      <span class="title">{{ title }}</span>
      <span class="extra" v-if="isFav">（最多选择10个文件夹）</span>
    </template>

    <div>
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
        :draggable="isFav"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @check="limitSelectNumber"
        :default-checked-keys="[1000]"
        ref="tree"
        v-slot="{ node, data }"
      >
        <div class="tree-node">
          <div class="label">
            <i class="el-icon-folder-opened"></i>
            <div v-if="!data.isEdit">{{ node.label }}</div>
            <el-input
              v-else
              v-model.trim="data.label"
              @change="data.isEdit = false"
              @blur="data.isEdit = false"
              ref="editInput"
            ></el-input>
          </div>
          <div class="icon-group" v-if="isFav">
            <i class="el-icon-rank"></i>
            <i class="el-icon-edit" :class="{ active: data.isEdit }" @click="edit(data)"></i>
            <i class="el-icon-circle-plus-outline" @click="append(data)"></i>
            <i class="el-icon-remove-outline" @click="remove(node, data)"></i>
          </div>
        </div>
      </el-tree>
    </div>

    <template #footer>
      <div :style="justifyContent">
        <el-button
          style="width: 124px"
          v-if="isFav"
          type="primary"
          icon="el-icon-plus"
          @click="newFolder"
          >新建文件夹</el-button
        >
        <div class="control">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'TopicFav',
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
    // 标题
    title: {
      type: String,
      default: '收藏'
    },
    // 对应el-tree的data
    data: {
      type: Array,
      require: true
    },
    // 对应el-tree的props
    treeProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
          // disabled(data, node) {
          //   return data.label === '默认收藏夹';
          // }
        };
      }
    }
  },
  data() {
    return {
      filterText: ''
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
    },
    isFav() {
      return this.title === '收藏';
    },
    justifyContent() {
      return {
        display: 'flex',
        justifyContent: this.isFav ? 'space-between' : 'flex-end'
      };
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 过滤文件夹
    filterNode(value, data) {
      if (!value) return true;
      return data.label.includes(value);
    },
    // 增加子文件夹
    append(data) {
      if (data.label === '默认收藏夹') return;
      console.log('增加子文件夹！');
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    // 增加顶级文件夹
    newFolder() {
      console.log('增加顶级文件夹！');
      // this.data.push({
      //   id: id++,
      //   label: 'newnew'
      // });
    },
    // 删除文件夹
    remove(node, data) {
      if (data.label === '默认收藏夹') return;
      this.$confirm(
        `确认要删除“${data.label}”${node.isLeaf ? '' : '及其子文件夹'}吗？`,
        '删除确认',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          // 注意：包含知识点、试题的文件夹不允许删除
          console.log('删除文件夹！');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // this.$message({
          //   type: 'error',
          //   message: '删除失败！该文件夹下已有试题！'
          // });
        })
        .catch(() => {});
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    // 编辑文件夹名称
    edit(data) {
      if (data.label === '默认收藏夹') return;
      this.$set(data, 'isEdit', true);
      this.$nextTick(() => {
        this.$refs.editInput.focus();
        // this.$refs.editInput.select();
        console.log('更新文件夹名称！');
      });
    },
    // 当复选框被点击的时候触发
    limitSelectNumber(data, status) {
      // 限制最多选择10个文件夹
      if (status.checkedKeys.length > 10) {
        this.$refs.tree.setCheckedKeys(status.checkedKeys.filter(t => t !== data.id));
        this.$message({
          type: 'error',
          message: '最多只能选择10个文件夹！'
        });
      }
    },
    // 默认收藏夹不允许被放置
    allowDrop(draggingNode, dropNode, type) {
      return dropNode.label !== '默认收藏夹';
    },
    // 默认收藏夹不允许拖拽
    allowDrag(draggingNode) {
      return !draggingNode.label.includes('默认收藏夹');
    },
    // 保存
    save() {
      this.innerVisible = false;
      console.log('保存！');
    }
  }
};
</script>

<style lang="scss">
.topic-fav {
  width: 680px;
  color: #333;
  font-size: 14px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 6px;

  .el-dialog__header {
    padding: 16px 30px;
    border-bottom: 1px solid #eee;
    .title {
      color: #000;
      font-size: 16px;
    }
    .extra {
      color: #999;
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
    padding: 20px 20px 0;
    border: 1px solid #e8e8e8;
    .filter-input {
      margin-bottom: 20px;
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
      height: 400px;
      padding: 4px 0;
      margin-bottom: 24px;
      border-radius: 6px;
      border: 1px solid #cecece;
      overflow: auto;
      color: #333;

      &-node__content {
        height: 36px;
        > label.el-checkbox {
          margin-right: 16px;
        }
        > .el-tree-node__expand-icon {
          padding: 14px;
          margin-left: 10px;
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
        &.expanded {
          transform: rotate(180deg);
        }
      }

      .el-icon-caret-right:before {
        content: '\e6e1';
      }

      &--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background-color: #e6f6fd;
      }

      .tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon-group {
          visibility: hidden;
          > i:not(.label i) {
            margin-right: 16px;
          }
          > i:last-of-type {
            margin-right: 24px !important;
          }
          > i.active {
            color: #00a0e9;
          }
        }
        .label {
          display: flex;
          align-items: center;
          justify-content: center;
          > i {
            margin-right: 8px;
          }
        }
      }

      &-node:not(:first-of-type) {
        .el-tree-node__content:hover .icon-group {
          visibility: visible;
        }
      }
    }

    .tree-node,
    .label,
    .el-input,
    .el-input__inner {
      height: 100%;
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
