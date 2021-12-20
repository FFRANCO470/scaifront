<template>
    <div>

        <v-btn class="botonFactura"    @click="crearSalida()">
            <v-icon >mdi-clipboard-account-outline</v-icon>Crear salida
        </v-btn>

        <v-card style="margin-top:70px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8; ">

            <v-row>
                <v-col>
                    <div class="form-group row comentario">
                        <v-textarea v-model="comentario"  color="#72128E"   outlined  :counter=250 label="Descripcion"></v-textarea>
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <v-container fluid>
            <v-row style="margin-top:50px">
                <template>
                    <v-col>
                        <!--tabla con articulo activos-->
                        <v-data-table  class=" elevation-15 ancho-tabla" :headers="articulosMostradorTitle" :items="articulosMostrador" :search="search" >
                            <template v-slot:top>
                            <v-toolbar flat >
                                <v-toolbar-title>Todos</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Buscar" single-line  hide-details ></v-text-field>
                                <v-divider  class="mx-4"   inset  vertical ></v-divider>
                            </v-toolbar>
                            </template>
                            <template  v-slot:item.actions="{ item }">
                            <v-icon  small  class="mr-2" @click="facturar(item)" >mdi-cart </v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                    <v-col>
                        <!--tabla con articulo facturados-->
                        <v-data-table class=" elevation-15 ancho-tabla" :headers="articulosFacturaTitle" :items="articulosFactura"  >
                            <template v-slot:top>
                            <v-toolbar flat >
                                <v-toolbar-title>Facturados</v-toolbar-title>
                                <v-spacer></v-spacer>          
                                <v-divider  class="mx-4"   inset  vertical ></v-divider>
                            </v-toolbar>
                            </template>
                            <template  v-slot:item.cantidad="props">
                                <v-text-field  v-model="props.item.cantidad"  min=0 name="quantity"  outlined type="number"></v-text-field>
                            </template>
                            <template v-slot:[`item.subtotal`]="{ item }">
                                {{item.precio*item.cantidad}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon  small  class="mr-2" @click="desfacturar(item)" >mdi-delete </v-icon>
                            </template>
                        </v-data-table> 
                    </v-col>
                </template>
                        
            </v-row>
        
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from "sweetalert2"
    export default {
        data:()=>({
            comentario:'',
            search:'',
            articulosTraidos:[],//articulos de la bd
            articulosMostrador:[],//articulos mostrador
            articulosMostradorTitle:[
                { text: 'Categoria', value: 'categoriaName' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marcaName' , class:'purple darken-3 white--text'},
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad' , class:'purple darken-3 white--text'},
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],//articulos mostrador

            articulosFactura:[],//articulos mostrador
            articulosFacturaTitle:[
                { text: 'Categoria', value: 'categoriaName' , class:'grey darken-3 white--text'},
                { text: 'Marca', value: 'marcaName' , class:'grey darken-3 white--text'},
                { text: 'Referencia', value: 'referencia' , class:'grey darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad' , class:'grey darken-3 white--text'},
                { text: 'Quitar', value: 'actions' , class:'grey darken-3 white--text'},
            ],//articulos mostrador

            
        }),//data
        created(){
            this.checkToken();
            this.traerArticulosActivos();
        },
        methods:{

            //validar que la ruta tenga token si no redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
            },

            //msg de alerta erronea
            msjErrores : function(msg){
                Swal.fire({
                    position:'top',
                    icon:'error',
                    title:msg,
                    showConfirmButton:false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer:2000
                })
            },//msjErrores
            
            //msg de alerta exitoso
            msjExitoso : function(msg){
                Swal.fire({
                    position:'top',
                    icon:'success',
                    title:msg,
                    showConfirmButton:false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer:1000
                })
            },//msjExitoso

            traerArticulosActivos(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get("articulo/activos",header)
                    .then(response =>{   
                    console.log(response);  
                    this.articulosTraidos = response.data.articulo
                    if(this.articulosTraidos.length==0){
                        this.msjErrores("No hay articulos");
                    }else{
                        this.meterArticulos(this.articulosTraidos);
                    }
                    
                    })
                    .catch((error) =>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                            console.log(error.response);
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjErrores(this.msgError);
                        }else{
                            this.msgError = error.response.data.msg;
                            console.log(error.response.data.msg);
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },//trearArticulosActivos

            //alistar los articulos para mostrar
            meterArticulos(articulosTraidos){
                let pepe=[];
                articulosTraidos.map(function(x){
                    pepe.push({
                        _id:x._id,
                        categoriaName:x.categoria.nombre,
                        categoria:x.categoria._id,
                        marcaName:x.marca.nombre,
                        marca:x.marca._id,
                        referencia:x.referencia,
                        cantidad:1,
                        precio:x.precio,
                        costo:x.costo,
                    })
                })
                this.articulosMostrador=pepe;
                console.log(this.articulosMostrador);
            },//meterArticulos

            //alistar articulos para colocar en la salida
            facturar(item){
                let editeIndex=this.articulosMostrador.indexOf(item);
                this.articulosFactura.push(item);
                this.articulosMostrador.splice(editeIndex,1);
            },

            //quitar los articulos de la salida
            desfacturar(item){
                let editeIndex = this.articulosFactura.indexOf(item);
                this.articulosMostrador.push(item);
                this.articulosFactura.splice(editeIndex,1);
            },

            //metodo para crear la saldia
            crearSalida(){
                if(this.articulosFactura.length==0){return this.msjErrores("No hay articulos")}
                if(this.comentario.length>250){return this.msjErrores("Comentario mayor a 250 caracteres")}
                let header = {headers:{"token":this.$store.state.token}};
                axios.post('movimiento/crearSalida',{
                        usuario:this.$store.state.id,
                        comentario:this.comentario,
                        totalPrecio:this.totalVendido,
                        totalCosto:this.totalCosto,
                        articulos : this.articulosFactura
                    },header)
                        .then((response)=>{
                            console.log(response);
                            this.traerArticulosActivos();
                            this.articulosFactura=[];
                            this.comentario="";
                            this.msjExitoso("Salida realizada")
                        })
                        .catch((error)=>{
                            console.log(error.response);
                            if(!error.response.data.msg){
                                console.log(error.response);
                                this.msgError = error.response.data.errors[0].msg
                                this.msjErrores(this.msgError);
                            }else{
                                this.msgError = error.response.data.msg
                                console.log(error.response.data.msg);
                                this.msjErrores(this.msgError);
                            }
                        })
            }

        },//methods
        computed:{
            totalVendido(){
                return this.articulosFactura.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.precio))
                },0)
            },
            totalCosto(){
                return this.articulosFactura.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.costo))
                },0)
            }
        }//computed
    }
</script>

<style scoped>
    .botonFactura{
        position:fixed;
        width:250px;
        height:120px;
        line-height:55px;
        bottom:90%;
        right:30px;
        background:#8732A0;
        color:#701FD7;
        border-radius:50px;
        text-align:center;
        font-size:15px;
        box-shadow: 0px 1px 10px rgba(69,67,192,3);
        z-index:100;
    }
    .botonFactura:hover{
        text-decoration:none;
        color:#fff;
        background:#701FD7;
    }
    .comentario{
        font-family: 'calibri'; 
        color: #00000;
        font-size: 200px; 
        text-align:left; 
        margin-left:10px; 
        margin-top:40px; 
        width:80%;
    }
</style>