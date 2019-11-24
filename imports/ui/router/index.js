import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Inicio from '../components/inicio'
import Tienda from '../components/listaVinos'
import Detalle from '../components/detalleVino'
import Registro from '../components/registro'
import listadoComidas from '../components/listadocomidas'
import Reportes from '../components/reportes'
import Pedidos from '../components/pedidos'

Vue.use(Router)

const router=new Router({
    routes:[
         //sin id
         {path:'/', component:Inicio},
         {path:'/login', component:Login},
         {path:'/Tienda', component:Tienda},
         {path:'/Registrarse', component:Registro},
         {path:'/Detalle', component:Detalle},
         {path:'/ListaComidas', component:listadoComidas},
        //con id
        {path:'/:id', component:Inicio},
        {path:'/Tienda/:id', component:Tienda},
        {path:'/Detalle/:id', component:Detalle},
        {path:'/Reportes/:id', component:Reportes},
        {path:'/ListaComidas/:id', component:listadoComidas},
        {path:'/Pedidos/:id', component:Pedidos},

       

    ]
})
export default router