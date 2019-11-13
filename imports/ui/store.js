import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notifications: [ {
            n: 'hola'
        }

        ]
    },
    mutations: {
        addNotifications(state, noti){
            state.notifications.push(noti)
        },
        removeNotification(state,noti){
           state.notifications.splice(state.notifications.indexOf(noti),1);
        }
    },
    //Falta hacer método de que cuando hagan un pedido añadir a la notificación y añadir de botón de realizado min8 vídeo
    actions: {
        addToNotifications({commit}, noti){
            commit('addNotifications',noti)
        }
    }
})