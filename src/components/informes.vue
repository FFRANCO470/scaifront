<template >
    <div>
        <v-container fluid>

            <template>

                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Informes</label>
                    </div>
                </v-row>
                <v-row>
                    <hr style="align:center; width:95%; margin-top:30px"><br>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:5px;margin-left:30px">
                        
                        <label>Saldo de Caja del Día<br></label>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:5px"   @click="exportExcel2()">
                        <v-icon size="25">mdi-file-excel-outline</v-icon>Exportar
                    </v-btn>
                </v-row>

                <v-row>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:10px;margin-left:30px">
                        <label>Fecha</label>
                    </div>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:0px;margin-left:30px">
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
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:0px;margin-left:30px">
                        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#000000"  @click="traerTotalesCaja()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                    </div>
                </v-row>
                
                <table  style="margin-top: 25px" class="tabla">
                    <thead class="tablaCabeza">
                        <tr>
                            <th>Tipo Factura</th>
                            <th>Efectivo</th>
                            <th>Nequi</th>
                            <th>Tarjeta</th>
                            <th>Sistecredito</th>
                        </tr>
                    </thead>
                    <tbody class="tablaCuerpo">
                        <tr v-for="(objeto,index) in totalesCaja" :key="`objeto-${index}`">
                            <td v-text="objeto._id"></td>
                            <td v-text="objeto.efectivo"></td>
                            <td v-text="objeto.nequi"></td>
                            <td v-text="objeto.tarjeta"></td>
                            <td v-text="objeto.credito"></td>
                        </tr>

                    </tbody>
                </table>

            </template>

            <template>
                <v-row>
                    <hr style="align:center; width:95%; margin-top:30px"><br>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:5px;margin-left:30px">
                        
                        <label>Categorias 'venta venta' del día</label>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:5px"   @click="exportExcel()">
                        <v-icon size="25">mdi-file-excel-outline</v-icon>Exportar
                    </v-btn>
                </v-row>
                <v-row>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:10px;margin-left:30px">
                        <label>Fecha</label>
                    </div>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:0px;margin-left:30px">
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
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:0px;margin-left:30px">
                        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#000000"  @click="traerCategorias()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                    </div>
                </v-row>

                <v-row>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                        <label>Total Ingreso: {{totalVendido}}</label>
                    </div>
                    <div style="color: #000000;  font-size:20px;  text-align:center; margin-top:20px;margin-left:250px">
                        <label>Total costo: {{totalCosto}}</label>
                    </div>
                </v-row>

                <table  style="margin-top: 25px" class="tabla">
                    <thead class="tablaCabeza">
                        <tr>
                            <th>Categoria</th>
                            <th>Cantidad</th>
                            <th>Total Costo</th>
                            <th>Totol Ingreso</th>
                        </tr>
                    </thead>
                    <tbody class="tablaCuerpo">
                        <tr v-for="(objeto,index) in categorias" :key="`objeto-${index}`">
                            <td v-text="objeto.categoria"></td>
                            <td v-text="objeto.cantidad"></td>
                            <td v-text="objeto.totalCosto"></td>
                            <td v-text="objeto.totalPrecio"></td>
                        </tr>

                    </tbody>
                </table>

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
            
            calendarioInicio: false,
            fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            search:'',

            totalesCaja:[],

            categorias:[],


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
            

            traerCategorias(){

                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`informes/cantidadCategoria?fecha=${this.fechaInicio}`,header)
                    .then(response=>{
                        let resultado = response.data.resultado;
                        if(resultado.list.length==0){
                            this.msjExito('No hay ventas en ese dia')
                        }else{
                            this.limpiarDatos(response.data.resultado)
                        }

                        
                    })
                    .catch((error) =>{
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores =error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    })
            },//traerCategorias

            //
            limpiarDatos(resultado){
                let tabla = [];

                resultado.list.map((categorias)=>{

                    let cantidad = resultado[categorias].cantidad
                    let totalPrecio = resultado[categorias].totalPrecio
                    let totalCosto = resultado[categorias].totalCosto

                    tabla.push({
                        categoria:categorias,
                        cantidad: cantidad,
                        totalPrecio: totalPrecio,
                        totalCosto: totalCosto
                    })
                })

                this.categorias = tabla;
                tabla=null;

            },//limpiarFechas     
            
            exportExcel(){
                let articulosExport=[];
                let me = this;
                if(me.categorias.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.categorias.map(function(x){
                    articulosExport.push(
                        {
                            categoria:x.categoria,
                            cantidad:x.cantidad,
                            totalCosto:x.totalCosto,
                            totalPrecio:x.totalPrecio,
                        }
                    );
                });

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'categorias'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportarExcel

            traerTotalesCaja(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`informes/saldoCaja?fecha=${this.fechaInicio}`,header)
                    .then(response=>{
                        this.totalesCaja = response.data.articulos;
                        if(this.totalesCaja.length==0){
                            this.msjExito('No hay movimientos')
                        }
                    })
                    .catch((error) =>{
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores =error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    })
            },

            exportExcel2(){
                let articulosExport=[];
                let me = this;
                if(me.totalesCaja.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.totalesCaja.map(function(x){
                    articulosExport.push(
                        {
                            tipoFactura:x._id,
                            efectivo:x.efectivo,
                            nequi:x.nequi,
                            tarjeta:x.tarjeta,
                            sistecredito:x.credito

                        }
                    );
                });

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'totalesCaja'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            }

        },//methods
        computed:{
            totalVendido(){
                return this.categorias.reduce((suma,categoria)=>{
                    return suma + parseInt(categoria.totalPrecio)
                },0)
            },
            totalCosto(){
                return this.categorias.reduce((suma,categoria)=>{
                    return suma + parseInt(categoria.totalCosto)
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
    .tabla{
        margin-left:auto;
        margin-right:auto;
        border: 2px solid black;
        border-collapse: collapse;
    }
    th,td{
        border: 2px solid black;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        
    }
    th{
        background-color: black;
        color:white;
         border: 2px solid white;
    }
    

</style>