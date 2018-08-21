<template>
   <loading v-if="isLoading" />
  <div v-else class="home">
    <div class="">
      <search />
      <ul class="list">
        <li v-for="(item, index) in data" :key="index" @click="jumpPage(component,{key:item.pId})">
          <div class="left">
            <p class="title">{{item.pName}}</p>
            <p class="desc">{{item.amount}}</p>
          </div>
          <div class="right">
            <p class="time">
              <span>{{fmtDate(item.crtDate)}}</span>
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
// import http from '@/http'
// import urlConfig from '@/components/urlConfig'
export default {
  name: 'Home',
  data () {
    return {
      isLoading: true,
      data: [],
      dialog: {
        showDialog: false,
        showSureBtn: false,
        cancleBtnText: '确定',
        tipText: ''
      },
      component: ''
    }
  },
  created () {
    this.getProjects()
    let type = this.$route.query.type
    switch (type) {
      case 'warnings':
        this.component = 'warning'
        break
      case 'files':
        this.component = 'fileData'
        break
      default:
        this.component = 'ProjectDetail'
    }
  },
  methods: {
    getProjects () {
      let self = this
      http.get(urlConfig.getProjects).then(function (res) {
        self.data = res.data
        setTimeout(function () {
          self.isLoading = !self.isLoading
        }, 200)
      }, function (error) {
        self.dialog.showDialog = !self.dialog.showDialog
        self.dialog.tipText = error.message
        setTimeout(function () {
          self.isLoading = !self.isLoading
        }, 200)
        // console.log(error)
      })
    }
  },
  components: { loading, dialogAlert, search }
}
</script>

<style lang="less" src="./home.less" ></style>
