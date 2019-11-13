import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Inicio from '../components/inicio'
import Tienda from '../components/listaVinos'
import Detalle from '../components/detalleVino'
import Registro from '../components/registro'


Vue.use(Router)

const router=new Router({
    routes:[
        {path:'/', component:Inicio,},
        {path:'/login', component:Login},
        {path:'/Tienda', component:Tienda},
        {path:'/Detalle', component:Detalle},
        {path:'/Registrarse', component:Registro},

    ]
})
export default router