<template lang="html">
  <div class="warning">
    <loading v-if="isLoading" />
    <ul class="list">
      <label class="title">资料预警</label>
      <li v-if="this.data.prophase">
        <p class="label">项目前期</p>
        <div class="items">
        <span>
          <div class="box">
            <svg>
               <circle cx="55" cy="55" r="50" fill="none" stroke="grey" stroke-linecap="round"/>
               <circle class="red mycricle" id="pre-notUpload" cx="55" cy="55" r="50" fill="none" stroke="red" stroke-dasharray="0,1000" />
           </svg>
           <div class="progress"></div>
          </div>
          未上传
        </span>
          <span>
            <div class="box">
              <svg>
                 <circle cx="55" cy="55" r="50" fill="none" stroke="grey"  stroke-linecap="round"/>
                 <circle class="green mycricle" id="pre-notSave" cx="55" cy="55" r="50" fill="none" stroke="red"  stroke-dasharray="0,1000" />
             </svg>
             <div class="progress"></div>
            </div>
            未存档
          </span>
          <span>
            <div class="box">
              <svg>
                 <circle cx="55" cy="55" r="50" fill="none" stroke="grey" stroke-linecap="round"/>
                 <circle class="blue mycricle" id="pre-saved" cx="55" cy="55" r="50" fill="none" stroke="red" stroke-dasharray="0,1000" />
             </svg>
             <div class="progress"></div>
            </div>
            已存档
          </span>
        </div>
      </li>
    </ul>
    <dialogAlert v-if="dialog.showDialog" :isShow="dialog.showDialog" :showSureBtn="dialog.showSureBtn" :cancleBtnText="dialog.cancleBtnText" :content="dialog.tipText" />
  </div>
</template>

<script>
import $ from 'jQuery'
import loading from '@/components/comm/loading'
import dialogAlert from '@/components/comm/dialog'
import http from '@/http'
import urlConfig from '@/components/urlConfig'
export default {
  data () {
    return {
      pId: 0,
      data: {},
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
    this.pId = this.$route.query.key
    this.getDataWaring(this.pId)
  },
  mounted () {

    // 前期
    // if (this.data.prophase) {
    //
    // }

    // 施工期
    // this.showCircleProgress('#work-notUpload', 83)
    // this.showCircleProgress('#work-notSave', 45)
    // this.showCircleProgress('#work-saved', 75)
    // // 后期
    // this.showCircleProgress('#end-notUpload', 98)
    // this.showCircleProgress('#end-notSave', 78)
    // this.showCircleProgress('#end-saved', 67)
  },
  methods: {
    getDataWaring (id) {
      let self = this
      let parmas = {
        pId: id
      }
      http.get(urlConfig.getDataWaring, parmas).then(function (res) {
        self.data = res.data
        self.$nextTick(function () {
          self.showCircleProgress('#pre-notUpload', self.data.prophase.notUploaded.toFixed(2))
          self.showCircleProgress('#pre-notSave', self.data.prophase.notArchived.toFixed(2))
          self.showCircleProgress('#pre-saved', self.data.prophase.archived.toFixed(2))
        })
        setTimeout(function () {
          self.isLoading = !self.isLoading
        }, 300)
        // console.log(self.data.prophase.notUploaded.toFixed(2).toString())
      }, function (error) {
        self.dialog.showDialog = !self.dialog.showDialog
        self.dialog.tipText = error.message
        self.isLoading = !self.isLoading
      })
    },
    showCircleProgress (dom, progress) {
      let circleLength = Math.floor(2 * Math.PI * 50)
      let val = parseFloat(progress).toFixed(2)
      val = Math.max(0, val)
      val = Math.min(100, val)
      let newProgress = circleLength * val / 100
      $(dom).parents('.box').find('.progress').html(progress + '%')
      $(dom).attr('stroke-dasharray', newProgress + ',1000')
      console.log(dom, progress, $(dom).attr('stroke-dasharray'))
    }
  },
  components: { loading, dialogAlert }
}
</script>

<style lang="less" scoped="scoped" src="./warning.less"></style>
