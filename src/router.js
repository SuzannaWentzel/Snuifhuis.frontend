import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AppLogin from "./views/AppLogin";

Vue.use(Router);

function loadView(view) {
  const userId = localStorage.getItem('userId');
  if (!userId && view !== 'Home') {
    view = 'AppLogin'
  }
  return () =>
      import(`@/views/${view}.vue`);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: loadView('Home')
    },
    {
      path: "/login",
      name: "login",
      component: loadView('AppLogin')
    },
    {
      path: "/bewoner",
      name: "new bewoner",
      component: loadView('CreateBewonerView')
    },
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/profile",
      name: "profiel",
      component: loadView('Profile')
    }
  ]
});
