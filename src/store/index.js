import Vue from 'vue'
import Vuex from 'vuex'
import Pokemon from './modules/Pokemon/index'
import Bank from './modules/Bank/Index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Pokemon,
    Bank,
  }
})

