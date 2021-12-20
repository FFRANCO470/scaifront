<template>
  <!--<div v-if="this.$store.state.token != ''" >-->
    <div>
        <v-container>
            <template>
                <v-row>
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/movimientos/infoCompras'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-shopping</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >Compras</v-label>
                                        </v-flex>     
                                    </v-row>
                                </v-col>           
                            </v-btn>
                        </template >
                    </v-col>
                    <v-col>
                        <template v-if="this.$store.state.rol =='administrador'">                
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/movimientos/infoSalidas'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-clipboard-text-outline</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >salidas</v-label>
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
                            <v-btn class="botonNew" style="margin-top:20px;width:200px;height:200px;box-shadow: 0 0 20px #A068B8; border-radius: 100%" :to="{path:'/movimientos/infoVentas'}" >
                                <v-col  >
                                    <v-row ><v-flex text-xs-center><v-icon size="70"  color="#72128E" >mdi-archive-outline</v-icon> </v-flex></v-row>   
                                    <v-row  >
                                        <v-flex text-xs-center>
                                            <v-label >  ventas </v-label>
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