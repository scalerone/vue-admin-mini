import axios from 'axios'
import router from '@/router'
import {removeSessionStorage} from './storage';
import Vue from 'vue'
import { Message } from 'element-ui' // 引用element-ui的加载和消息提示组件
// 请求超时时间配置
axios.defaults.timeout = 30000;
// api地址配置
axios.defaults.baseURL = "";
// console.log(process.env.VUE_APP_BASE_API)
Vue.prototype.$http = axios
// 在全局请求和响应拦截器中添加请求状态
let loading = null

// 请求拦截器
axios.interceptors.request.use(
    config => {
      config.headers = {
        'Content-Type': 'application/json'
      };
      // loading = Loading.service({ text: '拼命加载中' })
      let token = sessionStorage.getItem('-_token_-');
      if (token) {
        config.headers['token'] = token;
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
      if (loading) {
        loading.close()
      }
      //console.log(response)
      const code = response.status
      if ((code >= 200 && code < 300) || code === 304) {
        let errorCode = response.data.errCode;
        if(errorCode==='000000'){
          return Promise.resolve(response.data)
        }else {
          if (errorCode === 'SYS0404') {
            console.log('错误码：404 路由跳转 currentRoute  %o ', router.currentRoute.path);
            router.push({
              name: 'error',
              params: {
                isTimeout: false,
                path: router.currentRoute.path,
                desc: '您请求的资源找不到(错误码：404) ',
              },
            });
          } else if (errorCode === 'SYS0401') {
            removeSessionStorage('-_token_-');
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
          // Message.error(response.data.message)
          return Promise.resolve(response.data)
        }
        // return Promise.resolve(response.data)
      } else {
        return Promise.reject(response)
      }
    },
    error => {
      if (loading) {
        loading.close();
      }
      console.log(error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            // 返回401 清除token信息并跳转到登陆页面
            removeSessionStorage('-_token_-');
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
            break;
          case 404:
            Message.error('网络请求不存在');
            console.log('错误码：404 路由跳转 currentRoute  %o ', router.currentRoute.path);
            router.push({
              name: 'error',
              params: {
                isTimeout: false,
                path: router.currentRoute.path,
                desc: '您请求的资源找不到(错误码：404) ',
              },
            });
            break;
          case 502:
            router.push({
              name: 'error',
              params: {
                isTimeout: false,
                path: router.currentRoute.path,
                desc: '网关错误(错误码：502)，请联系系统管理员 ',
              },
            });
            break;
          default:
            Message.error(error.response.data.message ||'系统出错，请联系系统管理员（错误码：'+error.response.status+'）！');
        }
      } else {
        let controlParam = {
          desc: '',
          path: router.currentRoute.path,
          isTimeout: false,
        };
        // 请求超时或者网络有问题
        if (error.message.includes('timeout')) {
          Message.error('请求超时！请检查网络是否正常');
          controlParam.desc = '网络断开，请检查您的网络 ';
          controlParam.isTimeout = true;
        } else {
          Message.error('请求失败，请检查网络是否已连接');
          controlParam.desc = '页面加载失败 ';
        }
        router.push({
          name: 'error',
          params: controlParam,
        });
      }
      return Promise.reject(error);
    }
);



