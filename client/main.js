import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import App from '../imports/ui/App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from  '../imports/ui/router'

import store from '../imports/ui/store'

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


