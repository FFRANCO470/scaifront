<template >
    <div>
        <v-container fluid>
            <template v-if="vista==1">
                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Ventas</label>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:50px"   @click="exportExcel()">
                        <v-icon size="25">mdi-file-excel-outline</v-icon>Exportar
                    </v-btn>
                    <div style="margin-top:50px;margin-right:30px">
                        <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  @click="reset()"  > <v-icon size="20">mdi-plus</v-icon> Nuevo </v-btn>
                    </div>
                </v-row>

                <v-row>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Fecha inicial</label>
                    </div>
                    <div style="width:120px;color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:5px">
                        <v-menu ref="menu"   v-model="calendarioInicio" :close-on-content-click="false"  transition="scale-transition" offset-y  min-width="auto" >
                            <template   v-slot:activator="{ on, attrs }">
                            <v-text-field style="width:180px;margin-left:20px;" v-model="fechaInicio"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaInicio"  no-title scrollable  >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="calendarioInicio = false"  > OK </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:50px;">
                        <label>Fecha final</label>
                    </div>
                    <div style="width:120px;color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:5px">
                        <v-menu ref="menu"  v-model="calendarioFinal" :close-on-content-click="false" transition="scale-transition" offset-y  min-width="auto" >
                            <template v-slot:activator="{ on, attrs }"  >
                            <v-text-field style="width:180px; margin-left:20px;"  v-model="fechaFinal"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaFinal"  no-title scrollable  >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="calendarioFinal = false"  > OK </v-btn>
                            </v-date-picker>
                        </v-menu>  
                    </div>
                    
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:50px">
                        <label>Tipo venta</label>
                    </div>
                    <div style="width:120px;color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                        <v-select :items="tiposVenta" v-model="typesell" solo ></v-select>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="traeraVentas()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                    </div>
                </v-row>
                
                <v-row style="margin-top:0px;">
                    <v-col>
                        <div class="totales">
                            <label>T. Vendido: {{totalVendido}}</label>
                        </div>
                        <div class="totales">
                            <label>T. Descuento:{{totalDescuento}} </label>
                        </div>
                        <div class="totales">
                            <label>T. Costo:{{totalCosteado}} </label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="totales">
                            <label>T. Efectivo:{{totalEfectivo}} </label>
                        </div>
                        <div class="totales">
                            <label>T. Nequi:{{totalNequi}} </label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="totales">
                            <label>T. Tarjeta: {{totalTarjeta}}</label>
                        </div>
                        <div class="totales">
                            <label>T. Credito:{{totalCredito}} </label>
                        </div>
                    </v-col>
                    
                </v-row>

                <template>
                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="creditosTitle" :items="ventas"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                            <v-spacer></v-spacer>
                            <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar por caracteres"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.venta`]="{ item }">
                            {{parseInt(item.efectivo) + parseInt(item.nequi) + parseInt(item.tarjeta) + parseInt(item.credito)}}
                        </template>
                        <template v-slot:[`item.saldo`]="{ item }">
                            {{parseInt(item.saldoAnterior) - parseInt(item.efectivo) - parseInt(item.nequi) - parseInt(item.tarjeta) - parseInt(item.credito)}}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon  class="mr-2"  @click="cambioPagina(2,item)"  >mdi-file-find</v-icon>
                            <!--<v-icon  class="mr-2"  @click="borrar(item)"  >mdi-delete</v-icon>-->
                        </template>
                    </v-data-table>
                </template>

            </template>
            <template v-if="vista==2">
                <v-container>
                    <v-row>
                        <v-btn   @click="cambioPagina(1,false)"  color="black"  icon dark  class="mb-2" ><v-icon size="70" >mdi-arrow-left-bold-circle-outline</v-icon></v-btn>
                    </v-row>

                    <v-card style="margin-top:40px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8;padding:15px ">
                        <v-row>
                            <v-col>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Fecha:</label>
                                    <label  class="col-sm-5 col-form-label">{{venta.createdAt}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Hora:</label>
                                    <label  class="col-sm-5 col-form-label">{{venta.time}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Usuario:</label>
                                    <label  class="col-sm-5 col-form-label">{{venta.usuario}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Comentario:</label>
                                    <label  class="col-sm-5 col-form-label" style="border: 1px solid #C0C0C0;margin-top:20px;margin-bottom:20px">{{venta.comentario}}</label>
                                </div>
                            </v-col>
                            <v-divider  class="mx-4" inset  vertical ></v-divider>
                            <v-col>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Total vendido:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.totalPrecio}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Total costo:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.totalCosto}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Descuento:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.descuento}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.efectivo}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Nequi:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.nequi}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.tarjeta}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Credito:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{venta.credito}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Total:</label>
                                    <label  class="col-sm-5 col-form-label" style="border-top: solid purple; ">$ {{-1*(-venta.efectivo-venta.nequi-venta.tarjeta-venta.credito)}}</label>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>


                    <v-card style="margin-top:40px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8;padding:15px ">
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
                                    <label  class="col-sm-5 col-form-label">Nombre:</label>
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
                    </v-card>

                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="articulosTitle" :items="articulos"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar Prenda"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template >
                        <template v-slot:[`item.totalPrecioArti`]="{ item }">
                            {{parseInt(item.cantidad) - parseInt(item.precio)}}
                        </template>
                        <template v-slot:[`item.totalCostoArti`]="{ item }">
                            {{parseInt(item.cantidad) - parseInt(item.costo)}}
                        </template>
                    </v-data-table>

                </v-container>
            </template>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import XLSX from "xlsx"


    export default {
        data:()=>({
            vista:1,
            tiposVenta:['','venta','abono'],
            typesell:'',
            ventas:[],
            venta:{},
            articulos:[],
            cliente:{},
            calendarioInicio: false,
            calendarioFinal: false,
            fechaFinal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            search:'',
            creditosTitle:[
                { text: 'Fecha', value: 'createdAt'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'Hora', value: 'time'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'factura', value: 'numFactura'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Comentario', value: 'comentario'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Tipo', value: 'subTipoFactura'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Total', value: 'totalPrecio'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Efectivo', value: 'efectivo'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Nequi', value: 'nequi'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Tarjeta', value: 'tarjeta'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Credito', value: 'credito'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],
            articulosTitle:[
                { text: 'Categoria', value: 'categoria'  ,class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca'  ,class:'purple darken-3 white--text'},
                { text: 'Referencia', value: 'referencia'  ,class:'purple darken-3 white--text'},
                { text: 'Cantidades', value: 'cantidad'  ,class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio'  ,class:'purple darken-3 white--text'},
                { text: 'Costo', value: 'costo'  ,class:'purple darken-3 white--text'},
                { text: 'T.Precio', value: 'totalPrecioArti'  ,class:'purple darken-3 white--text'},
                { text: 'T.Costo', value: 'totalCostoArti'  ,class:'purple darken-3 white--text'}
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

            //cambiar de interfaz
            cambioPagina(num,item){
                if(num==2){
                    this.vista=2;
                    this.detallesVenta(item);
                    this.ventas=[];
                }else{
                    this.vista=1;
                    this.venta={};
                    this.cliente={};
                }
            },

            //traer todos los ventas por fecha
            traeraVentas(){
                let diferencia = (new Date(this.fechaFinal).getTime()-new Date(this.fechaInicio).getTime())/(1000*60*60*24);
                if(diferencia<0){
                    return this.msjError("Fecha inicial mayor a fecha final");
                }
                if(diferencia>180){
                    return this.msjError("Max. 180 dias");
                }
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`venta/venta?fechaInicial=${this.fechaInicio}&fechaFinal=${this.fechaFinal}&tipoVenta=${this.typesell}`,header)
                    .then(response=>{
                        console.log(response);
                        let abonosBD = response.data.venta;
                        this.limpiarFechas(abonosBD);
                    })
                    .catch((error) =>{
                        console.log(error);
                        if(!error.response.data.msg){
                            console.log(error.response);
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjError(this.msgError);
                        }else{
                            this.msgError = error.response.data.msg;
                            console.log(error.response.data.msg);
                            this.msgError =error.response.data.msg;
                            this.msjError(this.msgError);
                        }
                    })
            },//traeraVentas

            //recibir articulos de la base de datos y limpiar las fechas
            limpiarFechas(ventas){
                let arrayTemporal = [];
                if(ventas.length>0){
                    ventas.map(function(x){
                        var fechaSucio = new Date(x.createdAt)
                        var tiempo = (fechaSucio.getHours()+5)+":"+fechaSucio.getMinutes();
                        var fecha = x.createdAt.split("T");
                        var fechaLimpia = fecha[0]
                        arrayTemporal.push({
                            _id:x._id,
                            createdAt:fechaLimpia,
                            time:tiempo,
                            usuario:x.usuario.nombreUser,
                            numFactura:x.numFactura,
                            subTipoFactura:x.subTipoFactura,
                            persona:x.persona,
                            comentario:x.comentario,
                            totalPrecio:x.totalPrecio,
                            totalCosto:x.totalCosto,
                            descuento:x.descuento,
                            efectivo:x.efectivo,
                            nequi:x.nequi,
                            tarjeta:x.tarjeta,
                            credito:x.credito
                        })
                    })
                }else{
                    this.msjExito("No hay ventas")
                }
                this.ventas = arrayTemporal;        
            },//limpiarFechas


            //redireccionar para crear compra
            reset(){
                this.$router.push('/facturacion');
            },//reset

            detallesVenta(item){
                this.venta=item;

                if(this.venta.persona.trim()!=''){
                    let header = {headers:{"token" : this.$store.state.token}};

                    axios.get(`cliente/buscando?numDocumento=${this.venta.persona}`,header,)
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

                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`venta/ventaId/${item._id}`,header)
                    .then(response=>{
                        console.log(response);
                        let abonobd = response.data.venta;
                        this.limpiarDatosAbono(abonobd);
                    })
                    .catch((error)=>{
                        console.log(error);
                        if(!error.response.data.msg){
                            console.log(error.response);
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjError(this.msgError);
                        }else{
                            this.msgError = error.response.data.msg;
                            console.log(error.response.data.msg);
                            this.msgError =error.response.data.msg;
                            this.msjError(this.msgError);
                        }
                    })


            },

            limpiarDatosAbono(datos){
                let articulosLimpios = []
                let articulosSucios = datos.articulos;

                if(articulosSucios.length>0){
                    articulosSucios.map(function(x){

                        let codigo = x.sku.split("-")
                        console.log(codigo);
                        articulosLimpios.push({
                            referencia:codigo[2],
                            categoria:codigo[0],
                            marca : codigo[1],
                            cantidad : x.cantidad,
                            precio : x.precio,
                            costo : x.costo
                        })
                    })
                }
                
                this.articulos = articulosLimpios;
            },


            exportExcel(){
                let articulosExport=[];
                let me = this;
                if(me.ventas.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.ventas.map(function(x){
                    articulosExport.push(
                        {
                            fecha:x.createdAt, 
                            hora:x.time, 
                            usuario:x.usuario,  
                            numFactura:x.numFactura,
                            subTipoFactura:x.subTipoFactura,
                            persona:x.persona,
                            totalPrecio:x.totalPrecio,
                            totalCosto:x.totalCosto,
                            descuento:x.descuento,
                            efectivo:x.efectivo,
                            nequi:x.nequi,
                            tarjeta:x.tarjeta,
                            credito:x.credito
                        }
                    );
                });
                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'ventas'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportarExcel
        },//methodos

        computed:{
            totalVendido(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.totalPrecio)
                },0)
            },
            totalCosteado(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.totalCosto)
                },0)
            },
            totalDescuento(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.descuento)
                },0)
            },
            totalEfectivo(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.efectivo)
                },0)
            },
            totalNequi(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.nequi)
                },0)
            },
            totalTarjeta(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.tarjeta)
                },0)
            },
            totalCredito(){
                return this.ventas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.credito)
                },0)
            },
        }
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
  .totales{
    color: #72128E;
    font-size:20px;
    text-align:center;
    margin-top:5px;
    margin-left:0px;
    text-align:left;
  }
</style>