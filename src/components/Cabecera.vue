<template >
    <div v-if="this.$store.state.token !=''">
        <v-navigation-drawer app permanent  color="#8732A0"  expand-on-hover style="opacity: 0.9;" class="oculto-impresion">
        <!--<v-navigation-drawer app permanent  color="#8732A0" style="opacity: 0.9;">-->
            
            <v-list>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class=" white--text text-h6 text-sm-left">
                        {{this.$store.state.nombreUser}}
                        </v-list-item-title>
                        <v-list-item-subtitle class=" white--text text-sm-left">{{this.$store.state.rol}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>

                <!--home-->
                <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                    <v-list-item :to="{path:'/home'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Inicio</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>
                
                <!--facturacion-->
                <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                    <v-list-item :to="{path:'/facturacion'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-cash-register</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Facturacion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

                <!--crear salida-->
                <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                    <v-list-item :to="{path:'/crearSalida'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-forklift</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >crear salida</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>
                
                <!--crear compra-->
                <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                    <v-list-item :to="{path:'/crearCompra'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-dolly </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >crear compra</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

                <!--movimeintos-->
                <template  v-if="this.$store.state.rol =='administrador'">
                    <v-list-group class="white--text" v-for="item in items2"  :key="item.title" v-model="item.active"  no-action  > 
                        <template  v-slot:activator>
                            <v-list-item-action><v-icon class="white--text">mdi-file-swap-outline</v-icon></v-list-item-action>
                            <v-list-item-content><v-list-item-title class=" white--text text-sm-left" >Movimientos</v-list-item-title></v-list-item-content>
                        </template>
                        <v-list-item v-for="child in item.items" :key="child.title" :to="child.ruta">
                            <v-list-item-content class="white--text" >           
                                <v-list-item-title class="text-sm-left" v-text="child.title"></v-list-item-title>
                            </v-list-item-content>           
                        </v-list-item> 
                    </v-list-group>
                </template>

                <!--almacen>-->
                <template  v-if="this.$store.state.rol =='administrador'">
                    <v-list-group class="white--text" v-for="item in almacen2"  :key="item.title" v-model="item.active"  no-action  > 
                        <template  v-slot:activator>
                            <v-list-item-action><v-icon class="white--text">mdi-sitemap</v-icon></v-list-item-action>
                            <v-list-item-content><v-list-item-title class=" white--text text-sm-left" >Almacen</v-list-item-title></v-list-item-content>
                        </template>
                        <v-list-item v-for="child in item.almacen" :key="child.title" :to="child.ruta">
                            <v-list-item-content class="white--text" >           
                                <v-list-item-title class="text-sm-left" v-text="child.title"></v-list-item-title>
                            </v-list-item-content>           
                        </v-list-item> 
                    </v-list-group>
                </template>

                <!--articulos
                    <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/articulos'}">
                    <v-list-item-action>
                        <v-icon class="white--text">mdi-tshirt-crew-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class=" white--text text-sm-left" >Articulos</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item> 
                    </template>-->
                    <!--categorias
                    <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/categorias'}">
                    <v-list-item-action>
                        <v-icon class="white--text">mdi-package-variant</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title class=" white--text text-sm-left" >Categorías</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item> 
                    </template>-->
                    <!--marcas
                    <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/marcas'}">
                    <v-list-item-action>
                        <v-icon class="white--text">mdi-label-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class=" white--text text-sm-left" >Marcas</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item> 
                    </template>-->
        
                
                <!--clientes-->
                <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/clientes'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-account-search-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Clientes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>
        
                <!--proveedores-->
                <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/proveedores'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-clipboard-account-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Proveedores</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>
            
                <!--usuarios-->
                <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/usuarios'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-account-multiple-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Usuarios</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

                <!--informes-->
                <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/informes'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-finance</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Informes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

                <!--configuracion-->
                <template v-if="this.$store.state.rol =='administrador'">
                    <v-list-item :to="{path:'/configuraciones'}">
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-wrench</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class=" white--text text-sm-left" >Informacion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

                <!--salir-->
                <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                    <v-list-item @click="cerrarSesion()" >
                        <v-list-item-action>
                            <v-icon class="white--text">mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title  class="white--text text-sm-left" >Salir</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
                </template>

        
            </v-list>
        </v-navigation-drawer>

    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                token:'',
                drawer:'',
                items2: [
                    { 
                        items: [ { title: 'Info Ventas' ,ruta:{path:'/movimientos/infoVentas'} }, 
                            { title: 'Info Compras',ruta:{path:'/movimientos/infoCompras'} },
                            { title: 'Info Salidas',ruta:{path:'/movimientos/infoSalidas'} },
                        ],
                    }
                ],
                almacen2: [
                    { 
                    almacen: [ 
                            { title: 'Articulos' ,ruta:{path:'/articulos'}}, 
                            { title: 'Categorias',ruta:{path:'/categorias'} },
                            { title: 'Marcas',ruta:{path:'/marcas'} },
                            { title: 'Separadas',ruta:{path:'/separadas'} },
                        ],
                    }
                ],
        
            }//return
        },//data
        
        methods:{

            //Deja la bariable golbal token igual a nada y oculta el menu
            cerrarSesion(){
                this.$store.dispatch("setToken", this.token);
                this.$router.push("/");
            }

        }//methods
    };//export
</script>


<style>

@media print {
        .oculto-impresion,
        .oculto-impresion * {
            display: none !important;
        }
    }
</style>

