/* Este componente se tiene con el objetivo de administrar las funcionalidades para el vino */
<template>
  <div
    style="background-image: url(''); widht:100%; height: 100%;  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;"
  >
    <v-container>
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>

      <v-alert v-if="eliminado === true" type="success">Se eliminó el Vino.</v-alert>
      <v-card max-width="800" class="mx-auto">
        <v-list subheader three-line="true" :nav="true">
          <v-row>
            <v-col md="9" sm="12">
              <v-subheader
                v-if="comidaSeleccionada"
              >Los vinos para acompañar {{ comidaSeleccionada }} son:</v-subheader>
              <v-subheader v-else>Tienda</v-subheader>
            </v-col>
            <v-col class="mt-3 pr-5 pl-11" md="3" sm="12">
              <v-btn
                @click.stop="limpiarVinos(); dialog={open:true}"
                v-if="esAdmin==true"
                outlined
                depressed
                style="width:120px; height:25px"
                color="green"
              >
                <i class="fas fa-plus mr-2"></i> Agregar
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-list-item v-for="item in vinos" :key="item.nombre">
            <v-list-item-content>
              <v-row>
                <v-col md="1">
                  <v-list-item-avatar size="75">
                    <v-img :src="item.imagen"></v-img>
                  </v-list-item-avatar>
                </v-col>

                <v-col md="9" class="pl-10 pr-10">
                  <v-row class="mb-3">
                    <v-list-item-title class="subtitle-1 font-weight-bold" v-text="item.nombre"></v-list-item-title>
                  </v-row>

                  <v-row>
                    <p class="font-weight-light body-2" color="grey" v-text="item.descripcion"></p>
                  </v-row>
                </v-col>

                <v-col :align-self="'end'" md="2" class="mr-0 pr-0 ml-0 pl-0 pt-35 mt-1">
                  <v-row v-if="esAdmin==true" class="mb-0 mr-0 pr-0 ml-0 pl-0 mt-0 pt-0">
                    <v-list-item-action class="ma-0 pa-0">
                      <v-row class="mb-0 pb-0">
                        <v-col class="mr-0 pr-0 ml-0 pl-0">
                          <v-btn
                            outlined
                            depressed
                            small
                            color="blue darken-4"
                            v-if="esAdmin==true"
                            @click.stop="vinoSeleccionado=item; dialog = {open:true, modoEditar:true}; "
                          >
                            <i class="fas fa-pencil-alt"></i>
                          </v-btn>
                        </v-col>
                        <v-col class="ml-0 pl-2 mr-0 pr-0">
                          <v-btn outlined depressed small v-if="esAdmin==true" @click.stop="borrarVinos(item)" color="red">
                            <i class="fas fa-trash-alt"></i>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-action>
                  </v-row>

                  <v-row class="mr-0 mt-0 pt-0">
                    <v-btn  v-on:click="verDetalleVino(item)">Ver más...</v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <br />
        <v-divider></v-divider>
      </v-card>
      <agregarEditarVinos :openDialog="dialog" :vinoSeleccionado="vinoSeleccionado"></agregarEditarVinos>
    </v-container>
  </div>
</template>

<script>
import Faker from 'faker'
import Menu from "../components/menu";
import Modal from "../components/modalAgregarEditarVino";
import {VinosCollection} from "../../api/vinos";
import { mask } from 'vue-the-mask';
import { mapState } from "vuex";

export default {
  components: {
    menuBar: Menu,
    agregarEditarVinos: Modal
  },
  data: function() {
    return {
      eliminado: false,
      comidaSeleccionada: undefined, //TO-DO GESTIONAR CON EL STORE DE VUEX
      dialog: { open: false,},
      vinoSeleccionado:{
        nombre: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        comida: [],
        imagen: "",
        fotos: []
      },     
    };
  },
  meteor: {
    $subscribe: {
      'vinos': []
    },
     /* Nombre del método: vinos()
    Objetivo:permite buscar los vinos en la colección de vinos de la base de datos
    
    Entradas: Ninguna
    Salidas: retorna la colección de vinos encontrada de la base de datos */
    vinos() {
      return  VinosCollection.find({});
    }
  },
  directives: {
      mask,
    },
  methods:{
     /* Nombre del método: borrarVinos(vino)
    Objetivo:Permite al administrador eliminar un vino registrado
    
    Entradas: Objeto vino a eliminar
    Salidas: Ninguna */
    borrarVinos(vino){
      Meteor.call('vinos.delete', vino)
    },
       /* Nombre del método: limpiarVinos()
    Objetivo:vacia los campos utilizados para el vino seleccionado
    
    Entradas: Ninguna
    Salidas: Ninguna */
    limpiarVinos(){
      this.vinoSeleccionado= {
        nombre: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        comida: [],
        imagen: "",
        fotos:[]
      }
    },
    verDetalleVino(vino) {
      this.$store.commit("setActualVino", vino);
      this.$router.push("/Detalle");
    },
    async filtrarVino() {
      // Con esto lo que estoy haciendo es crear un promesa que me dice que si se cumple el reject entonces que m
      //traiga el resultado. Con esto me evito hacer varios .then
      this.comidaSeleccionada=$store.state.filtroComidas.comidas;
       const vino = await new Promise((resolve, reject) =>
        Meteor.call("vinos.findOneVino", this.comidaSeleccionada, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
      ); 
      //aqui modifico el usuario de vue para poder usarlo mas adelante
      /* this.vino = vino; */

      //Aqui hago las verificaciones de login
       /* if (this.vino != null) {
         
        if (this.vino.comida == this.comida) {

        
          
         
        } 
      }  */
    },
  },
  computed: mapState({
    esAdmin: state => state.actualUsuario.esAdmin,
  }),

};
</script>
<style>
</style>