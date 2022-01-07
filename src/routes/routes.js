import aaaa from '../components/aaaa.vue';
import login from '../components/login.vue';
import home from '../components/Home.vue';

import articulos from '../components/articulos.vue';
import categorias from '../components/categorias.vue';
import marcas from '../components/marcas.vue';
import separadas from '../components/separadas.vue';

import proveedores from '../components/proveedores.vue';
import clientes from '../components/clientes.vue';
import usuarios from '../components/usuarios.vue';
import configuracion from '../components/configuracion.vue';

import facturacion from '../components/facturacion.vue';
import crearSalida from '../components/crearSalida.vue';
import crearCompra from '../components/crearCompra.vue';
import movimientos from '../components/movimientos.vue'

import infoVentas from '../components/infoVentas.vue';
import infoSalidas from '../components/infoSalidas.vue';
import infoCompras from '../components/infoCompras.vue';

import vAbonos from '../components/vAbonos.vue';
import vDebitos from '../components/vDebitos.vue';
import vFactura from '../components/vFactura.vue';
import vVentas from '../components/vVentas.vue';

import informes from '../components/informes.vue';


export const routes = [    
    {path:'/aaaa',component: aaaa},
    {path:'/',component: login},
    {path:'/home',component: home},

    {path:'/articulos',component: articulos},
    {path:'/categorias',component: categorias},
    {path:'/marcas',component: marcas},
    {path:'/separadas',component: separadas},

    {path:'/proveedores',component: proveedores},
    {path:'/clientes',component: clientes},
    {path:'/usuarios',component: usuarios},
    {path:'/configuraciones',component: configuracion},
    
    {path:'/facturacion',component: facturacion},
    {path:'/crearSalida',component: crearSalida},
    {path:'/crearCompra',component: crearCompra},
    {path:'/movimientos',component: movimientos},
    
    {path:'/movimientos/infoVentas', component:infoVentas},
    {path:'/movimientos/infoSalidas', component:infoSalidas},
    {path:'/movimientos/infoCompras', component:infoCompras},
    
    {path:'/ventas/vAbonos', component:vAbonos},
    {path:'/ventas/vDebitos', component:vDebitos},
    {path:'/ventas/vFactura', component:vFactura},
    {path:'/ventas/vVentas', component:vVentas},
    
    {path:'/informes', component:informes},

]