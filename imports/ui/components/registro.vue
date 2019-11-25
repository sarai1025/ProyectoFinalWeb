<template>
  <div
    style="background-image: url('https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'); widht:100%; height: 100%;  background-position: center;
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
        <v-card-title>
          <span class="headline ml-6 mt-5">Registrarse</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="ml-6 mr-6">
              <v-col md="6">
                <v-text-field label="Nombre*" required v-model="usuario.nombre"></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field label="Apellido*" required v-model="usuario.apellido"></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field label="Correo*" required v-model="usuario.correo"></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field label="Número Identificacion*" v-mask="'################'" required v-model="usuario.id"></v-text-field>
              </v-col>
               <v-col md="6">
                <v-text-field label="Celular" v-mask="'###-###-####'" required v-model="usuario.celular"></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  :append-icon="show3 ? 'visibility' : 'visibility_off'"
                  :type="show3 ? 'text' : 'password'"
                  v-model="usuario.contrasenia"
                  label="Contraseña*"
                  hint="Mínimo 8 caracteres"
                  value
                  class="input-group--focused"
                  required
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  :append-icon="show4 ? 'visibility' : 'visibility_off'"
                  :type="show4 ? 'text' : 'password'"
                  v-model="concontrasenia"
                  name="input-10-2"
                  label="Confirmar contraseña*"
                  hint="Mínimo 8 caracteres"
                  value
                  class="input-group--focused"
                  required
                  @click:append="show4 = !show4"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-checkbox label="Soy despachador" v-model="usuario.esDespachador"></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small class="ml-5">*Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn to="/login" class="mr-5 mb-5" color="blue darken-1" text>Cancelar</v-btn>
          <v-btn class="mr-5 mb-5" color="blue darken-1" @click="addUser()">Registrarse</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Menu from "../components/menu";
import { mask } from "vue-the-mask";

export default {
  components: {
    menuBar: Menu
  },
  directives: {
    mask
  },
  data: function() {
    return {
      show3: false,
      show4: false,
      concontrasenia: "",

      usuario:{
        nombre: "",
        apellido: "",
        correo: "",
        id: '',
        celular: '',
        contrasenia: "",
        esDespachador: false,
        esAdmin: false,
        activo: false,
      }
    };
  },
  methods: {
    addUser(){
      Meteor.call('usuarios.add', this.usuario);
      this.$router.push({path: '/login'});
    }
  }
};
</script>

<style>
</style>