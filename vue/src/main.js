import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import landing from './components/Landing'
import login from './components/Login'
import signup from './components/SignUp'
import error from './components/Error'
import lk from './components/LK'

Vue.config.productionTip = false


Vue.use(VueRouter);

const routes = [
  { path: '/', component: landing },
  { path: '/error', component: error },
  { path: '/signup', component: signup },
  { path: '/login', component: login },
  { path: '/lk', component:lk },
];

const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => {
    return h(App)
  }
});
