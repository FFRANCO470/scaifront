<template>
    <div>
        <v-row>
            <v-col>
                <div style="margin-top:50px;">
                    <v-card style="margin:auto; width:250px;height:250; ">
                        <img src="../assets/logoStore.jpg" style="margin-left:10px; margin-top:10px" alt="" contain  height="90%" width="90%">
                    </v-card>
                </div>
                <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:10px;margin-left:30px">
                    <label>Informacion</label>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col style="margin-top:50px;">
                <v-card style="margin:auto; width:90%;">
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-store</v-icon> Nombre:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.nameStore"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarNameStore()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-card-bulleted</v-icon>    Nit:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.nit"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarNit()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-file-multiple-outline</v-icon> Regimen:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.regimen"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarRegimen()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-account</v-icon> Reprecentatne Camara comercio:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.representanteCC"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarRepresenante()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-earth</v-icon> Departamento:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.departamento"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarDepartamento()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-map-legend</v-icon> Ciudad:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.ciudad"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarCiudad()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-map-marker</v-icon> Direccion:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.direccion"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarDireccion()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-whatsapp</v-icon> Celular:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.celular"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarCelular()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-phone-hangup-outline</v-icon> Telefono:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.telefono"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarTelefono()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-email</v-icon> Email:</label>
                        <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.email"  >
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarEmail()"><v-icon>mdi-reload</v-icon>  </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    export default {
        data:()=>({
            datosAlmacen:{
                nameStore:'',
                nit:'',
                regimen:'',
                representanteCC:'',
                departamento:'',
                ciudad:'',
                direccion:'',
                celular:'',
                telefono:'',
                email:''
            },   
        }),//data

        created(){
            this.checkToken();
            this.traerDatos();
        },

        methods:{

            //validar que la ruta tenga token si no redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                    this.$router.push('/');
                }
            },

            //msg error
            msjError:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    //5000 son 5 seg
                    timer: 3000
                })
            },//msjError

            //msg exito
            msjExisto:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 2000
                })
            },

            traerDatos(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`setting`,header)
                    .then(response =>{
                        this.datosAlmacen = response.data.configuraciones
                    })
                    .catch((error) =>{
                        if(!error.response.data.msg){
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjError(this.msgError);
                        }else{
                            if(error.response.data.msg==false){
                                this.msjError('Configuracion basica no creada');
                            }else{
                                let msgErrores = error.response.data.msg
                                this.msjError(msgErrores);
                            }
                        }
                    })
            },

            //actualzar nombre del almacen
            actualizarNameStore(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.nameStore.trim()===''){
                    this.msjError('Nombre obligatorio');
                }else if(this.datosAlmacen.nameStore.legend>100){
                    this.msjError('Nombre mayor a 100 carácteres');
                }else{
                    axios.put(`setting/nameStore`,{ nameStore:this.datosAlmacen.nameStore}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarNameStore

            //actualzar nit del almacen
            actualizarNit(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.nit.trim()===''){
                    this.msjError('Nit obligatorio');
                }else if(this.datosAlmacen.nit.legend>100){
                    this.msjError('Nit mayor a 100 carácteres');
                }else{
                    axios.put(`setting/nit`,{ nit:this.datosAlmacen.nit}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarNit

            //actualzar regimen del almacen
            actualizarRegimen(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.regimen.trim()===''){
                    this.msjError('Regimen obligatorio');
                }else if(this.datosAlmacen.regimen.legend>100){
                    this.msjError('Regimen mayor a 100 carácteres');
                }else{
                    axios.put(`setting/regimen`,{ regimen:this.datosAlmacen.regimen}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarRegimen

            //actualzar representante del almacen
            actualizarRepresenante(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.representanteCC.trim()===''){
                    this.msjError('Representante obligatorio');
                }else if(this.datosAlmacen.representanteCC.legend>100){
                    this.msjError('Representante mayor a 100 carácteres');
                }else{
                    axios.put(`setting/representanteCC`,{ representanteCC:this.datosAlmacen.representanteCC}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarRepresenante

            //actualzar departameno del almacen
            actualizarDepartamento(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.departamento.trim()===''){
                    this.msjError('Departamento obligatorio');
                }else if(this.datosAlmacen.departamento.legend>100){
                    this.msjError('Departamento mayor a 100 carácteres');
                }else{
                    axios.put(`setting/departamento`,{ departamento:this.datosAlmacen.departamento}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarDepartamento

            //actualzar ciudad del almacen
            actualizarCiudad(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.ciudad.trim()===''){
                    this.msjError('Ciudad obligatorio');
                }else if(this.datosAlmacen.ciudad.legend>100){
                    this.msjError('Ciudad mayor a 100 carácteres');
                }else{
                    axios.put(`setting/ciudad`,{ ciudad:this.datosAlmacen.ciudad}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarCiudad

            //actualzar direccion del almacen
            actualizarDireccion(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.direccion.trim()===''){
                    this.msjError('Direccion obligatorio');
                }else if(this.datosAlmacen.direccion.legend>100){
                    this.msjError('Direccion mayor a 100 carácteres');
                }else{
                    axios.put(`setting/direccion`,{ direccion:this.datosAlmacen.direccion}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarDireccion

            //actualzar celular del almacen
            actualizarCelular(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.celular.trim()===''){
                    this.msjError('Celular obligatorio');
                }else if(this.datosAlmacen.celular.legend>100){
                    this.msjError('Celular mayor a 100 carácteres');
                }else{
                    axios.put(`setting/celular`,{ celular:this.datosAlmacen.celular}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarCelular

            //actualzar telefono del almacen
            actualizarTelefono(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.telefono.trim()===''){
                    this.msjError('Telefono obligatorio');
                }else if(this.datosAlmacen.telefono.legend>100){
                    this.msjError('Telefono mayor a 100 carácteres');
                }else{
                    axios.put(`setting/telefono`,{ telefono:this.datosAlmacen.telefono}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                            }else{
                                if(error.response.data.msg==false){
                                    this.msjError('Configuracion basica no creada');
                                }else{
                                    let msgErrores = error.response.data.msg
                                    this.msjError(msgErrores);
                                }
                            }  
                        })
                }
            },//actualizarTelefono

            //actualzar email del almacen
            actualizarEmail(){
                let header = {headers:{"token" : this.$store.state.token}};
                if(this.datosAlmacen.email.trim()===''){
                    this.msjError('Email obligatorio');
                }else if(this.datosAlmacen.email.legend>100){
                    this.msjError('Email mayor a 100 carácteres');
                }else{
                    axios.put(`setting/email`,{ email:this.datosAlmacen.email}, header )
                        .then((response)=>{
                            this.msjExisto(response.data.msg);
                            this.traerDatos();
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg
                                this.msjError(msgErrores);
                                }else{
                                    if(error.response.data.msg==false){
                                        this.msjError('Configuracion basica no creada');
                                    }else{
                                        let msgErrores = error.response.data.msg
                                        this.msjError(msgErrores);
                                }
                            }  
                        })
                    }
            },//actualizarEmail

        
        }//metodos

    }//export defauld
</script>

<style scoped>
    .logoStoreCss{
       
    }
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 22px;
        text-align:left;
    }
    .llenarTexto{
        font-family: 'calibri';
        color: #72128E;
        font-size: 20px;
        border: 3px solid #72128E;
        border-radius: 5px;
        height:35px;
        margin-top:12px
    }
</style>