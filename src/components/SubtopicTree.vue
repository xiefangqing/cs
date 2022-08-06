<template>
  <el-card class="subtopic-tree" shadow="never" :body-style="{}">
    <template slot="header">
      <div class="title">
        <div class="stem">题干</div>
        <div class="btns">
          <span>添加小题：</span>
          <el-button-group>
            <el-button
              v-for="(btn, index) in topics.btns"
              type="text"
              :key="index"
              @click="addTopic(topics, index)"
              ><i class="el-icon-plus"></i>{{ btn }}</el-button
            >
          </el-button-group>
        </div>
      </div>
      <el-input v-model="topics.stem" placeholder="请输入内容"></el-input>
    </template>
    <div
      v-for="(twoTopic, index) in topics.children"
      :key="index"
      class="content"
    >
      <div class="title">
        <div class="stem">({{ index + 1 }})</div>
        <div class="btns">
          <span>添加小题：</span>
          <el-button-group>
            <el-button
              v-for="(btn, index) in twoTopic.btns"
              type="text"
              :key="index"
              @click="addTopic(twoTopic, index, btn)"
              :class="{ delete: btn === '删除' }"
              ><i
                :class="[
                  'el-icon-plus',
                  { 'el-icon-delete-solid': btn === '删除' }
                ]"
              ></i
              >{{ btn }}</el-button
            >
          </el-button-group>
        </div>
      </div>
      <div class="stem-warp" style="margin-left: 50px">
        <div class="stem">
          <span>题干</span>
          <el-input v-model="twoTopic.stem"></el-input>
        </div>
        <div
          v-for="(threeTopic, index2) in twoTopic.children"
          :key="index2"
          class="content"
        >
          <div class="title">
            <div class="stem inner">
              ({{ index + 1 }}) -&nbsp;
              <span class="badge">{{ index2 + 1 }}</span>
            </div>
            <div class="btns">
              <el-button-group>
                <el-button
                  v-for="(btn, index) in threeTopic.btns"
                  type="text"
                  :key="index"
                  @click="addTopic(threeTopic, index, btn)"
                  :class="{ delete: btn === '删除' }"
                  ><i
                    :class="[
                      'el-icon-plus',
                      { 'el-icon-delete-solid': btn === '删除' }
                    ]"
                  ></i
                  >{{ btn }}</el-button
                >
              </el-button-group>
            </div>
          </div>
          <div style="margin-left: 50px">
            <div class="stem">
              <span>题干</span>
              <el-input v-model="threeTopic.stem"></el-input>
            </div>
            <div class="method">
              <div class="label">
                <span>作答方式</span>
              </div>
              <el-radio-group
                v-model="threeTopic.radio"
                @change="reset(threeTopic)"
              >
                <el-radio :label="0">单选</el-radio>
                <el-radio :label="1">多选</el-radio>
                <el-radio :label="2">判断</el-radio>
                <el-radio :label="3">填空</el-radio>
                <el-radio :label="4">解答</el-radio>
              </el-radio-group>
            </div>
            <div class="answer">
              <div class="label">
                <span>答案</span>
              </div>
              <template v-if="threeTopic.radio === 0">
                <div>
                  <div style="margin-bottom: 16px">
                    选项数量
                    <el-input-number
                      class="select"
                      :min="2"
                      :max="14"
                      controls-position="right"
                      v-model="threeTopic.optionNum"
                      @change="generateLetters($event, threeTopic)"
                    ></el-input-number>
                  </div>
                  <el-radio-group v-model="threeTopic.optionVal[0]">
                    <el-radio-button
                      v-for="letter in threeTopic.options"
                      :label="letter"
                      :key="letter"
                    ></el-radio-button>
                  </el-radio-group>
                  <span style="color: #999">（请点击正确选项设置答案）</span>
                </div>
              </template>
              <template v-else-if="threeTopic.radio === 1">
                <div>
                  <div style="margin-bottom: 16px">
                    选项数量
                    <el-input-number
                      class="select"
                      :min="2"
                      :max="14"
                      controls-position="right"
                      v-model="threeTopic.optionNum"
                      @change="generateLetters($event, threeTopic)"
                    ></el-input-number>
                  </div>
                  <el-checkbox-group v-model="threeTopic.optionVal">
                    <el-checkbox-button
                      v-for="letter in threeTopic.options"
                      :label="letter"
                      :key="letter"
                    ></el-checkbox-button>
                  </el-checkbox-group>
                  <span style="color: #999">（请点击正确选项设置答案）</span>
                </div>
              </template>
              <template v-else-if="threeTopic.radio === 2">
                <el-radio-group v-model="threeTopic.optionVal[0]">
                  <el-radio-button label="T"></el-radio-button>
                  <el-radio-button label="F"></el-radio-button>
                </el-radio-group>
                <span style="color: #999">（请点击正确选项设置答案）</span>
              </template>
              <template v-else-if="threeTopic.radio === 3">
                <div class="fill">
                  <div style="margin-bottom: 16px">
                    <span class="label">填空空数</span>
                    <el-input-number
                      v-model.number="threeTopic.lineNum"
                      controls-position="right"
                      :min="1"
                      :max="100"
                    ></el-input-number>
                  </div>
                  <div
                    class="fill-input"
                    v-for="(item, index) in threeTopic.lineNum"
                    :key="item"
                  >
                    <span class="label">第 1 空</span>
                    <el-input v-model="threeTopic.optionVal[index]"></el-input>
                  </div>
                </div>
              </template>
              <template v-else-if="threeTopic.radio === 4">
                <div class="explain">
                  <el-input v-model="threeTopic.optionVal[0]"></el-input>
                </div>
              </template>
              <template v-else>
                <span class="no-select">（请先选择作答方式）</span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <template v-if="!twoTopic.children.length">
        <div style="margin-left: 50px">
          <div class="method">
            <div class="label">
              <span>作答方式</span>
            </div>
            <el-radio-group v-model="twoTopic.radio" @change="reset(twoTopic)">
              <el-radio :label="0">单选</el-radio>
              <el-radio :label="1">多选</el-radio>
              <el-radio :label="2">判断</el-radio>
              <el-radio :label="3">填空</el-radio>
              <el-radio :label="4">解答</el-radio>
            </el-radio-group>
          </div>
          <div class="answer">
            <div class="label">
              <span>答案</span>
            </div>
            <template v-if="twoTopic.radio === 0">
              <div>
                <div style="margin-bottom: 16px">
                  选项数量
                  <el-input-number
                    class="select"
                    :min="2"
                    :max="14"
                    controls-position="right"
                    v-model="twoTopic.optionNum"
                    @change="generateLetters($event, twoTopic)"
                  ></el-input-number>
                </div>
                <el-radio-group v-model="twoTopic.optionVal[0]">
                  <el-radio-button
                    v-for="letter in twoTopic.options"
                    :label="letter"
                    :key="letter"
                  ></el-radio-button>
                </el-radio-group>
                <span style="color: #999">（请点击正确选项设置答案）</span>
              </div>
            </template>
            <template v-else-if="twoTopic.radio === 1">
              <div>
                <div style="margin-bottom: 16px">
                  选项数量
                  <el-input-number
                    class="select"
                    :min="2"
                    :max="14"
                    controls-position="right"
                    v-model="twoTopic.optionNum"
                    @change="generateLetters($event, twoTopic)"
                  ></el-input-number>
                </div>
                <el-checkbox-group v-model="twoTopic.optionVal">
                  <el-checkbox-button
                    v-for="letter in twoTopic.options"
                    :label="letter"
                    :key="letter"
                  ></el-checkbox-button>
                </el-checkbox-group>
                <span style="color: #999">（请点击正确选项设置答案）</span>
              </div>
            </template>
            <template v-else-if="twoTopic.radio === 2">
              <el-radio-group v-model="twoTopic.optionVal[0]">
                <el-radio-button label="T"></el-radio-button>
                <el-radio-button label="F"></el-radio-button>
              </el-radio-group>
              <span style="color: #999">（请点击正确选项设置答案）</span>
            </template>
            <template v-else-if="twoTopic.radio === 3">
              <div class="fill">
                <div style="margin-bottom: 16px">
                  <span class="label">填空空数</span>
                  <el-input-number
                    v-model.number="twoTopic.lineNum"
                    controls-position="right"
                    :min="1"
                    :max="100"
                  ></el-input-number>
                </div>
                <div
                  class="fill-input"
                  v-for="(item, index) in twoTopic.lineNum"
                  :key="item"
                >
                  <span class="label">第 1 空</span>
                  <el-input v-model="twoTopic.optionVal[index]"></el-input>
                </div>
              </div>
            </template>
            <template v-else-if="twoTopic.radio === 4">
              <div class="explain">
                <el-input v-model="twoTopic.optionVal[0]"></el-input>
              </div>
            </template>
            <template v-else>
              <span class="no-select">（请先选择作答方式）</span>
            </template>
          </div>
        </div>
      </template>
    </div>
    <template v-if="!topics.children.length">
      <div class="method first">
        <div class="label">
          <span>作答方式</span>
        </div>
        <el-radio-group v-model="topics.radio" @change="reset(topics)">
          <el-radio :label="0">单选</el-radio>
          <el-radio :label="1">多选</el-radio>
          <el-radio :label="2">判断</el-radio>
          <el-radio :label="3">填空</el-radio>
          <el-radio :label="4">解答</el-radio>
        </el-radio-group>
      </div>
      <div class="answer first">
        <div class="label">
          <span>答案</span>
        </div>
        <template v-if="topics.radio === 0">
          <div>
            <div style="margin-bottom: 16px">
              选项数量
              <el-input-number
                class="select"
                :min="2"
                :max="14"
                controls-position="right"
                v-model="topics.optionNum"
                @change="generateLetters($event, topics)"
              ></el-input-number>
            </div>
            <el-radio-group v-model="topics.optionVal[0]">
              <el-radio-button
                v-for="letter in topics.options"
                :label="letter"
                :key="letter"
              ></el-radio-button>
            </el-radio-group>
            <span style="color: #999">（请点击正确选项设置答案）</span>
          </div>
        </template>
        <template v-else-if="topics.radio === 1">
          <div>
            <div style="margin-bottom: 16px">
              选项数量
              <el-input-number
                class="select"
                :min="2"
                :max="14"
                controls-position="right"
                v-model="topics.optionNum"
                @change="generateLetters($event, topics)"
              ></el-input-number>
            </div>
            <el-checkbox-group v-model="topics.optionVal">
              <el-checkbox-button
                v-for="letter in topics.options"
                :label="letter"
                :key="letter"
              ></el-checkbox-button>
            </el-checkbox-group>
            <span style="color: #999">（请点击正确选项设置答案）</span>
          </div>
        </template>
        <template v-else-if="topics.radio === 2">
          <el-radio-group v-model="topics.optionVal[0]">
            <el-radio-button label="T"></el-radio-button>
            <el-radio-button label="F"></el-radio-button>
          </el-radio-group>
          <span style="color: #999">（请点击正确选项设置答案）</span>
        </template>
        <template v-else-if="topics.radio === 3">
          <div class="fill">
            <div style="margin-bottom: 16px">
              <span class="label">填空空数</span>
              <el-input-number
                v-model.number="topics.lineNum"
                controls-position="right"
                :min="1"
                :max="100"
              ></el-input-number>
            </div>
            <div
              class="fill-input"
              v-for="(item, index) in topics.lineNum"
              :key="item"
            >
              <span class="label">第 1 空</span>
              <el-input v-model="topics.optionVal[index]"></el-input>
            </div>
          </div>
        </template>
        <template v-else-if="topics.radio === 4">
          <div class="explain">
            <el-input v-model="topics.optionVal[0]"></el-input>
          </div>
        </template>
        <template v-else>
          <span class="no-select">（请先选择作答方式）</span>
        </template>
      </div>
    </template>
  </el-card>
</template>

<script>
export default {
  name: 'SubtopicTree',
  data() {
    return {
      topics: {
        radio: '',
        stem: '',
        level: 1,
        options: ['A', 'B', 'C', 'D'],
        optionVal: [],
        optionNum: 4,
        lineNum: 1,
        btns: ['单选', '多选', '判断', '填空', '解答'],
        children: [
          {
            radio: 2,
            stem: '',
            level: 2,
            options: ['A', 'B', 'C', 'D'],
            optionVal: [],
            optionNum: 4,
            lineNum: 1,
            btns: ['单选', '多选', '判断', '填空', '解答', '删除'],
            children: [
              {
                radio: 3,
                stem: '',
                options: ['A', 'B', 'C', 'D'],
                optionVal: [],
                optionNum: 4,
                lineNum: 1,
                level: 3,
                btns: ['删除'],
                children: []
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    reset(topic) {
      topic.optionVal = [];
      topic.optionNum = 4;
      topic.options = ['A', 'B', 'C', 'D'];
      topic.lineNum = 1;
    },
    addTopic(topic, index, btn) {
      if (btn !== '删除') {
        topic.radio = '';
        this.reset(topic);
        if (topic.level === 1) {
          topic.children.push({
            radio: index,
            stem: '',
            level: 2,
            options: ['A', 'B', 'C', 'D'],
            optionVal: [],
            optionNum: 4,
            lineNum: 1,
            btns: ['单选', '多选', '判断', '填空', '解答', '删除'],
            children: []
          });
        } else if (topic.level === 2) {
          topic.children.push({
            radio: index,
            stem: '',
            options: ['A', 'B', 'C', 'D'],
            optionVal: [],
            optionNum: 4,
            lineNum: 1,
            level: 3,
            btns: ['删除'],
            children: []
          });
        }
      } else {
        if (topic.level === 2) {
          this.topics.children.splice(this.topics.children.indexOf(topic), 1);
        } else if (topic.level === 3) {
          this.topics.children.forEach(t => {
            if (t.children.includes(topic)) {
              t.children.splice(t.children.indexOf(topic), 1);
            }
          });
        }
      }
    },
    generateLetters(val, topic) {
      const LETTER = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N'
      ];
      topic.options = LETTER.slice(0, val);
    }
  }
};
</script>

<style lang="scss">
.subtopic-tree {
  color: #333;

  .el-card__header {
    padding: 20px 24px 0;
    border-bottom: 0;
  }

  .el-card__body {
    padding: 24px 24px 0;
    > div {
      margin-bottom: 24px;
    }
    .title {
      background: #ecf3fa;
    }
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #333;
  }

  .title {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .stem {
      font-size: 16px;
      margin-left: 16px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 3px;
        left: -16px;
        width: 4px;
        height: 16px;
        background: #00a0e9;
      }

      &::after {
        content: '*';
        position: absolute;
        top: 4px;
        right: -12px;
        color: #ff5353;
      }
    }

    .btns {
      font-size: 14px;
      display: flex;
      align-items: center;

      > span {
        color: #666;
      }

      .el-button {
        margin-right: 24px;
        color: #00a0e9;

        &.delete {
          color: #ff5353;
        }

        .el-icon-plus {
          margin-right: 8px;
        }
      }
    }
  }

  .stem {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    > span {
      width: 100px;
    }
  }

  .method {
    margin-bottom: 24px;
  }

  .method,
  .answer {
    display: flex;
    align-items: flex-start;

    .label {
      font-size: 16px;
      width: 100px;
      flex-shrink: 0;
      margin-left: 16px;

      > span {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -16px;
          width: 4px;
          height: 16px;
          background: #00a0e9;
        }

        &::after {
          content: '*';
          position: absolute;
          top: 0;
          right: -12px;
          color: #ff5353;
        }
      }
    }
  }

  .answer {
    margin-bottom: 24px;
  }

  .answer {
    font-size: 14px;

    .no-select {
      color: #999;
      margin-left: -40px;
    }
    .el-input {
      width: 100px;
      height: 32px;
      margin-left: 16px;
      &__inner {
        height: 32px;
      }
    }
    .el-checkbox-group {
      display: inline-block;
    }
    .el-radio-button__inner,
    .el-checkbox-button__inner {
      margin-right: 14px;
      border: 1px solid #dcdfe6 !important;
      border-radius: 4px !important;
      overflow: hidden;
      box-shadow: none;
      width: 32px;
      height: 32px;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fill {
      flex-grow: 1;
      .label {
        display: inline-block;
        width: 72px;
        margin: 0;
      }
      &-input {
        display: flex;
        align-items: center;
        // margin-bottom: 16px;
        .el-input {
          width: 100%;
          height: 40px;
        }
        .el-input__inner {
          height: 40px;
        }
      }
    }

    .explain {
      width: 100%;
      .el-input {
        width: 100%;
        height: 40px;
        margin: 0;
        &__inner {
          height: 40px;
        }
      }
    }
  }

  .el-card__body {
    .content {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 32px;
        left: 32px;
        width: 0;
        height: 100%;
        border-left: 1px dashed #bacefd;
      }
    }
    .stem-warp .stem:not(.inner) {
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }

    .stem.inner {
      .badge {
        width: 16px;
        height: 16px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid;
        font-size: 12px;
      }
    }

    .fill-input {
      margin-bottom: 16px;
    }

    .title {
      padding-left: 52px;
      .stem {
        margin: 0;
        height: 100%;
        &::before {
          content: '';
          position: absolute;
          top: 12px;
          left: -24px;
          border-top: 8px solid #00a0e9;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          background: none;
        }
        &::after {
          display: none;
        }
      }
    }
    .method:not(.first),
    .answer:not(.first) {
      .label > span {
        &::before {
          display: none;
        }
      }
      .label {
        margin: 0;
      }
    }

    .el-input-number {
      width: auto;
      line-height: normal;
      > span {
        width: 25px;
        line-height: normal;
      }
    }
  }
}
</style>
