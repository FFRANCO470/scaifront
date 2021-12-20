<template >
    <div>
        <v-container fluid>

        
            
            <div class="ticket">

                <img
                    src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                    alt="Logotipo">
                <p class="centrado">TICKET DE VENTA<br>{{informacion}}<br>17/10/2017 02:22 a.m.</p>

                    
                <table>
                    <thead>
                        <tr>
                            <th class="cantidad">CANT</th>
                            <th class="producto">PRODUCTO</th>
                            <th  class="precio">>$$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="cantidad">2.00</td>
                            <td class="producto">KINDER DELICE</td>
                            <td  class="precio">>$10.00</td>
                        </tr>
                        <tr>
                            <td class="cantidad"></td>
                            <td class="producto">TOTAL</td>
                            <td  class="precio">>$28.50</td>
                        </tr>
                    </tbody>
                </table>

                <p class="centrado">¡GRACIAS POR SU COMPRA!<br>parzibyte.me</p>

                
                <v-btn class="oculto-impresion"  style="margin-top: 20px"  @click="crearFactura()">
                    <v-icon >mdi-clipboard-account-outline</v-icon> imprimir
                </v-btn>
                
                <v-btn class="oculto-impresion"  style="margin-top: 20px"   @click="volver()">
                    <v-icon >mdi-clipboard-account-outline</v-icon> volver
                </v-btn>
            </div>
                

            
        </v-container>
    </div>
</template>

<script>
    import {eventBus} from '../main'
    export default {
        data:()=>({
          
            informacion:""
        }),//data
        created(){
            
            eventBus.$on("pasar",(data)=>{
                return this.informacion = data
            })

           
        },
        methods:{

            crearFactura(){
                console.log("la info",this.informacion);
                window.print();
                
            },
            volver(){
                this.$router.push('/facturacion');
            },


           
        },//methods
    }//export default
</script>
<style scoped>
    .ticket{
        font-size: 12px;
        font-family: 'Times New Roman';
    }
    td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}

.ticket {
    width: 155px;
    max-width: 155px;
}

img {
    max-width: inherit;
    width: inherit;
}

@media print {
    .oculto-impresion,
    .oculto-impresion * {
        display: none !important;
    }
}
</style>