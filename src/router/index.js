import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../components/LoginAndRegister.vue'
import Editor from '../views/Editor.vue'
import Viewer from '../views/Viewer.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/demo',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/2demo',
    component: () => import('../components/BoardsTable.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/viewer/:id',
    name: 'Viewer',
    component: Viewer,

  }
]

const router = new VueRouter({
  routes
})

export default router
