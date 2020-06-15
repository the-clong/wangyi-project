const discover = r => require.ensure([], () => r(require('@/pages/home/discover')), 'discover');
const rank = r => require.ensure([], () => r(require('@/pages/rank')), 'rank');
const songSheet = r => require.ensure([], () => r(require('@/pages/song-sheet')), 'songSheet');
const rankDetail = r => require.ensure([], () => r(require('@/pages/rank/detail')), 'rankDetail');
const videoList = r => require.ensure([], () => r(require('@/pages/home/videolist')), 'videoList');
const profile = r => require.ensure([], () => r(require('@/pages/profile')), 'profile');
const singerList = r => require.ensure([], () => r(require('@/pages/home/singer-list')), 'singerList');
const singerDetail = r => require.ensure([], () => r(require('@/pages/home/singer-list/singer-detail')), 'singerDetail');
const account = r => require.ensure([], () => r(require('@/pages/account')), 'account');
export default [
  // {
  //   path: '/',
  //   component: App, // 顶层路由，对应index.html
  //   children: [
  // {
  //   path: '',
  //   redirect: '/discover'
  // },
  {
    path: '/discover',
    component: discover,
    meta: {
      icon: 'faxian',
      title: '发现',
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/videolist',
    meta: {
      icon: 'shipin',
      title: '视频'
    },
    component: videoList
  },
  {
    path: '/profile',
    meta: {
      icon: 'profile',
      title: '我的'
    },
    component: profile
  },
  {
    path: '/singerList',
    component: singerList,
    meta: {
      icon: 'pengyou1',
      title: '歌手',
      keepAlive: true
    },
    children: [
      {
        path: ':id',
        component: singerDetail
      }
    ]
  },
  {
    path: '/account',
    component: account,
    meta: {
      icon: 'zhanghao',
      title: '账号'
    }
  },
  {
    // 排行榜
    path: '/rank',
    component: rank,
    children: [
      {
        path: ':id',
        component: rankDetail
      }
    ]
  },
  {
    // 歌单
    path: '/songSheet',
    component: songSheet
  }
];
//   }
// ];
