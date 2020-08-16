import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import './style.css';

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


if (module.hot) {
    console.log(2)
    module.hot.accept();
    /*module.hot.accept('./source', () => {
        const str = require('./source').default
        console.log(str)
    })*/
}
