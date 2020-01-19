<template>
  <div class="homepage">
    <div id="nav" class="nav">
      <div class="nav-block">
        <a href="#front-banner">SNUIFHUIS</a>
        <!--<router-link to="/">SNUIFHUIS</router-link>-->
      </div>
      <div class="nav-block">
        <a href="#bewoner_banner">BEWONERS</a>
        <!--<router-link to="/" href="#bewoner_banner">BEWONERS</router-link>-->
      </div>
      <div class="nav-block">
        <a href="#photo-banner">FOTO'S</a>
      </div>

      <div class="nav-block">
        <router-link to="/" title="Food Wall of Shame">FWOS</router-link>
      </div>

      <div class="nav-block">
        <router-link to="/">TITELS</router-link>
      </div>
      <!--<div class="burger">-->
        <!--<i class="fas fa-hamburger" @click="showNav()"></i>-->
      <!--</div>-->
      <b-dropdown id="dropdown-login" class="m-md-2 dropdown-login" variant="link" toggle-class="text-decoration-none" right no-caret>
        <template v-slot:button-content>
          <i id="login-icon" class="fas fa-user-astronaut login-icon"></i>
        </template>
        <b-dropdown-item v-if="userId"><router-link to="/profile">Profile</router-link></b-dropdown-item>
        <b-dropdown-divider v-if="userId"></b-dropdown-divider>
        <b-dropdown-item v-if="userId" @click="logout()">Logout</b-dropdown-item>
        <b-dropdown-item v-else @click="login()">Login</b-dropdown-item>
      </b-dropdown>

    </div>
    <FrontBanner/>
    <BewonerBanner/>
    <PhotoBanner/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import FrontBanner from "../components/frontpage/FrontBanner";
  import BewonerBanner from "./BewonerBanner";
  import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'
  import PhotoBanner from "../components/frontpage/PhotoBanner";


  export default {
  name: "home",
  components: {
    PhotoBanner,
    BewonerBanner,
    FrontBanner},
    methods: {
      showNav() {
        let nav = document.getElementById("nav");
        console.log(nav);

        if (nav.className === "") {
          nav.className += "responsive";
        } else {
          nav.className = "";
        }
      },
      login() {
        this.$router.push({name: 'login'});
      },
      logout() {
        localStorage.removeItem(GC_USER_ID);
        localStorage.removeItem(GC_AUTH_TOKEN);
        this.$root.$data.userId = localStorage.getItem(GC_USER_ID);
      },
    },
    computed: {
      userId() {
        return localStorage.getItem('userId');
      }
    },
    mounted() {
      console.log('Mounting home...')
      let nav = document.getElementById('nav');
      let stickyNavTop = nav.offsetTop;

      function makeDark() {
        let navBlocks = document.getElementsByClassName('nav-block');
        for (let block of navBlocks) {
          block.classList.add('not-white');
        }

        let loginIcon = document.getElementById('login-icon');
        loginIcon.classList.add('not-white');
      }

      function removeDark() {
        let navBlocks = document.getElementsByClassName('nav-block');
        for (let block of navBlocks) {
          block.classList.remove('not-white');
        }

        let loginIcon = document.getElementById('login-icon');
        loginIcon.classList.remove('not-white');
      }

      let stickyNav = function(){
        let bewonerbanner = document.getElementById('bewoner_banner');
        let photosbanner = document.getElementById('photo-banner');
        let bewonerTop = bewonerbanner.offsetTop;
        let photosTop = photosbanner.offsetTop;
        let nav = document.getElementById('nav');

        let scrollTop = window.scrollY;
        console.log(scrollTop);
        console.log(bewonerTop);

        if (scrollTop >= (bewonerTop - 100) && scrollTop <= (photosTop -100)){
          makeDark();
        } else {
          removeDark();
        }

        if (scrollTop > stickyNavTop) {
          console.log(nav.classList)
          nav.classList.add('sticky');
        } else {
          nav.classList.remove('sticky');
        }
      };

      window.addEventListener('scroll', stickyNav);
    }
};
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 600px){

    .homepage {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    #nav {
      z-index: 1000;
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: flex-end;
      background: transparent;

      .nav-block {
        display: none;
      }
    }

    #nav.responsive {
      .nav-block {
        float: none;
        display: block !important;
        text-align: left;
        position: relative;
        background-color: rgba(0, 0, 0, 0.6);
      }

      .burger {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .nav-block {
      padding-left: 20px;
      font-size: 18px;
      a {
        color: white;
        text-decoration: none;
        line-height: 60px;
      }
    }

    .burger {
      color: white;
      line-height: 60px;
      font-size: 24px;
      float: right;
      padding-right: 20px;
    }

    .login-icon {
      color: white;
      font-size: 2.5rem;
      margin: 1rem 1.5rem;

      &:active {
        color: var(--my-yellow);
      }
    }

    .dropdown-menu {
      background: black;

      & a {
        color: white
      }
    }
  }

  @media screen and (min-width: 601px){
    #nav {
      height: 60px;
      margin-top: 55vh;
      width: 100%;
      box-sizing: border-box;
      z-index: 1000;
      position: absolute;
      display: flex;
      align-content: center;
      justify-content: center;
      flex-flow: row nowrap;
      font-family: segoe UI;
      a {
        font-weight: bold;
      }
    }

    .nav-block {
      width: 150px;
      height: 40px;
      margin-left: 0.5%;
      margin-right: 0.5%;
      margin-top: 10px;
      background-color: rgba(255, 255, 255, 0.6);

      a {
        font-size: 18px;
        line-height: 40px;
        color: black !important;
        text-decoration: none;
        &.router-link-exact-active {
          color: #2E0E02 !important;
        }
      }

      &.not-white {
        border: 1px #2E0E02 !important;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }
    }

    .burger {
      display: none;
    }

    .login {
      color: white;
      font-size: 40px;
      z-index: 1000;

      &.not-white {
        color: #2E0E02 !important;
      }
    }

    .login-icon {
      color: white;
      font-size: 40px;
      margin-top: -5px;

      &.not-white {
        color: #2E0E02 !important;
      }
    }

    #nav.sticky {
      position: sticky;
      float: left;
      width: 100%;
      left: 0;
      top: 20px;
      z-index: 100;
      border-top: 0;
      margin-top: 0;
    }
  }

</style>
