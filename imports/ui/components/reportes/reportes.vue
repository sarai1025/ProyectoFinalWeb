<template>
  <div  class="Reportes">
          <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>

      <v-btn class="primary" dark v-if="!show" @click="show=true" icon :to="{name:'reportes'}"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <div v-if="show" style="width:100%">
         <v-container>
        <v-row>
        <v-col xs="10" sm="10" md="6" lg="4">
        <v-card elevation="15" width="100%">
        <v-img
          class="white--text"
          height="200px"
          src="https://blog.ida.cl/wp-content/uploads/sites/5/2015/01/iStock_000019046733Small2.jpg"
        >
          <v-card-title style="background:rgba(0,0,0,.3)" class="align-end fill-height white--text">Ventas pendientes vs realizadas</v-card-title>
        </v-img>
        <v-card-text></v-card-text>
        <v-card-actions>
        <v-btn color="primary" @click="show=false" center :to="{name:'ventasReporte', params:{
            show:false
        }}" outlined>Ver</v-btn>
        </v-card-actions>
      </v-card>
          </v-col>
          <v-col xs="10" sm="10" md="6" lg="4">
        <v-card elevation="15" width="100%">
        <v-img
          class="white--text"
          height="200px"
          src="https://blog.ida.cl/wp-content/uploads/sites/5/2015/01/iStock_000019046733Small2.jpg"
        >
          <v-card-title style="background:rgba(0,0,0,.3)" class="align-end fill-height white--text">Vendidos</v-card-title>
        </v-img>
        <v-card-text></v-card-text>
        <v-card-actions>
        <v-btn color="primary" @click="show=false" center :to="{name:'vendidosReporte', params:{
            show:false
        }}" outlined>Ver</v-btn>
        </v-card-actions>
      </v-card>
          </v-col>
      </v-row>
      </v-container>

    </div>  
      <router-view></router-view>
  </div>
</template>

<script>
import Menu from "../menu";

export default {
    components: {
    menuBar: Menu
  },
    name:'reportes',
    data:()=>({
        show:true
    })
}
</script>

<style>
.Reportes{
    width:100%;
}
</style>