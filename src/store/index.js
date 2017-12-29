import Vue from  'vue'
import  Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state :{
    head : {
      toggle : false,
      title : '',
      style : {'background' : 'rgbs(43,162,251,0)'}
    },
    headNav : 'head-nav1',
    listInfo : {
      songList : [],
      songIndex : 0
    },
    audioLoadding : false,
    audio : {
      songUrl : '',
      imgUrl : 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title : '',
      singer : '',
      currentLength : 0,
      songLength : 0,
      currentFlag : false,
      listenCount : 0
    },
    detailPlayerFlag :false,
    showPlayer : false,
    isPlay : true
  },
  getters : {
    head : state => state.head,
    headNav : state => state.headNav,
    audio : state => state.audio,
    audioLoadding : state => state.audioLoadding,
    showPlayer : state => state.showPlayer,
    isPlay :state => state.isPlay,
    detailPlayerFlag : state => state.detailPlayerFlag
  },
  mutations : {
    setHeadNav : (state,nav) =>{
        state.headNav = nav
    },
    setListInfo : (state,{list,index}) => {
      state.listInfo.songList = list;
      state.listInfo.songIndex = index
    },
    toggleAudioLoading : (state,flag) => {
      state.audioLoadding = flag;
    },
    setAudio : (state,audio) => {
      if(!state.listenCount){
        state.showPlayer = true ; //首次进入应用时不可打开播放详情
      }
      state.listenCount++;
      state.audio = {...(state.audio), ...audio};
    },
    setLrc : (state,lrc) => {
      state.audio = {...(state.audio), lrc}
    },
    showDetailPlayer : (state,flag) => {
      state.detailPlayerFlag = flag;
    },
    isPlay : (state , flag) => {
      state.isPlay = flag;
    },
    setCurrent : (state,flag) => {
      state.audio.currentFlag = flag;
    },
    setAudioTime : (state,time) => {
      state.audio.currentLength = time;
    },
    setHeadTitle : (state,title) => {
      state.head.title = title;
    },
    setHeadStyle : (state,style) => {
      state.head.style = style;
    },
    showHead : (state,flag) => {
      state.head.toggle = flag;
    }
  },
  actions : {
    getSong({commit,state},hash){
      commit('toggleAudioLoading',true);
      axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(
        ({data}) => {
            data = data.data;
            const songUrl = data.play_url;
            const imgUrl = data.img;
            const title = data.audio_name;
            const songLength = data.timelength / 1000;
            const singer = data.author_name;
            const currentLength = 0;
            const lrc = data.lyrics;
            const audio = {songUrl, imgUrl, title, singer, songLength, currentLength};
            commit('setAudio', audio);
            commit('setLrc', lrc);
            commit('toggleAudioLoading', false)
        }
      )
    },
    prev({dispatch, state}){
      var list = state.listInfo.songList;
      if(state.listInfo.songIndex == 0){
        state.listInfo.songIndex = list.length;
      }
      else{
        state.listInfo.songIndex--;
      }
      if(list[state.listInfo.songIndex])
      {
        var hash = list[state.listInfo.songIndex]['hash'];
        dispatch('getSong',hash);
        /* dispatch('getLrc',hash);*/
      }
    },
    next({dispatch, state}){
      var list = state.listInfo.songList;
      if(state.listInfo.songIndex == list.length - 1){
        state.listInfo.songIndex = 0;
      }
      else{
        ++state.listInfo.songIndex;
      }
      if(list[state.listInfo.songIndex])
      {
        var hash = list[state.listInfo.songIndex]['hash'];
        dispatch('getSong',hash);
       /* dispatch('getLrc',hash);*/
      }
    }
  }
})
export default store;
