import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    request: operation => {
      operation.setContext({
        headers: {
          authorization: 'Bearer '+ store.state.token
        },
      });
    }}),
  render: h => h(App)
}).$mount("#app");
