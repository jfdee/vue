import $ajax from 'axios'

export default{
    state: {
        pokemons: [],
    },

    actions: {
        async GET_POKEMONS_FROM_API({commit}, limit = 30) {
            return $ajax("https://pokeapi.co/api/v2/pokemon?limit=" + limit, {
                method: "GET"
            })
            .then ((pokemons) => {
                commit('UpdatePokemons', pokemons.data);
            })
        }
    },

    mutations: {
        UpdatePokemons: (state, pokemons) => {
            state.pokemons = pokemons;
        }
    },

    getters: {
        GET_POKEMONS(state) {
            return state.pokemons
        }
    }
}