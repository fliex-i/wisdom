<template lang="html">
  <div class="">
    <loading v-if="isLoading" />
    <div v-else-if="!dialog.showDialog" class="dataManage">
      <label class="position" v-html="position"></label>
      <ul class="list">
        <li v-for="(item,index) in data" :key="index" @click="jumpPage('fileDataList',{ local: oldPosition + item.sName+ ',' ,pId: pId, sId: item.sId})">
          <div class="left">
            <i class="fa fa-folder-open-o fa-lg"></i>
            <div class="newLine">
              <p class="title">{{item.sName}}</p>
              <!-- <p class="desc">{{fmtDate(item.)}}</p> -->
            </div>
          </div>
          <div class="right">
            <p class="time">
              <i class="fa fa-circle price"></i>
              <i class="fa fa-angle-right fa-lg"></i>
            </p>
          </div>
        </li>
      </ul>
    </div>
     <dialogAlert v-if="dialog.showDialog" :isShow="dialog.showDialog" :showSureBtn="dialog.showSureBtn" :cancleBtnText="dialog.cancleBtnText" :content="dialog.tipText" />
 </div>
</template>

<script>
import loading from '@/components/comm/loading'
import dialogAlert from '@/components/comm/dialog'
import search from '@/components/comm/search'
import http from '@/http'
import urlConfig from '@/components/urlConfig'
export default {
  data () {
    return {
      data: [],
      position: '',
      oldPosition: '',
      isLoading: true,
      pId: 0,
      bId: 0,
      dialog: {
        showDialog: false,
        showSureBtn: false,
        cancleBtnText: '确定',
        tipText: ''
      }
    }
  },
  created () {
    let local = this.$route.query.local + ','
    this.oldPosition = local
    this.pId = this.$route.query.pkey
    this.bId = this.$route.query.key
    this.position = this.splitLocal(local)
    this.getFileTYpe(this.bId, this.pId)
    // console.log(this.bId, this.pId)
  },
  methods: {
    splitLocal (local) {
      let localArr = local.split(',')
      let newLocal = ''
      for (let i = 0; i < localArr.length; i++) {
        if (localArr[i]) {
          newLocal += '<span style="margin:0 .4rem;">' + localArr[i] + '</span><i class="fa fa-angle-right"></i>'
        }
      }
      return newLocal
    },
    getFileTYpe (id, pId) {
      let self = this
      let parmas = {
        bId: id,
        pId: pId
      }
      http.get(urlConfig.getDataSmallType, parmas).then(function (res) {
        self.data = res.data
        setTimeout(function () {
          self.isLoading = !self.isLoading
        }, 300)
      }, function (error) {
        self.dialog.showDialog = !self.dialog.showDialog
        self.dialog.tipText = error.message
        self.isLoading = !self.isLoading
      })
    }
  },
  components: { search, loading, dialogAlert }
}
</script>

<style lang="less" src='./fileData.less' scoped="scoped"></style>
