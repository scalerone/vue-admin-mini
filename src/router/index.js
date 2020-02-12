import Vue from 'vue'
import VueRouter from 'vue-router'
import userData from "@/lib/userData";

//解决菜单双击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const Login = () => import('../pages/login/');

const Default = () => import("../pages/home/");



const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {public: true}
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../components/error'),
    meta: {public: true},
  },
  {
    path: '*',
    component: Default,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let requireAuth = to.matched.some(r => !r.meta.public);
  if (requireAuth) {
    if (userData.isLogin()) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (userData.isLogin()) {
      let url = to.query.redirect || "/";
      next(url)
    } else {
      next();
    }
  }
});

export default router
