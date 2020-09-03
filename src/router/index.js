import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../components/LoginAndRegister.vue'
import Editor from '../views/Editor.vue'
import Viewer from '../views/Viewer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/demo'
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
    path: '/viewer',
    name: 'Viewer',
    component: Viewer,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
