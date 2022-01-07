<template >
    <div>
        <v-container fluid>
            <template>

                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Informes</label>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:50px"   @click="exportExcel()">
                        <v-icon size="25">mdi-file-excel-outline</v-icon>Exportar
                    </v-btn>
                </v-row>
                <v-row>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Categorias vendidas (venta venta)</label>
                    </div>
                </v-row>

                <v-row>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Fecha</label>
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
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="traerCategorias()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
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
                    <container>
                        <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="categoriasTitle" :items="categorias"  :search="search">
                            <template v-slot:top>
                                <v-toolbar  flat>
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar por caracteres"  single-line hide-details></v-text-field>
                                </v-toolbar>
                            </template >
                        </v-data-table>
                    </container>
                </template>
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

            categorias:[],//info tablas
            categoriasTitle:[
                { text: 'Categoria', value: 'categoria'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'Unidades', value: 'cantidad'  ,class:'purple darken-3 white--text',sortable: true },
                { text: 'Costo Total', value: 'totalCosto'  ,class:'purple darken-3 white--text',sortable: false },
                { text: 'Ingreso total', value: 'totalPrecio'  ,class:'purple darken-3 white--text',sortable: false }
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
</style>