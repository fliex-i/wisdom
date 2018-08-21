<template lang="html">
  <div class="case">
    <ul class="list">
      <li>
        <p class="desc">项目名称</p>
        <p class="title">中铁6号项目</p>
      </li>
      <li>
        <p class="desc">资料名称</p>
        <p class="title">委托任务书</p>
      </li>
      <li>
        <p class="desc">截止日期</p>
        <p class="title">2018-01-05</p>
      </li>
      <li>
       <p class="info">
         详细介绍内容一长串详细介绍内容一长串详细介绍内容一长串详细介绍内容一长串详细介绍内容一长串
       </p>
      </li>
      <label class="title">图片/视频</label>
      <dl class="video_img">
        <dd class="default"></dd>
        <dd style="background:url('static/images/dataM.png')">
          <i class="del"></i>
        </dd>
        <dd style="background:url('static/images/dataM.png')"></dd>
        <dd style="background:url('static/images/dataM.png')"></dd>
      </dl>
       <label class="title">附件</label>
       <dl class="video_img">
         <dd style="background:url('static/images/dataM.png')"></dd>
         <dd style="background:url('static/images/dataM.png')"></dd>
         <dd style="background:url('static/images/dataM.png')"></dd>
       </dl>
       <li>
        <label class="btn active">修改</label>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" src="./dataInfo.less"></style>
