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
      <v-card max-width="800" class="mx-auto">
        <v-list subheader three-line="true" :nav="true">
          <v-row>
            <v-col md="9" sm="12">
              <v-subheader >Lista de pedidos</v-subheader>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-list-item v-for="item in pedidos" :key="item._id">
            <v-list-item-content>
              <v-row>
                <v-col md="9" class="pl-10 pr-10">
                  <v-row class="mb-3">
                    <v-list-item-title class="subtitle-1 font-weight-bold" v-text="item.vinoNombre"></v-list-item-title>
                  </v-row>
                  <v-row>
                    <p class="font-weight-light body-2" color="grey" v-text="item.cantidadPedidos"></p>
                  </v-row>
                  <v-row>
                    <p class="font-weight-light body-2" color="grey" v-text="item.direccion"></p>
                  </v-row>
                </v-col>
                <v-col :align-self="'end'" md="2" class="mr-0 pr-0 ml-0 pl-0 pt-35 mt-1">
                  <v-row class="mb-0 mr-0 pr-0 ml-0 pl-0 mt-0 pt-0">
                      <v-row class="mb-0 pb-0">
                        <v-col class="ml-0 pl-2 mr-0 pr-0">
                           <p class="font-weight-light body-2" color="black" v-if="item.pendiente == true" >Pendiente</p>
                           <p class="font-weight-light body-2" color="black" v-if="item.pendiente == false">Realizado</p>
                        </v-col>
                        <v-list-item-action class="ma-0 pa-0">
                      <v-row class="mb-0 pb-0">
                        <v-col class="ml-0 pl-2 mr-0 pr-0">
                          <v-btn outlined depressed small v-if="item.pendiente==false" @click.stop="borrarPedido(item)" color="red">
                            <i class="fas fa-trash-alt"></i>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-action>
                      </v-row>
                  </v-row>
                  <v-row class="mr-0 mt-0 pt-0">
                    <v-btn  v-on:click="realizarPedido(item)">Realizado</v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <br />
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Faker from 'faker'
import Menu from "../components/menu";
import {PedidosCollection} from "../../api/pedidos";
import { mask } from 'vue-the-mask';
import { mapState } from "vuex";

export default {
  components: {
    menuBar: Menu
  },
  data: function() {
    return {
      pedido:{
        	cantidadPedidos : "",
	        correoU : "",
	        direccion : "",
	        vinoNombre : "",
	        precio : '',
	        pendiente : true,
      }
    };
  },
  meteor: {
    $subscribe: {
      'pedidos': []
    },
    pedidos() {
      return  PedidosCollection.find({});
    }
  },
  directives: {
      mask,
    },
  methods:{
    async realizarPedido(pedido){
    const pedido1 = await new Promise((resolve, reject) =>
      Meteor.call('pedidos.findOneId', pedido._id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );
      this.pedido = pedido1
      this.pedido.pendiente = false

      Meteor.call('pedidos.edit', this.pedido)
    },

    borrarPedido(pedido){
      Meteor.call('pedidos.delete', this.pedido)
    }
    
  },
  computed: mapState({
    esAdmin: state => state.actualUsuario.esAdmin,
    esDespachador: state => state.actualUsuario.esDespachador,
  }),

};
</script>
<style>
</style>