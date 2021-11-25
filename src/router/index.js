import { createRouter, createWebHashHistory } from 'vue-router'
import Factions from '../components/Factions.vue'
import SetInfo from '../components/SetInfo.vue'
import PlayGuide from '../components/PlayGuide.vue'
import Flavor from '../components/Flavor.vue'
import Story from '../components/Story.vue'
import QuasarRoot from '../components/QuasarRoot.vue'
import Q2 from '../components/Q2.vue'
import Q2SetInfo from '../components/Q2SetInfo.vue'

const routes = [
  {
    path: '/',
    redirect: '/flavor'
  },
  {
    path:'/quasar',
    name: 'Quasar',
    component: QuasarRoot,
    children: [
      {
        path: '',
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
    ]
  },
  {
    path: '/singularity',
    name: 'Singularity',
    component: Q2,
    children: [
      {
        path: '',
        redirect: '/singularity/q2setinfo'
      },
      {
        path: '/singularity/q2setinfo',
        name: 'Q2SetInfo',
        component: Q2SetInfo
      },
    ]
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
