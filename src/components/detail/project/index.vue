<template lang="html">
  <loading v-if="isLoading" />
  <div v-else class="projects">
   <ul class="list">
     <label class="title">基础信息</label>
     <li>
       <div class="left">
         <p class="title">
           <span>项目名称：</span>
           <span>{{data.pName}}</span>
         </p>
       </div>
     </li>
     <li>
       <div class="left">
         <p class="title">
           <span>资金投入：</span>
           <span class="price">{{ allcount }}</span>
         </p>
       </div>
     </li>
      <label class="title">项目角色关系</label>
      <li>
        <div class="left">
          <p class="title">
            <span>甲方：</span>
            <span>{{data.roleInfoBean.partyA.rName}}</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <p class="title">
            <span>监理公司：</span>
            <span>{{data.roleInfoBean.supervisionCompany.rName}}</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <p class="title">
            <span>总包单位：</span>
            <span>{{data.roleInfoBean.generalContractUnit.rName}}</span>
          </p>
        </div>
      </li>
      <label class="title">实施计划</label>
      <li v-for="(item, index) in data.implPlanList" :key="index">
        <div class="left">
          <p class="title">
           {{item.ipName}}
          </p>
          <p class="desc">{{fmtDate(item.ipStartDate)}} - {{fmtDate(item.ipEndDate)}}</p>
        </div>
      </li>
   </ul>
   <div class="footer">
     <label class="btn active" @click="jumpPage('fileData',{local:data.pName,key: data.pId})">查看项目资料</label>
     <label class="btn nomarl" @click="jumpPage('warning',{local:data.pName,key: data.pId})">查看项目预警</label>
   </div>
    <dialogAlert v-if="dialog.showDialog" :isShow="dialog.showDialog" :showSureBtn="dialog.showSureBtn" :cancleBtnText="dialog.cancleBtnText" :content="dialog.tipText" />
  </div>
</template>

<script>
import http from '@/http'
import urlConfig from '@/components/urlConfig'
import loading from '@/components/comm/loading'
import dialogAlert from '@/components/comm/dialog'
export default {
  data () {
    return {
      data: {},
      allcount: 0,
      key: 0,
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
    this.key = this.$route.query.key
    this.getProjectDetial(this.key)
  },
  methods: {
    getProjectDetial (id) {
      let self = this
      let parmas = {
        pId: id
      }
      http.get(urlConfig.getProjectDetial, parmas).then(function (res) {
        self.data = res.data
        self.allcount = parseFloat(res.data.amount).toFixed(2)
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
  components: { loading, dialogAlert }
}
</script>
<style lang="less" src="./project.less" scoped="scoped"></style>
