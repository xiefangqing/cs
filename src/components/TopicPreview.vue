<template>
  <el-dialog
    title="题目预览"
    :visible.sync="dialogVisible"
    @close="closeDialog"
  >
    <div class="problem">
      <div>{{ data.struct_question.content }}</div>
      <div
        style="margin-left: 30px"
        v-for="(item, index) in data.struct_question.questions"
        :key="index"
      >
        <span class="answer-order">({{ index + 1 }})</span>
        <span class="answer-content">{{ item.content }}</span>
        <div
          style="margin-left: 30px"
          v-for="(item2, index2) in item.questions"
          :key="index2"
        >
          <span class="answer-order circle">{{ index2 + 1 }}</span>
          <span class="answer-content">{{ item2.content }}</span>
        </div>
      </div>
    </div>
    <div class="answer">
      <div class="label">答案</div>
      <div>
        <div
          v-for="(item, index) in data.struct_question.questions"
          :key="index"
        >
          <span class="answer-order">({{ index + 1 }})</span>
          <span class="answer-content">{{ getAnswer(item.answers) }}</span>
          <div
            style="margin-left: 30px"
            v-for="(item2, index2) in item.questions"
            :key="index2"
          >
            <span class="answer-order circle">{{ index2 + 1 }}</span>
            <span class="answer-content">{{ getAnswer(item2.answers) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="analyse">
      <div class="label">解析</div>
      <div class="hint">{{ data.struct_question.hint }}</div>
    </div>
    <div class="point">
      <div class="label">知识点</div>
      <div class="tag">
        <el-tag
          effect="plain"
          v-for="item in data.points"
          :key="item.point_id"
          >{{ item.name }}</el-tag
        >
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="closeDialog">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// TODO：等富文本解析做好了，content、answer_res字段渲染用v-html
export default {
  name: 'TopicPreview',
  props: {
    data: Object,
    show: Boolean
  },
  data() {
    return {
      dialogVisible: this.show
    };
  },
  watch: {
    show(newVal) {
      this.dialogVisible = newVal;
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('update:show', false);
    },
    getAnswer(answers) {
      if (!answers.length) return;
      const { answer_type, answer_res } = answers[0];
      // 1单选 2多选 3判断 4填空 5解答
      if (answer_type === 3) {
        return answer_res[0] === '1' ? '√' : 'X';
      } else if ([4, 5].includes(answer_type)) {
        return `答案：${answer_res[0]}`;
      } else {
        return answer_res.join('');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep() .el-dialog {
  width: 920px;
  border-radius: 6px 6px 6px 6px;

  &__header {
    padding: 16px 30px 0;

    .el-dialog__title {
      color: #000;
      font-size: 16px;
    }

    .el-dialog__headerbtn {
      right: 30px;
    }

    .el-dialog__close {
      width: 14px;
      height: 14px;
      color: #333 !important;
    }
  }

  &__body {
    max-height: 550px;
    border: 1px solid #cecece;
    border-radius: 6px 6px 0 0;
    padding: 0;
    margin: 30px 20px 25px;
    color: #333;

    > div {
      padding: 20px 24px;

      &.answer,
      &.analyse {
        padding-bottom: 0;
      }
    }

    .answer,
    .analyse,
    .point {
      display: flex;
      background: #f8faff;

      .label {
        flex-shrink: 0;
        width: 58px;
      }
    }

    .problem {
      border-bottom: inherit;
      line-height: 24px;
    }

    .point {
      align-items: center;
    }

    .answer {
      line-height: 24px;

      &-order {
        margin-right: 8px;

        &.circle {
          width: 14px;
          height: 14px;
          font-size: 12px;
          border: 1px solid;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .tag > .el-tag {
      color: #333;
      margin-right: 12px;
      border-radius: 6px;
      border: 1px solid #cecece;
      font-size: 14px;
      padding: 0 16px;
    }
  }

  &__footer {
    border-top: 1px solid #e8e8e8;
    padding: 16px 19px;

    .dialog-footer > button {
      width: 58px;
      height: 32px;
      padding: 0;
    }
  }
}
</style>
