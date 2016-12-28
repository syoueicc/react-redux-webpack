import Vue from "vue";
import _ from "lodash";

const hasPrefix = /^https?:\/\/(test|rc)\./.test(document.location.href);
window['_GLOBAL_prefix_'] = hasPrefix ? `${RegExp.$1}.` : '';

const configApis = {
  "selectMyreward":{
    url:`http://${_GLOBAL_prefix_}vote.longzhu.com/api/getuserprizerecord/aug3jwn6`,
    type: 'jsonp',
    params: true
  },
  "getReward":{
    url:`http://${_GLOBAL_prefix_}vote.longzhu.com/api/getprizelist/aug3jwn6`,
    type: 'jsonp'
  },
  "getYzcm": {
    url: `http://${_GLOBAL_prefix_}longzhu.com/yzcm`,
    type: 'jsonp'
  },
  "getBigbangPicture": {
    // url: `http://${prefix}bigbang.longzhu.com/api/at`,
    url: `http://${_GLOBAL_prefix_}bigbang.longzhu.com/api/at`,
    type: 'jsonp'
  },
  "geiWxbigbang": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/user/rank`,
    type: "get"
  },
  "getbigbangWxmy": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/user/my`,
    type: "get"
  },
  "getVoteInfo": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/user/info`,
    type: "get",
    params: true
  },
  "postVote": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/vote`,
    type: "post"
  },
  "getWxConfig": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/wechat/config`,
    type: "get"
  },
  "postCaptcha": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/captcha`,
    type: "post"
  },
  "postFormData": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/user/register`,
    type: "post"
  },
  "getImgbase": {
    url: `//${_GLOBAL_prefix_}bigbang.longzhu.com/api/wechat/getmedia`,
    type: "get"
  },
  "voteAction": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/lottery/aug3jwn6`,
    type: "jsonp"
  },
  "submitAddress":{
     url: `//${_GLOBAL_prefix_}vote.plu.cn/api/register/aug3jwn6`,
    type: "jsonp"
  }
}

const vueHttp = {};
_.each(configApis, (v, k)=>{
  vueHttp[k] = function(p) {
    let parseData = '';
    if(v.params == true){
      parseData = [`${v.url.replace(/\/$/, '')}/${p.join('/')}`];
    }else {
      if(v.type=="jsonp") {
      parseData = _.map(p, (value,key)=>[key,value].join('=')).join('&');
      parseData = _.isEmpty(parseData) ? '' : "?" + parseData;
      parseData = [v.url + parseData];
      }else if(v.type == "post") {
        parseData = [v.url, p];
        Vue.http.options.emulateJSON = true;
      }else{
        parseData = [v.url, {params: p}];
        Vue.http.options.emulateJSON = true;
      }
    }
    return Vue.http[v.type](...parseData).then(r => r.json(), err=>console.log(err));
  }
})

export default vueHttp;
