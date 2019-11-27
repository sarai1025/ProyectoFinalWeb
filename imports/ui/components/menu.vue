<template>
    <v-app-bar
      dark
      dense="true"
      fixed="true"
      scroll-target="#playground-example"
    >
        
      <v-toolbar-title class="font-weight-thin	headline">Maridaje</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="esDespachador==false">
       <v-menu :close-on-content-click="close" offset-y>
         <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" x-large icon>
              <v-badge color="grey ligthen-1" overlap >
                <span slot="badge" v-text="notificaciones.length"></span>
              <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
         </template>
          <v-list>
              <v-list-item v-for="item in notificaciones" :key="item.correo">
                <v-col md="15" class="pl-15 pr-15">
                  <v-row class="mb-3">
                    <v-list-item-title class="subtitle-1 font-weight-bold" v-text="item.vinoNombre" ></v-list-item-title>
                    <p class="font-weight-light body-2" color="grey" v-text="'Cantidad:   ' + item.cantidadPedidos +'  '"></p>
                    <p class="font-weight-light body-2" color="grey" v-text="'Precio:    ' +item.precio +'  '"></p>
                  </v-row>
                  <v-btn outlined depressed small  @click.stop=" comprar(item)" color="blue">
                           comprar
                          </v-btn>
                  <v-btn outlined depressed small  @click.stop="borrarPedido(item)" color="red">
                            <i class="fas fa-trash-alt"></i>
                          </v-btn>
                </v-col>
              </v-list-item>
              <v-btn outlined depressed small v-if="notificaciones.length > 0" @click.stop=" comprarTodos(notificaciones)" color="blue">
                           comprar Todos
                          </v-btn>
          </v-list>
        </v-menu>

      </div>
      <v-btn to="/" text>Inicio</v-btn>
      <v-btn to="/Pedidos" v-if="esAdmin==true || esDespachador==true" text>Pedidos</v-btn>
      <v-btn to="/Tienda" v-if="esAdmin==false" text>Tienda</v-btn>
      <v-btn to="/Tienda" v-if="esAdmin==true" text>Modificar vinos</v-btn>
      <v-btn to="/ListaComidas" v-if="esAdmin==true" text>Modificar comidas</v-btn>
     
      <v-btn @click="Login()" v-if="activo==false ">Iniciar Sesión</v-btn>
      <v-btn @click="cerrarSesion(correo)" v-if="activo==true ">Cerrar Sesión</v-btn>
    </v-app-bar>
</template>

<script>
import Faker from 'faker'
import { mask } from 'vue-the-mask'
import { mapState } from "vuex";
import {UsuariosCollection} from "../../api/usuarios";
import {PCarritoCollection} from "../../api/pCarrito";
import {PedidosCollection} from "../../api/pedidos";
import { mdiCart } from '@mdi/js';

export default {
    data: () => ({ 
      nn: true,
      textbtn:"Iniciar sesión",
      usuario: '',
      activo2: false,

      vinov: ''

  }),
directives: {
      mask,
    },
  computed: mapState({
    //Para usuario
    esAdmin: state => state.actualUsuario.esAdmin,
    esDespachador: state => state.actualUsuario.esDespachador,
    activo: state => state.actualUsuario.activo,
    correo: state => state.actualUsuario.correo,

    //para vino
    nombre: state => state.actualVino.nombre,
    
  }),

  methods:{
    Login(){
      this.$router.push({path: '/login'});
    },

    async cerrarSesion(correo){
      
      const usuario = await new Promise((resolve, reject) =>
      Meteor.call('usuarios.findOneCorreo', correo, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );
    this.usuario= usuario;

    if(this.usuario!=null){
            
            this.usuario.activo = false;
            this.usuario.esAdmin = false;
            this.usuario.esDespachador = false;
            Meteor.call('usuarios.edit',this.usuario)

            this.usuario.nombre ="",
            this.usuario.apellido= "",
            this.usuario.correo= "",
            this.usuario.id= '',
            this.usuario.celular= '',
            this.usuario.contrasenia= "",
            this.usuario.tarjeta= '',
            this.$store.commit("setActualUsuario", this.usuario);
            this.$router.push({path: '/'});

            Meteor.call('pCarrito.deleteAll')
      }
    },

    borrarPedido(pedidoCarrito){
      Meteor.call('pCarrito.delete',pedidoCarrito)
    },
    async comprar(pedido){
      
    Meteor.call('pedidos.add', pedido)

    const vino = await new Promise((resolve, reject) =>
      Meteor.call('vinos.findOneNombre', pedido.vinoNombre, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );

    this.vinov = vino;
    this.vinov.cantidad = this.vinov.cantidad - pedido.cantidadPedidos;
  
    this.$store.commit("setActualVino", this.vinov);

    Meteor.call('vinos.edit', this.vinov)
    Meteor.call('pCarrito.delete',pedido)

  },
  async comprarTodos(notificaciones){
    for(i in notificaciones){

      Meteor.call('pedidos.add', notificaciones[i])

    const vino = await new Promise((resolve, reject) =>
      Meteor.call('vinos.findOneNombre', notificaciones[i].vinoNombre, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );

    this.vinov = vino;
    this.vinov.cantidad = this.vinov.cantidad - notificaciones[i].cantidadPedidos;

    this.$store.commit("setActualVino", this.vinov);

    Meteor.call('vinos.edit', this.vinov)
    Meteor.call('pCarrito.delete',notificaciones[i])

    }
  },
  },


  meteor:{
    $subscribe: {
      'notificaciones': []
    },
    notificaciones() {
      return  PCarritoCollection.find({});
    }
  }
};

</script>

<style>
</style>