/* Este componente es el encargado de gestionar, para el usuario administrador,
 los tipos de comidas y sus respectivos platos de comidas */

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
          <v-list-group v-for="(tipo, i) in tipoComidas" :key="i" value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-title v-text="tipo.nombre"></v-list-item-title>

              <v-btn
                class="mr-2"
                outlined
                depressed
                small
                color="success"
                @click.stop="dialogComida = true; selectedTipoComida=tipo"
              >
                <i class="fas fa-plus"></i> Comida
              </v-btn>

              <v-btn
                class="mr-2"
                outlined
                depressed
                small
                color="blue darken-4"
                @click.stop="dialogTipo=true; selectedTipoComida= tipo; modoEditar=true"
              >
                <i class="fas fa-pencil-alt"></i>
              </v-btn>
              <v-btn outlined depressed small color="red">
                <i class="fas fa-trash-alt" @click.stop="borrarTipoComida(tipo)"></i>
              </v-btn>
            </template>

            <v-list-item v-for="(comidita, j) in tipo.comidas" :key="j">
              <v-list-item-title v-text="comidita"></v-list-item-title>
              <v-btn
                class="mr-2"
                text
                depressed
                small
                color="blue darken-4"
                @click.stop="dialogComida=true; selectedTipoComida= tipo; indiceComida=j; selectedComida= comidita; modoEditar=true"
              >
                <i class="fas fa-pencil-alt"></i>
              </v-btn>
              <v-btn
                class="mr-2"
                @click.stop="borrarComida(tipo,comidita)"
                text
                depressed
                small
                color="red"
              >
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
                  <v-text-field v-if="modoEditar!=true" v-model="tipoComida.nombre" label="Nombre del tipo de comida" hint></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field v-if="modoEditar===true" v-model="selectedTipoComida.nombre" label="Nombre del tipo de comida" hint></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                  v-if="modoEditar!=true"
                    v-model="tipoComida.comidas"
                    label="Nombre de las comidas que pertenecen a este grupo*"
                    hint
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small v-if="modoEditar!=true">*Campos obligatorios. Nota: Deben ir separadas por una coma simple ','</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelar(); modoEditar=false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text v-if="modoEditar===true" @click="editarTipoComida(selectedTipoComida.nombre); modoEditar=false">Guardar</v-btn>
            <v-btn color="blue darken-1" text v-else @click="addTipoComida(); modoEditar=false">Guardar</v-btn>
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
                  <v-text-field v-if="modoEditar!=true" v-model="comidaAgregar" label="Nombre de la comida" hint></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field v-if="modoEditar===true" v-model="this.selectedComida" label="Nombre de la comida" hint></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelarComida(); modoEditar=false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text v-if="modoEditar===true" @click="editarComida(this.selectedComida); modoEditar=false">Guardar</v-btn>
            <v-btn color="blue darken-1" v-else text @click="addComida(); modoEditar=false">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { ComidasCollection } from "../../api/comidas";
import Menu from "../components/menu";
import Faker from "faker";

export default {
  components: {
    menuBar: Menu
  },
  data() {
    return {
      modoEditar: false,
      selectedTipoComida: "",
      indiceComida:"",
      selectedComida:"",
      comidaAgregar: "",
      dialogTipo: false,
      dialogComida: false,
      tipoComida: {
        nombre: "",
        comidas: ""
      }
    };
  },
  meteor: {
    $subscribe: {
      tipoComidas: []
    },
    tipoComidas() {
      return ComidasCollection.find({});
    }
  },
  methods: {
    /* Nombre del método: limpiarComida()
    Objetivo: Vaciar los campos que se utilizan al registrar una comida
    Entradas: Ninguna 
    Salidas: Ninguna*/
    limpiarComida() {
      this.tipoComida.nombre = "";
      this.tipoComida.comidas = "";
    },
     /* Nombre del método: addTipoComida()
    Objetivo:Permite al usuario administrador registrar un tipo de comida
    Entradas: Ninguna 
    Salidas: Ninguna*/
    addTipoComida() {
      this.tipoComida.comidas = this.tipoComida.comidas.split(",");
      Meteor.call("tiposComidas.add", this.tipoComida);
      this.dialogTipo = false;
      this.limpiarComida();
    },
    /* Nombre del método: addComida()
    Objetivo:Permite al usuario administrador registrar un plato de comida
    con su respectivo tipo de comida
    Entradas: Ninguna 
    Salidas: Ninguna*/
    addComida() {
      Meteor.call("comidas.add", this.selectedTipoComida, this.comidaAgregar);
      this.dialogComida = false;
      (this.selectedTipoComida = ""), (this.comidaAgregar = "");
    },
    /* Nombre del método: cancelar()
    Objetivo:Permite al usuario administrador cancelar la acción de agregar
    un nuevo tipo de comida (es decir, un nuevo grupo de comida)
    Entradas: Ninguna 
    Salidas: Ninguna*/
    cancelar() {
      this.limpiarComida(), (this.dialogTipo = false);
    },
    /* Nombre del método: cancelarComida()
    Objetivo:Permite al usuario administrador cancelar la acción de agregar
    un nuevo plato de comida
    Entradas: Ninguna 
    Salidas: Ninguna*/
    cancelarComida() {
      this.selectedTipoComida = "";
      this.comidaAgregar = "";
      this.dialogComida = false;
    },
      /* Nombre del método: borrarTipoComida()
    Objetivo:Permite al usuario administrador borrar un grupo de comida registrado
    Entradas: el objeto tipoComida a borrar 
    Salidas: Ninguna*/
    borrarTipoComida(tipoComida) {
      Meteor.call("tiposComidas.delete", tipoComida);
    },
    /* Nombre del método: borrarComida()
    Objetivo:Permite al usuario administrador borrar un plato de comida registrado
    Entradas: el objeto tipoComida a borrar y el plato de comida a borrar
    Salidas: Ninguna*/
    borrarComida(tipoComida, comida) {
      console.log(comida);
      Meteor.call("comidas.delete", tipoComida, comida);
    },
    /* Nombre del método: editarTipoComida()
    Objetivo:Permite al usuario administrador editar un tipo o grupo de comida registrado
    Entradas: el nombre nuevo para el grupo de comidas
    Salidas: Ninguna*/
    editarTipoComida(nombreNuevo){
      Meteor.call("tipoComidas.edit", this.selectedTipoComida, nombreNuevo)
      this.dialogTipo=false
      this.selectedTipoComida=""
    },
    /* Nombre del método: editarComida()
    Objetivo:Permite al usuario administrador editar un plato de comida registrado
    Entradas: el nombre nuevo para el plato de comida
    Salidas: Ninguna*/
    editarComida(nombreNuevo){
      Meteor.call("comidas.edit",this.selectedTipoComida,nombreNuevo, this.indiceComida)
      this.dialogComida=false
      this.selectedTipoComida=""
      this.indiceComida=""
    }
  }
};
</script>

<style>
</style>