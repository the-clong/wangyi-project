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
          icon: 'faxian',
          title: '发现'
        }
      },
      {
        path: 'videolist',
        meta: {
          icon: 'shipin',
          title: '视频'
        }
      },
      {
        path: 'profile',
        meta: {
          icon: 'profile',
          title: '我的'
        }
      },
      {
        path: 'friends',
        meta: {
          icon: 'pengyou1',
          title: '云村'
        }
      },
      {
        path: 'account',
        meta: {
          icon: 'zhanghao',
          title: '账号'
        }
      },
    ],
    redirect: '/home/discover'
  }
];