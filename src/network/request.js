/*
  网络请求模块封装
*/
import axios from 'axios';
// 在非组件模块中获取store必须通过这个方式加载
import store from '@/store'

export function request (option) {
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    timeout: 5000
  });
  // 请求拦截器
  instance.interceptors.request.use(config => {
    const { user } = store.state
    // 判断一下用户是否登录，如果登录了，就统一设置请求头
    if (user) {
      config.headers.Authorization = `Bearer ${user.data.token}`
    }
    // 处理完之后一定要把 config 返回，否则请求就会停在这里
    return config
  }, error => {
    return Promise.reject(error)
  })
  return instance(option);
};
