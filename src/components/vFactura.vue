<template >
    <div>
        <v-container fluid>
            <v-row>
                <div style="color: #72128E;  font-size:32px;  text-align:center; margin-top:50px;margin-left:30px">
                    <label>Factura</label>
                </div>
                <v-spacer></v-spacer>
                <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  style="margin-right:30px; margin-left:20px;  margin-top:50px"   @click="imprimir()">
                    <v-icon size="25">mdi-printer</v-icon> Imprimir
                </v-btn>
                <div style="margin-top:50px;margin-right:30px">
                    <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  @click="reset()"  > <v-icon size="20">mdi-plus</v-icon> Nuevo </v-btn>
                </div>
            </v-row>
            
            <v-row>
            
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                    <v-radio-group   v-model="buscar" style="margin-top:1px"  >
                        <v-radio style="margin-left:15px; " label="Num. Factura" color="#72128E"  value="factura"></v-radio> 
                        <v-radio style="margin-left:15px; " label="Cliente" color="#72128E"   value="cliente"></v-radio>
                    </v-radio-group>
                </div>
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:30px;margin-left:30px">
                    <v-text-field solo style="width:350px; margin-left:0px;"  v-model="buscarDato" label="# Factura o Cedula"></v-text-field>
                </div>
                <div style="color: #72128E;  font-size:20px;  text-align:center; margin-top:20px;margin-left:30px">
                    <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="traerFactura()"><v-icon size="40">mdi-magnify</v-icon> </v-btn>
                </div>
            </v-row>
            

            <v-card style="justify-content: center; margin: 0 auto; margin-top:50px; width:97%; box-shadow: 0 0 20px #A068B8;padding:15px ">
                <v-row>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">N. Factura</label>
                            <label  class="col-sm-5 col-form-label">{{numFactura}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Fecha:</label>
                            <label  class="col-sm-5 col-form-label">{{fecha}}</label>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Hora:</label>
                            <label  class="col-sm-5 col-form-label">{{hora}}</label>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Vendedor:</label>
                            <label  class="col-sm-5 col-form-label">{{usuario}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Tipo de documento:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.tipoDocumento}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Numero de documento:</label>
                            <label  class="col-sm-5 col-form-label">{{persona}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Numbre:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.nombre}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Telefono:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.telefono}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Direccion:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.direccion}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Ciudad:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.ciudad}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Correo:</label>
                            <label  class="col-sm-5 col-form-label">{{cliente.email}}</label>
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-5 col-form-label">Observaciones:</label>
                            <label  class="col-sm-5 col-form-label">{{comentario}}</label>
                        </div>

                        <template v-if="tipoFactura=='debito' || tipoFactura=='abonoabono'">
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Saldo anterior:</label>
                                <label  class="col-sm-5 col-form-label">{{saldoAnterior}}</label>
                            </div>
                        </template>
                    </v-col>
                </v-row>
                <!--<v-divider  class="mx-6" inset-margin="100px"  ></v-divider>-->
                <hr style="margin-top:10px;margin-bottom:10px">
                
                <template v-if="tipoFactura!='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{efectivo}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{nequi}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{tarjeta}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Sistecredito:</label>
                                <label  class="col-sm-5 col-form-label">{{credito}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                <template v-if="tipoFactura=='debito'">
                    <v-row>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Efectivo:</label>
                                <label  class="col-sm-5 col-form-label">{{efectivo}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Nequi:</label>
                                <label  class="col-sm-5 col-form-label">{{nequi}}</label>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="form-group row texto">
                                <label  class="col-sm-5 col-form-label">Tarjeta:</label>
                                <label  class="col-sm-5 col-form-label">{{tarjeta}}</label>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                
                <hr style="margin-top:10px;margin-bottom:10px">

                

                <template v-if="tipoFactura=='venta'">
                    <div class="form-group row texto">
                        <label  class="col-sm-5 col-form-label">Descuento:</label>
                        <label  class="col-sm-5 col-form-label">{{descuento}}</label>
                    </div>
                </template>

                <template v-if="tipoFactura=='abonoabono'">
                    <v-data-table
                        style="margin-top:10px;"
                        :headers="articulosAbonosTitle"
                        :items="articulosAbono"
                        class="elevation-1"
                    ></v-data-table>
                </template>

                <template v-if="tipoFactura=='venta'">
                    <v-data-table
                        style="margin-top:10px;"
                        :headers="articulosVentaTitle"
                        :items="articulosVenta"
                        class="elevation-1"
                    ></v-data-table>
                </template>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import jsPDF from 'jspdf'

    export default {
        data:()=>({
            buscar:'',
            buscarDato:'',
            cliente:{},
            tipoFactura:null,
            subTipoFactura:null,
            numFactura:null,
            fecha:null,
            hora:null,
            usuario:null,
            persona:null,
            efectivo:null,
            nequi:null,
            tarjeta:null,
            credito:null,
            descuento:null,
            totalVendido:null,
            comentario:'',
            saldoAnterior:null,
            articulosAbonosTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
            ],
            articulosAbono: [],
            articulosVentaTitle: [
                {text: 'Categoria',value: 'categoria',class:'black--text',sortable: false},
                { text: 'Marca', value: 'marca',class:'black--text',sortable: false },
                { text: 'Referencia', value: 'referencia',class:'black--text',sortable: false },
                { text: 'Unidades', value: 'cantidad' ,class:'black--text',sortable: false},
                { text: 'Precio', value: 'precio' ,class:'black--text',sortable: false},
                { text: 'Total', value: 'totalPrecio' ,class:'black--text',sortable: false},
            ],
            articulosVenta: [],
            fechaImpresa:null,

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

            //msg de error
            msjErrores:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 3000})
            },

            //msg de exito
            msjExito:function(tata){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: tata,
                    showConfirmButton: false,
                    backdrop: 'rgba(55,55,55,0.8)',
                    timer: 3000})
            },

            //redireccionar para crear compra
            reset(){
                this.$router.push('/facturacion');
            },//reset

            borrar(){
                this.tipoFactura=null;
                this.numFactura=null;
                this.fecha=null;
                this.hora=null;
                this.usuario=null;
                this.persona=null;
                this.efectivo=null;
                this.nequi=null;
                this.tarjeta=null;
                this.credito=null;
                this.descuento=null;
            },

            traerFactura(){
                this.borrar();
                let header = {headers:{"token" : this.$store.state.token}};

                axios.get(`venta/ventaByCriterio?buscar=${this.buscar}&buscarDato=${this.buscarDato}`,header,)
                    .then(response=>{
                        console.log(response);
                        if(!response.data.venta){
                            return this.msjExito("No hay factura coincidente con los datos")
                        }
                        if(response.data.venta.length==0){
                            return this.msjExito("No hay factura coincidente con los datos")
                        }
                        this.limpiarDatosFactura(response.data.venta);
                        // venta=response.data.venta
                    })
                    .catch(error=>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                            this.msgError = error.response.data.errors[0].msg;
                            this.msjErrores(this.msgError);
                        }else{
              
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },

            limpiarDatosFactura(factura){

                if(factura.length>0){
                    factura = factura[0];
                }
                if(factura.tipoFactura!="venta"){
                    this.saldoAnterior = factura.saldoAnterior;
                }else{
                    this.subTipoFactura = factura.subTipoFactura;
                }

                this.tipoFactura = factura.tipoFactura;
                let date = new Date(factura.createdAt);
                this.hora = (date.getHours()+5) + ":" + date.getMinutes();
                this.fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                this.fechaImpresa = date;
                this.numFactura = factura.numFactura;
                this.usuario = factura.usuario.nombreUser;
                this.persona = factura.persona;
                this.efectivo = factura.efectivo;    
                this.nequi = factura.nequi;    
                this.tarjeta = factura.tarjeta;
                this.comentario = factura.comentario;

                this.traerCliente(this.persona);

                if(factura.tipoFactura=="abonoabono"){
                    this.credito = factura.credito;    
                    let articulos = factura.articulos;
                    let articulosLimpios=[];

                    if(articulos.length>0){
                        articulos.map(function(x){
                            let codigo = x.sku.split("-")
                            articulosLimpios.push({
                                referencia:codigo[2],
                                categoria:codigo[0],
                                marca : codigo[1],
                                cantidad : x.cantidad,
                            })
                        })
                    }

                    this.articulosAbono=articulosLimpios;

                }else{
                    this.credito = factura.credito;    
                    this.descuento = factura.descuento;  
                    this.totalVendido = factura.totalPrecio;  
                    let articulos = factura.articulos;
                    let articulosLimpios=[];

                    if(articulos.length>0){
                        articulos.map(function(x){
                            let codigo = x.sku.split("-")
                            articulosLimpios.push({
                                referencia:codigo[2],
                                categoria:codigo[0],
                                marca : codigo[1],
                                cantidad : x.cantidad,
                                precio : x.precio,
                                totalPrecio:x.precio*x.cantidad
                            })
                        })
                    }  

                    this.articulosVenta=articulosLimpios;
                }
                
            },//limpiarDatosFactura

            traerCliente(cliente){
                if(cliente!=""){

                    let header = {headers:{"token" : this.$store.state.token}};
                        axios.get(`cliente/buscando?numDocumento=${cliente}`,header,)
                            .then(response=>{
                                console.log(response);
                                if(response.data.persona!=false){
                                    this.cliente=response.data.persona;
                                }else{
                                    this.msjExito("Cliente no registrado en el sistema");
                                }
                            })
                            .catch(error=>{
                                console.log(error.response);
                                if(!error.response.data.msg){
                                    this.msgError = error.response.data.errors[0].msg;
                                    this.msjErrores(this.msgError);
                                }else{
                                    this.msgError =error.response.data.msg;
                                    this.msjErrores(this.msgError);
                                }
                            })
                }
            },//traerCliente

            imprimir(){
               
                var sise = 10
                
                //cliente
                let documento = this.persona.slice(0,13); //17
                let tipoDocumento = this.cliente.tipoDocumento.slice(0,9); //17
                let nombre = this.cliente.nombre.slice(0,16); //17
                let telefono = this.cliente.telefono.slice(0,14); //16
                let direccion = this.cliente.direccion.slice(0,14); //17
                let ciudad = this.cliente.ciudad.slice(0,17); //19

                //fecha
                const d = this.fechaImpresa;
                let dia = d.getDate();
                const monthNames = ["ene", "feb", "mar", "abr", "may", "jun",
                    "jul", "ago", "sep", "oct", "nov", "dic"
                ];
                let mes = monthNames[d.getMonth()]
                let ano = d.getFullYear();
                let hora = d.getHours()+5;
                let min = d.getMinutes();

                let correr = 84;
                var datos = [];
    
                if(this.tipoFactura=="debito"){

                    let totalDebito = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta);
                    datos = [
                        {referencia: " ",cantidad: "1",categoria: "Debito",precio: " ",total:totalDebito.toString()},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:4},
                        {referencia: " ",cantidad: " ",categoria: " ",precio: "Total",total:totalDebito.toString()}
                    ];
                    correr = 120;
                }else if(this.tipoFactura=="abonoabono"){

                    let articulospdf = this.articulosAbono
                    if(articulospdf.length != 0){
                        console.log(articulospdf);
                        articulospdf.map(function(x){
                            datos.push({
                                referencia:x.referencia,
                                categoria:x.categoria,
                                cantidad:x.cantidad,
                                precio:" ",
                                total: " "
                            })
                        })
                    }else{
                        datos.push(
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "},
                            {referencia: " ",cantidad: " ",categoria: " ",precio: " ",total:" "}
                        )
                    }
                    let total = this.saldoAnterior.toString();
                    let abono = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito)
                    let saldo = parseInt(total) - (parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito))
                    datos.push(
                        {referencia: "",cantidad: "",categoria: "",precio: "saldo A.",total:total},
                        {referencia: "",cantidad: "",categoria: "",precio: "abono ",total:abono.toString()},
                        {referencia: "",cantidad: "",categoria: 0,precio: "saldo ",total:saldo.toString()}
                    )
                    correr = correr + 40
                    let tamano = datos.length;
                    correr = correr + ((tamano-5) * 8);
                
                }else{

                    this.articulosVenta.map(function(x){
                        datos.push({
                            referencia: x.referencia,
                            categoria: x.categoria,
                            cantidad: x.cantidad.toString(),
                            precio:x.precio.toString(),
                            total: (x.cantidad * x.precio).toString()
                        })
                    })

                    let total = (this.totalVendido-this.descuento).toString();

                    if(this.subTipoFactura=="venta"){
                        datos.push(
                            {referencia: "",cantidad: "",categoria: "",precio: "subtotal",total:this.totalVendido.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "desc.",total:this.descuento.toString()},
                            {referencia: "",cantidad: "",categoria: 0,precio: "total ",total:total}
                        )
                        correr = correr + 30;
                        let tamano = datos.length;
                        correr = correr + ((tamano-3) * 8);

                    }else{
                        let abono = parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito)
                        let saldo = parseInt(total) - (parseInt(this.efectivo) + parseInt(this.nequi) + parseInt(this.tarjeta) + parseInt(this.credito))
                        datos.push(
                            {referencia: "",cantidad: "",categoria: "",precio: "subtotal",total:this.totalVendido.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "desc.",total:this.descuento.toString()},
                            {referencia: "",cantidad: "",categoria: "",precio: "total ",total:total},
                            {referencia: "",cantidad: "",categoria: "",precio: "abono ",total:abono.toString()},
                            {referencia: "",cantidad: "",categoria: 0,precio: "saldo ",total:saldo.toString()}
                        )
                        correr = correr + 40
                        let tamano = datos.length;
                        correr = correr + ((tamano-5) * 8);
                    }
                }

                let vendedor = this.usuario.slice(0,13)
                let observacion = this.comentario.slice(0,251);

                let cortar = (correr + 61) * 2.9;
                
                var doc = new jsPDF();

                doc.beginFormObject(0, 0, 200, cortar)
                
                doc.setFont('helvetica', 'italic');
                doc.text("The Scala",20,8,{charSpace:0.4,maxWidth:97});
                
                doc.setFontSize(18);
                doc.setFont("helvetica","bold");

                doc.setFontSize(sise);
                doc.text("GINA PAOLA CEPEDA VERGARA", 4, 15,{charSpace:0.2});

                doc.setFontSize(sise);
                doc.text("NIT: 52515303-7",       4, 20,{charSpace:0.2});
                doc.text("REGIMEN SIMPLIFICADO", 4,  25,{charSpace:0.2});
                doc.text("C.C EL PUENTE L.154",  4, 30,{charSpace:0.2});
                doc.text("SAN GIL(SDER)",   4, 35,{charSpace:0.2});
                doc.text("CELULAR : 311 893 8204",    4, 40,{charSpace:0.2});
                doc.text("TELEFONO: 607 724 1748",        4, 45,{charSpace:0.2});
                
                doc.text(`NOMBRE: ${nombre}`,   4, 55 ,{charSpace:0.3});
                doc.text(`TIPO DOCUMENTO: ${tipoDocumento}`,   4, 60 ,{charSpace:0.3});
                doc.text(`DOCUMENTO: ${documento}`,   4, 65 ,{charSpace:0.3});
                doc.text(`TELEFONO: ${telefono}`, 4, 70 ,{charSpace:0.3});
                doc.text(`DIRECCION: ${direccion}`,4, 75 ,{charSpace:0.3});
                doc.text(`CIUDAD: ${ciudad}`,   4, 80 ,{charSpace:0.3});

                doc.line(1,81,68,81)
                doc.text(`Factura Venta  ${this.numFactura}`, 4,85,{charSpace:0.3});
                
                doc.text(`${dia}-${mes}-${ano}    ${hora}:${min}   `,  4,90,{charSpace:0.3});

                var cabeza = [
                    {align:"center",width:22,id:"referencia",name:"referencia",prompt:"Refer"},
                    {align:"center",width:18,id:"categoria",name:"categoria",prompt:"Desc."},
                    {align:"center",width:13,id:"cantidad",name:"cantidad",prompt:"Cant"},
                    {align:"center",width:18,id:"precio",name:"precio",prompt:"Vr Unit"},
                    {align:"center",width:19.5,id:"total",name:"total",prompt:"Vr total"}
                ];
                
                
                doc.table(0, 95, datos, cabeza,{fontName:"Arial",fontSize:"9",autoSize: false,headerBackgroundColor:"#FFFFFF",padding:0.3,});

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(sise);
                
                doc.text(`Vendedor: ${vendedor}`, 15,correr + 5,{charSpace:0.2});

                doc.text("Metodo de pago", 20,correr + 10,{charSpace:0.3});

                var datos2 = []
                if(this.tipoFactura=="debito"){
                    datos2 = [{efectivo: this.efectivo.toString(), tarjeta: this.tarjeta.toString(), nequi:this.nequi.toString(), credito: "0"}];

                }else{
                    datos2 = [{efectivo: this.efectivo.toString(), tarjeta: this.tarjeta.toString(), nequi:this.nequi.toString(), credito: this.credito.toString()}];
                }

                var cabeza2 = [
                    {align:"center",width:22,id:"efectivo",name:"efectivo",prompt:"Efectivo"},
                    {align:"center",width:22,id:"tarjeta",name:"tarjeta",prompt:"Tarjeta"},
                    {align:"center",width:22,id:"nequi",name:"nequi",prompt:"Nequi"},
                    {align:"center",width:25,id:"credito",name:"credito",prompt:"Sistecredito"}
                    
                ];

                doc.table(0, correr + 15, datos2, cabeza2,{fontName:"Arial",fontSize:"9",autoSize: false,headerBackgroundColor:"#FFFFFF",padding:0.3,});

                doc.text("Observaciones", 28,correr + 30,{charSpace:0.3});
                doc.text(`${observacion}`, 4,correr + 35,{maxWidth:"52",charSpace:0.3});
                
                doc.roundedRect(0, 0, 68, correr + 63, 0, 0);
                
                doc.output('dataurlnewwindow');
                
            }//imprimir


        },//methodos

        computed:{
        }//computed
    }//export default
</script>

<style scoped>
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 20px;
        text-align:left;
        margin-top:-10px;
    }
</style>