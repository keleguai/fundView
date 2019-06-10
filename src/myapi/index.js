import axios from 'axios'
import store from "../store"

export default {
  array_random: function (array) {
    return Math.floor(Math.random() * array.length)
  },
  parseMyDate: function (date) {
    return new Date(parseInt(date)).toLocaleString().replace(/:\d{1,2}$/, ' ')
  },
  isPhone: function (phone_number) {
    return /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(phone_number)
  },
  isNull: function(str) {
    if(!str){
      return 'md-invalid'
    }
    return ''
  },
  isIdCard: function(str){
    if(!str){
      return 'md-invalid'
    }else {
      return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(str) ? '':'md-invalid'
    }
  },
  isPassword: function(str) {
    if(str){
      return str.length >= 6 ? '':'md-invalid'
    }
    return true
  },
  isPayPassword: function(str){
    if(str!=null){
      return /^\d{6}$/.test(str) ? '':'md-invalid'
    }
    return true
  },
  isMoreThanLastPage: function(page,lastPage) {
    return page<=lastPage&&page>0? '':'md-invalid'
  },
  returnTop: function (id_name) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  code: {
    success: 100,
    tokenExpired: 401
  },
  // 接口处理函数
  apiAxios: function (method, url, params, success, failure) {
    let _this = this
    store.commit("show")
    axios({
      method: method,
      url: global.IP + url + "?token=" + sessionStorage.getItem("token"),
      data: (method === 'POST' || method === 'PUT') ? params : null,
      params: (method === 'GET' || method === 'DELETE') ? params : null,
      baseUrl: global.IP,
      withCredentials: false
    }).then(function (res) {
      store.commit("hide")
      if (success) {
        if (res.data.code == _this.code.tokenExpired) {
          store.commit("logout");
          store.commit("showDialog", {code: res.data.code, content: res.data.msg})
        } else if (res.data.code == _this.code.success) {
          success(res.data)
        } else {
          store.commit("showDialog", {code: res.data.code, content: res.data.msg})
          // _this.$alert.show(res.data.code, res.data.msg)
        }
      }
    }).catch(function (error) {
      store.commit("showDialog", {code: "0000", content: error.toString()})
      store.commit("hide")
      failure(error)
    })
  },
  get: function (url, params, success, failure) {
    return this.apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return this.apiAxios('POST', url, params, success, failure)
  },
  getWhatDay:function() {
    let date = new Date();
    let m = parseInt(date.getHours());
    let whatDay = 0;
    let day = parseInt(date.getDay());
    if (day >= 1 && day <= 4) {
      whatDay += m < 15 ? 0 : 1
    } else {
      if (day == 5) {
        whatDay += m < 15 ? 0 : 3
      } else {
        whatDay += day == 0 ? 1 : 2
      }
    }
    date.setDate(date.getDate() + whatDay);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 15:00"
  },
}
