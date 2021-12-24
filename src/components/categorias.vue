<template>
    <div>
        <v-app>
            <v-container fluid>
                <template>
                    <v-row>
                        <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Categorias</label>
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

                        <div style="margin-top:50px;margin-right:30px">
                            <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  @click="agregarCategoria()"  > <v-icon size="20">mdi-plus</v-icon> Nuevo </v-btn>
                        </div>
                    </v-row>

                    <v-row>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Buscar:</label>
                        </div>
                        <div style="color: #72128E; width:450px; font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                            <v-text-field solo style="width:450px;" v-model="buscarCategoriaLetras" label="Traer categorias por nombre. (Ejemplo:categoria1)"   v-on:keyup.enter="obtenerCategorias()"></v-text-field>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                            <v-btn style="margin-left:10px;"   icon color="#72128E"  @click="obtenerCategorias()">
                                <v-icon size="40">mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </v-row>
                </template>

                <!--tabla de categorias-->
                <template>
                    <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="columnas" :items="categorias"  :search="search">
                        <template v-slot:top>
                            <v-toolbar  flat>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar por nombre" single-line hide-details  ></v-text-field>              
                            </v-toolbar>
                        </template>
                        <!--estado-->
                        <template v-slot:[`item.estado`]="{ item }">
                            <div v-if="item.estado">
                                <span class="black--text">Activo</span>
                            </div>
                            <div v-else>
                                <span class="red--text">Inactivo</span>
                            </div>
                        </template>

                        <!--editar activar desactibar-->
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon   small  class="mr-2" @click="editar(item)" >mdi-pencil</v-icon>
                            <template v-if="item.estado">
                                <v-icon small class="mr-2"  @click="activarDesactivarItem(2,item)"  >mdi-check</v-icon>
                            </template>
                            <template v-else>
                                <v-icon  small  @click="activarDesactivarItem(1,item)" > mdi-block-helper </v-icon>
                            </template>
                        </template>
                    </v-data-table>
                    <!--Formuario para almacenar o editar-->
                    <v-dialog v-model="dialog"  max-width="500px">
                        <v-card >
                            <v-card-title><span class="text-h5">Categorias</span></v-card-title>
                            <v-card-text>
                                <v-text-field  v-model="editedItem.nombre" :counter="50" label="Nombre" :rules="rulesNombre" required ></v-text-field>
                                <v-btn  color="blue darken-1" text class="mr-4" @click="guardar" > Guardar </v-btn>
                                <v-btn  color="blue darken-1" text class="mr-4" @click="reset"> Limpiar </v-btn>
                                <v-btn  color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                            </v-card-text>    
                        </v-card>
                    </v-dialog>
                </template>
            </v-container>
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import XLSX from "xlsx"
    
    
    export default {
        data: () => ({    
            buscarCategoriaLetras:'',  
            dialog:false,
            msgError:'',
            search: '',
            bd:0,//agregar o editar
            rulesNombre: [
                value => !!value || 'Required.',
                value => (value && value.length <= 50) || 'Max 3 caracteres',
            ],
            columnas: [
                { text: 'Nombre', value: 'nombre'  ,class:'purple darken-3 white--text'},
                { text: 'Estado', value: 'estado'  ,class:'purple darken-3 white--text',width:'30%'},
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],
            categorias: [],//columnas de tablas
            editedItem: {nombre: '' },//objeto para enviar o editar
        }),//data

        created(){
            this.checkToken();
        },

        methods: {
            //validar que la ruta tenga token si no redireccionar a login
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

            msjExisto:function(tata){
                Swal.fire({
                position: 'top',
                icon: 'success',
                title: tata,
                showConfirmButton: false,
                backdrop: 'rgba(55,55,55,0.8)',
                timer: 2000})
            },

            agregarCategoria(){
                this.dialog = true;
                this.editedItem.nombre = "";
            },

            //Traer todas las categorias
            obtenerCategorias(){
                let bancandoCategoria = this.buscarCategoriaLetras.trim();
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`categoria?value=${bancandoCategoria}`,header)
                .then(response =>{
                    console.log(response);
                    this.categorias = response.data.categoria
                    if(this.categorias.length==0){
                    this.msjExisto('No hay categorias');
                    }
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
            },//obtenerCategorias

            //Traer categoria actualizada
            obtenerCategoriasActualizada(categoria){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`categoria?value=${categoria}`,header)
                    .then(response =>{
                        console.log(response);
                        this.categorias = response.data.categoria
                        if(this.categorias.length==0){
                        this.msjExisto('No hay categorias');
                        }
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
            },//obtenerCategoriasActualizada

            //Limpiar el formulario despues de enviar o editar
            reset(){
                this.editedItem.nombre=''
            },

            //para editar la categoria
            editar(item){
                console.log(item);
                this.bd = 1;
                this.id= item._id;
                this.editedItem.nombre=item.nombre;
                this.dialog=true;
            },//editar

            //para almacenar o editar la categoria
            guardar(){
                if (this.bd == 0 ){
                    console.log('estoy almacenando :'+this.bd);
                    let header = {headers:{"token" : this.$store.state.token}};
                    const me = this;
                    if(this.editedItem.nombre.trim()===''){
                        this.msjError('Nombre obligatorio');
                    }else if(this.editedItem.nombre.length>50){
                        this.msjError('Supero los 50 carácteres');
                    }else{
                        axios.post('categoria',{ nombre:this.editedItem.nombre},header)
                            .then((response)=>{
                                console.log(response);
                                this.msgError=response.data.msg;
                                this.msjExisto(this.msgError);
                                me.obtenerCategoriasActualizada(this.editedItem.nombre)
                                me.reset();
                                this.dialog=false;
                            })
                            .catch((error)=>{
                                console.log(error.response);
                                if(!error.response.data.msg){
                                console.log(error.response);
                                this.msgError = error.response.data.errors[0].msg
                                this.msjError(this.msgError);
                                }else{
                                this.msgError = error.response.data.msg
                                console.log(error.response.data.msg);
                                this.msjError(this.msgError);
                                }
                            })
                    }
                }else{
                    console.log('estoy editando: '+this.bd);
                    let header = {headers:{"token" : this.$store.state.token}};
                    const me = this;
                    if(this.editedItem.nombre.trim()===''){
                        this.msjError('Nombre obligatorio');
                    }else if(this.editedItem.nombre.length>50){
                        this.msjError('Supero los 50 carácteres');
                    }else{
                        axios.put(`categoria/actualizar/${this.id}`,{ nombre:this.editedItem.nombre}, header )
                            .then((response)=>{
                                console.log(response);
                                console.log('msg');
                                this.msgError=response.data.msg;
                                this.msjExisto(this.msgError);
                                me.obtenerCategoriasActualizada(this.editedItem.nombre),
                                this.dialog=false;
                            })
                            .catch((error)=>{
                                console.log(error.response);
                                if(!error.response.data.msg){
                                console.log(error.response);
                                this.msgError = error.response.data.errors[0].msg
                                this.msjError(this.msgError);
                                }else{
                                this.msgError = error.response.data.msg
                                console.log(error.response.data.msg);
                                this.msjError(this.msgError);
                                }  
                            })
                    }
                }
            },//guardar

            //activar o desactivar categoria
            activarDesactivarItem (accion , item) {
                let id = item._id;
                let nombre = item.nombre;
                if(accion == 2){
                    let me = this
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`categoria/desactivar/${id}`,{}  , header)
                        .then((response)=>{
                            console.log(response);
                            me.obtenerCategoriasActualizada(nombre);
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
                        });
                }else if (accion==1){
                    let me = this
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`categoria/activar/${id}`,{},header)
                        .then((response)=>{
                            console.log(response);
                            me.obtenerCategoriasActualizada(nombre);
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
                        });
                }
            },//activarDesactivarItem

            //exportar datos en excel
            exportExcel(){
                let me = this
                let categoriasExport=[]

                if(me.categorias.length>1000){
                    return this.msjError("Max. 1000 datos");
                }

                me.categorias.map(function(x){
                    categoriasExport.push(
                        {
                            categoria:x.nombre,
                            estado:x.estado
                        }
                    );
                })

                let data = XLSX.utils.json_to_sheet(categoriasExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'Categorias'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`) 
            },//exportarExcel            

        },//methods
    }//export default
</script>