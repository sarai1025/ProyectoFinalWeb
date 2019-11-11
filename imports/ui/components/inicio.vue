<template>
  <div class="ma-0 pa-0"
    style="background-image: url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80'); widht:100%; height: 100%;  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;"
  >
    <v-container>
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>
      <v-alert type="warning" v-if="errorBusqueda === true">Debe seleccionar una comida.</v-alert>
      <v-row justify="center">
        <v-col md="5">
          <v-autocomplete
            dense
            filled
            background-color="white"
            v-model="tipocomida"
            @change="limpiarComida"
            label="Seleccione un tipo de comida"
            :items="tiposcomidas"
          ></v-autocomplete>
        </v-col>
        <v-col md="5">
          <v-autocomplete
            background-color="white"
            dense
            filled
            v-model="comida"
            label="Seleccione una comida"
            :items="comidaSeleccionada"
            :disabled="habilitarComida"
          ></v-autocomplete>
        </v-col>
        <v-col md="2">
          <v-btn class="ma-2" large v-on:click="buscar" to="/tienda">
            <v-icon left>fas fa-search</v-icon>Buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <div style="background-color:white; border-radius:100px">
          <v-img src="images/vino.png" max-width="200" max-height="200"></v-img>
        </div>
      </v-row>
      <v-row align="center" justify="center">
        <v-col md="8">
          <br />
          <h1 class="font-italic font-weight-bold display-1 text-center">Maridaje</h1>
          <br />
          <p class="font-italic text-center subtitle-1">
            El maridaje entre el vino y la comida es el proceso de casar metafóricamente a un alimento con un vino con la intención de realzar el placer de comerlos.
            En muchas culturas el vino ha sido considerado un alimento básico en la mesa, y de alguna manera tanto la producción como las tradiciones culinarias de una región han evolucionado conjuntamente a lo largo de los años. Más que seguir una serie de normas, las tradiciones culinarias lugareñas simplemente se combinaban con los vinos de la zona.
          </p>
        </v-col>
      </v-row>
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
      tiposcomidas: ["Autocompletes", "Comboboxes", "Forms"],
      comidas: {
        Autocompletes: ["Autocompletes", "Comboboxes", "Forms"],
        Comboboxes: ["Sopa", "Pasta"]
      },
      tipocomida: undefined,
      comida: undefined,
      errorBusqueda: false
    };
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