// import http from '@/http'
// import urlConfig from '@/components/urlConfig'
export default function install (Vue, options) {
  // Vue.prototype.http = http
  // Vue.prototype.urlConfig = urlConfig
  /**
   * 全局路由跳转方法
   * @param  {String} component 组件名称
   * @param  {Object} parmas    携带参数
  */
  Vue.prototype.jumpPage = function (component, parmas) {
    this.$router.push({ name: component, query: parmas })
  }
  /**
    * 格式化日期、时间 YY-MM-DD  HH:MM:SS 格式化返回
    * @param  {String} obj [时间戳]
    * @return {string}     [返回日期时间字符串]
    */
  Vue.prototype.fmtDate = function (obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    var h = date.getHours()
    let min = '0' + date.getMinutes()
    let s = date.getTime()
    return y + '-' + m.substring(m.length-2, m.length)+ '-' + d.substring(d.length-2, d.length)+' '+ h + ':' + min.substring(min.length-2, min.length)+ ':' + s.toString().substring(0, 2)
  }
}
