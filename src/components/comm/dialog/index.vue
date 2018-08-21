<template lang="html">
  <div class="dialog" v-if="dialogData.show">
    <div class="bg">
      <div class="alertItem">
        <div class="content">
          {{dialogData.content}}
        </div>
        <div class="btns">
          <label v-if="dialogData.showCancleBtn" class="btn cancle" @click="cancleClick()">{{dialogData.cancleBtnText}}</label>
          <label v-if="dialogData.showSureBtn" class="btn sure" @click="sureClick()">{{dialogData.sureBtnText}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogData: {
        show: false,
        content: '提示内容主题',
        showCancleBtn: true,
        showSureBtn: true,
        cancleBtnText: '取消',
        sureBtnText: '确定'
      }
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    showCancleBtn: {
      type: Boolean,
      default: true
    },
    showSureBtn: {
      type: Boolean,
      default: true
    },
    cancleBtnText: {
      type: String,
      default: '取消'
    },
    sureBtnText: {
      type: String,
      default: '确定'
    }
  },
  created () {
    this.dialogData.content = this.content
    this.dialogData.showCancleBtn = this.showCancleBtn
    this.dialogData.showSureBtn = this.showSureBtn
    this.dialogData.cancleBtnText = this.cancleBtnText
    this.dialogData.sureBtnText = this.sureBtnText
    this.dialogData.show = this.isShow
  },
  methods: {
    cancleClick () {
      this.dialogData.show = !this.dialogData.show
      this.$emit('cancleClick', this.dialogData.show)
    },
    sureClick () {
      this.dialogData.show = !this.dialogData.show
      this.$emit('sureClick', this.dialogData.show)
    }
  }
}
</script>

<style lang="less" scoped="scoped" src="./dialog.less"></style>
