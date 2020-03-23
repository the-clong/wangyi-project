// 常用的路由，包括login,404,home等等
export default [
  {
    name: 'common-login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/login')
  },
  {
    name: 'phone-login',
    path: '/phoneLogin',
    meta: {
      title: '手机登录'
    },
    component: () => import('@/pages/login/phone')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/test',
    component: () => import('@/pages/test')
  },
  {
    path: '*',
    components: () => import('@/pages/_404')
  }
];
