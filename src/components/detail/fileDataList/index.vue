<template lang="html">
  <div class="">
    <loading v-if="isLoading" />
    <div v-else-if="!dialog.showDialog" class="dataManage">
      <label class="position" v-html="position"></label>
      <ul class="list">
        <!-- @click="jumpPage('dataManage',{ local: oldPosition + item.sName+ ',' ,bId: item.bId, sId: item.sId})" -->
        <li v-for="(item,index) in data" :key="index">
          <div class="left">
            <i class="fa fa-circle "></i>
            <div class="newLine">
              <p class="title">{{item.dtName}}</p>
              <p class="desc">{{fmtDate(item.pdEndDate)}}</p>
              <p :class="getStatus(item.status).split(',')[1]"> {{getStatus(item.status).split(',')[0]}}</p>
            </div>
          </div>
          <div class="right">
            <p class="time">
              <label v-if="item.status == '1'" class="btn"  @click="jumpPage('dataInfo',{pId: pId,sId: sId})">去上传</label>
              <!-- <i class="fa fa-circle price"></i> -->
              <!-- <i class="fa fa-angle-right fa-lg"></i> -->
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
      pId: 0,
      sId: 0,
      status: '',
      className: '',
      isLoading: true,
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
    this.pId = this.$route.query.pId
    this.sId = this.$route.query.sId
    this.position = this.splitLocal(local)
    this.getFileTYpe(this.pId, this.sId)
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
    getStatus (item) {
      // status (string, optional): 文档状态（1:未上传,2:未存档,3:已存档）
      let text = ''
      let className = ''
      switch (item) {
        case '1':
          text = '未上传'
          className = 'red'
          break
        case '2':
          text = '未存档'
          className = 'blue'
          break
        case '3':
          text = '已存档'
          className = 'green'
          break
      }
      return text + ',' + className
    },
    getFileTYpe (pId, sId) {
      let self = this
      let parmas = {
        pId: pId,
        sId: sId
      }
      http.get(urlConfig.getDataList, parmas).then(function (res) {
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
