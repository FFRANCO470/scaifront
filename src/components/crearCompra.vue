<template>
    <div>
        <v-app>
            <v-container>
                
                <template>
                    <v-row>
                        <div style="color: #72128E; font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Comprar</label>
                        </div>
                    </v-row> 
                
                    <v-row>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Proveedor:</label>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                            <v-autocomplete solo style="width:350px; margin-left:10px;" v-model="proveedor" :items="proveedores" label="Proveedor" required></v-autocomplete>
                        </div>
                    </v-row>
                    <v-row>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:10px;margin-left:30px">
                            <label>No. Factura:</label>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:5px;margin-left:30px">
                            <v-text-field solo style="width:350px; margin-left:0px;"  v-model="numFactura" label="Numero de factura"></v-text-field>
                        </div>
                    </v-row>

                    <v-row>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:10px;margin-left:30px">
                            <label>Archivo:</label>
                        </div>
                        <div>
                            <v-file-input   
                                show-size 
                                solo
                                label="Excel con articulos"   
                                @change="onChangess"
                                accept=".xlsx"
                                placeholder="Click para seleccionar archivo .xlsx"
                                class="inputVuetify"
                                >
                            </v-file-input>
                        </div>

                        <div>
                            <v-btn  class= "botonCargar"  @click="enviarDataExcel()">
                                <v-flex text-xs-center><v-label ><v-icon size="40"  color="#72128E" >mdi-cloud-upload-outline</v-icon>Crear compra</v-label> </v-flex>        
                            </v-btn>
                        </div>
                    </v-row>
                    
                    <v-row>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:10px;margin-left:30px">
                            <label>Comentario:</label>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:5px;margin-left:30px">
                            <v-textarea class="form-group" style="width:550px;" v-model="comentario"  color="#72128E"   outlined  :counter="250"></v-textarea>
                        </div>
                    </v-row>
                </template>
                
                <!--INPUT NORMAL ESCONDIDO ACTIVADO POR BOTON ENVIA DE A BACKEN UNA VEZ FILE SELECCIONADO-->
                <!--
                <v-row>
                    <input id="fileUpload" type="file" @change="onChange" hidden/>    
                    <v-btn  style="margin-top:20px;margin-bottom:20px;margin-left:20px;width:200px;height:50px;box-shadow: 0 0 20px #A068B8;border: 40%"  @click="chooseFiles()">
                        <v-flex text-xs-center><v-label ><v-icon size="40"  color="#72128E" >mdi-cloud-upload-outline</v-icon>  Articulos</v-label> </v-flex>        
                    </v-btn>
                </v-row>
                -->
                
                <!--INPUT NORMAL-->
               <!-- <v-row>
                    <input id="fileUpload" name="imputArcivo" class="inputFileStyle"  type="file" @change="onChange"/>    
                    <v-btn  style="margin-top:20px;margin-bottom:20px;margin-left:20px;width:200px;height:50px;box-shadow: 0 0 20px #A068B8;border: 40%"  @click="enviarDataExcel()">
                        <v-flex text-xs-center><v-label ><v-icon size="40"  color="#72128E" >mdi-cloud-upload-outline</v-icon>  Articulos</v-label> </v-flex>        
                    </v-btn>
                </v-row>-->
               <v-row>
                    
                    <v-col>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                            <label>Total vendido: {{totalVendido}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                            <label>Total costo: {{totalCosto}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                            <label>Rentabilidad: {{(1-(totalCosto/totalVendido))*100}} %</label>
                        </div>
                    </v-col>
                </v-row>
                
                <div style="margin-top:0px">
                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="dataExcelTitle" :items="dataExcel"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                                <v-toolbar-title>Prendas compradas (Max. 300)</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar Prenda"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template >
                    </v-data-table>
                </div>


            </v-container>
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import XLSX from "xlsx"
    export default {
        data:()=>({
            proveedores:[],
            proveedor:'',
            comentario:'',
            numFactura:'',
            dataExcel:[],
            file:null,
            search:'',
            dataExcelTitle:[
                { text: 'Categoria', value: 'categoria'  ,class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca'  ,class:'purple darken-3 white--text'},
                { text: 'Referencia', value: 'referencia'  ,class:'purple darken-3 white--text'},
                { text: 'Unidades', value: 'cantidad'  ,class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio'  ,class:'purple darken-3 white--text'},
                { text: 'Costo', value: 'costo'  ,class:'purple darken-3 white--text'},
            ]
        }),//data
        created(){
            this.traerProveedores();
            this.checkToken();
        },
        methods:{

            //validar que la ruta tenga token si no redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                this.$router.push('/');
                }
            },

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

            // mensaje de espera
            msjProceso:function(){
                Swal.fire({
                    title:"Registrando compra",
                    html:"Procesando...",
                    allowOutsideClick:false,
                    showConfirmButton:false,
                    willOpen:()=>{
                        Swal.showLoading()
                    }
                })
            },
        
            //traer proveedores
            traerProveedores(){
                let me = this;
                let proveedoresArray = [];
                let header = {headers:{"token":this.$store.state.token}};
                axios.get("proveedor/activos",header)
                    .then(response=>{
                        proveedoresArray = response.data.proveedor;
                        if(proveedoresArray.length>0){
                            proveedoresArray.map(function(x){
                                me.proveedores.push({text:x.nombre,value:x._id})
                            })
                        }else{
                            this.msjExito("No hay proveedores activos")
                        }
                    })
                    .catch(function(error){
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores =error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    })
            },

            //activar el input al oprimir el boton
            // chooseFiles: function() {
            //     document.getElementById("fileUpload").click()
            // },

            //leer el archivo excel e invocar la fucion para mandar los datos input normal
            // onChange(event) {
            //     this.file = event.target.files ? event.target.files[0] : null;
            //     if (this.file) {
            //         const reader = new FileReader();
            //         reader.onload = (e) => {
            //             //analizar datos
            //             const bstr = e.target.result;
            //             const wb = XLSX.read(bstr, { type: 'binary' });
            //             //obtener la primera hoja
            //             const wsname = wb.SheetNames[0];
            //             const ws = wb.Sheets[wsname];
            //             this.dataExcel = XLSX.utils.sheet_to_json(ws);
            //         }
            //         reader.readAsBinaryString(this.file);
            //     }
            // },

            //leer el archivo excel e invocar la fucion para mandar los datos input vuetify
            onChangess(file) {
                this.file = file ? file : null;
                if (this.file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        //analizar datos
                        const bstr = e.target.result;
                        const wb = XLSX.read(bstr, { type: 'binary' });
                        //obtener la primera hoja
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        this.dataExcel = XLSX.utils.sheet_to_json(ws);
                    }
                    reader.readAsBinaryString(this.file);
                }
            },

            //funcion para mandar los datos
            enviarDataExcel(){
                this.msjProceso();
                if(this.proveedor.trim()=="" || this.dataExcel.length==0){
                    this.msjError("Proveedor y excel obligatorios");
                }else if(this.dataExcel.length>300){
                    this. msjError("Demasiados articulos, max 300");
                }else{
                    let header = {headers:{"token":this.$store.state.token}};
                    axios.post("/movimiento/crearCompra",{
                                                            usuario:this.$store.state.id,
                                                            articulos:this.dataExcel,
                                                            proveedor:this.proveedor,
                                                            comentario:this.comentario,
                                                            numFactura:this.numFactura,
                                                            totalPrecio:this.totalVendido,
                                                            totalCosto:this.totalCosto
                                                        },header)
                        .then(response=>{
                            //let mensaje = response.data.msg;
                            this.file=null;
                            this.dataExcel=[];
                            this.onChangess(null)
                            Swal.close();
                            this.msjExito(response.data.msg);
                            this.limpiarTodo();
                        })
                        .catch(error=>{
                                if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg;
                                this.msjError(msgErrores);
                            }else{
                                let msgErrores =error.response.data.msg;
                                this.msjError(msgErrores);
                            }
                        })
                }
                

            },//enviarDataExcel

            limpiarTodo(){
                this.proveedor='';
                this.numFactura='';
                this.dataExcel  = [];
                this.comentario='';
                this.onChangess(null);
            }
        },//methods

        computed:{
            totalVendido(){
                return this.dataExcel.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.precio))
                },0)
            },
            totalCosto(){
                return this.dataExcel.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.costo))
                },0)
            }
        }//computed
    }  
</script>

<style scoped>

    .inputFileStyle{
        margin-top:20px;
        margin-bottom:0px;
        margin-left:40px;
        width:400px;
        height:100%;
        color:#72128E;
        /*box-shadow: 0 0 20px #A068B8;*/
        /*border: 40%*/
    }
    .inputVuetify{
        margin-left:40px;
        width:379px;
    }

    .comentario{
        font-family: 'calibri'; 
        color: #00000;
        font-size: 200px; 
        text-align:left; 
        margin-left:40px; 
        margin-top:10px; 
        width:88%;
    }

    .botonCargar{
        margin-top:10px;
        margin-bottom:20px;
        margin-left:40px;
        width:200px;
        height:50px;
        box-shadow: 0 0 20px #A068B8;
        border: 40%
    }
</style>