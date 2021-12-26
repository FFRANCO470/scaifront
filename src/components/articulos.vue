<template>
    <div>
        <v-app>
            <v-container fluid>
                <!-- VISTA CON LA TABLA CON ARTICULOS -->
                <template v-if="muestra == 1">

                    <v-row>
                        <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Articulos</label>
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
                            <label>Categoria</label>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                            <v-autocomplete solo  style="width:250px; margin-left:10px;" v-model="categoriaFiltrada"  :items="categoriasFiltro" ></v-autocomplete>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:50px;margin-left:30px">
                            <label>Marca</label>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:40px;margin-left:30px">
                            <v-autocomplete  solo style="width:250px; margin-left:10px;" v-model="marcaFiltrada"  :items="marcasFiltro" ></v-autocomplete>
                        </div>
                        <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                            <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="filtarCateAndMarca()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                        </div>
                    </v-row>

                    <!--tabla para mostrar los articulos-->
                    <v-data-table style="margin-top:50px"   class=" elevation-15 " :headers="columnas" :items="articulos" :objetos="[categorias,marcas]" :search="search">
                        
                        <!--cabecera de la tabla-->
                        <template v-slot:top>
                            <v-toolbar flat  >
                                <v-spacer></v-spacer>
                                <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar por categoria, marca o referencia"  single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template>

                        <!--total costo-->
                        <template v-slot:[`item.totalCosto`]="{ item }">
                            {{item.cantDisponibles * item.costo}}
                        </template>

                        <!--total precio-->
                        <template v-slot:[`item.totalPrecio`]="{ item }">
                            {{item.cantDisponibles * item.precio}}
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
                            <v-icon    class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
                            <v-icon    class="mr-2"  @click="cambioPage(2,item._id)" >mdi-file-search-outline</v-icon>
                            <template v-if="item.estado">
                                <v-icon   class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
                            </template>
                            <template v-else>
                                <v-icon    @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
                            </template>
                        </template>

                    </v-data-table>

                    <!--cuadro de texto para agregar articulo-->
                    <v-dialog v-model="dialog" max-width="500px"  >
                        <!--formulario-->
                        <v-card >
                            <v-card-title><span class="text-h5">Articulo</span></v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-row > <v-col>  <v-autocomplete  v-model="editedItem.categoria"  :rules="rulesCategoria" :items="categorias" label="Categoria" required></v-autocomplete>  </v-col> </v-row>
                                    <v-row > <v-col>  <v-autocomplete  v-model="editedItem.marca"  :rules="rulesMarca" :items="marcas" label="Marcas" required></v-autocomplete>  </v-col> </v-row>
                                    <v-row><v-col > <v-text-field  v-model="editedItem.referencia" :rules="rulesReferencia" :counter="50" label="Referencia"  required  ></v-text-field>  </v-col></v-row> 
                                    <v-row>
                                        <v-col >
                                            <v-text-field type="number"  min="0" v-model="editedItem.cantDisponibles"  :rules="rulesNum" label="Cantidad"  required  ></v-text-field>  
                                        </v-col>
                                        <v-col >
                                            <v-text-field  type="number" min="0" v-model="editedItem.costo" :rules="rulesNum" label="Costo"  required ></v-text-field> 
                                        </v-col>
                                        <v-col >
                                            <v-text-field type="number"  min="0" v-model="editedItem.precio"  :rules="rulesNum" label="Precio"  required ></v-text-field> 
                                        </v-col>
                                    </v-row>
                                    <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                                    <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                                    <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                                </v-form >
                            </v-card-text>    
                        </v-card>
                    </v-dialog>

                    <!--cuadro de texto para editar articulo-->
                    <v-dialog v-model="dialog2" max-width="500px" >
                        <v-card >
                            <v-card-title><span class="text-h5">Editar articulo</span></v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-row>
                                        <v-autocomplete  v-model="editedItem.categoria"  :rules="rulesCategoria" label="Categoria"  :items="categorias" ></v-autocomplete>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCategoria(editedItem.categoria)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-autocomplete  v-model="editedItem.marca"  :rules="rulesMarca" label="Marca"  :items="marcas" ></v-autocomplete>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarMarca(editedItem.marca)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.referencia"  :rules="rulesReferencia" label="Referencia"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarReferencia(editedItem.referencia)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.costo"  :rules="rulesNum" label="Costo"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCosto(editedItem.costo)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.precio"  :rules="rulesNum" label="Precio"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarPrecio(editedItem.precio)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantDisponibles"  :rules="rulesNum" label="Disponibles"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDisponibles(editedItem.cantDisponibles)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantSeparadas"  :rules="rulesNum" label="Separadas"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarAlmacenadas(editedItem.cantSeparadas)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantVendieron"  :rules="rulesNum" label="Vendieron"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarVendieron(editedItem.cantVendieron)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantCompradas"  :rules="rulesNum" label="Compradas"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCompradas(editedItem.cantCompradas)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                                    <v-row>
                                        <v-text-field  v-model="editedItem.cantSalieron"  :rules="rulesNum" label="Salieron"   ></v-text-field>
                                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarSalieron(editedItem.cantSalieron)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                    </v-row>
                            
                                    <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                                </v-form >
                            </v-card-text>    
                        </v-card>
                    </v-dialog>
                </template>

                <!-- VISTA CON EL ARTICULO A DETALLE -->
                <template v-if="muestra==2">
                    <div>
                        <v-container fluid>
                            <v-row> 
                                <v-btn icon style="margin-left:50px;margin-top:50px;" color="#AF7AC5"  @click="cambioPage(1,false)"  class="mb-4" >
                                    <v-icon size="50" >mdi-arrow-left-bold-circle-outline</v-icon>
                                </v-btn>
                            </v-row>
                            <v-row> 
                                <v-col>
                                    <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8; width:100%" >
                                        <div >
                                            <v-layout justify-left>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Categoria:</label>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.articulosDetallesCategoria}}</label>
                                            </v-layout>
                                        </div>
                                        <div >
                                            <v-layout justify-left>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Marca:</label>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.articulosDetallesMarca}}</label>
                                            </v-layout>
                                        </div>
                                        <div>
                                            <v-layout justify-left  >
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Referencia:</label>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.articuloDetallesReferencia}}</label>
                                            </v-layout>
                                        </div>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8; width:100%" >
                                        <div>
                                            <v-layout justify-left  >
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Precio unidad:</label>
                                            <div style="width:150px"><v-text-field v-model="articulosDetallesPrecio" ></v-text-field></div>
                                            <v-btn class="botones" style="margin-top:10px" icon color="#72128E" @click="actualizarPrecio(articulosDetallesPrecio)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                            </v-layout>
                                        </div>
                                        <div>
                                            <v-layout justify-left  >
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Costo unidad:</label>
                                            <div style="width:150px"><v-text-field v-model="articulosDetallesCosto" ></v-text-field></div>
                                            <v-btn class="botones" style="margin-top:10px" icon color="#72128E" @click="actualizarCosto(articulosDetallesCosto)"><v-icon>mdi-reload</v-icon>  </v-btn>
                                            </v-layout>
                                        </div>
                                        <div>
                                            <v-layout justify-left  >
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">Rentabilidad unidad:</label>
                                            <label  class="col-sm-4 col-form-label" style="text-align:left">$ {{articulosDetallesRentabilidad}} %</label>
                                            </v-layout>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <table class="table1">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            
                                            <th scope="col" >Unidades</th>
                                            <th scope="col" >Total Costo</th>
                                            <th scope="col" >Total Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Disponibles</th>
                                            <td>
                                                <input  type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetallesDisponible"  >
                                                <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(articulosDetallesDisponible)">
                                                    <v-icon>mdi-reload</v-icon>  
                                                </v-btn>
                                            </td>
                                            <td>
                                                {{articulosDetallesDisponible*articulosDetallesCosto}}
                                            </td>
                                            <td>
                                                {{articulosDetallesDisponible*articulosDetallesPrecio}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Separadas</th>
                                            <td>
                                                <input  type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetallesSeparadas"  >
                                                <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(articulosDetallesSeparadas)">
                                                    <v-icon>mdi-reload</v-icon>  
                                                </v-btn>
                                            </td>
                                            <td>
                                                {{articulosDetallesSeparadas*articulosDetallesCosto}}
                                            </td>
                                            <td>
                                                {{articulosDetallesSeparadas*articulosDetallesPrecio}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vendieron</th>
                                            <td>
                                                <input  type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetallesVendidas"  >
                                                <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(articulosDetallesVendidas)">
                                                    <v-icon>mdi-reload</v-icon>  
                                                </v-btn>
                                            </td>
                                            <td>
                                                {{articulosDetallesVendidas*articulosDetallesCosto}}
                                            </td>
                                            <td>
                                                {{articulosDetallesVendidas*articulosDetallesPrecio}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Compradas</th>
                                            <td>
                                                <input  type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetallesCompradas"  >
                                                <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(articulosDetallesCompradas)">
                                                    <v-icon>mdi-reload</v-icon>  
                                                </v-btn>
                                            </td>
                                            <td>
                                                {{articulosDetallesCompradas*articulosDetallesCosto}}
                                            </td>
                                            <td>
                                                {{articulosDetallesCompradas*articulosDetallesPrecio}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Salieron</th>
                                            <td>
                                                <input  type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetallesSalieron"  >
                                                <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(articulosDetallesSalieron)">
                                                    <v-icon>mdi-reload</v-icon>  
                                                </v-btn>
                                            </td>
                                            <td>
                                                {{articulosDetallesSalieron*articulosDetallesCosto}}
                                            </td>
                                            <td>
                                                {{articulosDetallesSalieron*articulosDetallesPrecio}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-row>
                        </v-container>
                    </div>
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
            muestra:1,    //cambiar de vista
            search: '',   //buscar dentro de la tabla
            dialog: false, //cuadro para almacenar
            dialog2: false, //cuadro para editar
            
            categoriaFiltrada:'', //filtros 
            marcaFiltrada:'',     //filtros
            categoriasFiltro:[],  //filtros
            marcasFiltro:[],      //filtros

            categorias:[],//lista desplegable
            marcas:[],//lista desplegable
            
            articulos: [],//datos de la tabla
            columnas: [
                { text: 'Categoria', value: 'categoria.nombre', class:'purple darken-3 white--text' },
                { text: 'Marca', value: 'marca.nombre', class:'purple darken-3 white--text' },
                { text: 'Referencia', value: 'referencia', class:'purple darken-3 white--text' },
                { text: 'disponibles', value: 'cantDisponibles', class:'purple darken-3 white--text' },  
                { text: 'Costo', value: 'costo', class:'purple darken-3 white--text' },
                { text: 'Precio', value: 'precio', class:'purple darken-3 white--text' },
                { text: 'Total costo', value: 'totalCosto', class:'purple darken-3 white--text' },
                { text: 'Total precio', value: 'totalPrecio', class:'purple darken-3 white--text' },
                { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
                { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'150px',sortable: false }
            ],
            rulesCategoria: [value=>!!value||'Requerido'],
            rulesMarca: [value=>!!value||'Requerido'],
            rulesReferencia: [
                value => !!value || 'Requiredo',
                value => (value && value.length <= 50) || 'Max 50 caracteres',
            ],
            rulesNum: [ 
                value=>!!value||'Requerido',
                value=>value>=0 || 'Numero negativo'
            ],

            //almacena el articulo traido por id
            articulosDetallesPrecio: 0, 
            articulosDetallesCosto: 0, 
            articulosDetallesDisponible: 0, 
            articulosDetallesSeparadas: 0, 
            articulosDetallesCompradas: 0, 
            articulosDetallesVendidas: 0, 
            articulosDetallesSalieron:0,
            articulosDetallesCategoria:'',
            articulosDetallesMarca:'',
            articuloDetallesReferencia:'',

            editedItem: {
                categoria:'', marca:'', referencia:'',
                precio:'',costo:'',estado:'' ,
                cantDisponibles:'',cantSeparadas:'',
                cantVendieron:'',cantCompradas:'',cantSalieron:''
            },
        }),//data

        created(){
            this.checkToken();
            this.traerCategorias();
            this.traerMarcas();
        },//created

        methods: {

            //validar que la ruta tenga token si no redireccionar a login
            checkToken(){
                if(!this.$store.state.token && this.$router.currentRoute.name!=="/"){
                this.$router.push('/');
                }
            },//checkToken

            //mensaje de error
            msjError:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    timer: 2000,
                    backdrop: 'rgba(55,55,55,0.8)'
                })
            },//msjError

            //mensaje de exito
            msjExisto:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: tata,
                    showConfirmButton: false,
                    timer: 2000,
                    backdrop: 'rgba(55,55,55,0.8)'
                })
            },//msjExisto

            //cambiar vista
            cambioPage(num,id){
                if(num==1){
                    this.muestra=1
                    this.borrarArticuloDetalle();
                }else{
                    this.muestra=2
                    this.articulos=[];
                    this.traerArticulo(id);
                }
            },//cambioPage

            //traer las categorias activas para filtro y agregar
            traerCategorias(){
                let me = this;
                let categoriasArray=[];
                let header = {headers:{"token":this.$store.state.token}};
                axios.get("categoria/activas",header)
                    .then(response=>{
                        categoriasArray = response.data.categoria;
                        if(categoriasArray.length>0){
                            categoriasArray.map(function(x){
                                me.categoriasFiltro.push({text: x.nombre, value: x._id});
                                me.categorias.push({text: x.nombre, value: x._id});
                            })
                        }else{
                            this.msjExisto("No hay categorias activas")
                        }
                        me.categoriasFiltro.unshift("")
                    })
                    .catch(function (error) {
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores = error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    });
            },//traerCategorias

            //traer las marcas activas para filtro y agregar
            traerMarcas(){
                let me = this;
                let marcasArray=[];
                let header = {headers:{"token":this.$store.state.token}};
                axios.get("marca/activas",header)
                    .then(response=>{
                        marcasArray = response.data.marca;
                        if(marcasArray.length>0){
                            marcasArray.map(function(x){
                                me.marcasFiltro.push({text: x.nombre, value: x._id});
                                me.marcas.push({text: x.nombre, value: x._id});
                            })
                        }else{
                            this.msjExisto("No hay marcas activas")
                        }
                        me.marcasFiltro.unshift("")
                    })
                    .catch(function (error) {
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores = error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    });
            },//traerMarcas

            //traer articulos por marca y/o categoria o todos si esta vacia la peticion
            filtarCateAndMarca(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.post(`articulo/categoriaAndMarca`,{categoria:this.categoriaFiltrada,marca:this.marcaFiltrada}, header)
                        .then((response)=>{
                            this.articulos = response.data.articulo;
                            this.categoriaFiltrada='';
                            this.marcaFiltrada='';
                            if(this.articulos.length==0){
                                this.msjExisto('No hay articulos con esos caracteres')
                            }
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msgErrores = error.response.data.errors[0].msg;
                                this.msjError(msgErrores);
                            }else{
                                let msgErrores = error.response.data.msg;
                                this.msjError(msgErrores);
                            }
                        });
            },//filtarCateAndMarca

            //traer el articulo par id
            traerArticulo(id){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get(`/articulo/articulo/${id}`,header)
                    .then(response =>{
                        this.limpiarArticulo(response.data.articulo)
                    })
                    .catch((error) =>{
                        if(!error.response.data.msg){
                            let errores = error.response.data.errors[0].msg;
                            this.msjError(errores);
                        }else{
                            let errores =error.response.data.msg;
                            this.msjError(errores);
                        }
                    })
            },//traerArticulo

            limpiarArticulo(articulo){
                this.id=articulo._id;
                this.articulosDetallesPrecio= articulo.precio;
                this.articulosDetallesCosto= articulo.costo;
                this.articulosDetallesDisponible= articulo.cantDisponibles;
                this.articulosDetallesSeparadas= articulo.cantSeparadas;
                this.articulosDetallesCompradas= articulo.cantCompradas;
                this.articulosDetallesVendidas= articulo.cantVendieron;
                this.articulosDetallesSalieron= articulo.cantSalieron;
                this.articulosDetallesCategoria= articulo.categoria.nombre;
                this.articulosDetallesMarca= articulo.marca.nombre;
                this.articuloDetallesReferencia= articulo.referencia;
            },//limpiarArticulo

            //limpiar datos para ver un articulo a detalle
            borrarArticuloDetalle(){
                this.id="";
                this.articulosDetallesPrecio=0;
                this.articulosDetallesCosto=0;
                this.articulosDetallesDisponible=0;
                this.articulosDetallesSeparadas=0;
                this.articulosDetallesCompradas=0;
                this.articulosDetallesVendidas=0;
                this.articulosDetallesSalieron=0;
                this.articulosDetallesCategoria="";
                this.articulosDetallesMarca="";
                this.articuloDetallesReferencia="";
            },//borrarArticuloDetalle

            //limpiar formulario
            reset(){
                this.dialog=true;
                this.editedItem.categoria='';
                this.editedItem.marca='';
                this.editedItem.referencia='';
                this.editedItem.precio='';
                this.editedItem.costo='';
                this.editedItem.cantDisponibles='';
                this.editedItem.cantSeparadas='';
                this.editedItem.cantVendieron='';
                this.editedItem.cantCompradas='';
                this.editedItem.cantSalieron='';
            },//reset

            //abrir dialogo y alistar variables para enviar 
            editar(item){
                this.id= item._id;
                this.editedItem.categoria=item.categoria;
                this.editedItem.marca=item.marca;
                this.editedItem.referencia=item.referencia;
                this.editedItem.costo=item.costo;
                this.editedItem.precio=item.precio;
                this.editedItem.cantDisponibles=item.cantDisponibles;
                this.editedItem.cantSeparadas=item.cantSeparadas;
                this.editedItem.cantCompradas=item.cantCompradas;
                this.editedItem.cantSalieron=item.cantSalieron;
                this.editedItem.cantVendieron=item.cantVendieron;
                this.dialog2=true;
            },//editar

            //almacenar en la bd
            guardar(){
                let header = {headers:{"token" : this.$store.state.token}};
                const me = this;
                if(
                    this.editedItem.categoria == '' || 
                    this.editedItem.marca=='' || 
                    this.editedItem.referencia=='' ||
                    this.editedItem.precio=='' ||
                    this.editedItem.costo=='' ||
                    this.editedItem.cantDisponibles==''
                ){
                    return this.msjError('faltan campos');
                }

                if(this.editedItem.referencia.trim().length>50){
                    return this.msjError('Referencia superior a 50 carácteres');
                }

                axios.post('articulo',{
                                        categoria:this.editedItem.categoria,
                                        marca:this.editedItem.marca,
                                        referencia:this.editedItem.referencia,
                                        precio:this.editedItem.precio,
                                        costo:this.editedItem.costo,
                                        cantDisponibles:this.editedItem.cantDisponibles
                                    },header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
                        me.reset();
                        this.dialog=false
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
            },//guardar

            //activar o desactivar ariticulos
            activarDesactivarItem (accion , item) {
                let id = item._id;
                let categoria = item.categoria._id;
                let marca = item.marca._id;

                if(accion == 2){

                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`articulo/desactivar/${id}`,{}, header)
                        .then((response)=>{
                            this.msjExitoso(response.data.msg);
                            this.despuesActualiar(categoria,marca);
                        })
                        .catch((error)=>{
                            if(!error.response.data.msg){
                                let msjErrores = error.response.data.errors[0].msg;
                                this.msjError(msjErrores);
                            }else{
                                let msjErrores = error.response.data.msg;
                                this.msjError(msjErrores);
                            }
                        });
                }else if (accion==1){

                    let header = {headers:{"token" : this.$store.state.token}};
                    axios.put(`articulo/activar/${id}`,  {},header)
                        .then((response)=>{
                            this.msjExitoso(response.data.msg);
                            this.despuesActualiar(categoria,marca);
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

            //traer los articulos por marca y categoria de acuerdo al que se acaba de actualizar
            despuesActualiar(categoria,marca){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.post(`articulo/categoriaAndMarca`,{categoria:categoria,marca:marca}, header)
                    .then((response)=>{
                        this.articulos = response.data.articulo;
                        if(this.articulos.length==0){
                            this.msjExisto('No hay articulos con esos caracteres')
                        }
                    })
                    .catch((error)=>{
                        if(!error.response.data.msg){
                            let errores = error.response.data.errors[0].msg;
                            this.msjError(errores);
                        }else{
                            let errores =error.response.data.msg;
                            this.msjError(errores);
                        }
                    });
            },//despuesActualiar

            //actualizar categoria
            actualizarCategoria(categoria){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCategoria/${id}`,{categoria}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarCategoria

            //actualizar marca
            actualizarMarca(marca){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarMarca/${id}`,{marca}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarMarca

            actualizarReferencia(referencia){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarReferencia/${id}`,{referencia}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
                    })
                    .catch((error)=>{
                        console.log(error);
                        if(!error.response.data.msg){
                            let msgErrores = error.response.data.errors[0].msg;
                            this.msjError(msgErrores);
                        }else{
                            let msgErrores =error.response.data.msg;
                            this.msjError(msgErrores);
                        }
                    });
            },//actualizarNombre

            //actulizar costo
            actualizarCosto(costo){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCosto/${id}`,{costo}, header)
                    .then((response)=>{
                        this.msgError=response.data.msg;
                        this.msjExisto(this.msgError);
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
            },//actualizarCosto

            //actualizar precio
            actualizarPrecio(precio){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarPrecio/${id}`,{precio}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarPrecio

            //actualizar disponible
            actualizarDisponibles(cantDisponibles){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantDisponible/${id}`,{cantDisponibles}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarDisponibles

            //actualizar almacenadas
            actualizarAlmacenadas(cantSeparadas){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantSeparadas/${id}`,{cantSeparadas}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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

            //actualizar vendidas
            actualizarVendieron(cantVendieron){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantVendieron/${id}`,{cantVendieron}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarVendieron

            //actualizar compraron
            actualizarCompradas(cantCompradas){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantCompradas/${id}`,{cantCompradas}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarCompradas

            //actualizar compraron
            actualizarSalieron(cantSalieron){
                let id=this.id;
                let header = {headers:{"token" : this.$store.state.token}};
                axios.put(`articulo/actualizarCantSalieron/${id}`,{cantSalieron}, header)
                    .then((response)=>{
                        this.msjExisto(response.data.msg);
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
            },//actualizarSalieron
            
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
                            cantDisponibles:x.cantDisponibles,
                            cantVendieron:x.cantVendieron,
                            cantSeparadas:x.cantSeparadas,
                            cantSalieron:x.cantSalieron,
                            cantCompradas:x.cantCompradas
                        }
                    );
                })

                let data = XLSX.utils.json_to_sheet(articulosExport)
                const workbook = XLSX.utils.book_new()
                const filename = 'articulos'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },//exportarExcel
        },//methots

        computed:{
            articulosDetallesRentabilidad(){
                let rendimiento = ((this.articulosDetallesPrecio/this.articulosDetallesCosto)-1)*100
                rendimiento = rendimiento.toFixed(2);
                return rendimiento
            }//articulosDetallesRentabilidad
        }//computed

    }//export default
</script>

<style scoped>
    .llenarTexto{
        font-family: 'calibri';
        color: #72128E;
        font-size: 20px;
        border: 3px solid #72128E;
        border-radius: 5px;
        height:35px;
        width:100px;
        margin-top:12px
    }

    .table1{
        font-family: "Trebuchet MS", sans-serif;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.4em;
        font-style: normal;
        border-collapse:separate;
        width:100%
    }

    .table1 thead th{
        padding:15px;
        color:#fff;
        text-shadow:1px 1px 1px #A068B8 ;
        border:1px solid #A068B8;
        border-bottom:3px solid #A068B8;
        background-color:#72128E;
        background:-webkit-gradient(
            linear,
            left bottom,
            left top,
            color-stop(0.02, rgb(123,192,67)),
            color-stop(0.51, rgb(139,198,66)),
            color-stop(0.87, rgb(158,217,41))
            );
        background: -moz-linear-gradient(
            center bottom,
            rgb(123,192,67) 2%,
            rgb(139,198,66) 51%,
            rgb(158,217,41) 87%
            );
        -webkit-border-top-left-radius:5px;
        -webkit-border-top-right-radius:5px;
        -moz-border-radius:5px 5px 0px 0px;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        
    }

    .table1 thead th:empty{
        background:transparent;
        border:none;
    }

    .table1 tbody th{
        color:#000000;
        background-color:#FFFFFF;
        border:1px solid #A068B8;
        border-right:3px solid #A068B8;
        padding:0px 10px;
        background:-webkit-gradient(
            linear,
            left bottom,
            right top,
            color-stop(0.02, rgb(158,217,41)),
            color-stop(0.51, rgb(139,198,66)),
            color-stop(0.87, rgb(123,192,67))
            );
        background: -moz-linear-gradient(
            left bottom,
            rgb(158,217,41) 2%,
            rgb(139,198,66) 51%,
            rgb(123,192,67) 87%
            );
        -moz-border-radius:5px 0px 0px 5px;
        -webkit-border-top-left-radius:5px;
        -webkit-border-bottom-left-radius:5px;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
    }
    .table1 tbody td{
    
        padding:10px;
        text-align:center;
        background-color:#FFFFFF;
        border: 2px solid #E7EFE0;
        -moz-border-radius:2px;
        -webkit-border-radius:2px;
        border-radius:2px;
        color:#000000;
        text-shadow:1px 1px 1px #fff;
    }
</style>