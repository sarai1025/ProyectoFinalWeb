<template >
 <div
    style="background-image: url('https://images.unsplash.com/photo-1495929427389-a6451f2e01fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'); widht:100%; height: 100%;  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;"
  >
    <menuBar/>
     
    <v-container fill-height>
      
      <v-row justify="center">
        <v-col cols="1" md="5" sm="2"  align="center">
          <v-card class="mx-auto" max-width="400" raised="0.8" style="background: rgba(255,255,255,0.85);">
            <v-row justify="center">
              <v-col cols="1" md="4" sm="3">
                <h1>{{title}}</h1>
              </v-col>
            </v-row>
            <v-list-item three-line>
              <v-list-item-content>
                <v-text-field
                  v-model="email"
                  :rules="[emailRules, rules.required]"
                  label="Email"
                  required
                  outlined
                  clearable
                  dense
                ></v-text-field>

                <v-text-field
                  :append-icon="show4 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show4 ? 'text' : 'password'"
                  v-model="password"
                  label="Contraseña"
                  outlined
                  clearable
                  dense
                  @click:append="show4 = !show4"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
               <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn  @click="inicioSesion()" text>Iniciar sesión</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Error</v-card-title>
                  <v-card-text v-text="textd">
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
                </div>
              <v-btn to="/Registrarse" text>Registrarse</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
     
    </v-container>
    
  </div>
  
</template>

<script>
import Menu from "../components/menu";
import Faker from 'faker';
import {UsuariosCollection} from "../../api/usuarios";

/* eslint-disable no-unused-vars */
export default {
  name: "login",
  components:{
    menuBar: Menu
  },
  data: function() {
    return {
      textd: "",
      dialog: false,
      title: "Inicio",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      email: "",

      //para el usuario
      usuario: '',

      rules: {
        required: value => !!value || "Este campo es obligatorio."
      },
      emailRules: [
        email => !!email || "El correo es requerido",
        email =>
        // eslint-disable-next-line
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ||
          "El correo no es valido"
      ]
    }
  },

  meteor:{

  },

  methods:{
    async inicioSesion(){
  


    // Con esto lo que estoy haciendo es crear un promesa que me dice que si se cumple el reject entonces que m
    //traiga el resultado. Con esto me evito hacer varios .then 
    const usuario = await new Promise((resolve, reject) =>
      Meteor.call('usuarios.findOneCorreo', this.email, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
    );
    //aqui modifico el usuario de vue para poder usarlo mas adelante
    this.usuario= usuario;

    //Aqui hago las verificaciones de login
    if(this.usuario!=null){
      if(this.usuario.contrasenia==this.password){
          this.usuario.activo = true;
          Meteor.call('usuarios.edit',this.usuario)
          this.$store.commit("setActualUsuario", this.usuario);
          this.$router.push({path: '/'});
       }else{
         this.dialog= true;
         this.textd = "La contraseña es incorrecta";
       }
      }else if(this.email=="" || this.password==""){
        this.dialog= true;
        this.textd = "Hay algún campo vacío";

      }else if(this.usuario==null){
        this.dialog=true;
        this.textd = "No estas registrado, Registrate";

      }

    }
  },

  
};
</script>

<style>
</style>