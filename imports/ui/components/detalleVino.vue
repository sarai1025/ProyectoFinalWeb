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
                style="align: middle; display: block; margin-left: auto; margin-right: auto;"
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
                <v-text-field v-mask="'#### - #### - #### - ####'" label="Numero de tarjeta*" required v-model="tarjeta"></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="pedidoCarrito.cantidadPedidos"
                  :rules="nameRules"
                  label="Cantidad"
                  required
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field label="Dirección de entrega*" hint="" v-model="pedidoCarrito.direccion"></v-text-field>
              </v-col>          
              
            </v-row>
          </v-container>
          <small>*Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <div class="text-center">
              <v-dialog v-model="dialog1" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="blue darken-1" text @click="agregarAlcarrito(nombre, precio, cantidad, tarjeta,correo)">Finalizar</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Error</v-card-title>
                  <v-card-text v-text="textd">
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog1 = false">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
                </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Menu from "../components/menu";
import { mask } from 'vue-the-mask'
import { mapState } from "vuex";
import {PCarritoCollection} from "../../api/pCarrito";

export default {
  components: {
    menuBar: Menu
  },
  directives: {
      mask,
    },
  data: function() {
    return {
      pedidoCarrito:{
        cantidadPedidos:'',
        correoU: "",
        direccion:"",
        vinoNombre: "",
        precio: '',
        pendiente: true,
      },
     
      usuario: '',
   
      
      dialog: false,
      dialog1: false,
      textd: ""
    };
  },
  computed: mapState({
    //del vino
    nombre: state => state.actualVino.nombre,
    descripcion: state => state.actualVino.descripcion,
    precio: state => state.actualVino.precio,
    cantidad: state => state.actualVino.cantidad,
    fotos: state => state.actualVino.fotos,

    //del Usuario
    correo: state => state.actualUsuario.correo,
    tarjeta: state => state.actualUsuario.tarjeta,
  }),

  methods:{
    async agregarAlcarrito(nombre, precio, cantidad, tarjeta, correo){

      const usuario = await new Promise((resolve, reject) =>
      Meteor.call('usuarios.findOneCorreo', correo, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );
    this.usuario= usuario;
    if(this.usuario != undefined){
      if(this.pedidoCarrito.cantidadPedidos > cantidad){
        this.dialog1=true;
        this.textd = "Has excedido la cantidad de vinos disponibles"
      }else if(this.pedidoCarrito.cantidadPedidos==='0' || this.pedidoCarrito.cantidadPedidos===0 ){
        this.dialog1=true;
        this.textd = "La cantidad de vinos que pidió es igual a 0"
      }else if(this.pedidoCarrito.cantidadPedidos==="" || this.tarjeta==="" || this.pedidoCarrito.direccion==="" ){
        this.dialog1=true;
        this.textd = "No has ingresado todos los datos"
      }else{
        //Agrego la tarjeta del usuario
        this.dialog = false;
        this.usuario.tarjeta = tarjeta;
        Meteor.call('usuarios.edit', this.usuario)
        this.$store.commit("setActualUsuario", this.usuario);

        //Agregar al carrito
        this.pedidoCarrito.vinoNombre = nombre;
        this.pedidoCarrito.precio = precio*this.pedidoCarrito.cantidadPedidos;
        this.pedidoCarrito.correoU = correo;

        Meteor.call('pCarrito.add', this.pedidoCarrito )
      

        this.pedidoCarrito= {
        cantidadPedidos:'',
        correoU: "",
        direccion:"",
        vinoNombre: "",
        precio: '',
        pendiente: true,
      }

      }
    }else{
      this.dialog1=true;
      this.textd = "Debes iniciar sesión primero"
    }

    },
  }
};
</script>

<style>
</style>