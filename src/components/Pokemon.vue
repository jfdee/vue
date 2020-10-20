<template>

<div class="app">
  <div class="header">
  </div>
      
  <v-expansion-panels>
    <v-expansion-panel
        v-for="(pokemon, index) in pokemons.data.results"
        :key="pokemon.name">
        <v-expansion-panel-header>
        {{index}}.
        {{pokemon.name}}
        </v-expansion-panel-header>
          
        <v-expansion-panel-content>
          URL : {{pokemon.url}}
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script>
import $ajax from 'axios'
export default {
  computed: {
      pokemons() {
        return this.$store.getters.GET_POKEMONS
      }
  },


  async mounted(){
      return $ajax.get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then ((pokemons) => {
          this.$store.commit('UpdatePokemons', pokemons);
      })
  },

}
</script>

<style>
.header {
    display: flex;
    background-color: #e7e7e7;
    border-bottom: solid #e7e7e7;
    justify-content: center;
}
</style>