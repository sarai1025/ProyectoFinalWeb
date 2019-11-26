/* Este componente es con el propósito de agregar o editar el elemento vino. Es el Dialog que aparece para realizar esas funciones
mencionadas. */
<template>
  <v-dialog v-model="dialog.open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Vino</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col md="12">
              <v-text-field v-model="vino.nombre" label="Nombre*" required></v-text-field>
            </v-col>
            <v-col md="8">
              <v-text-field
                v-model="vino.precio"
                label="Precio*"
                required
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="vino.cantidad" label="Cantidad" required type="number" min="1"></v-text-field>
            </v-col>
            <v-col md="12">
              <v-textarea v-model="vino.descripcion" label="Descripción"></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="vino.comida"
                :items="allComidas"
                dense
                chips
                small-chips
                label="Comida"
                multiple="true"
                background-color="white"
                filled
              ></v-autocomplete>
            </v-col>
            <v-col md="12">
              <v-text-field v-model="vino.imagen" label="Enlace del icono del vino"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="vino.fotos[0]" label="Enlace foto 1"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="vino.fotos[1]" label="Enlace foto 2"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="vino.fotos[2]" label="Enlace foto 3"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Campos obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog.open = false; modoEditar=false; limpiarVinos()"
        >Cancelar</v-btn>
        <v-btn
          color="blue darken-1"
          text
          v-if="dialog.modoEditar===true"
          @click="editarVino(); dialog.modoEditar=false"
        >Actualizar</v-btn>
        <v-btn color="blue darken-1" text v-else @click="addVino();">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VinosCollection } from "../../api/vinos";
import { ComidasCollection } from "../../api/comidas";

import Faker from "faker";

import { mask } from "vue-the-mask";
export default {
  data() {
    return {
      dialog: { open: false, modoEditar: false },
      errorBusqueda: false,
      vino: {
        nombre: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        comida: [],
        imagen: "",
        fotos: []
      }
    };
  },
  meteor: {
    $subscribe: {
      tipoComidas: []
    },
    /* Nombre del método:allComidas
    Objetivo: Buscar todas las comidas existentes en la base de datos
    Entradas: Ninguna
    Salidas: arreglo de todas las comidas encontradas en la base de datos */
    allComidas() {
      const comidas =  ComidasCollection.find({}) || {};
      let tipoComidas =  comidas.map(tipocomida => {return tipocomida.comidas;});
      tipoComidas =  tipoComidas.flat();
      console.log(tipoComidas);
      return tipoComidas;
    }
  },
  props: ["openDialog", "vinoSeleccionado"],
  watch: {
    openDialog(newVal) {
      this.dialog = newVal;
    },
    vinoSeleccionado(newVal) {
      this.vino = newVal;
    }
  },
  directives: {
    mask
  },
  methods: {
     /* Nombre del método: buscar()
    Objetivo: notificar si el usuario oprime el botón llamado buscar sin
    haber seleccionado los platos de comida
    
    Entradas: Ninguna
    Salidas: mensaje del error encontrado */
    buscar() {
      if (!this.tipocomida || !this.comida) {
        this.errorBusqueda = true;
        setTimeout(() => {
          this.errorBusqueda = false;
        }, 4000);
      }
    },
     /* Nombre del método: limparComida()
    Objetivo: Vaciar los campos que se usan para la comida
    
    Entradas: Ninguna
    Salidas: Ninguna */
    limpiarComida() {
      this.comida = undefined;
    },
     /* Nombre del método: addVino()
    Objetivo: agregar los vinos que el usuario administrador quiera agregar
    
    Entradas: Ninguna
    Salidas: Ninguna */
    
    addVino() {
      Meteor.call("vinos.add", this.vino);
      this.dialog.open = false;
      this.limpiarVinos();
    },
    /* Nombre del método: editarVino()
    Objetivo:permite acutalizar la información registrada por el
    
    Entradas: Ninguna
    Salidas: Ninguna */
    editarVino() {
      Meteor.call("vinos.edit", this.vino);
      this.dialog.open = false;
      this.limpiarVinos();
    },
     /* Nombre del método: limpiarVinos()
    Objetivo:vacia los campos utilizados para el registro del vino
    
    Entradas: Ninguna
    Salidas: Ninguna */
    limpiarVinos() {
      this.vino = {
        nombre: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        comida: [],
        imagen: "",
        fotos: []
      };
      this.$parent.limpiarVinos();
    }
  },
};
</script>

<style>
</style>