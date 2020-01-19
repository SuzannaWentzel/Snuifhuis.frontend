<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import mapState, {mapMutations} from "vuex";
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue';
  import VCalendar from 'v-calendar';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';


  Vue.use(BootstrapVue);
  Vue.use(VCalendar);

  export default {
    name: "App",
  };

  // let nav = document.getElementById('nav');
  // let scrollTop = window.scrollY;
  // let triggerDiv = document.getElementById('bewoner_banner').offsetTop;
  //
  // window.scroll(function(){
  //   scrollTop = window.scrollTop();
  //   if(scrollTop > 500){
  //     nav.find('a').removeClass().addClass('changeColor');
  //   }else{
  //     nav.find('a').removeClass();
  //   }
  //   if(scrollTop > triggerDiv){
  //     nav.find('a').removeClass().addClass('changeColor2');
  //   }
  // });

</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  @media screen and (max-width: 600px){
    html {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 601px){
    html {
      font-size: 16px;
    }
  }

#app {
  font-family: "Segoe UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
