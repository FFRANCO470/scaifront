<template>
    <div v-if="this.$store.state.token != ''" >
        <v-container fluid>
            <template  v-if="muestra == 1">
                <v-row>
                    <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                        <label>Usuarios</label>
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
                        <v-text-field 
                            solo 
                            style="width:600px;" 
                            v-model="buscarUsuario" 
                            label="Traer usuarios por nombre de usuario, rol, nombre, cedula"   >
                        </v-text-field>
                    </div>
                    <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                        <v-btn style="margin-left:10px;"   icon color="#72128E"  @click="obtenerUsuarios()">
                            <v-icon size="40">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </v-row>

                <v-data-table style="margin-top:50px" class=" elevation-15 " :headers="usuariosTitle" :items="usuarios" :search="search">
                    <template v-slot:top>
                        <v-toolbar flat  >
                            <v-spacer></v-spacer>
                            <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar usuario por rol, usuario y nombre"  single-line hide-details></v-text-field>    
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

                    <!--editar activar desactivar-->
                    <template v-slot:[`item.actions`]="{ item }">
                        <!--<v-icon  small  class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>-->
                        <v-icon  small  class="mr-2"  @click="cambioPage(2,item._id)" >mdi-file-search-outline</v-icon>
                        <template v-if="item._id != $store.state.id">
                            <template v-if="item.estado">
                                <v-icon  small class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
                            </template>
                            <template v-else>
                                <v-icon  small  @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
                            </template>
                        </template>
                    </template>


                </v-data-table>

                <template>
                    <v-dialog v-model="dialog" max-width="80%"  >
                        <v-card >
                            <v-card-title><span class="text-h5">Usuario</span></v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-row>
                                        <v-col><v-select :items="roles" v-model="rol" solo label="Rol" ></v-select></v-col>
                                        <v-col><v-text-field  v-model="nombreUser"  :rules="rulesNombre"    label="Usuario*"     required :counter="50"></v-text-field></v-col>
                                        <v-col><v-text-field  v-model="password"    :rules="rulesPassword"  label="Contraseña*" required  :counter="10"></v-text-field></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col><v-text-field  v-model="nombre"      :rules="rulesNombrePila"       label="Nombre*"        required :counter="100"></v-text-field></v-col>
                                        <v-col><v-text-field  v-model="cedula"      :rules="rulesCedula"       label="Cedula*"        required :counter="100"></v-text-field></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col><v-text-field  v-model="telefono"    :rules="rulesOtros"       label="Telefono"  :counter="100"></v-text-field></v-col>
                                        <v-col><v-text-field  v-model="direccion"   :rules="rulesOtros"       label="Direccion"  :counter="100"></v-text-field></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col><v-text-field  v-model="tipoCuenta"  :rules="rulesOtros"       label="Tipo de cuenta"  :counter="100"></v-text-field></v-col>
                                        <v-col><v-text-field  v-model="numCuenta"   :rules="rulesOtros"       label="Numero de cuenta" :counter="100"></v-text-field></v-col>
                                    </v-row>
                            
                                    <v-row>
                                        <v-col><v-text-field  v-model="banco"       :rules="rulesOtros"       label="Banco" :counter="100" ></v-text-field></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col><v-text-field  v-model="numContrato" :rules="rulesOtros"       label="Numero de contrato" :counter="100" ></v-text-field></v-col>
                                    </v-row>
                        
                                    <v-btn color="blue darken-1" text class="mr-4"  @click="almacenarUsuario()"  > Guardar </v-btn>
                                    <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                                    <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                                </v-form >
                            </v-card-text>    
                        </v-card>
                    </v-dialog>
                </template>


            </template>

            <template  v-if="muestra == 2">
                <v-container>
                    <v-row>
                        <v-btn icon style="margin-left:50px;margin-top:40px;" color="#AF7AC5"  @click="cambioPage(1,false)"  class="mb-4" >
                            <v-icon size="50" >mdi-arrow-left-bold-circle-outline</v-icon>
                        </v-btn>
                        <v-row>
                            <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                                <label>Editar usuario</label>
                            </div>
                        </v-row>
                    </v-row>
                </v-container>
                    <v-row>
                        <v-col>

                            <v-row>
                                <div style="margin-top:50px">
                                    <v-layout justify-left  >
                                        <label  class="col-form-label" style="margin-left:30px; text-align:left">Nombre de usuario:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:40px;"><v-text-field  v-model="usuarioDetalle.nombreUser" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarNombreUser(usuarioDetalle.nombreUser)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>
                            
                            <v-row>
                                <div style="margin-top:0px">
                                    <v-layout justify-left  >
                                        <label  class="col-form-label" style="text-align:left; margin-left:30px;">Rol de usuario:</label>
                                        <label  class="col-form-label" style="text-align:left; margin-left:70px">{{usuarioDetalle.rol}}</label>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:20px">
                                    <v-layout justify-left  >
                                        <label  class="col-form-label" style="text-align:left; margin-left:30px">Clave:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:135px;"><v-text-field  v-model="passwordNew" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarPassword(passwordNew)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Nombre:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:120px"><v-text-field  v-model="usuarioDetalle.nombre" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarNombre(usuarioDetalle.nombre)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Documento:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:90px"><v-text-field  v-model="usuarioDetalle.cedula" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarCedula(usuarioDetalle.cedula)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Telefono:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:110px"><v-text-field  v-model="usuarioDetalle.telefono" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarTelefono(usuarioDetalle.telefono)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Direccion:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:105px"><v-text-field  v-model="usuarioDetalle.direccion" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDireccion(usuarioDetalle.direccion)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Numero de cuenta:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:40px"><v-text-field  v-model="usuarioDetalle.numCuenta" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarNumCuenta(usuarioDetalle.numCuenta)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>

                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Tipo de cuenta:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:65px"><v-text-field  v-model="usuarioDetalle.tipoCuenta" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarTipoCuenta(usuarioDetalle.tipoCuenta)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>
                            
                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Banco:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:125px"><v-text-field  v-model="usuarioDetalle.banco" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarBanco(usuarioDetalle.banco)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>
                            
                            <v-row>
                                <div style="margin-top:0px;margin-left:30px;">
                                    <v-layout justify-left  >
                                        <label  class=" col-form-label" style="text-align:left">Contrato:</label>
                                        <div style="width:400px; margin-top:-20px;margin-left:105px"><v-text-field  v-model="usuarioDetalle.numContrato" ></v-text-field></div>
                                        <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarNumContrato(usuarioDetalle.numContrato)">
                                            <v-icon>mdi-reload</v-icon>  
                                        </v-btn>
                                    </v-layout>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>

                
                
            </template>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import XLSX from "xlsx"
    export default {
        data : ()=> ({
            muestra:1,//cambiar de vista 
            dialog:false,
            buscarUsuario:'',
            roles:['administrador','vendedor'],
            rol : '',
            nombreUser : '',
            password : '',
            nombre : '',
            cedula : '',
            telefono : '',
            direccion : '',
            tipoCuenta : '',
            numCuenta : '',
            banco : '',
            numContrato : '',
            passwordNew : '',
            usuarioDetalle:{},
            search: '',
            usuarios:[],
            usuariosTitle: [
                { text: 'Rol', value: 'rol' , class:'purple darken-3 white--text'},
                { text: 'Usuario', value: 'nombreUser', class:'purple darken-3 white--text' },
                { text: 'Nombre', value: 'nombre', class:'purple darken-3 white--text' },
                { text: 'Documento', value: 'cedula', class:'purple darken-3 white--text' },
                { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
            ],

            //reglas
            rulesNombre: [
                value => !!value || 'Required.',
                value => (value && value.length <= 50) || 'Max 50 caracteres',
            ],
            rulesPassword: [
                value=>!!value||'Requerido',
                value => (value && value.length <= 10) || 'Max 10 caracteres' 
            ],
            rulesNombrePila:[
                value=>!!value||'Requerido',
                value => (value && value.length <= 100) || 'Max 100 caracteres' 
            ],
            rulesCedula:[
                value=>!!value||'Requerido',
                value => (value && value.length <= 100) || 'Max 100 caracteres' 
            ],
            rulesOtros:[
                value => (value.length <= 100) || 'Max 100 caracteres' 
            ],

        }),//data

        created(){
            this.checkToken();
        },//created

        methods : {
            //validar que exista toque o redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
            },//checkToken
        
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

            cambioPage(num,item){
                if(num==1){
                    this.muestra=1
                }else{
                    this.muestra=2
                    this.id = item;
                    this.traerUsuarioById(item);
                }
            },

            reset(){
                this.rol = "";
                this.nombreUser = "";
                this.password = "";
                this.nombre = "";
                this.cedula = "";
                this.telefono = "";
                this.direccion = "";
                this.tipoCuenta = "";
                this.numCuenta = "";
                this.banco = "";
                this.numContrato = "";
                this.dialog = true;
            },

            almacenarUsuario(){
                const me = this;
                if(this.rol.trim()==='' || this.nombreUser.trim() === '' || 
                    this.nombre.trim()==='' || this.cedula.trim()==='' ||this.password.trim()===''){
                    
                    this.msjError('(*) Son campos obligatorios');
                } else if(this.rol.trim().toLowerCase()!='administrador' &&  this.rol.trim().toLowerCase()!='vendedor'){

                    this.msjError('Roles: administrador o vendedor');
                }else if( this.nombreUser.length>50 || this.nombre.length>100 ||
                    this.cedula.length>100 || this.password.length>10 ||
                    this.telefono.length>100  || this.direccion.length>100 ||
                    this.tipoCuenta.length>100 || this.numCuenta.length>100 ||
                    this.banco.length>100  ||  this.numContrato.length>100){

                    this.msjError('Supero el número de carácteres permintidos en un campo');

                }else{
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.post('usuario',{
                                            password:this.password,
                                            rol:this.rol,
                                            nombreUser:this.nombreUser,
                                            nombre:this.nombre,
                                            cedula:this.cedula,
                                            telefono:this.telefono,
                                            direccion:this.direccion,
                                            tipoCuenta:this.tipoCuenta,
                                            numCuenta:this.numCuenta,
                                            banco:this.banco,
                                            numContrato:this.numContrato,
                                        },header)
                        .then((response)=>{
                            me.dialog=false;
                            me.msjExito(response.data.msg);
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg;
                                this.msjError(msgErrores);
                            }else{
                                let msgErrores =error.response.data.msg;
                                this.msjError(msgErrores);
                            }
                        })
                }
            },

            //traer todos los usuarios
            obtenerUsuarios(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`usuario?value=${this.buscarUsuario}`,header)
                    .then(response =>{
                        this.usuarios = response.data.usuario
                        if(this.usuarios.length==0){
                            this.msjExito("No hay usuarios");
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
            },//obtenerUsuarios
            
            //traer usuario by id
            traerUsuarioById(id){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`usuario/usuario/${id}`,header)
                    .then(response =>{
                        this.usuarioDetalle = response.data.usuario
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

            //traer usuario despues de activar o desactivar
            traerDespuesActivarDesactivar(nombre){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`usuario?value=${nombre}`,header)
                    .then(response =>{
                        this.usuarios = response.data.usuario
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

            //activar o desacivar usuario
            activarDesactivarItem(accion , item){
                let id = item._id;
                if(accion == 2){
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`usuario/desactivar/${id}`,{}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg)
                            this.traerDespuesActivarDesactivar(item.nombreUser)
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
                }else{
                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`usuario/activar/${id}`,  {},header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
                            this.traerDespuesActivarDesactivar(item.nombreUser);
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

            //exportar usuarios por excel
            exportExcel(){
                let articulosExport=[];
                let me = this;
                if(me.usuarios.length>1000){
                    return this.msjError("Max. 1000 datos");
                }
                me.usuarios.map(function(x){
                    articulosExport.push(
                        { 
                            cedula:x.cedula,
                            nombre:x.nombre,
                            nombreUser:x.nombreUser,
                            estado:x.estado,
                            rol:x.rol
                        }
                    );
                });
                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'usuarios'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportExcel

            actualizarNombreUser(nombreUser){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(nombreUser.trim()===''){
                    this.msjError('Nombre de usuario obligatorio');
                }else if (nombreUser.length>50){
                    this.msjError('Nombre de usuario mayor a 50 carácteres');
                }else{
                    axios.put(`usuario/actualizarNombreUser/${id}`,{nombreUser}, header)
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

            actualizarPassword(password){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(password.trim()===''){
                    this.msjError('Contraseña obligatoria');
                }else if (password.length>10){
                    this.msjError('Contraseña mayor a 10 carácteres');
                }else{
                    axios.put(`usuario/actualizarPass/${id}`,{password}, header)
                        .then((response)=>{
                            this.msjExito(response.data.msg);
                            this.passwordNew="";
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                this.msgErrores = error.response.data.errors[0].msg;
                                this.msjError(this.msgErrores);
                            }else{
                                this.msgErrores =error.response.data.msg;
                                this.msjError(this.msgErrores);
                            }
                        });
                }
            },//actualizarPassword

            actualizarNombre(nombre){
                    let id=this.id;
                    let header = {headers:{"token" : this.$store.state.token}};
                    if(nombre.trim()===''){
                        this.msjError('Nombre obligatorio');
                    }else if (nombre.length>100){
                        this.msjError('Nombre mayor a 100 carácteres');
                    }else{
                        axios.put(`usuario/actualizarNombrePila/${id}`,{nombre}, header)
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

            actualizarCedula(cedula){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(cedula.trim()===''){
                    this.msjError('Cedula obligatorio');
                }else if (cedula.length>100){
                    this.msjError('Cedula mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarCedula/${id}`,{cedula}, header)
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
            },//actualizarCedula

            actualizarTelefono(telefono){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(telefono.trim()===''){
                    this.msjError('Telefono obligatorio');
                }else if (telefono.length>100){
                    this.msjError('Telefono mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarTelefono/${id}`,{telefono}, header)
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
            },//actualizar telefono

            actualizarDireccion(direccion){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(direccion.trim()===''){
                    this.msjError('Dirección obligatoria');
                }else if (direccion.length>100){
                    this.msjError('Dirección mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarDireccion/${id}`,{direccion}, header)
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

            actualizarNumCuenta(numCuenta){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(numCuenta.trim()===''){
                    this.msjError('Numero de cuenta obligatori');
                }else if (numCuenta.length>100){
                    this.msjError('Numero de cuenta mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarNumcuenta/${id}`,{numCuenta}, header)
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
            },//actualizarNumCuenta

            actualizarTipoCuenta(tipoCuenta){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(tipoCuenta.trim()===''){
                    this.msjError('Tipo de cuenta obligatori');
                }else if (tipoCuenta.length>100){
                    this.msjError('Tipo de cuenta mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarTypecuenta/${id}`,{tipoCuenta}, header)
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
            },//actualizarTipoCuenta

            actualizarBanco(banco){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(banco.trim()===''){
                    this.msjError('Banco obligatori');
                }else if (banco.length>100){
                    this.msjError('Banco mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarBanco/${id}`,{banco}, header)
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
            },//actualizarBanco

            actualizarNumContrato(numContrato){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                if(numContrato.trim()===''){
                    this.msjError('Contrato obligatori');
                }else if (numContrato.length>100){
                    this.msjError('Contrato mayor a 100 carácteres');
                }else{
                    axios.put(`usuario/actualizarContrato/${id}`,{numContrato}, header)
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
            },//actualizarNumContrato
        }//methodos

    }//export defaul
</script>