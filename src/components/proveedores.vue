<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>

      <template>
        <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8; border-radius: 40px">
          <v-row style="margin-left:10px">
            <v-text-field  v-model="buscarClienteLetras" 
              label="Traer proveedor por nombre, dirección o telefono. (Ejemplo:almacen x)" 
              v-on:keyup.enter="obtenerProveedores()">
            </v-text-field>
            <v-btn style="margin-right:30px; margin-left:20px;  margin-top:20px"   icon color="#72128E"  @click="obtenerProveedores()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
          </v-row>
        </v-card>
      </template>

      <template >
        <v-data-table  style="margin-top:50px" class=" elevation-15 " :headers="columnas" :items="personas" :search="search">
          <template v-slot:top>
            <!--parte arriba tabla-->
            <v-toolbar flat  >
              <v-toolbar-title>Proveedores</v-toolbar-title>
              
              <!--buscar-->
              <v-spacer></v-spacer>
              <!--<v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar cliente por documento, nombre, dirección, ciudad, telefono o email"  single-line hide-details></v-text-field>-->
              <!--<v-divider  class="mx-4" inset  vertical ></v-divider>-->
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px"  >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  v-bind="attrs"  v-on="on" @click="reset()"  >  Nuevo </v-btn>
                </template>
                <!--formulario-->

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
                
                <!--formulario-->
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
         
          <template v-slot:[`item.actions`]="{ item }">
              <v-icon    class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
          </template>

        </v-data-table>

      </template>
    </v-container>
  </v-app>
  </div>
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'

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
          background: 'black',
          //5000 son 5 seg
          timer: 3000})
      },

      msjExito:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: tata,
          showConfirmButton: false,
          background: 'black',
          timer: 2000})
      },

      //traer proveedores
      obtenerProveedores(){
        let caracteresClientes = this.buscarClienteLetras.trim();
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`proveedor/proveedores?value=${caracteresClientes}`,header)
          .then(response =>{
            console.log(response.data);
            this.personas = response.data.proveedor
            if(this.personas.length==0){
              this.msjExito('No hay Proveedores');
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
      },//obtenerProveedores

      //limpiar formulario
      reset(){
        this.editedItem._id=''
        this.editedItem.nombre=''
        this.editedItem.direccion=''
        this.editedItem.telefono=''
      },//reset

      //alistar variables para enviar 
      editar(item){
        console.log(item);
        this.id= item._id;
        this.editedItem._id=item._id
        this.editedItem.nombre=item.nombre
        this.editedItem.direccion=item.direccion
        this.editedItem.telefono=item.telefono
        this.dialog2=true;
      },//editar
      
      //almacenar
      guardar(){
        console.log('estoy guardando'+this.bd+'ALMACENAR');
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
            },
            header)
              .then((response)=>{
                console.log(response);
                this.dialog=false
                this.msgError = response.data.msg;
                me.msjExito(this.msgError);
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


      actualizarNombre(nombre){
        console.log(nombre);
        console.log(this.id);
        let id=this.id;
        let header = {headers:{"token" : this.$store.state.token}};
        if(nombre.trim()===''){
          this.msjError('Nombre obligatorio');
        }else if(nombre.length>200){
          this.msjError('Nombre demasiado largo');
        }else{
          axios.put(`proveedor/nombre/${id}`,{nombre}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjExito(this.msgError);
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
        console.log(direccion);
        console.log(this.id);
        let id=this.id;
        let header = {headers:{"token" : this.$store.state.token}};
        if(direccion.trim()===''){
          this.msjError('Dirección obligatorio');
        }else if(direccion.length>150){
          this.msjError('Dirección demasiada larga');
        }else{
          axios.put(`proveedor/direccion/${id}`,{direccion}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjExito(this.msgError);
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

      actualizarTelefono(telefono){
        console.log(telefono);
        console.log(this.id);
        let id=this.id;
        let header = {headers:{"token" : this.$store.state.token}};
        if(telefono.trim()===''){
          this.msjError('Telefono obligatorio');
        }else if(telefono.length>150){
          this.msjError('Telefono demasiada larga');
        }else{
          axios.put(`proveedor/telefono/${id}`,{telefono}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjExito(this.msgError);
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

    },//methots
  }//export default
</script>
