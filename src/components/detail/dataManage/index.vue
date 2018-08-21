<template lang="html">
  <div class="dataManage">
    <!-- <search/> -->
    <ul class="list">
      <li v-for="item in data" :key="item"  @click="jumpPage('fileData',{ local: '中铁6号项目' + item })">
        <div class="left">
          <i class="fa fa-folder-open-o fa-lg"></i>
          <div class="newLine">
            <p class="title">中铁6号项目{{item}}</p>
            <p class="desc">2018-01-05</p>
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
</template>
<script>
import search from '@/components/comm/search'
export default {
  data () {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  components: { search }
}
</script>

<style lang="less" src='./dataManage.less' scoped="scoped"></style>
