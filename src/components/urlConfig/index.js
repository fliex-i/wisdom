let api = {
  host: 'http://125.71.203.218:6200/'
}
api.domain = 'http://' + window.location.href + '/'
const UrlConfig = Object.freeze({
  getProjects: api['host'] + 'dingtalk/project/getProjectList',
  getProjectDetial: api['host'] + 'dingtalk/project/getProjectDetail',
  getDataBigType: api['host'] + 'dingtalk/data/getDataBigTypeList',
  getDataSmallType: api['host'] + 'dingtalk/data/getDataSmallTypeList',
  getDataList: api['host'] + 'dingtalk/data/getDataAnnexList',
  getDataWaring: api['host'] + 'dingtalk/data/getDataEarlyWarning'
})

export { UrlConfig as default }
