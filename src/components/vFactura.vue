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
                            <label  class="col-sm-5 col-form-label">{{venta.numFactura}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Fecha:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Hora:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Usuario:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
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
                            <label  class="col-sm-5 col-form-label">{{venta.persona}}</label>
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
                
                <template v-if="venta.tipoFactura!='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{venta.numFactura}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Sistecredito:</label>
                                <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                <template v-if="venta.tipoFactura=='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{venta.numFactura}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                
                <hr style="margin-top:10px;margin-bottom:10px">

                

                <template v-if="venta.tipoFactura=='venta'">
                    <div class="form-group row texto">
                        <label  class="col-sm-5 col-form-label">Descuento:</label>
                        <label  class="col-sm-5 col-form-label">{{venta.descuento}}</label>
                    </div>
                </template>

                <template v-if="venta.tipoFactura=='abonoabono'">
                    <v-data-table
                        style="margin-top:10px;"
                        :headers="articulosAbonosTitle"
                        :items="articulosAbono"
                        class="elevation-1"
                    ></v-data-table>
                </template>

                <template v-if="venta.tipoFactura=='venta'">
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
    // import axios from 'axios'
    import Swal from 'sweetalert2'


    export default {
        data:()=>({
            buscar:'',
            buscarDato:'',
            cliente:{},
            venta:{},
            articulosAbonosTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
            ],
            articulosAbono: [
                {categoria: 'Frozen',marca: 200,referencia: 6.0,cantidad: 24,},
                {categoria: 'Ice',marca: 200,referencia: 9.0,cantidad: 37 }
            ],
            articulosVentaTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
                { text: 'Precio', value: 'precio' ,class:'black--text',sortable: false},
                { text: 'Total', value: 'totalPrecio' ,class:'black--text',sortable: false},
            ],
            articulosVenta: [
                {categoria: 'Frozen',marca: 200,referencia: 6.0,cantidad: 24,precio:8,totalPrecio:7},
                {categoria: 'Ice',marca: 200,referencia: 9.0,cantidad: 37,precio:8,totalPrecio:7 }
            ],

        }),//data
        created(){
            this.checkToken();
        },
        methods:{
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
                this.venta.tipoFactura="abonoabono"
            },

            //msg de error
            msjError:function(tata){
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
                    timer: 2000})
            },

            //redireccionar para crear compra
            reset(){
                this.$router.push('/facturacion');
            },//reset

            imprimir(){
                this.msjExito("sirvo ._.");
            },

            traerFactura(){
                this.msjExito(`${this.buscar} con el number ${this.buscarDato}`);
            },

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