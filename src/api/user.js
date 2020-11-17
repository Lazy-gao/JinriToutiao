/*
  用户相关请求模块
*/

import { request } from '@/network/request';


/*
  登录/ 注册
*/
export function login (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  });
};

/**
 * 发送短信验证码
 */
export function sendSms (mobile) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/sms/codes/${mobile}',
  })
}

/**
 * 获取登录用户信息
 */
export function getCurrentUser () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 添加请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.data.token}`
    // }
  })
}
