
/* Este componente es el inicio de la página web, su propósito principal es enseñarle al usuario el concepto de maridaje 
y qué tipos y platos de comidas maneja el sitio web.
 */

<template>
  <div
    class="ma-0 pa-0"
    style="background-image: url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80'); widht:100%; height: 100%;  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;"
  >
    <v-container>
      <!-- Se agrega el componente del menú que se evidencia en la parte superior
      del sitio web (algunos de los componentes que contiene: inicio de sesión, tienda de vinos, inicio,etc)-->
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>

      <!-- Se activa una notificación de advertencia, en caso de querer realizar una busqueda sin seleccionar los platos de comida -->
      <v-alert type="warning" v-if="errorBusqueda === true">Debe seleccionar una comida.</v-alert>
      <!-- Se agregan las listas de tipos de comida y los platos de comida -->
      <v-row justify="center">
        
        <v-col md="10">
          <v-autocomplete
            background-color="white"
            dense
            filled
            label="Seleccione una comida"
            :items="comidasEspecificas"
            v-model="comida"
            :disabled="habilitarComida"
          ></v-autocomplete>
        </v-col>
        <v-col md="2">
          <v-btn class="ma-2" large v-on:click="buscar" to="/tienda">
            <v-icon left>fas fa-search</v-icon>Buscar
          </v-btn>
        </v-col>
      </v-row>

      <!-- Se agrega el concepto de maridaje para contribuir con el aprendizaje del usuario -->
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
import { VinosCollection } from "../../api/vinos";
import { ComidasCollection } from "../../api/comidas";
import Faker from "faker";
import Menu from "../components/menu";
import { mapState } from "vuex";

export default {
  components: {
    menuBar: Menu
  },
  data() {
    return {
      

      tipocomida: "",
      comida: undefined,
      errorBusqueda: false
    };
  },
  meteor: {
   
    $subscribe: {
      tipoComidas: [],
      comidasEspecificas: [],
      
    },
   
       /* Nombre del método: getTipoComidas()
    Objetivo: Obtener la lista de los tipos de comidas de la base de datos y mostrarla 
    en el template
    Entradas: Ninguna
    Salidas: arreglo con los tipos comidas obtenidas desde la base de datos*/
    getTipoComidas() {
      const comidas = ComidasCollection.find({}) || {};
      let tipoComidas = comidas.map(tipocomida => {
        return tipocomida.nombre;
      });
      tipoComidas = tipoComidas.flat();

      console.log(tipoComidas);
      return tipoComidas;
    },
     /* Nombre del método: getComidasEspecificas()
    Objetivo: Obtener la lista de comidas de la base de datos y mostrarla 
    en el template
    Entradas: Ninguna
    Salidas: arreglo con las comidas obtenidas desde la base de datos*/

    async getComidasEspecificas() {
      const comidas = ComidasCollection.find({}) || {};
      let tipoComidas = comidas.map(tipocomida => {
        return tipocomida;
      });
      tipoComidas = tipoComidas.flat();

      console.log(tipoComidas);
      return tipoComidas;
    },

    
   
  },
  created() {
    
  },
  methods: {
    /* Nombre del método: buscar()
    Objetivo: notificar si el usuario oprime el botón llamado buscar sin
    haber seleccionado los platos de comida
    Entradas: Ninguna
    Salidas: mensaje del error encontrado*/
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