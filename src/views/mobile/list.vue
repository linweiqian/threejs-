<template>
  <div class="mobile-list">
    <div class="mobile-item"
         v-for="(item,index) in list"
         :key="index"
         @click="toDetail(item)">
      <img class="mobile-item-img"
           :src="item.cover">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    toDetail(data) {
      this.$router.push({
        name: "mobile/detail",
        query: {
          id: data.id,
        },
      });
    },
  },
  computed: {
    list() {
      let models = [
        "“水波纹”彩陶豆",
        "19世纪黑漆描金制茶贸易图茶叶罐",
        "19世纪檀香木雕柳亭人物故事图盒",
        "座钟",
        "23玻璃花插",
        "彩花卉纹描金徽章碟",
        "春秋时代方格纹双耳陶罐",
        "广彩徽章广州风景长方盘",
        "家族为金开结婚时取字“圣权”的字架",
        "林善永赠给美国三藩市亚摩那华埠关帝庙的花瓶",
        "吕文成用过的高胡",
        "木雕博古纹扶手椅（马来西亚霹雳中山会馆捐赠）",
        "木雕筹码提箱（美国华侨使用）",
        "清港口天后庙较合司码铁权",
        "清广绣五伦图花梨框小座屏",
        "清饕餮纹铜觚",
        "清铁牛尊",
        "阮霭培家族使用的龙凤茶具",
        "商“∏”符号陶壶",
        "饕餮纹铜烛台",
        "新石器时代划弦纹彩陶碗",
        "油印机",
        "战国时代素胎方格纹双系陶罐",
        "铸铁橡胶铰（挤出压片机）",
      ];
      let arr = models.map((item, index) => {
        const i = index + 1;
        return {
          title: item,
          cover: require(`@/assets/images/mobile/${i}.png`),
          id: i,
        };
      });
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-list {
  padding: 60px;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  background-image: url(@/assets/images/mobile/background.png);

  .mobile-item {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    transition: all 0.3s;
    box-shadow: 0 0 20px #ccc;
    & + .mobile-item {
      margin-top: 40px;
    }

    .mobile-item-img {
      vertical-align: middle;
      border-style: none;
      width: 590px;
      height: 590px;
    }

    p {
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px;
      margin: 0;
      font-size: 18px;
    }
  }
}
</style>