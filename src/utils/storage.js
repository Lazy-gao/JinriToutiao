/**
 * 本地存储模块封装
*/
export const getItem = name => {
  // 从本地存储中获取数据存入变量中
  const data = window.localStorage.getItem(name)
  // 为什么把 JSON.parse 放发哦try-catch 中
  // 因为获取到的数据可能不是JSON格式字符串
  try {
    // 把获取到的数据转换成JavaScript对象格式
    return JSON.parse(data)
  } catch (err) {
    // 如果不是JSON字符串，那么原样返回
    return data
  }

}
export const setItem = (name, value) => {
  // 如果 value 是对象，就把 value 转换为JSON格式字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
