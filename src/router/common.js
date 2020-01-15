//常用的路由，包括login,404,home等等
export default [
  // {
  //   path: '/test',
  //   meta: {
  //     title: '测试'
  //   },
  //   component: () => import('@/views/test')
  // },
  {
    name: 'common-login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/login')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    components: () => import('@/pages/_404')
  }
]