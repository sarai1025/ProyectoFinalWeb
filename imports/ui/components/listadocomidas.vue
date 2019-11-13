<template>
  <div
    style="background: url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1553&q=80');
    background-size: 800px;
    background-repeat: no-repeat;
    background-position: right;
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
    right: 800px;">
        <v-row position="end">
          <v-btn class="mt-2 mb-2" rounded color="success" to="/"> <i class="fas fa-plus"></i> Agregar tipo de comida</v-btn>
        </v-row>
        <v-card class="mx-auto" width="550" align-self="end">
          <v-list-group v-for="(tipo, i) in tiposcomidas" :key="i" value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-title v-text="tipo.nombre"></v-list-item-title>
             
              <v-btn class="mr-2" outlined depressed small color="success">
                <i class="fas fa-plus"></i> Comida
              </v-btn>
              
               <v-btn class="mr-2"
                            outlined
                            depressed
                            small
                            color="blue darken-4"
                            @click.stop="dialog = {open:true}"
                          >
                            <i class="fas fa-pencil-alt"></i>
                          </v-btn>
              <v-btn outlined depressed small color="red">
                <i class="fas fa-trash-alt"></i>
              </v-btn>
            </template>

            <v-list-item v-for="(comida, j) in tipo.comidas" :key="j" >
              <v-list-item-title v-text="comida"></v-list-item-title>
               <v-btn class="mr-2"
                            text 
                            depressed
                            small
                            color="blue darken-4"
                            @click.stop="dialog = {open:true}"
                          >
                            <i class="fas fa-pencil-alt"></i>
                          </v-btn>
              <v-btn class="mr-2" text  depressed small color="red">
                <i class="fas fa-trash-alt"></i>
              </v-btn>
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