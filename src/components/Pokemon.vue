<template>

<div class="app">
  <div class="header">
        All pokemons : {{GET_POKEMONS.count}}
        <br>
        Showed pokemons: {{GET_POKEMONS.results.length}}
  </div>
      
  <v-expansion-panels>
    <v-expansion-panel
        v-for="(pokemon, index) in GET_POKEMONS.results" 
        :key="pokemon.name"
      >
        <v-expansion-panel-header>
            #{{index}}
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "app",

  computed: mapGetters ([
    "GET_POKEMONS"
    ]),

  methods: mapActions ([
    "GET_POKEMONS_FROM_API"
  ]),

  async mounted(){
    this.GET_POKEMONS_FROM_API()
  }
  
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