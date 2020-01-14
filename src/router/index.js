import App from '../App';
export default [{
  path: '/',
  component: App,
  children: [
    {
      path: 'discover',
      component: () => import('@/page/discover/index'),
    },
    {
      path: 'videolist',
      component: () => import('@/page/videolist/index'),
    },
    {
      path: 'profile',
      component: () => import('@/page/profile/index'),
    },
    {
      path: 'friends',
      component: () => import('@/page/friends/index'),
    },
    {
      path: 'account',
      component: () => import('@/page/account/index'),
    },
  ]
}]