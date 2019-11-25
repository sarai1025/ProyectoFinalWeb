<template>
    <v-app-bar
      dark
      dense="true"
      fixed="true"
      scroll-target="#playground-example"
    >
        
      <v-toolbar-title class="font-weight-thin	headline">Maridaje</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="this.nn=true">
       <v-menu :close-on-content-click="close" offset-y>
         <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" x-large icon>
              <v-badge color="grey ligthen-1" overlap v-model="notifications.length">
                <span slot="badge">{{notifications.length}}</span>
              <v-icon>info</v-icon>
              </v-badge>
            </v-btn>
         </template>
          <v-list>
              <v-list-item v-for="(item, i) in notifications" :key=i>
                <v-list-item-title >{{item.n}}</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>

      </div>
      <v-btn to="/" text>Inicio</v-btn>
      <v-btn to="/Pedidos" v-if="esAdmin==true || esDespachador==true" text>Pedidos</v-btn>
      <v-btn to="/Tienda" v-if="esAdmin==false" text>Tienda</v-btn>
      <v-btn to="/Tienda" v-if="esAdmin==true" text>Modificar vinos</v-btn>
      <v-btn to="/ListaComidas" v-if="esAdmin==true" text>Modificar comidas</v-btn>
      <v-btn to="/Reportes" v-if="esAdmin==true" text>Reportes</v-btn>
      <v-btn @click="Login()" v-if="activo==false ">Iniciar Sesión</v-btn>
      <v-btn @click="cerrarSesion(correo)" v-if="activo==true ">Cerrar Sesión</v-btn>
    </v-app-bar>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapState } from "vuex";
import {UsuariosCollection} from "../../api/usuarios";

export default {
    data: () => ({ 
      nn: true,
      textbtn:"Iniciar sesión",
      usuario: '',
      activo2: false
  }),
directives: {
      mask,
    },
  computed: mapState({
    esAdmin: state => state.actualUsuario.esAdmin,
    esDespachador: state => state.actualUsuario.esDespachador,
    activo: state => state.actualUsuario.activo,
    correo: state => state.actualUsuario.correo,
  }),

  methods:{
    Login(){
      this.$router.push({path: '/login'});
    },
    async cerrarSesion(correo){
      
      console.log(correo)
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
            this.$store.commit("setActualUsuario", this.usuario);
            this.$router.push({path: '/'});
      }
    }
  }
};

</script>

<style>
</style>