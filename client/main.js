import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import App from '../imports/ui/App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from  '../imports/ui/router'
import vinosCollection from  '../imports/api/vinos'
import comidasCollection from  '../imports/api/comidas'
import usuariosCollection from  '../imports/api/usuarios'
import pedidosCollection from  '../imports/api/pedidos'
import PCarritoCollection from  '../imports/api/pCarrito'
import store from '../imports/ui/store/store.js'


Vue.use(Vuetify)


const opts={}
const vuetify = new Vuetify(opts)

import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

import './main.html';

Meteor.startup(()=> {
  new Vue ({
    el: "#app",
    vuetify,
    router,
    store,
    ...App
  })
})


