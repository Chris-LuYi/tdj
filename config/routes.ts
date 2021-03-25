export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/ac',
    name: 'attributeCalculator',
    icon: 'table',
    component: './AttributeCalculator',
  },
  {
    path: '/dc',
    name: 'damageCalculator',
    icon: 'calculator',
    component: './DamageCalculator',
  }, // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/ac',
  },
  {
    name: '空白页面',
    icon: 'smile',
    path: '/emptypage',
    component: './EmptyPage',
  },
  {
    component: './404',
  },
];
