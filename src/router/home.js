export default [
  {
    path: '/home',
    component: () => import('@/pages/home'),
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: 'discover',
        meta: {
          title: '发现'
        }
      },
      {
        path: 'videolist',
        meta: {
          title: '视频'
        }
      },
      {
        path: 'profile',
        meta: {
          title: '我的'
        }
      },
      {
        path: 'friends',
        meta: {
          title: '云村'
        }
      },
      {
        path: 'account',
        meta: {
          title: '账号'
        }
      },
    ]
  }
];