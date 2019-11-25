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
        },
        actualUsuario: {
            nombre: "",
            apellido: "",
            correo: "",
            id: '',
            celular: '',
            contrasenia: "",
            esDespachador: false,
            admin: false,
            activo:false,
            tarjeta: ''
        }
    },
    mutations: {
        setActualVino(state, val) {
            state.actualVino = val
        },

        setActualUsuario(state, usuario){
            state.actualUsuario = usuario
        },

    },
});