<template>
    <div v-if="this.$store.state.token != ''" >
            <v-container fluid>
                <template>
                    <v-row>
                        <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Proveedores</label>
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
                            <label>Buscar:</label>
                        </div>
                        <div style="color: #72128E; width:600px; font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                            <v-text-field solo style="width:600px;" v-model="buscarClienteLetras" label="Traer clientes por tipo y numero de documento, nombre, dirección, ciudad, telefono o email. (Ejemplo:cliente1)"   v-on:keyup.enter="obtenerPersonas()"></v-text-field>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                            <v-btn style="margin-left:10px;"   icon color="#72128E"  @click="obtenerProveedores()">
                                <v-icon size="40">mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </v-row>
                </template>

                <template >
                    <v-data-table  style="margin-top:50px" class=" elevation-15 " :headers="columnas" :items="personas" :search="search">
                        <template v-slot:top>
                            <v-toolbar flat  >
                                <!--buscar--> 
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar cliente por documento, nombre, dirección, ciudad, telefono o email"  single-line hide-details></v-text-field>
                                <!--<v-divider  class="mx-4" inset  vertical ></v-divider>-->

                                <v-dialog v-model="dialog" max-width="500px"  >
                                    <v-card >
                                        <v-card-title><span class="text-h5">Proveedor</span></v-card-title>
                                        <v-card-text>
                                            <v-form>
                                                <v-text-field  v-model="editedItem.nombre"        :counter="200" :rules="rulesNombre"        label="Nombre*"  required ></v-text-field>
                                                <v-text-field  v-model="editedItem.direccion"     :counter="150" :rules="rulesDireccion"     label="Dirección"  ></v-text-field>
                                                <v-text-field  v-model="editedItem.telefono"      :counter="150" :rules="rulesTelefono"      label="Telefono"   ></v-text-field>

                                                <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                                                <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                                                <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                                            </v-form >
                                        </v-card-text>    
                                    </v-card>
                                </v-dialog>

                                <v-dialog v-model="dialog2" max-width="500px" >
                                    <v-card >
                                        <v-card-title><span class="text-h5">Editar cliente</span></v-card-title>
                                        <v-card-text>
                                            <v-form>
                                                <v-row>
                                                    <v-text-field  v-model="editedItem.nombre" :counter="70" :rules="rulesNombre" label="Nombre*"  required ></v-text-field>
                                                    <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombre(editedItem.nombre)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field  v-model="editedItem.direccion" :counter="70" :rules="rulesDireccion"  label="Dirección"  ></v-text-field>
                                                    <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDireccion(editedItem.direccion)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field  v-model="editedItem.telefono"  :counter="70" :rules="rulesTelefono"  label="Telefono"   ></v-text-field>
                                                    <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTelefono(editedItem.telefono)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                                </v-row>
                                                <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                                            </v-form >
                                        </v-card-text>    
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        <template v-slot:[`item.estado`]="{ item }">
                            <div v-if="item.estado">
                                <span class="black--text">Activo</span>
                            </div>
                            <div v-else>
                                <span class="red--text">Inactivo</span>
                            </div>
                        </template>
         
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon    class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
                            <template v-if="item.estado">
                                <v-icon  small class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
                            </template>
                            <template v-else>
                                <v-icon  small  @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
                            </template>
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
        data: () => ({    
            buscarClienteLetras:'',
            search: '',
            dialog: false,
            dialog2: false,
            rulesNombre: [
                value => !!value || 'Required.',
                value => (value && value.length <= 200) || 'Max 70 caracteres',
            ],
            rulesDireccion: [value => ( value.length <= 150) || 'Max 70 caracteres'],
            rulesTelefono: [value => ( value.length <= 150) || 'Max 70 caracteres'],
        
            columnas: [
                { text: 'Nombre', value: 'nombre', class:'purple darken-3 white--text' },
                { text: 'Dirección', value: 'direccion' , class:'purple darken-3 white--text'},
                { text: 'Telefono', value: 'telefono', class:'purple darken-3 white--text',sortable: false },
                { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],
            personas: [],
            
            editedItem: {nombre:'', direccion:'', telefono:''}
        }),//data

        created(){
            this.checkToken();
        },
        methods: {
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
            },
            //msg alerta
            msjError:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    //5000 son 5 seg
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

            //limpiar formulario
            reset(){
                this.editedItem._id=''
                this.editedItem.nombre=''
                this.editedItem.direccion=''
                this.editedItem.telefono=''
                this.dialog=true
            },//reset

            //alistar variables para enviar 
            editar(item){
                this.id= item._id;
                this.editedItem._id=item._id
                this.editedItem.nombre=item.nombre
                this.editedItem.direccion=item.direccion
                this.editedItem.telefono=item.telefono
                this.dialog2=true;
            },//editar

            //traer proveedores
            obtenerProveedores(){
                let caracteresClientes = this.buscarClienteLetras.trim();
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`proveedor/proveedores?value=${caracteresClientes}`,header)
                    .then(response =>{
                        this.personas = response.data.proveedor
                        if(this.personas.length==0){
                            this.msjExito('No hay Proveedores');
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
            },//obtenerProveedores
            
            //traer proveedor
            obtenerProveedoreActivoDesactivo(caracteresClientes){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`proveedor/proveedores?value=${caracteresClientes}`,header)
                    .then(response =>{
                        this.personas = response.data.proveedor
                        if(this.personas.length==0){
                            this.msjExito('No hay Proveedores');
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
            },//obtenerProveedores
        
            //almacenar
            guardar(){
                let header = {headers:{"token" : this.$store.state.token}};
                const me = this;
                if(this.editedItem.nombre.trim()==='' ){
                    this.msjError('Nombre obligatorio');
                }else if(this.editedItem.nombre.length>150 ||  this.editedItem.direccion.length>150|| this.editedItem.telefono.length>150 ){
                    this.msjError('Supero el número de carácteres permintidos en un campo');

                }else{
                    axios.post('proveedor',{
                                                nombre:this.editedItem.nombre,
                                                direccion:this.editedItem.direccion,
                                                telefono:this.editedItem.telefono,
                                            },header)
                            .then((response)=>{
                                this.dialog=false
                                me.msjExito(response.data.msg);
                            })
                            .catch((error)=>{
                                if(!error.response.data.msg){
                                    let msgErroreses = error.response.data.errors[0].msg;
                                    this.msjError(msgErroreses);
                                }else{
                                    let msgErroreses = error.response.data.msg;
                                    this.msjError(msgErroreses);
                                }
                            })         
                }
                
            },//guardar

            activarDesactivarItem(accion , item){
                let id = item._id;
                if(accion == 2){
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`proveedor/desactivar/${id}`,{}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
                            this.obtenerProveedoreActivoDesactivo(item.nombre);
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErroreses = error.response.data.errors[0].msg;
                                this.msjError(msgErroreses);
                            }else{
                                let msgErroreses =error.response.data.msg;
                                this.msjError(msgErroreses);
                            }
                        });
                }else{
                    let header = {headers:{"token" : this.$store.state.token}};
                        axios.put(`proveedor/activar/${id}`,  {},header)
                            .then((response)=>{
                                this.msjExito(response.data.msg);
                                this.obtenerProveedoreActivoDesactivo(item.nombre);
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
                }
            },//activarDesactivarItem

            actualizarNombre(nombre){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(nombre.trim()===''){
                    this.msjError('Nombre obligatorio');
                }else if(nombre.length>200){
                    this.msjError('Nombre demasiado largo');
                }else{
                    axios.put(`proveedor/nombre/${id}`,{nombre}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
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
                }
                
            },//actualizarNombre
        
            actualizarDireccion(direccion){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(direccion.trim()===''){
                    this.msjError('Dirección obligatorio');
                }else if(direccion.length>150){
                    this.msjError('Dirección demasiada larga');
                }else{
                    axios.put(`proveedor/direccion/${id}`,{direccion}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
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
                }
            
            },//actualizarDireccion

            actualizarTelefono(telefono){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(telefono.trim()===''){
                    this.msjError('Telefono obligatorio');
                }else if(telefono.length>150){
                    this.msjError('Telefono demasiada larga');
                }else{
                    axios.put(`proveedor/telefono/${id}`,{telefono}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
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
                }
            },//actualizarTelefono

            exportExcel(){
                let articulosExport=[];
                let me = this;
                if(me.personas.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.personas.map(function(x){
                    articulosExport.push(
                        {
                            nombre:x.nombre, 
                            telefono:x.telefono, 
                            direccion:x.direccion
                        }
                    );
                });

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'proveedores'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            }//exportExcel

        },//methots
    }//export default
</script>
