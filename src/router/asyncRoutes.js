
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
      icon: 'dns',
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
      icon: 'all_inbox',
      keepAlive: true
    },
    component: () => import('pages/boxManage/boxManage')
  },
  {
    path: '/noticeManage',
    name: 'noticeManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '公告管理',
      icon: 'featured_play_list',
      keepAlive: true
    },
    component: () => import('pages/noticeManage/noticeManage')
  },
  {
    path: '/orderManage',
    name: 'orderManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '订单管理',
      icon: 'list_alt',
      keepAlive: true
    },
    component: () => import('pages/orderManage/orderManage')
  },
  {
    path: '/replenishmentManage',
    name: 'replenishmentManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '补货管理',
      icon: 'playlist_add',
      keepAlive: true
    },
    component: () => import('pages/replenishmentManage/replenishmentManage')
  },
  {
    path: '/inventoryRecordManage',
    name: 'InventoryRecordManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '盘货管理',
      icon: 'playlist_add_check',
      keepAlive: true
    },
    component: () => import('pages/inventoryRecordManage/inventoryRecordManage')
  },
  {
    path: '/recordManage',
    name: 'recordManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '操作日志',
      icon: 'date_range',
      keepAlive: true
    },
    component: () => import('pages/recordManage/recordManage')
  },
  {
    path: '/adminManage',
    name: 'adminManage',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '管理员管理',
      icon: 'supervised_user_circle',
      keepAlive: true
    },
    component: () => import('pages/adminManage/adminManage')
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
