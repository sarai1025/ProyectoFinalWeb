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
          <v-btn class="mt-2 mb-2" rounded color="success" @click.stop="dialogTipo = true">
            <i class="fas fa-plus"></i> Agregar tipo de comida
          </v-btn>
        </v-row>
        <v-card class="mx-auto" width="550" align-self="end">
          <v-list-group v-for="(tipo, i) in tiposcomidas" :key="i" value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-title v-text="tipo.nombre"></v-list-item-title>

              <v-btn class="mr-2" outlined depressed small color="success" @click.stop="dialogComida = true">
                <i class="fas fa-plus"></i> Comida
              </v-btn>

              <v-btn
                class="mr-2"
                outlined
                depressed
                small
                color="blue darken-4"
                @click.stop="dialogTipo = true"
              >
                <i class="fas fa-pencil-alt"></i>
              </v-btn>
              <v-btn outlined depressed small color="red">
                <i class="fas fa-trash-alt"></i>
              </v-btn>
            </template>

            <v-list-item v-for="(comida, j) in tipo.comidas" :key="j">
              <v-list-item-title v-text="comida"></v-list-item-title>
              <v-btn
                class="mr-2"
                text
                depressed
                small
                color="blue darken-4"
                @click.stop="dialogComida = true"
              >
                <i class="fas fa-pencil-alt"></i>
              </v-btn>
              <v-btn class="mr-2" text depressed small color="red">
                <i class="fas fa-trash-alt"></i>
              </v-btn>
            </v-list-item>
          </v-list-group>
        </v-card>
      </div>

      <!--Dialogo para agregar y editar TIPOS DE comidas!-->
      <v-dialog v-model="dialogTipo" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Tipos de comidas</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>                              
                <v-col md="12">
                  <v-text-field label="Nombre del tipo de comida" hint></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field label="Nombre de la comida que pertenece a este grupo*" hint></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Campos obligatorios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogTipo = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="dialogTipo = false">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!--Dialogo para agregar y editar comidas!-->
      <v-dialog v-model="dialogComida" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Comida</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                
                <v-col md="12">
                  <v-text-field label="Nombre de la comida" hint></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogComida = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="dialogComida = false">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      ],
      dialogTipo: false,
      dialogComida: false
    };
  }
};
</script>

<style>
</style>