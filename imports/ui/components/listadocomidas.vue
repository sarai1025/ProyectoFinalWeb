<template>
  <div
    style="background: url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1553&q=80');
    background-size: 800px;
    background-repeat: no-repeat;
    background-position: start;
    height:100%;
    z-index:100;"
  >
    <v-container>
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>

      <div style="
    position: absolute;
    left: 800px;">
    <v-row position="end">
    <v-btn  class="mt-2 mb-2" rounded color="success"  to="/">Agregar un tipo de comida</v-btn>
    </v-row>
        <v-card class="mx-auto" width="550" align-self="end">
          <v-list-group v-for="(tipo, i) in tiposcomidas" :key="i" value="true" no-action sub-group>
            <template v-slot:activator>
            
                <v-list-item-title v-text="tipo.nombre"></v-list-item-title>
                <v-btn to="/">ensayo</v-btn>
            <v-btn to="/">ensayo</v-btn>
            <v-btn to="/">ensayo</v-btn>
            </template>

            <v-list-item v-for="(comida, j) in tipo.comidas" :key="j" link>
              <v-list-item-title v-text="comida"></v-list-item-title>
              <v-btn to="/">ensayo</v-btn>
            </v-list-item>
          </v-list-group>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import Menu from "../components/menu";

export default {
  components: {
    menuBar: Menu
  },
  data() {
    return {
      tiposcomidas: [
        {
          nombre: "ejemplo",
          comidas: ["Autocompletes", "Comboboxes", "Forms"]
        },
        { nombre: "ejemplo2", comidas: ["Sopa", "Pasta"] }
      ]
    };
  }
};
</script>

<style>
</style>