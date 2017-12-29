<template>
  <div class="header">
      <HeadLog></HeadLog>
      <RankHead v-if="head.toggle" :title="head.title" :cStyle="head.style"></RankHead>
      <HeadNav v-else></HeadNav>
  </div>
</template>
<script type="es6">
import HeadLog from './HeadLogo'
import HeadNav from './HeadNav'
import RankHead from './RankHead'
import {mapGetters} from 'vuex'
export default{
  computed : {
    ...mapGetters(['head'])
  },
  components : {
    HeadLog,HeadNav,RankHead
  }
}
</script>
