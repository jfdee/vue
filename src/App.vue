<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <div class = "app">
      <h1> Тестовый проект </h1>
      <hr>
      <Buttons/>
    </div>
  </v-card>
</template>

<script>
import Buttons from "@/components/Buttons"
export default {
  name: 'test',
  components: {
    Buttons
  }
}
</script>
