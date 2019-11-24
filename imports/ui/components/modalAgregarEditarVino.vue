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
                v-mask="'###.###.###.###.###'"
                required
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="vino.cantidad" label="Cantidad" required type="number" min="1"></v-text-field>
            </v-col>
            <v-col md="12">
              <v-textarea v-model="vino.descripcion" label="Descripción"></v-textarea>
            </v-col>
            <v-col md="12">
              <v-autocomplete
                background-color="white"
                dense
                filled
                v-model="vino.comida"
                label="Comida"
                multiple="true"
                :items="comidaSeleccionada"
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
        fotos:[]
      }
    };
  },
  props: ["openDialog", "vinoSeleccionado"],
  watch: {
    openDialog(newVal) {
      console.log(newVal);
      this.dialog = newVal;
    },
    vinoSeleccionado(newVal) {
      console.log(newVal);
      this.vino = newVal;
    }
  },
  directives: {
    mask
  },
  methods: {
    buscar() {
      if (!this.tipocomida || !this.comida) {
        this.errorBusqueda = true;
        setTimeout(() => {
          this.errorBusqueda = false;
        }, 4000);
      }
    },
    limpiarComida() {
      this.comida = undefined;
    },
    addVino() {
      Meteor.call("vinos.add", this.vino);
      this.dialog.open = false;
      this.limpiarVinos();
    },
    editarVino() {
      Meteor.call("vinos.edit", this.vino);
      this.dialog.open = false;
      this.limpiarVinos();
    },
    limpiarVinos() {
      this.vino = {
        nombre: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        comida: [],
        imagen: "",
        fotos:[]
      };
      this.$parent.limpiarVinos()
    }
  },
  computed: {
    comidaSeleccionada() {
      return this.tipocomida ? this.comidas[this.tipocomida] : [];
    }
  }
};
</script>

<style>
</style>