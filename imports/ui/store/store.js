import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        actualVino: {
            nombre: "",
            descripcion: "",
            precio: "",
            cantidad: "",
            fotos: "",
        }
    },
    mutations: {
        setActualVino(state, val) {
            state.actualVino = val
        },

    },
});