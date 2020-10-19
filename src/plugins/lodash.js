import _ from 'lodash';


export default ({
    install(Vue, options){
        Vue.prototype.$_ = _
    }
});
