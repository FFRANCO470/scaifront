<template>
    <div>
        <v-btn class="botonFactura"    @click="crearFactura()">
            <v-icon >mdi-clipboard-account-outline</v-icon> Generar facutra
        </v-btn>

        <!--TIPO DE FACTURA Y COMENTARIO-->
        <v-card style="margin-top:70px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8; ">
            <v-row>
                <v-col>
                    <v-checkbox style="margin-left:10px;" v-model="guardarDatos"  :label="`No guardar cliente ${guardarDatos}`"></v-checkbox>

                    <div style="font-family: 'calibri';  color: #00000;  font-size: 20px; text-align:left;  margin-left:30px; margin-top:10px;">
                        <div class="form-group row">
                            <label  class="texto">Tipo de factura:</label>

                            <!--TIPO DE FACTURA-->
                            <v-radio-group   v-model="tipoFactura" style="margin-top:1px"  >
                                <v-radio style="margin-left:15px; " label="Debito" color="#72128E"  value="debito"></v-radio> 
                                <v-radio style="margin-left:15px; " label="Abono sobre abono" color="#72128E"   value="abonoAbono"></v-radio>
                                <v-radio style="margin-left:15px; " label="Venta" color="#72128E"   value="venta"></v-radio>
                            </v-radio-group>

                            <!--SUBTIPO DE FACTURA DEBITO Y ABONO SOBRE ABONO-->
                            <v-radio-group v-if="tipoFactura=='debito' || tipoFactura=='abonoAbono'" :value="subTipoFactura=''">  </v-radio-group> 
                                               
                            <!--SUBTIPO DE FACTURA VENTA-->
                            <v-radio-group v-model="subTipoFactura" v-if="tipoFactura=='venta'" > 
                                <v-radio style="margin-left:15px; margin-top:-15px; " label="Venta" color="#72128E" value="venta"></v-radio>
                                <v-radio style="margin-left:15px; " label="Abono" color="#72128E" value="abono"></v-radio>
                            </v-radio-group> 
                            
                        </div>
                    </div>
                </v-col>

                <!--COMENTARIO-->
                <v-col>
                    <div class="form-group row comentario">
                        <v-textarea v-model="comentario"  color="#72128E"   outlined  :counter=250 label="Observaciones"></v-textarea>
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <!-- DATOS DEL CLIENTE -->
        <v-card style="margin-top:20px; margin-left:30px; width:95%;box-shadow: 0 0 20px #A068B8; ">
            <v-row>
                <v-col>
                    <div class="form-group row texto" style="margin-top:10px;margin-left:0px">
                        <label  class="col-sm-4 col-form-label">No. factura:</label>
                        <label  class="col-sm-2 col-form-label">{{numFactura}}</label>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" >Numero documento:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente._id"  placeholder="">
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="traerCliente()"><v-icon>mdi-account-search-outline</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px">Tipo documento:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.tipoDocumento"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px">Nombre:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.nombre"  placeholder="">
                        
                    </div>
                </v-col>

                <v-col>
                    <div class="form-group row texto" style="margin-top:10px">
                        <label  class="col-sm-3 col-form-label" style="height:45px;"></label>
                    </div>
                    <div class="form-group row texto" style="margin-top:10px">
                        <label  class="col-sm-3 col-form-label">Direccion:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.direccion"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Ciudad:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.ciudad"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Telefono:</label>
                        <input type="text" class="form-control mb-4 textoInput" v-model="cliente.telefono"  placeholder="">
                        
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Email:</label>
                        <input type="text" class="form-control mb-4 textoInput" v-model="cliente.email"  placeholder="">
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <!--DATOS CONDICIONALES-->
                
        <v-card style="margin-top:40px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8;padding:15px ">

            <!--DEBITO-->
            <template  v-if="tipoFactura=='debito'">
                <v-row>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo anterior:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="saldoAnterior"  placeholder="$" >
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Efectivo:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="efectivo"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Nequi:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="nequi"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Tarjeta:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="tarjeta"  placeholder="$">
                        </div>                        
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo actual:</label>
                            <label  class="col-sm-4 col-form-label">{{saldoAnterior-efectivo-nequi-tarjeta}}</label>
                        </div>    
                    </v-col>
                </v-row>
            </template >

            <!--ABONO SOBRE ABONO-->
            <template  v-if="tipoFactura=='abonoAbono'">
                <v-row>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo anterior:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="saldoAnterior"  placeholder="$">
                        </div>

                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Abono:</label>
                            <label  class="col-sm-4 col-form-label">{{-1*(-efectivo - nequi - tarjeta - credito)}}</label>
                        </div>

                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo actual:</label>
                            <label  class="col-sm-4 col-form-label">{{saldoAnterior-efectivo-nequi-tarjeta-credito}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Efectivo:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="efectivo"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Nequi:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="nequi"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Tarjeta:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="tarjeta"  placeholder="$">
                        </div> 
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Credito:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="credito"  placeholder="$">
                        </div> 
                    </v-col>
                </v-row>
            </template >

            <!--VENTA-->
            <template  v-if="tipoFactura=='venta' ">
                <v-row>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Sub total:</label>
                            <label  class="col-sm-4 col-form-label">{{totalVendido}}</label>
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Descuento:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="descuento"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Total:</label>
                            <label  class="col-sm-4 col-form-label">{{totalVendido-descuento}}</label> 
                        </div>
                        <template  v-if="subTipoFactura=='abono' ">
                            <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Abono:</label>
                                <label  class="col-sm-4 col-form-label">{{-1*(-efectivo - nequi - tarjeta - credito)}}</label> 
                            </div>
                            <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Saldo:</label>
                                <label  class="col-sm-4 col-form-label">{{totalVendido-descuento-efectivo - nequi - tarjeta - credito}}</label> 
                            </div>
                        </template>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Efectivo:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="efectivo"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Nequi:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="nequi"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Tarjeta:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="tarjeta"  placeholder="$">
                        </div> 
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Credito:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="credito"  placeholder="$">
                        </div>
                        <template  v-if="subTipoFactura=='venta' ">
                            <div class="form-group row texto" style="margin-top:10px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label"></label>
                                <label  class="col-sm-4 col-form-label" style="border-top: solid purple; ">{{totalVendido-descuento-efectivo - nequi - tarjeta - credito}}</label> 
                            </div>
                        </template>
                    </v-col>
                </v-row>                        
            </template >
        </v-card>

        <!--TABLAS CON ARTICULOS-->
        
        <!--abono abono-->
        <template v-if="tipoFactura=='abonoAbono' && (saldoAnterior-efectivo-nequi-tarjeta-credito)==0">
            <div class="form-group row texto" style="margin-top:2px;margin-left:10px;margin-top:20px">
                <v-row>
                    <!--tabla con articulo activos-->
                    <v-col>
                            <v-data-table  class=" elevation-15 ancho-tabla" :headers="mostrarArticulosAbonoAbono" :items="articulosMostradosVenta" :search="search">
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
                    <!--tabla con articulo facturados-->
                    <v-col>
                        <v-data-table class=" elevation-15 ancho-tabla" :headers="facturaArticulosAbonoAbono" :items="facturaArticulos"   >
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
                </v-row>
            </div>
        </template>
        
        <!--venta-->
        <template v-if="tipoFactura=='venta'">
            <div class="form-group row texto" style="margin-top:2px;margin-left:10px;margin-top:20px">
                <v-row>
                    <v-col>
                        <!--tabla con articulo activos-->
                            <v-data-table  class=" elevation-15 ancho-tabla" :headers="articulosMostradosVentaTitle" :items="articulosMostradosVenta" :search="search">
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

                    <!--tabla con articulo facturados-->
                    <v-col>
                        <v-data-table class=" elevation-15 ancho-tabla" :headers="facturaArticulosTitle" :items="facturaArticulos"   >
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
                </v-row>
            </div>
        </template>
        

    </div>
</template>

<script>
    //import {eventBus} from '../main'
    import axios from 'axios'
    import Swal from "sweetalert2"
    import jsPDF from 'jspdf'
    
    //import * as fs from 'fs'


    export default {
        data:()=>({
            numFactura:0,
            guardarDatos:false,
            existeCliente:false,
            tipoFactura:'',
            subTipoFactura:'',
            comentario:'',
            saldoAnterior:0,
            efectivo:0,
            nequi:0,
            tarjeta:0,
            credito:0,
            descuento:0,
            cliente:{
                _id:'',
                tipoDocumento:'',
                nombre:'',
                direccion:'',
                ciudad:'',
                telefono:'',
                email:''
            },
            //datos a enviar
            
            search:'',
            articulosTraidos:[],//articulos activos del servidor
            facturaArticulos:[],//articulos en la factura
            articulosMostradosVenta:[],//articulos mostrados para la venta
            
            //mostrar articulos todos los campos
            articulosMostradosVentaTitle:[
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Categoria', value: 'categoriaName' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marcaName' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad' , class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio' , class:'purple darken-3 white--text'},
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],
            //articulos vendidos
            facturaArticulosTitle:[
                { text: 'Referencia', value: 'referencia',class:'grey darken-4 white--text' },
                { text: 'Categoria', value: 'categoriaName',class:'grey darken-4 white--text' },
                { text: 'Cantidad', value: 'cantidad',class:'grey darken-4 white--text' },
                { text: 'Precio uni.', value: 'precio',class:'grey darken-4 white--text' },
                {text:'Sub total',value:'subtotal',class:'grey darken-4 white--text',sortable: false},
                {text:'Eliminar',value:'actions',class:'grey darken-4 white--text',sortable: false}
            ],
            
            //articulos abono abono
            mostrarArticulosAbonoAbono:[
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Categoria', value: 'categoriaName' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marcaName' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad',class:'purple darken-3 white--text' },
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],
            facturaArticulosAbonoAbono:[
                { text: 'Referencia', value: 'referencia',class:'grey darken-4 white--text' },
                { text: 'Categoria', value: 'categoriaName',class:'grey darken-4 white--text' },
                { text: 'Marca', value: 'marcaName' , class:'grey darken-4 white--text'},
                { text: 'Cantidad', value: 'cantidad',class:'grey darken-4 white--text' },
                {text:'Eliminar',value:'actions',class:'grey darken-4 white--text',sortable: false}
            ],

            
        }),//data
        
        created(){
            this.checkToken();
            this.traerNumFactura();
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

            //buscar y traer el cliente
            traerCliente(){
                if(this.cliente._id.trim()===''){return this.msjErrores('Numero de documento obligatorio')}
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`cliente/buscando?numDocumento=${this.cliente._id}`,header,)
                    .then(response=>{
                        if(response.data.persona==false){
                            this.agregarCliente();
                        }else{
                            this.cliente=response.data.persona;
                            this.existeCliente=true;
                        }
                    })
                    .catch(error=>{
                        if(!error.response.data.msg){
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjErrores(this.msgError);
                        }else{
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },//traerCliente

            //preguntar si desea agregar cliente 
            agregarCliente:function(){
                Swal.fire({
                    icon: 'question',
                    title: 'No existe...¿Desea agregar?',
                    confirmButtonText: `Agregar`,
                    showDenyButton: false,
                    showCancelButton: true,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        //this.formularioCliente=1;
                        this.guardarDatos=false
                        this.existeCliente=false;
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            },//agregarCliente

            //traer numero de factura
            traerNumFactura(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get('generalData/venta',header,)
                    .then(response=>{
                        this.numFactura=response.data.numFactura;
                    })
                    .catch(error=>{
                        if(!error.response.data.msg){
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjErrores(this.msgError);
                        }else{
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },//traerNumFactura

            //traer articulos activos
            traerArticulosActivos(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get("articulo/activos",header)
                    .then(response =>{   
                        this.articulosTraidos = response.data.articulo
                        this.meterArticulos(this.articulosTraidos);
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

            //alistar los articulos para mostrar en la venta
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
                this.articulosMostradosVenta=pepe;
                
            },//meterArticulos

            //meter el articulo en la venta
            facturar(item){
                this.editedIndex=this.articulosMostradosVenta.indexOf(item);
                this.facturaArticulos.push(item);
                this.articulosMostradosVenta.splice(this.editedIndex,1);
            },//facturar

            //quita el articulo de la venta
            desfacturar(item){
                this.editedIndex=this.facturaArticulos.indexOf(item)
                this.articulosMostradosVenta.push(item)
                this.facturaArticulos.splice(this.editedIndex,1)
            },//desfacturar
            //crear la factura

            crearFactura(){
                
                //validar tipo factura
                if(this.tipoFactura===""){return this.msjErrores('Tipo de factura obligatorio')}
                //validar subtipo factura
                if(this.tipoFactura=='venta'){
                    if(this.subTipoFactura==''){
                        return this.msjErrores('SubTipo de factura obligatorio')
                    }
                    if(this.facturaArticulos.length===0){
                        return this.msjErrores('Artuculos obligatorios')
                    }
                    let saldoVenta = -1 * (-this.efectivo - this.nequi - this.tarjeta - this.credito)
                    let saldoTotal = this.totalVendido - this.descuento
                    if(this.subTipoFactura=='venta'){
                        if(saldoVenta != saldoTotal ){
                            return this.msjErrores('Saldos desiguales')
                        }
                    }
                    
                }

                //validar factura debito
                if(this.tipoFactura=='debito'){
                    if(this.saldoAnterior==0 ||  this.saldoAnterior==''){
                        return this.msjErrores('Saldo anterior obligatorio')
                    }
                    if((this.efectivo==0 && this.nequi==0 && this.tarjeta==0) || 
                       (this.efectivo=='' && this.nequi=='' && this.tarjeta=='') ){
                        return this.msjErrores('Completar almenos efectivo o nequi o tarjeta')
                    }
                }

                //validar factura abono sobre abono
                if(this.tipoFactura=='abonoAbono'){
                    if(this.saldoAnterior==0 ||  this.saldoAnterior==''){
                        return this.msjErrores('Saldo anterior obligatorio')
                    }
                    if((this.efectivo==0 && this.nequi==0 && this.tarjeta==0 && this.credito==0) || 
                       (this.efectivo=='' && this.nequi=='' && this.tarjeta=='' && this.credito=='') ){
                        return this.msjErrores('Completar almenos efectivo o nequi o tarjeta o credito')
                    }
                    let saldo = this.saldoAnterior - this.efectivo - this.nequi - this.tarjeta -this.credito
                    if(saldo==0 &&  this.facturaArticulos.length===0){
                        return this.msjErrores('Artuculos obligatorios')
                    }
                }
                //validar comentario
                if(this.comentario.length>250){
                    return this.msjErrores('Comentario mayor a 250 caracteres')
                }
                
                //validar id cliente
                if(!this.guardarDatos){
                    if(this.cliente._id===''){return this.msjErrores('Numero de documento obligatorio')}
                    if(this.cliente.nombre===''){return this.msjErrores('Nombre obligatorio')}
                }

                console.log("enviar");
                console.log(this.facturaArticulos);
                console.log("enviar");


                let me = this                
                let header = {headers:{"token":this.$store.state.token}};
                axios.post('venta',
                    {
                        usuario:this.$store.state.id,
                        numFactura:this.numFactura,
                        tipoFactura:this.tipoFactura,
                        subTipoFactura:this.subTipoFactura,
                        comentario:this.comentario,
                        guardarDatos:this.guardarDatos,
                        existeCliente:this.existeCliente,
                        persona:this.cliente,
                        saldoAnterior:this.saldoAnterior,
                        efectivo:this.efectivo,
                        nequi:this.nequi,
                        tarjeta:this.tarjeta,
                        credito:this.credito,
                        descuento:this.descuento,
                        
                        totalPrecio:this.totalVendido,
                        totalCosto:this.totalCosto,
                        articulos : this.facturaArticulos
                    },header)
                        .then((response)=>{
                            console.log(response);
                            this.msjExitoso('estoy facturando')
                            this.traerNumFactura();
                            me.traerArticulosActivos();
                            //me.limpiarTodo();

                           me.crearPDF();
                            //eventBus.$emit("pasar","la escalandia")
                            
                            //this.$router.push('/aaaa');
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
                
            },//crearFactura

            limpiarTodo(){
                this.cliente={};
                this.existeCliente = false;
                this.guardarDatos = false;
                this.tipoFactura="";
                this.subTipoFactura="";
                this.saldoAnterior=0;
                this.efectivo=0;
                this.nequi=0;
                this.tarjeta=0;
                this.credito=0;
                this.descuento=0;
                this.facturaArticulos=[];
                this.comentario="";
                console.log("limiop");
            },//limpiarTodo

            crearPDF(){ 
                //http://raw.githack.com/MrRio/jsPDF/master/docs/module-viewerpreferences.html
               
                //http://raw.githack.com/MrRio/jsPDF/master/
               
                var sise = 10
                
                //cliente
                let documento = this.cliente._id.slice(0,13); //17
                let tipoDocumento = this.cliente.tipoDocumento.slice(0,9); //17
                let nombre = this.cliente.nombre.slice(0,16); //17
                let telefono = this.cliente.telefono.slice(0,14); //16
                let direccion = this.cliente.direccion.slice(0,14); //17
                let ciudad = this.cliente.ciudad.slice(0,17); //19

                //fecha
                const d = new Date();
                let dia = d.getDate()
                const monthNames = ["ene", "feb", "mar", "abr", "may", "jun",
                    "jul", "ago", "sep", "oct", "nov", "dic"
                ];
                let mes = monthNames[d.getMonth()]
                let ano = d.getFullYear();
                let hora = d.getHours();
                let min = d.getMinutes();

                let correr = 84;
                var datos = [];

                if(this.tipoFactura=="debito"){

                    let totalDebito = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta);
                    datos = [
                        {referencia: " ",cantidad: "1",categoria: "Debito",precio: " ",total:totalDebito.toString()},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:4},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: "Total",total:totalDebito.toString()}
                    ];
                    correr = 120;
                }else if(this.tipoFactura=="abonoAbono"){

                    let articulospdf = this.facturaArticulos
                    console.log(articulospdf);
                    if(articulospdf.length != 0){
                        articulospdf.map(function(x){
                            datos.push({
                                referencia:x.referencia,
                                categoria:x.categoriaName,
                                cantidad:x.cantidad.toString(),
                                precio:" ",
                                total: " "
                            })
                        })
                    }else{
                        datos.push(
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "}
                        )
                    }
                    let total = this.saldoAnterior.toString();
                    let abono = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito)
                    let saldo = parseInt(total) - (parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito))
                    datos.push(
                        {referencia: "",cantidad: "",categoria: "",precio: "saldo A.",total:total},
                        {referencia: "",cantidad: "",categoria: "",precio: "abono ",total:abono.toString()},
                        {referencia: "",cantidad: "",categoria: 0,precio: "saldo ",total:saldo.toString()}
                    )
                    correr = correr + 40
                    let tamano = datos.length;
                    correr = correr + ((tamano-5) * 8);

                }else{

                    this.facturaArticulos.map(function(x){
                        datos.push({
                            referencia:x.referencia,
                            categoria:x.categoriaName,
                            cantidad:x.cantidad.toString(),
                            precio:x.precio.toString(),
                            total: (x.cantidad * x.precio).toString()
                        })
                    })

                    let total = (this.totalVendido-this.descuento).toString();

                    if(this.subTipoFactura=="venta"){
                        datos.push(
                            {referencia: "",cantidad: "",categoria: "",precio: "subtotal",total:this.totalVendido.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "desc.",total:this.descuento.toString()},
                            {referencia: "",cantidad: "",categoria: 0,precio: "total ",total:total}
                        )
                        correr = correr + 30;
                        let tamano = datos.length;
                        correr = correr + ((tamano-3) * 8);

                    }else{
                        let abono = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito)
                        let saldo = parseInt(total) - (parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito))
                        datos.push(
                            {referencia: "",cantidad: "",categoria: "",precio: "subtotal",total:this.totalVendido.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "desc.",total:this.descuento.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "total ",total:total},
                            {referencia: "",cantidad: "",categoria: "",precio: "abono ",total:abono.toString()},
                            {referencia: "",cantidad: "",categoria: 0,precio: "saldo ",total:saldo.toString()}
                        )
                        correr = correr + 40
                        let tamano = datos.length;
                        correr = correr + ((tamano-5) * 8);
                    }
                }

                let vendedor = this.$store.state.nombreUser.slice(0,13)
                let observacion = this.comentario.slice(0,251);

                let cortar = (correr + 61) * 2.9;
                
                var doc = new jsPDF();

                doc.beginFormObject(0, 0, 200, cortar)
                
                doc.setFont('helvetica', 'italic');
                doc.text("The Scala",20,8,{charSpace:0.4,maxWidth:97});
                
                doc.setFontSize(18);
                doc.setFont("helvetica","bold");

                doc.setFontSize(sise);
                doc.text("GINA PAOLA CEPEDA VERGARA", 4, 15,{charSpace:0.2});

                doc.setFontSize(sise);
                doc.text("NIT: 52515303-7",       4, 20,{charSpace:0.2});
                doc.text("REGIMEN SIMPLIFICADO", 4,  25,{charSpace:0.2});
                doc.text("C.C EL PUENTE L.154",  4, 30,{charSpace:0.2});
                doc.text("SAN GIL(SDER)",   4, 35,{charSpace:0.2});
                doc.text("CELULAR : 311 893 8204",    4, 40,{charSpace:0.2});
                doc.text("TELEFONO: 607 724 1748",        4, 45,{charSpace:0.2});
                
                doc.text(`NOMBRE: ${nombre}`,   4, 55 ,{charSpace:0.3});
                doc.text(`TIPO DOCUMENTO: ${tipoDocumento}`,   4, 60 ,{charSpace:0.3});
                doc.text(`DOCUMENTO: ${documento}`,   4, 65 ,{charSpace:0.3});
                doc.text(`TELEFONO: ${telefono}`, 4, 70 ,{charSpace:0.3});
                doc.text(`DIRECCION: ${direccion}`,4, 75 ,{charSpace:0.3});
                doc.text(`CIUDAD: ${ciudad}`,   4, 80 ,{charSpace:0.3});

                doc.line(1,81,68,81)
                doc.text(`Factura Venta  ${this.numFactura}`, 4,85,{charSpace:0.3});
                
                doc.text(`${dia}-${mes}-${ano}    ${hora}:${min}   `,  4,90,{charSpace:0.3});

                var cabeza = [
                    {align:"center",width:22,id:"referencia",name:"referencia",prompt:"Refer"},
                    {align:"center",width:18,id:"categoria",name:"categoria",prompt:"Desc."},
                    {align:"center",width:13,id:"cantidad",name:"cantidad",prompt:"Cant"},
                    {align:"center",width:18,id:"precio",name:"precio",prompt:"Vr Unit"},
                    {align:"center",width:19.5,id:"total",name:"total",prompt:"Vr total"}
                ];
                
                
                doc.table(0, 95, datos, cabeza,{fontName:"Arial",fontSize:"9",autoSize: false,headerBackgroundColor:"#FFFFFF",padding:0.3,});

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(sise);
                
                doc.text(`Vendedor: ${vendedor}`, 15,correr + 5,{charSpace:0.2});

                doc.text("Metodo de pago", 20,correr + 10,{charSpace:0.3});

                var datos2 = []
                if(this.tipoFactura=="debito"){
                    datos2 = [{efectivo: this.efectivo.toString(), tarjeta: this.tarjeta.toString(), nequi:this.nequi.toString(), credito: "0"}];

                }else{
                    datos2 = [{efectivo: this.efectivo.toString(), tarjeta: this.tarjeta.toString(), nequi:this.nequi.toString(), credito: this.credito.toString()}];
                }
                var cabeza2 = [
                    {align:"center",width:22,id:"efectivo",name:"efectivo",prompt:"Efectivo"},
                    {align:"center",width:22,id:"tarjeta",name:"tarjeta",prompt:"Tarjeta"},
                    {align:"center",width:22,id:"nequi",name:"nequi",prompt:"Nequi"},
                    {align:"center",width:25,id:"credito",name:"credito",prompt:"Sistecredito"}
                    
                ];

                doc.table(0, correr + 15, datos2, cabeza2,{fontName:"Arial",fontSize:"9",autoSize: false,headerBackgroundColor:"#FFFFFF",padding:0.3,});


                doc.text("Observaciones", 28,correr + 30,{charSpace:0.3});
                doc.text(`${observacion}`, 4,correr + 35,{maxWidth:"52",charSpace:0.3});

                
                doc.roundedRect(0, 0, 68, correr + 60, 0, 0);
                
                doc.output('dataurlnewwindow');
                this.limpiarTodo();
                
            }//crearPDF
            
        },//methods
        computed:{
            totalVendido(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.precio))
                },0)
            },
            totalCosto(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.costo))
                },0)
            }
        }
    }//export default
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
        margin-left:0px; 
        margin-top:10px; 
        width:80%;
    }
    .texto{
        font-family: 'calibri';
        color: #701FD7;
        font-size: 20px;
        text-align:left;
    }
    .textoInput{
        font-family: 'calibri';
        color: #72128E;
        font-size: 20px;
        border: 3px solid #72128E;
        border-radius: 5px;
        height:35px;
        margin-top:12px    
    }
</style>