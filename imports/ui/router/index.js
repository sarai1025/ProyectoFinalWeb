import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Inicio from '../components/inicio'
import Tienda from '../components/listaVinos'
import Detalle from '../components/detalleVino'
import Registro from '../components/registro'
import listadoComidas from '../components/listadocomidas'
import Reportes from '../components/reportes/reportes'
import ReporteVentas from '../components/reportes/reporteVentas'
import ReporteVendidos from '../components/reportes/reporteVendidos'
import Pedidos from '../components/pedidos'
import store from '../store/store'

Vue.use(Router)

const router=new Router({
    routes:[

        {path:'/', component:Inicio,},
        {path:'/login', component:Login},
        {path:'/Tienda', component:Tienda},
        {path:'/Detalle', component:Detalle, meta:{requiresSelectedVino: true}},
        {path:'/Registrarse', component:Registro},
        {name:'reportes', path:'/reportes', component:Reportes, children:[
            {name:'ventasReporte',path:'/ventas', props:(route)=>({...route.params}),component:ReporteVentas},
            {name:'vendidosReporte',path:'/vendidos', props:(route)=>({...route.params}),component:ReporteVendidos},

        ]},

        {path:'/ListaComidas', component:listadoComidas},
        {path:'/Pedidos', component:Pedidos},
  
    ]
})

router.beforeEach((to, from, next) => {
    const requiresSelectedVino = to.matched.some(x => x.meta.requiresSelectedVino)
    const currentVino = store.state.actualVino

    if (requiresSelectedVino && currentVino.nombre==='') {
        next('/Tienda')
    } else if (requiresSelectedVino && currentVino.nombre !== '') {
        next()
    } else {
        next()
    }
})
export default router