<template>
  <el-card class="paper-card">
    <div v-if="showNewFlag" class="new">New</div>
    <div v-if="isNotAnalysis" class="analysis">
      <div>未解析</div>
    </div>
    <div slot="header" class="content">
      <div class="attr">
        <span>{{ data.grade }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.year }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.position }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.type }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.topic_num }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.update_time }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ data.id }}</span>
      </div>
      <div class="name">{{ data.paper_name }}</div>
      <div v-if="!isNotAnalysis" :class="['wave-ball', ballColor]">
        <div class="water"></div>
        <div class="level">{{ data.level }}</div>
      </div>
    </div>
    <div class="footer">
      <div class="tag">
        <el-tag type="warning">下载 {{ data.download_num }}</el-tag>
        <el-tag v-if="data.shared" type="success">已分享</el-tag>
        <el-tag v-if="data.my_resources">我的资源</el-tag>
      </div>
      <el-button-group>
        <el-button v-if="showEdit" @click="editPaper" type="text"
          >编辑</el-button
        >
        <el-button v-if="showCopy" @click="copyPaper" type="text"
          >复制</el-button
        >
        <el-button v-if="showDelete" @click="deletePaper" type="text"
          >删除</el-button
        >
        <el-button v-if="showShare" @click="sharePaper" type="text"
          >分享</el-button
        >
        <el-button v-if="showDraw" @click="DrawPaper" type="text"
          >划题标注</el-button
        >
        <el-button v-if="showFav" @click="favPaper" type="text">{{
          data.fav ? '已收藏' : '收藏'
        }}</el-button>
        <el-button v-if="showAnalyse" @click="analysePaper" type="text"
          >试卷分析</el-button
        >
        <el-button v-if="showDownload" @click="downloadPaper" type="text"
          >下载试卷</el-button
        >
      </el-button-group>
    </div>
  </el-card>
</template>

<script>
// 题目内容、答案、解析都是富文本
export default {
  name: 'PaperCard',
  props: {
    // 试卷数据
    data: Object,
    // 按钮组
    btns: {
      type: Array,
      default() {
        // 我的卷库-我的上传：['t', 'c', 'e', 's', 'a', 'd', 'f']
        return ['a', 'd', 'f'];
      }
    }
  },
  data() {
    return {
      showDelete: this.btns.includes('e'),
      showDraw: this.btns.includes('r'),
      showFav: this.btns.includes('f'),
      showAnalyse: this.btns.includes('a'),
      showDownload: this.btns.includes('d'),
      showEdit: this.btns.includes('t'),
      showCopy: this.btns.includes('c'),
      showShare: this.btns.includes('s')
    };
  },
  computed: {
    // 近3天更新的试题显示New
    showNewFlag() {
      const [y, m, d] = this.data.update_time.split('-');
      return new Date(+y, m - 1, +d + 3) > new Date();
    },
    ballColor() {
      return {
        simple: this.data.level === '简单',
        average: this.data.level === '一般',
        medium: this.data.level === '中等',
        difficult: this.data.level === '难'
      };
    },
    isNotAnalysis() {
      return this.data.is_not_analysis;
    }
  },
  methods: {
    editPaper() {
      console.log('进入试卷内页');
    },
    copyPaper() {
      console.log('复制一份试卷');
    },
    sharePaper() {
      console.log('唤出分享弹框');
    },
    favPaper() {
      console.log('唤出收藏弹窗');
    },
    analysePaper() {
      console.log('唤出试卷分析弹窗');
    },
    downloadPaper() {
      console.log('唤出试卷下载弹窗');
    },
    deletePaper() {
      console.log(`确认要删除“${this.data.paper_name}”吗？`);
    },
    DrawPaper() {
      console.log('进入划线标注页面');
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep() {
  .el-card__body,
  .el-card__header {
    padding: 0;
  }

  .el-card__header {
    border-bottom: 1px solid #e8e8e8;
  }
}

.paper-card {
  margin-bottom: 16px;
  position: relative;

  .new {
    position: absolute;
    top: 8px;
    left: -15px;
    width: 60px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background-color: #ff5722;
    transform: rotate(-45deg);
  }

  .analysis {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    font-size: 12px;
    color: #fff;
    background-image: linear-gradient(225deg, #ff5722 50%, transparent 50%);

    > div {
      position: absolute;
      top: 8px;
      left: 12px;
      transform: rotate(45deg);
    }
  }

  .content {
    padding: 20px 24px 24px;
    position: relative;

    .attr {
      color: #666;
      font-size: 12px;
      margin-bottom: 20px;
    }

    .name {
      color: #333;
      font-size: 14px;
    }

    .wave-ball {
      position: absolute;
      top: 27px;
      right: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #fff;
      overflow: hidden;

      .water {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 170%;
          height: 170%;
        }

        &::before {
          border-radius: 40%;
          animation: wave 5s linear infinite;
        }

        &::after {
          border-radius: 40%;
          background-color: #fff;
          animation: wave2 8s linear infinite;
        }
      }

      &.simple {
        box-shadow: 0 0 0 2px #00a0e9;

        .water {
          background-color: #00a0e9;

          &::before {
            background-color: #c1e7f9;
          }
        }
      }

      &.average {
        box-shadow: 0 0 0 2px #3cbe74;

        .water {
          background-color: #3cbe74;

          &::before {
            background-color: #cfefdd;
          }
        }
      }

      // TODO: 中等球的颜色，现在设计图上没有，到时候改
      &.medium {
        box-shadow: 0 0 0 2px #a5239f;

        .water {
          background-color: #a5239f;

          &::before {
            background-color: #ce68c9;
          }
        }
      }

      &.difficult {
        box-shadow: 0 0 0 2px #ffaf59;

        .water {
          background-color: #ffaf59;

          &::before {
            background-color: #ffebd6;
          }
        }
      }

      .level {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translate(-50%);
        z-index: 9999;
        font-size: 12px;
        color: #333;
      }
    }
  }

  .footer {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-tag {
      height: 24px;
      line-height: 24px;
      margin-right: 16px;
    }

    .el-button {
      margin-left: 32px;
      color: #666;
    }
  }
}

// 水波球动画
@keyframes wave {
  0% {
    transform: translate(-50%, -60%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -60%) rotate(360deg);
  }
}

@keyframes wave2 {
  0% {
    transform: translate(-50%, -65%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -65%) rotate(360deg);
  }
}
</style>
