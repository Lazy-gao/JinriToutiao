/*
Postcss 的配置文件
*/
module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    // 把px 转换成 rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      rootValue: 37.5,
      // 需要转换的css属性，* 表示所有属性都转换
      propList: ['*'],
    },
  },
};
