import { createRouter, createWebHashHistory } from 'vue-router'
import Factions from '../components/Factions.vue'
import SetInfo from '../components/SetInfo.vue'
import PlayGuide from '../components/PlayGuide.vue'
import Flavor from '../components/Flavor.vue'
import Story from '../components/Story.vue'

const routes = [
  {
    path: '/',
    redirect: '/flavor'
  },
  {
    path: '/flavor',
    name: 'Flavor',
    component: Flavor,
    children:[
      {
        path: '',
        redirect: '/flavor/factions'
      },
      {
        path: 'factions',
        name: 'Factions',
        component: Factions
      },
      {
        path: 'story',
        name: 'Story',
        component: Story
      },
    ]
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
