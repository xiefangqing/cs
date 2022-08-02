<template>
  <div class="c3">
    <button @click="dialogVisible = true">打开题目预览</button>
    <el-dialog title="题目预览" :visible.sync="dialogVisible">
      <div class="problem">
        {{ previewData.struct_question.content }}
        <div
          v-for="(item, index) in abc"
          :key="item.id"
          :class="{ ml: item.level === 1 }"
        >
          {{ item.content }}
        </div>
      </div>
      <div class="answer">
        <div class="label">答案</div>
        <div>
          <div
            v-for="(item, index) in previewData.struct_question.questions"
            :key="index"
          >
            <span class="answer-order">({{ index + 1 }})</span>
            <span class="answer-content">{{ item.answers.join('') }}</span>
            <template v-if="item.questions.length">
              <div
                style="margin-left: 30px"
                v-for="(item2, index2) in item.questions"
                :key="index2"
              >
                <span class="answer-order">{{ index2 + 1 }}</span>
                <span class="answer-content">{{ item2.answers.join('') }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="analyse">
        <div class="label">解析</div>
        <div class="hint">{{ previewData.struct_question.hint }}</div>
      </div>
      <div class="point">
        <div class="label">知识点</div>
        <div class="tag">
          <el-tag
            effect="plain"
            v-for="item in previewData.points"
            :key="item.point_id"
            >{{ item.name }}</el-tag
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- <topic-preview /> -->
  </div>
</template>

<script>
// import TopicPreview from '@/components/TopicPreview.vue';

export default {
  name: 'C3',
  components: {
    // TopicPreview
  },
  data() {
    return {
      dialogVisible: true,
      previewData: {},
      abc: []
    };
  },
  created() {
    this.previewData = {
      struct_question: {
        content: '一级题干：1',
        answers: [],
        hint: '这是解析',
        remark: '',
        options: [],
        questions: [
          {
            content: '二级题干：1-1',
            answers: [],
            hint: '',
            remark: '',
            options: [],
            questions: [
              {
                content: '三级题干：1-1-1',
                answers: ['A', 'B'],
                hint: '',
                remark: '',
                questions: []
              },
              {
                content: '三级题干：1-1-2',
                answers: ['1'],
                hint: '',
                remark: '',
                options: [],
                questions: []
              }
            ]
          },
          {
            content: '二级题干：1-2',
            answers: [],
            hint: '',
            remark: '',
            options: [],
            questions: [
              {
                content: '三级题干：1-2-1',
                answers: ['解答题答案'],
                hint: '',
                remark: '',
                options: [],
                questions: []
              }
            ]
          },
          {
            content: '二级题干：1-3',
            answers: ['A', 'B'],
            hint: '',
            remark: '',
            questions: []
          }
        ]
      },
      points: [
        { point_id: '10100304', name: '勾股定理' },
        { point_id: '10101121', name: '勾股定理的应用' }
      ]
    };
    const result = this.treeToList(this.previewData.struct_question.questions);
    this.abc = result;
  },
  methods: {
    treeToList(tree, level = 0) {
      let res = [];
      for (const item of tree) {
        const { questions, ...i } = item;
        if (questions && questions.length) {
          res = res.concat(this.treeToList(questions, level + 1));
        }
        res.push({ ...i, level });
      }
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.c3::v-deep {
  .el-dialog {
    width: 920px;
    border-radius: 6px 6px 6px 6px;

    &__header {
      padding: 16px 30px 0;
    }

    &__title {
      color: #000;
      font-size: 16px;
    }

    &__headerbtn {
      right: 30px;
    }

    &__close {
      width: 14px;
      height: 14px;
      color: #333 !important;
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
      }

      .point {
        align-items: center;
      }

      .answer {
        line-height: 24px;

        &-order {
          margin-right: 8px;
        }
      }

      .tag > .el-tag {
        color: #333;
        margin-right: 12px;
        border-radius: 6px;
        border: 1px solid #cecece;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
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
}
</style>
