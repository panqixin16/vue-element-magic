import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import db from './datastore'

import CopyButton from './components/CopyButton'

import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$db = db

Vue.component("CopyButton", CopyButton)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
