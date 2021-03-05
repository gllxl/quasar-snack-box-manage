
/**
 * Routes that require authorized access
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('../pages/home/home')
  },
  {
    path: '/stockManage',
    name: 'stockManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '库存管理',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('pages/stockManage/stockManage')
  }
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('../layouts/MainLayout'),
    meta: {
      // index routing does not participate in permission filtering,
      // so there is no need to set permissions
      // roles: ['admin', 'editor', 'test']
    },
    children: asyncRoutesChildren
  }
]

export default asyncRoutes
