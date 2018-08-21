import axios from 'axios'
// import UrlConfig from '@/UrlConfig'
require('es6-promise').polyfill() // 兼容ie
// require('promise.prototype.finally').shim()

function checkUrl (url) {
  if (typeof url !== 'string' || url === '') {
    throw new Error(`an invalid url(${url})`)
  }
}
function checkParam (param) {
  if (typeof param !== 'object') {
    throw new Error(`不认识的param${param}`)
  }
}
// function bindLanguage (param) {
//   let lang = getCurrentLanguageCode()
//   param['table_name_replace'] = param['table_name_replace'] || lang
//   param['language'] = param['language'] || lang
// }

function toQueryString (param) {
  return Object.keys(param).reduce((result, key) => {
    result.push(`${key}=${encodeURIComponent(param[key])}`)
    return result
  }, []).join('&')
}
function toJsonString (param) {
  return JSON.stringify(param)
}
// function toXmlString (param) {
//   return ['<?xml version="1.0" encoding="UTF-8"?>',
//     '<requests>',
//     '<global>',
//     '<resultType>json</resultType>',
//     '</global>',
//     '<request>',
//     Object.keys(param).reduce((result, key) => {
//       result.push(`<${key}><![CDATA[${param[key]}]]></${key}>`)
//       return result
//     }, []).join(''),
//     '</request>',
//     '</requests>'].join('')
// }
// function toXmlStringforPay (param) {
//   let xmlhtml = ['<xml>',
//     Object.keys(param).reduce((result, key) => {
//       result.push(`<${key}><![CDATA[${param[key]}]]></${key}>`)
//       return result
//     }, []).join(''),
//     '</xml>'
//   ].join('')
//   console.log(xmlhtml)
// }
let {Promise} = window

if (!Promise) alert('window does not support Promise')

axios.interceptors.response.use((response) => {
  let {data} = response
  try {
    data = typeof data === 'string' ? JSON.parse(data) : data
  } catch (e) {
    // Log.i(e)
    console.log(e)
    data = JSON.parse(data.replace(/\n/g, '\\\\n').replace(/\r/g, '\\\\r').replace(/\t/g, '\\\\t'))
  }
  // Log.i(data)
  console.log(data)
  if (data.global !== undefined) {
    if (data.global.flag !== 1 || !(data.responses instanceof Array) || data.responses.length !== 1) {
      return Promise.reject(response)
    } else {
      data.responses[0].items = data.responses[0].items || []
    }
  }
  if (data.code !== undefined && !(data.code === 200 || data.code === 201)) {
    return Promise.reject(response)
  }
  if (data.flag !== undefined && !(data.flag === 1 || data.flag === 200)) {
    return Promise.reject(response)
  }
  return data
}, (error) => {
  // Log.e(error)
  console.log(error)
  return Promise.reject(error)
})

const timeout = 10000
const http = {
  get (url, param = {}, config = {}) {
    checkUrl(url)
    checkParam(param)
    return axios(Object.assign({
      method: 'get',
      url: `${url}?${toQueryString(param)}`,
      timeout: timeout,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }, config))
  },
  postForm (url, param = {}, config = {}) {
    checkUrl(url)
    checkParam(param)
    return axios(Object.assign({
      method: 'post',
      url: url,
      data: param,
      timeout: timeout,
      transformRequest: [(data) => {
        return toQueryString(data)
      }],
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }, config))
  },
  postJson (url, param = {}, config = {}) {
    checkUrl(url)
    checkParam(param)
    return axios(Object.assign({
      method: 'post',
      url: url,
      data: toJsonString(param),
      timeout: timeout,
      headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }, config))
  },
  // postXml (funcId, param = {}, config = {}) {
  //   checkUrl(funcId)
  //   checkParam(param)
  //   param.funcId = funcId
  //   return axios(Object.assign({
  //     method: 'post',
  //     url: UrlConfig.doAction,
  //     data: toXmlString(param),
  //     timeout: timeout,
  //     headers: {'Content-Type': 'application/xml; charset=UTF-8'}
  //   }, config))
  // },
  // upload (file, param = {}, config = {}) {
  //   checkParam(param)
  //   let {FormData, setTimeout} = window
  //   if (!FormData) {
  //     alert('does not support')
  //     return new Promise((resolve, reject) => {
  //       setTimeout(reject, 20)
  //     })
  //   } else {
  //     let formData = new FormData()
  //     formData.append('file', file)
  //     for (let name in param) {
  //       formData.append(name, param[name])
  //     }
  //     return axios(Object.assign({
  //       method: 'post',
  //       url: UrlConfig.uploadFileAction,
  //       data: formData,
  //       headers: {'Content-Type': 'multipart/form-data'}
  //     }, config))
  //   }
  // },
  all (requests) {
    if (!(requests instanceof Array)) {
      throw new Error(`requests should be Array`)
    }
    return axios.all(requests)
  }
}

export {
  http as default
}
