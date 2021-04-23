import { createRouter, createWebHashHistory } from 'vue-router'
import Factions from '../components/Factions.vue'
import SetInfo from '../components/SetInfo.vue'
import PlayGuide from '../components/PlayGuide.vue'

const routes = [
  {
    path: '/',
    redirect: '/factions'
  },
  {
    path: '/factions',
    name: 'Factions',
    component: Factions
  },
  {
    path: '/setinfo',
    name: 'SetInfo',
    component: SetInfo
  },
  {
    path: '/playguide',
    name: 'PlayGuide',
    component: PlayGuide
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  scrollBehavior () {
    return { left:0, top:0, behavior:'smooth' }
  },
  routes
})

export default router
