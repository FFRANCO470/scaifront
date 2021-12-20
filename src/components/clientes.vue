<template>
    <div>
        <v-app>
            <v-container fluid>

                <template>
                    <v-row>
                        <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Clientes</label>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn  
                            depressed
                            dark
                            class="mb-2 purple darken-3 white--text"  
                            style="margin-right:30px; margin-left:20px;  margin-top:50px"
                            @click="inportarExcel()"
                            >
                            <v-icon size="25">mdi-cloud-upload</v-icon> &nbsp; Importar
                        </v-btn>
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
                            <v-btn style="margin-left:10px;"   icon color="#72128E"  @click="obtenerPersonas()">
                                <v-icon size="40">mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </v-row>
                </template>

                <template >
                    <v-data-table  style="margin-top:50px" class=" elevation-15 " :headers="columnas" :items="personas" :search="search">
                        <template v-slot:top>
                            <v-toolbar flat  >
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar cliente por documento, nombre, dirección, ciudad, telefono o email"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon    class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
                            <v-icon    class="mr-2"  @click="eliminar(item)" >  mdi-delete </v-icon>
                        </template>
                    </v-data-table>
                </template>

                <template>
                    <v-dialog v-model="dialog" max-width="500px"  >
                        <v-card >
                            <v-card-title><span class="text-h5">Cliente</span></v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field  v-model="editedItem.tipoDocumento"               :rules="rulesTipoDocumento" label="Tipo de Documento*"  required ></v-text-field>
                                    <v-text-field  v-model="editedItem._id"  :counter="30" :rules="rules_id"  label="Número de Documento*" required  ></v-text-field>
                                    <v-text-field  v-model="editedItem.nombre"        :counter="70" :rules="rulesNombre"        label="Nombre*"  required ></v-text-field>
                                    <v-text-field  v-model="editedItem.direccion"     :counter="70" :rules="rulesDireccion"     label="Dirección"  ></v-text-field>
                                    <v-text-field  v-model="editedItem.ciudad"        :counter="70" :rules="rulesCiudad"        label="Ciudad"  ></v-text-field>
                                    <v-text-field  v-model="editedItem.telefono"      :counter="70" :rules="rulesTelefono"      label="Telefono"   ></v-text-field>
                                    <v-text-field  v-model="editedItem.email"         :counter="70" :rules="rulesEmail"         label="Email"></v-text-field>

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
                                        <label  class="col-form-label" style="color:#72128E;margin-top:40px;margin-bottom:40px;">
                                            <v-icon color="#72128E">mdi-card-bulleted</v-icon> 
                                            Numer de documento : {{editedItem._id}}
                                        </label>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.tipoDocumento"  :rules="rulesTipoDocumento" label="Tipo de Documento"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTipodoc(editedItem.tipoDocumento)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.nombre" :counter="70" :rules="rulesNombre" label="Nombre*"  required ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombre(editedItem.nombre)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.direccion" :counter="70" :rules="rulesDireccion"  label="Dirección"  ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDireccion(editedItem.direccion)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.ciudad" :counter="70" :rules="rulesCiudad"  label="Ciudad"  ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCiudad(editedItem.ciudad)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.telefono"  :counter="70" :rules="rulesTelefono"  label="Telefono"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTelefono(editedItem.telefono)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.email" :counter="70" :rules="rulesEmail" label="Email*"  required  ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarEmail(editedItem.email)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                                </v-form >
                            </v-card-text>    
                        </v-card>
                    </v-dialog>


                    <v-dialog v-model="dialog3" max-width="500px" >
                        <v-card >
                            <v-card-title><span class="text-h5">Excel con clientes</span></v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-row>
                                        <v-file-input   
                                            solo
                                            show-size 
                                            label="Excel con articulos"   
                                            @change="onChangess"
                                            accept=".xlsx"
                                            placeholder="Click para seleccionar archivo .xlsx"
                                            class="inputVuetify"
                                            >
                                        </v-file-input>
                                    </v-row>

                                    <v-btn  class= "botonCargar"  @click="enviarDataExcel()">
                                        <v-flex text-xs-center>
                                            <v-label >
                                                <v-icon size="40"  color="#72128E" >mdi-cloud-upload-outline</v-icon>
                                                Subir
                                            </v-label> 
                                        </v-flex>        
                                    </v-btn>

                                </v-form >
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
            buscarClienteLetras:'',
            search: '',
            dialog: false,
            dialog2: false,
            dialog3:false,
            rulesTipoDocumento: [
                value=>!!value||'Requerido'
            ],
            rules_id: [
                value=>!!value||'Requerido',
                value => (value.length <= 70) || 'Max 70 caracteres' 
            ],
            rulesNombre: [
                value => !!value || 'Required.',
                value => (value && value.length <= 70) || 'Max 70 caracteres',
            ],
            rulesDireccion: [value => ( value.length <= 70) || 'Max 70 caracteres'],
            rulesCiudad: [value => ( value.length <= 70) || 'Max 70 caracteres'],
            rulesTelefono: [value => ( value.length <= 70) || 'Max 70 caracteres'],
            rulesEmail: [value => ( value.length <= 70) || 'Max 70 caracteres'],
      
            columnas: [
                { text: 'Tipo Doc', value: 'tipoDocumento' , class:'purple darken-3 white--text'},
                { text: 'Número Doc', value: '_id', class:'purple darken-3 white--text' },
                { text: 'Nombre', value: 'nombre', class:'purple darken-3 white--text' },
                { text: 'Dirección', value: 'direccion' , class:'purple darken-3 white--text'},
                { text: 'Ciudad', value: 'ciudad' , class:'purple darken-3 white--text'},
                { text: 'Telefono', value: 'telefono', class:'purple darken-3 white--text',width:'10%' ,sortable: false },
                { text: 'Email', value: 'email', class:'purple darken-3 white--text' },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],
            personas: [],
            
            editedItem: {
                tipoPersona:'', nombre:'', tipoDocumento:'', _id:'',
                direccion:'', telefono:'',  email:''
            },
            dataExcel:[],
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
            msjExisto:function(tata){
                Swal.fire({
                position: 'top',
                icon: 'success',
                title: tata,
                showConfirmButton: false,
                backdrop: 'rgba(55,55,55,0.8)',
                timer: 2000})
            },
            
            //traer proveedores
            obtenerPersonas(){
                let caracteresClientes = this.buscarClienteLetras.trim();
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`cliente/clientes?value=${caracteresClientes}`,header)
                    .then(response =>{
                        console.log(response.data);
                        this.personas = response.data.persona
                        if(this.personas.length==0){
                        this.msjExisto('No hay clientes');
                        }
                    })
                    .catch((error) =>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                        this.msgError = error.response.data.errors[0].msg;
                        this.msjError(this.msgError);
                        }else{
                        this.msgError =error.response.data.msg;
                        this.msjError(this.msgError);
                        }
                    })
            },//obtenerPersonas

            //limpiar formulario
            reset(){
                this.dialog=true
                this.editedItem.tipoDocumento=''
                this.editedItem._id=''
                this.editedItem.nombre=''
                this.editedItem.direccion=''
                this.editedItem.ciudad=''
                this.editedItem.telefono=''
                this.editedItem.email=''
            },//reset
            
            //alistar variables para enviar 
            editar(item){
                console.log(item);
                this.id= item._id;
                this.editedItem.tipoDocumento=item.tipoDocumento
                this.editedItem._id=item._id
                this.editedItem.nombre=item.nombre
                this.editedItem.direccion=item.direccion
                this.editedItem.ciudad=item.ciudad
                this.editedItem.telefono=item.telefono
                this.editedItem.email=item.email
                this.dialog2=true;
            },//editar
      
            //almacenar
            guardar(){
                let header = {headers:{"token" : this.$store.state.token}};
                const me = this;
                if(this.editedItem.tipoDocumento.trim()==='' || this.editedItem._id.trim()==='' || this.editedItem.nombre.trim()==='' ){
                    this.msjError('(*) Son campos obligatorios');

                }else if(this.editedItem.tipoDocumento.length>70 || this.editedItem._id.length>30 || this.editedItem.nombre.length>70 ||
                        this.editedItem.direccion.length>70 || this.editedItem.ciudad.length>70 || this.editedItem.telefono.length>70 || 
                        this.editedItem.email.length>70 ){
                    this.msjError('Supero el número de carácteres permintidos en un campo');

                }else{
                    axios.post('cliente',{
                        tipoDocumento:this.editedItem.tipoDocumento,
                        _id:this.editedItem._id,
                        nombre:this.editedItem.nombre,
                        direccion:this.editedItem.direccion,
                        ciudad:this.editedItem.ciudad,
                        telefono:this.editedItem.telefono,
                        email:this.editedItem.email,
                        },
                        header)
                        .then((response)=>{
                            console.log(response);
                            this.dialog=false
                            this.msgError = response.data.msg;
                            me.msjExisto(this.msgError);
                        })
                        .catch((error)=>{
                            console.log(error.response);
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
                }  
            },//guardar

            //eliminar cliente de la bd
            eliminar(item){
                let id = item._id
                console.log(id);
                let header = {headers:{"token" : this.$store.state.token}};
                axios.delete(`cliente/${id}`, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
                    this.personas=[];
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
            },//eliminar


            actualizarTipodoc(tipoDocumento){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(tipoDocumento.trim()===''){
                this.msjError('Tipo de documento vacio');
                }else{
                axios.put(`cliente/actualizarTipoDoc/${id}`,{tipoDocumento}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
                
            },//actualizarTipodoc
        
            actualizarNombre(nombre){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(nombre.trim()===''){
                this.msjError('Nombre obligatorio');
                }else if(nombre.length>70){
                this.msjError('Nombre demasiado largo');
                }else{
                axios.put(`cliente/actualizarNombre/${id}`,{nombre}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
                
            },//actualizarNombre
            
            actualizarDireccion(direccion){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(direccion.trim()===''){
                this.msjError('Dirección obligatorio');
                }else if(direccion.length>70){
                this.msjError('Dirección demasiada larga');
                }else{
                axios.put(`cliente/actualizarDireccion/${id}`,{direccion}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
                
            },//actualizarDireccion

            actualizarCiudad(ciudad){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(ciudad.trim()===''){
                this.msjError('Ciudad obligatorio');
                }else if(ciudad.length>70){
                this.msjError('Ciudad demasiada larga');
                }else{
                axios.put(`cliente/actualizarCiudad/${id}`,{ciudad}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
                
            },//actualizarCiudad

            actualizarTelefono(telefono){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(telefono.trim()===''){
                this.msjError('Telefono obligatorio');
                }else if(telefono.length>70){
                this.msjError('Telefono demasiada larga');
                }else{
                axios.put(`cliente/actualizarTelefono/${id}`,{telefono}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
            },//actualizarTelefono
            
            actualizarEmail(email){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(email.trim()===''){
                this.msjError('Email obligatorio');
                }else if(email.length>70){
                this.msjError('Email demasiada larga');
                }else{
                axios.put(`cliente/actualizarEmail/${id}`,{email}, header)
                    .then((response)=>{
                    console.log(response);
                    this.msgError=response.data.msg;
                    this.msjExisto(this.msgError);
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
            },//actualizarDireccion

            exportExcel(){
                let me = this
                let clientesExport=[]
                me.personas.map(function(x){
                clientesExport.push(
                    {
                    tipoDocumento:x.tipoDocumento,
                    numDocumento:x._id,
                    nombre:x.nombre,
                    direccion:x.direccion,
                    ciudad:x.ciudad,
                    telefono:x.telefono,
                    email:x.email,
                    }
                )
                })
                let data = XLSX.utils.json_to_sheet(clientesExport)
                const workbook = XLSX.utils.book_new()
                const filename = "Clientes"
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`) 
            },//exportExcel

            inportarExcel(){
                this.dialog3=true
            },

            onChangess(file) {
                console.log(file);
                this.file = file ? file : null;
                console.log(this.file);
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
                        console.log(this.dataExcel);
                    }
                    reader.readAsBinaryString(this.file);
                }
            },//onChangess

            enviarDataExcel(){
                this.msjExito("Enviando")
                if(this.dataExcel.length==0){
                    this.msjError("Excel sin datos")
                }else if(this.dataExcel.length>250){
                    this. msjError("Demasiados articulos, max 250")
                }else{
                    let header = {headers:{"token":this.$store.state.token}};
                    axios.post("/cliente/subirClientes",{
                            articulos:this.dataExcel,
                        },header)
                        .then(response=>{
                            console.log(response);
                            //let mensaje = response.data.msg;
                            this.file=null;
                            this.dataExcel=[];
                            this.onChangess(null)
                            this.msjExito("venta realizada")
                        })
                        .catch(error=>{
                            console.log(error.response);
                                if(!error.response.data.msg){
                                this.msgError = error.response.data.errors[0].msg;
                                this.msjError(this.msgError);
                            }else{
                                this.msgError =error.response.data.msg;
                                this.msjError(this.msgError);
                            }
                        })
                    }
            }//enviarDataExcel


        },//methots
    }//export default
</script>

<style scoped>
    .inputVuetify{
        margin-top:20px;
        margin-bottom:40px;
        margin-left:20px;
    }
    .botonCargar{
        margin-top:20px;
        margin-bottom:40px;
        margin-left:20px;
        width:200px;
        height:50px;
        box-shadow: 0 0 20px #A068B8;
        border: 40%
    }
</style>