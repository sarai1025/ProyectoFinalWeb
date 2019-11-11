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
              <v-btn v-on:click="loginEvent" text>Iniciar sesión</v-btn>
              <v-btn to="/register" text>Registrarse</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Menu from "../components/menu";
/* eslint-disable no-unused-vars */
export default {
  name: "login",
  components:{
    menuBar: Menu
  },
  data: function() {
    return {
  title: "Inicio",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      email: "",
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
  
};
</script>

<style>
</style>