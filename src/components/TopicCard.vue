<template>
  <el-card class="topic-card">
    <div v-if="showNewFlag" class="new">New</div>
    <div slot="header" class="header">
      <div class="order">{{ idx }}.</div>
      <div class="topic">
        <div class="title">
          <div class="attr">
            <span>{{ data.type }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ data.difficulty }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ data.score }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ data.groupNum }}</span>
            <el-divider direction="vertical"></el-divider>
            <span
              >{{ data.year }} . {{ data.position }} .
              {{ data.paperName }}</span
            >
            <el-divider direction="vertical"></el-divider>
            <span>{{ data.value }}分</span>
          </div>
          <div class="status">
            <el-tag v-if="data.shared">已分享</el-tag>
            <el-tag v-if="data.my_resources" type="success">我的资源</el-tag>
          </div>
        </div>
        <div class="content">
          2021年5月18日上午，江苏省人民政府召开新闻发布会，公布了全省最新人口数据，其中连云港市的常住人口约为人，把“”用科学记数法表示为
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="points">
        <template v-if="data.points.length <= 3">
          <el-tag
            v-for="point in data.points"
            :key="point.id"
            color="#F8F8F8"
            >{{ point.name }}</el-tag
          >
        </template>
        <template v-else>
          <el-tag
            v-for="point in data.points.slice(0, 3)"
            :key="point.id"
            color="#F8F8F8"
            >{{ point.name }}</el-tag
          >
          <el-tag color="#F8F8F8">+{{ data.points.length - 3 }}</el-tag>
        </template>
      </div>
      <el-button-group>
        <el-button v-if="showEdit" type="text" @click="clickEdit"
          >编辑</el-button
        >
        <el-button v-if="showDelete" type="text" @click="clickDelete"
          >删除</el-button
        >
        <el-button v-if="showShare" type="text" @click="clickShare">{{
          isShare ? '已分享' : '分享'
        }}</el-button>
        <el-button v-if="showFav" @click="clickFav" type="text">{{
          isFav ? '已收藏' : '收藏'
        }}</el-button>
        <el-button v-if="showSimilar" type="text" @click="clickSimilar"
          >相似题</el-button
        >
        <el-button v-if="showChangeQuestions" type="text" @click="clickSimilar"
          >换题</el-button
        >
        <el-button
          v-if="showAnaly"
          @click="isAnaly = !isAnaly"
          :class="{ isAnaly }"
          type="text"
          >答案解析</el-button
        >
        <el-button v-if="showRewrite" type="text" @click="clickRewrite"
          >改编</el-button
        >
        <el-button
          class="remove"
          v-if="showRemove"
          type="text"
          @click="clickRemove"
          >移出</el-button
        >
        <el-button v-if="showReplace" type="primary" @click="clickBasket"
          >更换</el-button
        >
        <el-button
          :class="{ isBasket }"
          v-if="showBasket"
          type="primary"
          @click="clickBasket"
          >{{ isBasket ? '移出试题篮' : '加入试题篮' }}</el-button
        >
      </el-button-group>
    </div>
    <div class="analy" v-show="isAnaly">
      <div>
        <span class="label">答　案</span>
        <span>C</span>
      </div>
      <div>
        <span class="label">解　析</span>
        <span
          >用科学记数法表示较大的数时，一般形式为，其中，为整数，且比原来的整数位数少，据此判断即可</span
        >
      </div>
      <div class="points">
        <span class="label">知识点</span>
        <el-tag v-for="point in data.points" :key="point.id" color="#F8F8F8">{{
          point.name
        }}</el-tag>
      </div>
      <div>
        <span class="label">题目ID</span>
        <span>{{ data.id }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
// 题目内容、答案、解析都是富文本
export default {
  name: 'TopicCard',
  props: {
    // 题目数据
    data: Object,
    // 控制按钮显示
    btns: {
      type: Array,
      default() {
        // 按钮绑定值约定：
        // 所有：收藏（f）、相似题（s）、答案解析（a）、试题篮（b）、换题（c）、更换（r）、改编（w）、移出（m）、编辑（e）、分享（x）、删除（d）
        // 选题：['f', 's', 'a', 'b']
        // 组卷：['f', 'c', 'a', 'w', 'm']（在组卷页，换题按钮只是相似题按钮的别名）
        // 我的资源：['e','d','x','f', 's', 'a', 'b']
        return ['f', 's', 'a', 'b'];
      }
    },
    // 题目序号
    idx: Number
  },
  data() {
    return {
      showFav: this.btns.includes('f'),
      showSimilar: this.btns.includes('s'),
      showAnaly: this.btns.includes('a'),
      showBasket: this.btns.includes('b'),
      showRewrite: this.btns.includes('w'),
      showChangeQuestions: this.btns.includes('c'),
      showReplace: this.btns.includes('r'),
      showRemove: this.btns.includes('m'),
      showDelete: this.btns.includes('d'),
      showEdit: this.btns.includes('e'),
      showShare: this.btns.includes('x'),
      isFav: this.data.fav,
      isAnaly: false,
      isShare: this.data.shared,
      isBasket: false
    };
  },
  computed: {
    // 近3天更新的试题显示New
    showNewFlag() {
      const [y, m, d] = this.data.update_time.split('-');
      return new Date(+y, m - 1, +d + 3) > new Date();
    }
  },
  methods: {
    // 点击收藏按钮
    clickFav() {
      this.isFav = true;
      console.log('唤出收藏弹窗');
    },
    // 点击相似题/换题
    clickSimilar() {
      this.$emit('open-similar', this.data);
    },
    // 点击试题篮
    clickBasket() {
      this.isBasket = !this.isBasket;
      this.$emit('open-basket', this.data);
    },
    // 点击改编
    clickRewrite() {
      this.$emit('open-rewrite', this.data);
    },
    // 点击移出
    clickRemove() {
      this.$emit('remove', this.data);
    },
    // 点击编辑
    clickEdit() {
      this.$emit('open-edit', this.data);
    },
    // 点击删除
    clickDelete() {
      this.$emit('delete', this.data);
    },
    // 点击分享
    clickShare() {
      this.isShare = true;
      console.log('唤出分享弹窗');
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

.topic-card {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
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

  .header {
    display: flex;
    padding: 24px;
    font-size: 14px;
    color: #333;

    .order {
      margin-right: 16px;
    }

    .topic {
      flex-grow: 1;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 12px;
        color: #666;

        .el-tag {
          width: 68px;
          height: 24px;
          line-height: 24px;
          margin-left: 16px;
          text-align: center;
        }
      }
    }
  }

  .footer {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;

    .el-tag {
      height: 28px;
      line-height: 28px;
      border-radius: 6px;
      border: 1px solid #cecece;
      margin-right: 12px;
      color: #333;
      font-size: 12px;
      padding: 0 16px;
    }

    .el-button {
      height: 32px;
      margin-left: 32px;
      font-size: 14px;
      display: flex;
      align-items: center;
      border-radius: 6px;

      &.isAnaly {
        color: #00a0e9;
      }

      &.remove {
        color: #ff5353;
      }

      &.isBasket {
        background-color: #fff;
        border: 1px solid #ffa8a8;
        color: #ff5353;
      }

      &--text {
        color: #666;
      }
    }
  }

  .analy {
    padding: 24px;
    background: #f8faff;
    border-top: 1px solid #e8e8e8;
    font-size: 14px;

    > div {
      margin-bottom: 22px;
      display: flex;

      &:last-of-type {
        margin: 0;
      }
    }

    .label {
      flex-shrink: 0;
      color: #666666;
      margin-right: 35px;
    }

    .points {
      display: inline-flex;
      align-items: center;

      .el-tag {
        height: 32px;
        line-height: 32px;
        border-radius: 6px;
        border: 1px solid #cecece;
        margin-right: 12px;
        color: #333;
        padding: 0 16px;
      }
    }
  }
}
</style>
