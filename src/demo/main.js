import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;
import '../../public/middleware/process'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


if (module.hot) {
    module.hot.accept();
    /*module.hot.accept('./source', () => {
        const str = require('./source').default
        console.log(str)
    })*/
}
