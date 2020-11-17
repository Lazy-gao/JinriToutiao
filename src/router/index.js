import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Login = () => import('views/login/Login')
const Layout = () => import('views/layout/Layout')
const Home = () => import('views/home/Home')
const Answers = () => import('views/answers/Answers')
const Video = () => import('views/video/Video')
const Profile = () => import('views/profile/Profile')

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 配置默认路由
        component: Home
      },
      {
        path: '/answers',
        component: Answers
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
