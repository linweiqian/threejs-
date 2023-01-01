<template>
  <div v-show="show">
    <!-- <div class="modal"></div>
    <div class="content">
      <img src="@/assets/images/guide.png"
           alt="">
    </div>
    <div class="close pointer">
      <img src="@/assets/images/close.png"
           alt=""
           @click="close()">
    </div> -->
  </div>
</template>

<script>
export default {
  name: "tutorial",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "setValue",
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.$emit("setValue", false);
    },
  },
  watch: {
    value: {
      handler() {
        this.show = this.value;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 10000;
}
.content {
  position: absolute;
  z-index: 10001;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.close {
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 10001;
}
</style>
