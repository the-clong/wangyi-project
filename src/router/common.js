const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const phoneLogin = r => require.ensure([], () => r(require('@/pages/login/phone')), 'phoneLogin');
const _404 = r => require.ensure([], () => r(require('@/pages/_404')), '_404');
// 常用的路由，包括login,404,home等等
export default [
  {
    name: 'common-login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: login
  },
  {
    name: 'phone-login',
    path: '/phoneLogin',
    meta: {
      title: '手机登录'
    },
    component: phoneLogin
  },
  {
    path: '/',
    redirect: '/login'
  },
  // {
  //   path: '/test',
  //   component: () => import(/* webpackChunkName: "test" */'@/pages/test')
  // },
  {
    path: '*',
    name: '_404',
    component: _404
  }
];
