<template>
  <div id="app">
    <Head />
   <!-- <router-view/>-->
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
   <!--   <NewSongs></NewSongs>-->
    </div>
    <Player></Player>
    <DetaiPlayer></DetaiPlayer>
  </div>
</template>

<script>
  import Head from './components/header/Head'
  import Player from './components/Player'
  import DetaiPlayer from './components/DetailPlayer'
export default {
  name: 'app',
  components : {
    Head,Player,DetaiPlayer
  }
}
</script>
