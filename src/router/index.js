import Vue from 'vue'
import Router from 'vue-router'

const NewSongs = r => require.ensure([], () => r(require('../views/NewSongs')), 'NewSongs');
const search = r => require.ensure([], () => r(require('../views/search')), 'search');
const rank = r => require.ensure([], () => r(require('../views/rank')), 'rank');
const RankInfo = r => require.ensure([], () => r(require('../views/RankInfo.vue')), 'RankInfo');
const plist = r => require.ensure([], () => r(require('../views/plist.vue')), 'plist');
const PlistInfo = r => require.ensure([], () => r(require('../views/PlistInfo.vue')), 'PlistInfo');
const singer = r => require.ensure([], () => r(require('../views/singer.vue')), 'singer');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/newSongs',
      component: NewSongs,
      alias: '/'
    },
    {
      path : '/Search',
      component : search
    },
    {
      path : '/Rank',
      component : rank
    },
    {
      path : '/Rank/info/:id',
      component : RankInfo
    },
    {
      path : '/Plist',
      component : plist
    },
    {
      path : '/Plist/info/:id',
      component : PlistInfo
    },
    {
      path : '/Singer',
      component : singer
    },
    {
      path: '*', redirect: '/'
    }
  ]
})
