import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/projects'
import ProjectDetail from '@/components/detail/project'
import dataManage from '@/components/detail/dataManage'
import fileData from '@/components/detail/fileData'
import dataInfo from '@/components/detail/dataInfo'
import warning from '@/components/warning'
import fileDataSmallType from '@/components/detail/fileDataSmallType'
import fileDataList from '@/components/detail/fileDataList'
Vue.use(Router)
//  mode: 'history',
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/detail/project', name: 'ProjectDetail', component: ProjectDetail },
    { path: '/datas', name: 'dataManage', component: dataManage },
    { path: '/detail/fileData', name: 'fileData', component: fileData },
    { path: '/detail/smallType', name: 'fileDataSmallType', component: fileDataSmallType },
    { path: '/detail/files', name: 'fileDataList', component: fileDataList },
    { path: '/dataInfo', name: 'dataInfo', component: dataInfo },
    { path: '/warning', name: 'warning', component: warning }
  ]
})
