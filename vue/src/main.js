import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store';

import landing from './components/Landing'
import login from './components/Login'
import signup from './components/SignUp'
import error from './components/Error'
import lk from './components/LK'

Vue.config.productionTip = false


Vue.use(VueRouter);

const routes = [{
    path: '/',
  component: landing,
  login: true
    
  },
  {
    path: '/error',
    component: error,
    login: false
  },
  {
    path: '/signup',
    component: signup,
    login: false
  },
  {
    path: '/login',
    component: login,
    login: false

  },
  {
    path: '/lk',
    name:'lk',
    component: lk,
    login: true
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((from, to, next) => {
  // console.log(to);
  // if (!to.login) {
  //   alert('FALSE');
  // } else {
    next();

  // }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => {
    return h(App)
  }
});