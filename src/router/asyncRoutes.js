
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
  },
  {
    path: '/boxManage',
    name: 'boxManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '盒子管理',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('pages/boxManage/boxManage')
  },
  {
    path: '/recordManage',
    name: 'recordManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '操作日志',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('pages/recordManage/recordManage')
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
