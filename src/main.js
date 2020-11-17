import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 导入Vant组件库
import './plugins/vant';
import 'vant/lib/index.css';
// 加载全局样式
import './styles/index.less';
// 自动设置 REM  基准值（html标签字体大小）
import 'amfe-flexible';

Vue.config.productionTip = false;

// 创建Vue根实例，将router、store配置到根实例中
// 把App根组件渲染到#app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
