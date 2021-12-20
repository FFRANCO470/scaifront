<template> 
    <div>
        <v-container >
            <template>
                <v-row>
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/ventas/vDebitos'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-set-center-right</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >Debitos</v-label>
                                        </v-flex>     
                                    </v-row>
                                </v-col>           
                            </v-btn>
                        </template >
                    </v-col>
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/ventas/vAbonos'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-book</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >Abonos<br>sobre abono</v-label>
                                        </v-flex>     
                                    </v-row>
                                    <!--<v-row  >
                                        <v-flex text-xs-center>
                                            <v-label > sobre abono</v-label>
                                        </v-flex>     
                                    </v-row>-->
                                </v-col>           
                            </v-btn>
                        </template >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/ventas/vVentas'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-card-bulleted</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >VENTAS</v-label>
                                        </v-flex>     
                                    </v-row>
                                </v-col>           
                            </v-btn>
                        </template >
                    </v-col>       
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/ventas/vFactura'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-magnify</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >FACTURA</v-label>
                                        </v-flex>     
                                    </v-row>
                                </v-col>           
                            </v-btn>
                        </template >
                    </v-col>       
                </v-row> 
            </template>
        </v-container>

    </div>
</template>
<script>
    export default {
        data:()=>({

        }),//data
        created(){
            this.checkToken();
        },
        methods:{
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
    
    
</style>