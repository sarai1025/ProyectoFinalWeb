<template>
  <v-container>
    <v-row class="pb-4">
      <v-col>
        <menuBar />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="5" class="mr-6 pr-5 mt-5 pt-5">
        <v-carousel hide-delimiters height="560">
          <v-carousel-item
            v-for="(foto,i) in fotos"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row>
              <img
                :src="foto"
                style="align: middle; object-fit: cover; display: block; margin-left: auto; margin-right: auto;"
              />
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col md="5" align-self="center" class="ml-6 pl-5">
        <p class="font-weight-bold display-1" v-text="nombre"></p>

        <p class="text-justify font-weight-regular subtitle-1" v-text="descripcion"></p>
        <v-row>
          <v-col class="mr-0 pr-0" md="5">
            <v-row>
              <v-col md="5">
                <p  class="headline ">Precio:</p>
              </v-col>
              <v-col class="ml-0 pl-0 mr-0 pr-7" md="4">
                <p class="headline font-weight-black" v-text="precio"></p>
              </v-col>
            </v-row>
          </v-col>


          <v-col class="mr-0 pr-0" md="7">
            <v-row>
              <v-col md="8">
                <p  class="text-start font-italic font-weight-light">Cantidades disponibles:</p>
              </v-col>
              <v-col class="ml-0 pl-0 mr-0 pr-7" md="4">
                <p class="font-weight-light body-1 text-start" v-text="cantidad"></p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" class="pr-0 mr-0">
            <v-btn dark to="/tienda">Regresar</v-btn>
          </v-col>
          <v-col class="pl-0 ml-0">
            <v-btn dark v-if="cantidad > 0" @click.stop="dialog = true">Agregar Carrito</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--DIALOGO PARA CONFIEMAR LA COMPRA!-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirmar datos de compra</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col md="8">
                <v-text-field v-mask="'#### - #### - #### - ####'" label="Numero de tarjeta*" required></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="mxmUsers"
                  :rules="nameRules"
                  label="Cantidad"
                  required
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field label="Dirección de entrega*" hint=""></v-text-field>
              </v-col>          
              
            </v-row>
          </v-container>
          <small>*Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Finalizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Menu from "../components/menu";
import { mask } from 'vue-the-mask'
import { mapState } from "vuex";

export default {
  components: {
    menuBar: Menu
  },
  directives: {
      mask,
    },
  data: function() {
    return {
      
      dialog: false
    };
  },
  computed: mapState({
    nombre: state => state.actualVino.nombre,
    descripcion: state => state.actualVino.descripcion,
    precio: state => state.actualVino.precio,
    cantidad: state => state.actualVino.cantidad,
    fotos: state => state.actualVino.fotos,
  }),
};
</script>

<style>
</style>