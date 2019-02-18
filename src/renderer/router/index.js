import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'projects-page',
      component: require('@/components/ProjectsPage').default,
      meta: {
        title: '首页',
        breadcrumb: [
          {
            name: '首页',
            path: '/',
          },
        ],
      },
    },
    {
      path: '/addProject',
      name: 'addProject-page',
      component: require('@/components/AddProject').default,
      meta: {
        title: '增加项目',
        breadcrumb: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '增加项目',
            path: '/addProject',
          },

        ],
      },
    },
    {
      path: '/projectMocks',
      name: 'projectMocks-page',
      component: require('@/components/ProjectMocks').default,
      meta: {
        title: '项目Mock列表',
        breadcrumb: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '项目Mock列表',
            path: '/projectMocks',
          },

        ],
      },
    },
    {
      path: '/addProjectMocks',
      name: 'addProjectMocks-page',
      component: require('@/components/AddProjectMocks').default,
      meta: {
        title: '增加Mock',
        breadcrumb: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '项目Mock列表',
            path: '/projectMocks',
          },
          {
            name: '增加项目Mock',
            path: '/AddProjectMocks',
          },
        ],
      },
    },
    {
      path: '/editProjectMocks',
      name: 'editProjectMocks-page',
      component: require('@/components/EditProjectMocks').default,
      meta: {
        title: '修改Mock',
        breadcrumb: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '项目Mock列表',
            path: '/projectMocks',
          },
          {
            name: '修改Mock',
            path: '/editProjectMocks',
          },
        ],
      },
    },
    {
      path: '/system',
      name: 'system-page',
      component: require('@/components/System').default,
      meta: {
        title: '修改Mock',
        breadcrumb: [
          {
            name: '系统',
            path: '/system',
          },
        ],
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
