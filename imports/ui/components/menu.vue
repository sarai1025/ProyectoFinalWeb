<template>
    <v-app-bar
      dark
      dense="true"
      fixed="true"
      scroll-target="#playground-example"
    >
        
      <v-toolbar-title class="font-weight-thin	headline">Maridaje</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="this.nn=false">
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
      <v-btn to="/Tienda" text>Tienda</v-btn>
      <v-btn to="/login" text>Iniciar sesión</v-btn>
    </v-app-bar>
</template>

<script>
export default {
  computed:{
    notifications(){
      return this.$store.state.notifications;
    }
  },
    data: () => ({ 
      nn: true,
  })
  ,
};

</script>

<style>
</style>