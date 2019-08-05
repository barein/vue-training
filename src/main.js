import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

//Webpack config to set components named BaseXxx as available everywhere
const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

new Vue({
  router, //this makes the router accessible in every component of the app
  store, //this makes the store accessible in every component of the app
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
