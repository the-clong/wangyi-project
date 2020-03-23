export default [
  {
    path: '/home',
    component: () => import('@/pages/home'),
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: '/home/discover',
        component: () => import('@/pages/home/discover'),
        meta: {
          icon: 'faxian',
          title: '发现',
          requireAuth: true,
          keepAlive: true
        },
        children: [
          {
            path: '/home/discover/rank',
            component: () => import('@/components/discover-recommend')
          }
        ]
      },
      {
        path: '/home/videolist',
        meta: {
          icon: 'shipin',
          title: '视频'
        },
        component: () => import('@/pages/home/videolist')
      },
      {
        path: '/home/profile',
        meta: {
          icon: 'profile',
          title: '我的'
        }
      },
      {
        path: '/home/singerList',
        component: () => import('@/pages/home/singer-list'),
        meta: {
          icon: 'pengyou1',
          title: '歌手',
          keepAlive: true
        },
        children: [
          {
            path: ':id',
            component: () => import('@/pages/home/singer-list/singer-detail')
          }
        ]
      },
      {
        path: '/home/account',
        meta: {
          icon: 'zhanghao',
          title: '账号'
        }
      }
    ],
    redirect: '/home/discover'
  }
];
