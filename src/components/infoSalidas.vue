<template >
    <div>
        <v-container fluid>
            <template v-if="vista==1">

                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Salidas</label>
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
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                        <v-menu ref="menu"   v-model="calendarioInicio" :close-on-content-click="false"  transition="scale-transition" offset-y  min-width="auto" >
                            <template   v-slot:activator="{ on, attrs }">
                            <v-text-field style="width:250px;margin-left:20px;" v-model="fechaInicio"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaInicio"  no-title scrollable  >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="calendarioInicio = false"  > OK </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Fecha final</label>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                        <v-menu ref="menu"  v-model="calendarioFinal" :close-on-content-click="false" transition="scale-transition" offset-y  min-width="auto" >
                            <template v-slot:activator="{ on, attrs }"  >
                            <v-text-field style="width:250px; margin-left:20px;"  v-model="fechaFinal"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaFinal"  no-title scrollable  >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="calendarioFinal = false"  > OK </v-btn>
                            </v-date-picker>
                        </v-menu>  
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="traerSalidas()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                    </div>
                </v-row>

                <v-row>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Total precio: {{totalVendido}}</label>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:250px">
                        <label>Total costo: {{totalCosto}}</label>
                    </div>
                </v-row>
                
                <template>
                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="salidasTitle" :items="salidas"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                            <v-spacer></v-spacer>
                            <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar por caracteres"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template >
                    <!--imprimir factura-->
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
                                    <label  class="col-sm-5 col-form-label">{{salida.createdAt}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Hora:</label>
                                    <label  class="col-sm-5 col-form-label">{{salida.time}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Usuario:</label>
                                    <label  class="col-sm-5 col-form-label">{{salida.usuario}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Comentario:</label>
                                    <label  class="col-sm-5 col-form-label" style="border: 1px solid #C0C0C0;margin-top:20px;margin-bottom:20px">{{salida.comentario}}</label>
                                </div>
                            </v-col>
                            <v-divider  class="mx-4" inset  vertical ></v-divider>
                            <v-col>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Total costo:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{salida.totalCosto}}</label>
                                </div>
                                <div class="form-group row texto">
                                    <label  class="col-sm-5 col-form-label">Total precio:</label>
                                    <label  class="col-sm-5 col-form-label">$ {{salida.totalPrecio}}</label>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                    

                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="articulosTitle" :items="salida.articulos"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                                <v-toolbar-title>Prendas de salida</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar Prenda"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template >
                        <template v-slot:[`item.subTotal`]="{ item }">
                            {{parseInt(item.cantidad) * parseInt(item.precio)}}
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
            calendarioInicio: false,
            calendarioFinal: false,
            fechaFinal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            search:'',
            salidas:[],//info tablas
            salida:{},
            salidasTitle:[
                { text: 'Fecha', value: 'createdAt'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'Hora', value: 'time'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'Usuario', value: 'usuario'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Comentario', value: 'comentario'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'T.Precio', value: 'totalPrecio'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'T.Costo', value: 'totalCosto'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],
            articulosTitle:[
                { text: 'Categoria', value: 'categoria'  ,class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca'  ,class:'purple darken-3 white--text'},
                { text: 'Referencia', value: 'referencia'  ,class:'purple darken-3 white--text'},
                { text: 'Cantidades', value: 'cantidad'  ,class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio'  ,class:'purple darken-3 white--text'},
                { text: 'Sub Total', value: 'subTotal'  ,class:'purple darken-3 white--text'},
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
            //msg de alerta
            msjError:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 3000})
            },
            msjExito:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 2000})
            },

            cambioPagina(num,item){
                if(num==2){
                    this.vista=2;
                    this.detallesSalida(item);
                    this.salidas=[];
                }else{
                    this.vista=1;
                    this.salida={};
                }
            },
            
            //redireccionar para crear compra
            reset(){
                this.$router.push('/crearSalida');
            },//reset

            traerSalidas(){
                let diferencia = (new Date(this.fechaFinal).getTime()-new Date(this.fechaInicio).getTime())/(1000*60*60*24);
                if(diferencia<0){
                    return this.msjError("Fecha inicial mayor a fecha final");
                }
                if(diferencia>180){
                    return this.msjError("Max. 180 dias");
                }
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`movimiento/salida?fechaInicial=${this.fechaInicio}&fechaFinal=${this.fechaFinal}`,header)
                    .then(response=>{
                        console.log(response);
                        let saliadasBD = response.data.salida;
                        this.limpiarFechas(saliadasBD);
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
            },//traerSalidas

            //recibir articulos de la base de datos y limpiar las fechas
            limpiarFechas(salidas){
                let arrayTemporal = [];
                if(salidas.length>0){
                    salidas.map(function(x){
                        var fechaSucio = new Date(x.createdAt)
                        var tiempo = (fechaSucio.getHours()+5)+":"+fechaSucio.getMinutes();
                        var fecha = x.createdAt.split("T");
                        var fechaLimpia = fecha[0]
                        arrayTemporal.push({
                            _id:x._id,
                            createdAt:fechaLimpia,
                            time:tiempo,
                            usuario:x.usuario.nombreUser,
                            comentario:x.comentario,
                            totalPrecio:x.totalPrecio,
                            totalCosto:x.totalCosto,
                        })
                    })
                }else{
                    this.msjExito("No hay Salidas")
                }
                this.salidas = arrayTemporal;        
            },//limpiarFechas

            detallesSalida(item){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`movimiento/salidaById/${item._id}`,header)
                    .then(response=>{
                        console.log(response);
                        let comprabd = response.data.salida;
                        this.limpiarDatosCompra(comprabd,item);
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

            limpiarDatosCompra(datos,item){
                this.salida=item;
                let articulosLimpios = []
                let articulosSucios = datos.articulos;

                articulosSucios.map(function(x){

                    let codigo = x.sku.split("-")

                    articulosLimpios.push({
                        referencia:codigo[2],
                        categoria:codigo[0],
                        marca : codigo[1],
                        cantidad : x.cantidad,
                        costo : x.costo,
                        precio : x.precio
                    })
                })
                this.salida.articulos = articulosLimpios;
            },
            
            exportExcel(){
                let articulosExport=[];
                let me = this;
                if(me.salidas.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.salidas.map(function(x){
                    articulosExport.push(
                        {
                            fecha:x.createdAt, 
                            hora:x.time, 
                            usuario:x.usuario,  
                            totalPrecio:x.totalPrecio,  
                            totalCosto:x.totalCosto
                        }
                    );
                });

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'salidas'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportarExcel

            borrar(item){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`movimiento/eliminarCompraById/${item._id}`,header)
                    .then(response=>{
                        console.log(response);
                        let mensaje = response.data.compra;
                        this.msjExito(mensaje);
                        this.salidas=[]
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
            }//borrar
        },//methods
        computed:{
            totalVendido(){
                return this.salidas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.totalPrecio)
                },0)
            },
            totalCosto(){
                return this.salidas.reduce((suma,venta)=>{
                    return suma + parseInt(venta.totalCosto)
                },0)
            },
        }//computed
    }//export default
</script>
<style scoped>
  .texto{
    font-family: 'calibri';
    color: #00000;
    font-size: 20px;
    text-align:left;
  }
</style>