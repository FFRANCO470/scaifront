<template>
  <!--<div v-if="this.$store.state.token != ''" >-->
    <div>
        <v-app>
            <v-row>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/facturacion'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-cash-register</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">FACTURACION</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'" >                
                        <v-btn  class="botonNew" style="width:150px;height:150px;" :to="{path:'/crearSalida'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-forklift</v-icon> </v-flex></v-row>   
                                <v-row>
                                    <v-flex text-xs-center>
                                       <!--  <v-label>crear salida</v-label>-->
                                        <span class="textoBoton">CREAR SALIDA</span>
                                    </v-flex>
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/crearCompra'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-dolly</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">CREAR COMPRA</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/movimientos'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-file-swap-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">MOVIMIENTOS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/articulos'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-tshirt-crew-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">ARTICULOS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>

                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/categorias'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-package-variant</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">CATEGORIAS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/marcas'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-label-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">MARCAS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/separadas'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-warehouse</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">SEPARADAS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/clientes'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-account-search-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">CLIENTES</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/proveedores'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-clipboard-account-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">PROVEEDORES</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/usuarios'}" >
                            <v-col  >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-account-multiple-outline</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center>
                                        <span class="textoBoton">USUARIOS</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
                <v-col>
                    <template v-if="this.$store.state.rol =='administrador'">                
                        <v-btn class="botonNew" style="width:150px;height:150px;" :to="{path:'/configuraciones'}" >
                            <v-col >
                                <v-row ><v-flex text-xs-center><v-icon size="50"  color="#72128E" >mdi-wrench</v-icon> </v-flex></v-row>   
                                <v-row  >
                                    <v-flex text-xs-center   >
                                        <span class="textoBoton">CONFIGURACION</span>
                                    </v-flex>     
                                </v-row>
                            </v-col>           
                        </v-btn>
                    </template >
                </v-col>
            </v-row>
  
        </v-app> 
    </div>
</template>
<script>
    export default {
        created(){
            this.checkToken();
        },
        methods:{

            ////validar que la ruta tenga token si no redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
            },
        }   
    }
</script>
<style scoped>
    .botonNew:hover{
        transition:all .3s;
        border: 5px solid #72128E;
    }
    .botonNew{
        border-radius: 100%;
        box-shadow: 0 0 20px #A068B8;
        margin-top:10px;
    }
    .textoBoton{
        font-size: 12px;
    }
    
</style>