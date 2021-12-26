<template >
    <div>
        <v-container fluid>
            <template>
                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Unidades separadas</label>
                    </div>
                    <v-spacer></v-spacer>

                    <v-btn  
                        depressed 
                        dark  
                        class="mb-2 purple darken-3 white--text"  
                        style="margin-right:30px; margin-left:20px;  margin-top:50px"   
                        @click="exportExcel()"
                        >
                        <v-icon size="25">mdi-file-excel-outline</v-icon>Exportar
                    </v-btn>
                </v-row>

                <v-row style="margin-left:10px;margin-top:10px;"> 
                    <v-col>   
                        <div class="form-group row texto">
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">Total prendas:</label>
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">{{totalPrendas}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">Total Ingreso:</label>
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">{{totalIngreso}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">Total Costo:</label>
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px;">{{totalCosto}}</label>
                        </div>
                    </v-col>
                </v-row>
            </template>
            <template>
                <v-data-table style="margin-top:50px" class=" elevation-15 " :headers="columnas" :items="articulos" :search="search">
                    <template v-slot:top>
                        <!--parte arriba tabla-->
                        <v-toolbar flat  >
                        
                        
                            <!--buscar-->
                            <v-spacer></v-spacer>
                            <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar categoria, marca o referencia"  single-line hide-details></v-text-field>
                            <!--cuadro de texto para editar articulo-->
                            <v-dialog v-model="dialog" max-width="500px" >
                                <v-card >
                                <v-card-title><span class="text-h5">Editar articulo</span></v-card-title>
                                <v-card-text>
                                    <v-form>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantSeparadas"  :rules="rulesNum" label="Separadas"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarAlmacenadas(editedItem.cantSeparadas)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                                    </v-form >
                                </v-card-text>    
                                </v-card>
                            </v-dialog>

                        </v-toolbar>
                    </template>

                    <!--total costo-->
                    <template v-slot:[`item.totalCosto`]="{ item }">
                        {{item.cantSeparadas * item.costo}}
                    </template>

                    <!--total precio-->
                    <template v-slot:[`item.totalPrecio`]="{ item }">
                        {{item.cantSeparadas * item.precio}}
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon    class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
                    </template>
    
                </v-data-table>
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
            dialog:false,
            articulos:[],
            search:'',
            columnas: [
                { text: 'Categoria', value: 'categoria.nombre', class:'purple darken-3 white--text' },
                { text: 'Marca', value: 'marca.nombre', class:'purple darken-3 white--text' },
                { text: 'Referencia', value: 'referencia', class:'purple darken-3 white--text' },
                { text: 'Unidades', value: 'cantSeparadas', class:'purple darken-3 white--text' },
                { text: 'Costo', value: 'costo', class:'purple darken-3 white--text' },
                { text: 'Precio', value: 'precio', class:'purple darken-3 white--text' },
                { text: 'Total costo', value: 'totalCosto', class:'purple darken-3 white--text' },
                { text: 'Total precio', value: 'totalPrecio', class:'purple darken-3 white--text' },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'150px',sortable: false }
            ],
            editedItem:{},
            rulesNum: [ 
                value=>!!value||'Requerido',
                value=>value>=0 || 'Numero negativo'
            ],

        }),//data
        created(){
            this.checkToken();
            this.traerSeparados();
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

            traerSeparados(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get("articulo/separados",header)
                    .then(response =>{
                        this.articulos = response.data.articulo;
                        if(this.articulos.length==0){
                            this.msjExito("No hay articulos")
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
            },//traerSeparados

            editar(item){
                this.id= item._id;
                this.editedItem.cantSeparadas=item.cantSeparadas;
                this.dialog=true;
            },//editar

            //actualizar unidades separadas
            actualizarAlmacenadas(cantSeparadas){
                let id=this.id;
                let me = this
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantSeparadas/${id}`,{cantSeparadas}, header)
                    .then((response)=>{
                        this.msjExito(response.data.msg);
                        me.traerSeparados();
                        me.dialog=false;
                    })
                    .catch((error)=>{
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores =error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    });
            },//actualizarAlmacenadas


            exportExcel(){
                let articulosExport=[]
                let me = this

                if(me.articulos.length>1000){
                    return this.msjError("Max. 1000 datos");
                }

                me.articulos.map(function(x){
                    articulosExport.push(
                        {
                        categoria:x.categoria.nombre, 
                        marca:x.marca.nombre, 
                        referencia:x.referencia,  
                        costo:x.costo,
                        precio:x.precio,
                        cantSeparadas:x.cantSeparadas
                        }
                    );
                })

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'En_almacen'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportarExcel


        },//methods

        computed:{
            totalPrendas(){
                return this.articulos.reduce((suma,articulo)=>{
                    return suma + parseInt(articulo.cantSeparadas)
                },0)
            },
            totalIngreso(){
                return this.articulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantSeparadas)*parseInt(articulo.precio))
                },0)
            },
            totalCosto(){
                return this.articulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantSeparadas)*parseInt(articulo.costo))
                },0)
            }
        }

    }//export default
</script>

<style scoped>
    .texto{
        font-family: 'calibri';
        color: #000000;
        font-size: 20px;
        text-align:left;
        color: #72128E;
    }
</style>