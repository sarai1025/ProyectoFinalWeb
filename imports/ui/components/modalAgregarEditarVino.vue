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
              <v-text-field v-model="nombre" label="Nombre*" required></v-text-field>
            </v-col>
            <v-col md="8">
              <v-text-field
                v-model="precio"
                label="Precio*"
                v-mask="'###.###.###.###.###'"
                required
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="cantidad" label="Cantidad" required type="number" min="1"></v-text-field>
            </v-col>
            <v-col md="12">
              <v-textarea v-model="descripcion" label="Descripción"></v-textarea>
            </v-col>
            <v-col md="6">
              <v-autocomplete
                dense
                filled
                background-color="white"
                v-model="tipocomida"
                @change="limpiarComida"
                label="Tipo de comida"
                :items="tiposcomidas"
              ></v-autocomplete>
            </v-col>
            <v-col md="6">
              <v-autocomplete
                background-color="white"
                dense
                filled
                v-model="comida"
                label="Comida"
                :items="comidaSeleccionada"
                :disabled="habilitarComida"
              ></v-autocomplete>
            </v-col>
            <v-col md="12">
              <v-text-field v-model="icono" label="Enlace del icono del vino"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="foto1" label="Enlace foto 1"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="foto2" label="Enlace foto 2"></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field v-model="foto3" label="Enlace foto 3"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Campos obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog.open = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="addVino()">Guardar</v-btn>
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
      dialog: { open: false },
      tiposcomidas: ["Autocompletes", "Comboboxes", "Forms"],
      comidas: {
        Autocompletes: ["Autocompletes", "Comboboxes", "Forms"],
        Comboboxes: ["Sopa", "Pasta"]
      },
      errorBusqueda: false,
      nombre: "",
      precio: "",
      cantidad: "",
      descripcion: "",
      tipocomida: "",
      comida: "",
      icono: "",
      foto1: "",
      foto2: "",
      foto3: ""
    };
  },
  props: ["openDialog"],
  watch: {
    openDialog(newVal) {
      this.dialog = newVal;
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
      let vino = {
        nombre: this.nombre,
        precio: this.precio,
        cantidad: this.cantidad,
        descripcion: this.descripcion,
        tipocomida: this.tipocomida,
        comida: this.comida,
        icono: this.icono,
        foto1: this.foto1,
        foto2: this.foto2,
        foto3: this.foto3
      };
      Meteor.call("vinos.add", vino);
      this.dialog.open = false;
    }
  },
  computed: {
    habilitarComida() {
      return this.tipocomida ? false : true;
    },
    comidaSeleccionada() {
      return this.tipocomida ? this.comidas[this.tipocomida] : [];
    }
  }
};
</script>

<style>
</style>