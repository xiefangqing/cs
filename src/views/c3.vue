<template>
  <div class="c3">
    <button @click="dialogVisible = true">打开题目预览</button>
    <topic-preview v-model="dialogVisible" :data="previewData"></topic-preview>
  </div>
</template>

<script>
import TopicPreview from '@/components/TopicPreview.vue';

export default {
  name: 'C3',
  components: {
    TopicPreview
  },
  data() {
    return {
      dialogVisible: true,
      previewData: {}
    };
  },
  created() {
    const data = {
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
                answers: [
                  {
                    answer_id: 0,
                    answer_type: 1,
                    answer_res: ['A'],
                    option_id: 1,
                    uid: '0',
                    hint: '',
                    remark: ''
                  }
                ],
                hint: '',
                remark: '',
                options: [
                  {
                    option_id: 1,
                    option_values: [
                      {
                        key: 'A',
                        value: ''
                      },
                      {
                        key: 'B',
                        value: ''
                      },
                      {
                        key: 'C',
                        value: ''
                      },
                      {
                        key: 'D',
                        value: ''
                      }
                    ]
                  }
                ],
                questions: []
              },
              {
                content: '三级题干：1-1-2',
                answers: [
                  {
                    answer_id: 0,
                    answer_type: 3,
                    answer_res: ['1'],
                    option_id: 0,
                    uid: '0',
                    hint: '',
                    remark: ''
                  }
                ],
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
                answers: [
                  {
                    answer_id: 0,
                    answer_type: 5,
                    answer_res: ['这是解答题的答案'],
                    option_id: 0,
                    uid: '0',
                    hint: '',
                    remark: ''
                  }
                ],
                hint: '',
                remark: '',
                options: [],
                questions: []
              }
            ]
          },
          {
            content: '二级题干：1-3',
            answers: [
              {
                answer_id: 0,
                answer_type: 2,
                answer_res: ['A', 'B'],
                option_id: 1,
                uid: '0',
                hint: '',
                remark: ''
              }
            ],
            hint: '',
            remark: '',
            options: [
              {
                option_id: 1,
                option_values: [
                  {
                    key: 'A',
                    value: ''
                  },
                  {
                    key: 'B',
                    value: ''
                  },
                  {
                    key: 'C',
                    value: ''
                  },
                  {
                    key: 'D',
                    value: ''
                  }
                ]
              }
            ],
            questions: []
          }
        ]
      },
      points: [
        {
          point_id: '10099988',
          difficulty: 0,
          minor: 0,
          name: '算术平方根的概念与计算',
          tree_id: '200480',
          difficulty_des: ''
        },
        {
          point_id: '10099991',
          difficulty: 0,
          minor: 1,
          name: '算术平方根的非负性',
          tree_id: '200480',
          difficulty_des: ''
        }
      ]
    };
    // const result = this.treeToList(this.previewData.struct_question.questions);
    this.previewData = data;
  },
  methods: {
    // TODO: 树形转扁平实现尝试
    // treeToList(tree, level = 0) {
    //   let res = [];
    //   for (const item of tree) {
    //     const { questions, ...i } = item;
    //     if (questions && questions.length) {
    //       res = res.concat(this.treeToList(questions, level + 1));
    //     }
    //     res.push({ ...i, level });
    //   }
    //   return res;
    // }
  }
};
</script>
