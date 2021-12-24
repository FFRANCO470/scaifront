<template >
    <div>
        <v-container fluid>
            <v-row>
                <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                    <label>Factura</label>
                </div>
                <v-spacer></v-spacer>
                <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:50px"   @click="imprimir()">
                    <v-icon size="25">mdi-printer</v-icon> Imprimir
                </v-btn>
                <div style="margin-top:50px;margin-right:30px">
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  @click="reset()"  > <v-icon size="20">mdi-plus</v-icon> Nuevo </v-btn>
                </div>
            </v-row>
            
            <v-row>
            
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                    <v-radio-group   v-model="buscar" style="margin-top:1px"  >
                        <v-radio style="margin-left:15px; " label="Num. Factura" color="#72128E"  value="factura"></v-radio> 
                        <v-radio style="margin-left:15px; " label="Cliente" color="#72128E"   value="cliente"></v-radio>
                    </v-radio-group>
                </div>
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                    <v-text-field solo style="width:350px; margin-left:0px;"  v-model="buscarDato" label="# Factura o Cedula"></v-text-field>
                </div>
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                    <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="traerFactura()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                </div>
            </v-row>
            

            <v-card style="justify-content: center; margin: 0 auto; margin-top:50px; width:80%; box-shadow: 0 0 20px #A068B8;padding:15px ">
                <v-row>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">N. Factura</label>
                            <label  class="col-sm-5 col-form-label">{{numFactura}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Fecha:</label>
                            <label  class="col-sm-5 col-form-label">{{fecha}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Hora:</label>
                            <label  class="col-sm-5 col-form-label">{{hora}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Usuario:</label>
                            <label  class="col-sm-5 col-form-label">{{usuario}}</label>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Tipo de documento:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.tipoDocumento}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Numero de documento:</label>
                            <label  class="col-sm-5 col-form-label">{{persona}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Numbre:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.nombre}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Telefono:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.telefono}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Direccion:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.direccion}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Ciudad:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.ciudad}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Correo:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                        </div>
                    </v-col>
                </v-row>
                <!--<v-divider  class="mx-6" inset-margin="100px"  ></v-divider>-->
                <hr style="margin-top:10px;margin-bottom:10px">
                
                <template v-if="tipoFactura!='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{efectivo}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{nequi}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{tarjeta}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Sistecredito:</label>
                                <label  class="col-sm-5 col-form-label">{{credito}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                <template v-if="tipoFactura=='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{efectivo}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{nequi}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{tarjeta}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                
                <hr style="margin-top:10px;margin-bottom:10px">

                

                <template v-if="tipoFactura=='venta'">
                    <div class="form-group row texto">
                        <label  class="col-sm-5 col-form-label">Descuento:</label>
                        <label  class="col-sm-5 col-form-label">{{descuento}}</label>
                    </div>
                </template>

                <template v-if="tipoFactura=='abonoabono'">
                    <v-data-table
                        style="margin-top:10px;"
                        :headers="articulosAbonosTitle"
                        :items="articulosAbono"
                        class="elevation-1"
                    ></v-data-table>
                </template>

                <template v-if="tipoFactura=='venta'">
                    <v-data-table
                        style="margin-top:10px;"
                        :headers="articulosVentaTitle"
                        :items="articulosVenta"
                        class="elevation-1"
                    ></v-data-table>
                </template>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'


    export default {
        data:()=>({
            buscar:'',
            buscarDato:'',
            cliente:{},
            tipoFactura:null,
            numFactura:null,
            fecha:null,
            hora:null,
            usuario:null,
            persona:null,
            efectivo:null,
            nequi:null,
            tarjeta:null,
            credito:null,
            descuento:null,
            articulosAbonosTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
            ],
            articulosAbono: [],
            articulosVentaTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
                { text: 'Precio', value: 'precio' ,class:'black--text',sortable: false},
                { text: 'Total', value: 'totalPrecio' ,class:'black--text',sortable: false},
            ],
            articulosVenta: [],

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

            //msg de error
            msjErrores:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 3000})
            },

            //msg de exito
            msjExito:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 3000})
            },

            //redireccionar para crear compra
            reset(){
                this.$router.push('/facturacion');
            },//reset

            imprimir(){
                this.msjExito("sirvo ._.");
            },

            borrar(){
                this.tipoFactura=null;
                this.numFactura=null;
                this.fecha=null;
                this.hora=null;
                this.usuario=null;
                this.persona=null;
                this.efectivo=null;
                this.nequi=null;
                this.tarjeta=null;
                this.credito=null;
                this.descuento=null;
            },

            traerFactura(){
                this.borrar();
                let header = {headers:{"token" : this.$store.state.token}};

                axios.get(`venta/ventaByCriterio?buscar=${this.buscar}&buscarDato=${this.buscarDato}`,header,)
                    .then(response=>{
                        console.log(response);
                        if(!response.data.venta){
                            return this.msjExito("No hay factura coincidente con los datos")
                        }
                        if(response.data.venta.length==0){
                            return this.msjExito("No hay factura coincidente con los datos")
                        }
                        this.limpiarDatosFactura(response.data.venta);
                        // venta=response.data.venta
                    })
                    .catch(error=>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjErrores(this.msgError);
                        }else{
              
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },

            limpiarDatosFactura(factura){

                if(factura.length>0){
                    factura = factura[0];
                }

                this.tipoFactura = factura.tipoFactura;
                let date = new Date(factura.createdAt);
                this.hora = (date.getHours()+5) + ":" + date.getMinutes();
                this.fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                this.numFactura = factura.numFactura;
                this.usuario = factura.usuario.nombreUser;
                this.persona = factura.persona;
                this.efectivo = factura.efectivo;    
                this.nequi = factura.nequi;    
                this.tarjeta = factura.tarjeta;    


                this.traerCliente(this.persona);

                if(factura.tipoFactura=="debito"){
                    console.log("debito");

                }else if(factura.tipoFactura=="abonoabono"){

                    console.log("abono abono");
                    this.credito = factura.credito;    
                    let articulos = factura.articulos;
                    let articulosLimpios=[];

                    if(articulos.length>0){
                        articulos.map(function(x){
                            let codigo = x.sku.split("-")
                            console.log(codigo);
                            articulosLimpios.push({
                                referencia:codigo[2],
                                categoria:codigo[0],
                                marca : codigo[1],
                                cantidad : x.cantidad,
                            })
                        })
                    }

                    this.articulosAbono=articulosLimpios;

                }else{
                    console.log("venta");
                    this.credito = factura.credito;    
                    this.descuento = factura.descuento;  

                    let articulos = factura.articulos;
                    let articulosLimpios=[];

                    if(articulos.length>0){
                        articulos.map(function(x){

                            let codigo = x.sku.split("-")
                            console.log(codigo);
                            articulosLimpios.push({
                                referencia:codigo[2],
                                categoria:codigo[0],
                                marca : codigo[1],
                                cantidad : x.cantidad,
                                precio : x.precio,
                                totalPrecio:x.precio*x.cantidad
                            })
                        })
                    }  

                    this.articulosVenta=articulosLimpios;
                }
                
            },//limpiarDatosFactura

            traerCliente(cliente){
                if(cliente!=""){

                    let header = {headers:{"token" : this.$store.state.token}};
                        axios.get(`cliente/buscando?numDocumento=${cliente}`,header,)
                            .then(response=>{
                                console.log(response);
                                if(response.data.persona!=false){
                                    this.cliente=response.data.persona;
                                }else{
                                    this.msjExito("Cliente no registrado en el sistema");
                                }
                            })
                            .catch(error=>{
                                console.log(error.response);
                                if(!error.response.data.msg){
                                    this.msgError = error.response.data.errors[0].msg;
                                    this.msjErrores(this.msgError);
                                }else{
                                    this.msgError =error.response.data.msg;
                                    this.msjErrores(this.msgError);
                                }
                            })
                }
            }//traerCliente


        },//methodos

        computed:{
        }//computed
    }//export default
</script>

<style scoped>
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 20px;
        text-align:left;
        margin-top:-10px;
    }
</style>