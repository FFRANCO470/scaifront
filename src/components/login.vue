<template>
  <v-app>
    <v-main>

      <v-form  width="500" class="form-registro mx-auto mt-15">

        <v-card-title class="titulo">Iniciar Sesion</v-card-title>

        <v-card-text>
          <v-text-field v-model="nombre" id="caja"   class="form-input" label="Usuario" color="#72128E"  required  :rules="nameRules" prepend-icon="mdi-account-circle"/>

          <v-text-field v-model="pass" id="caja" class="form-input"  label="Contraseña" color="#72128E" required  :rules="passRules" :type=" mostrarContrasena ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="mostrarContrasena ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarContrasena =! mostrarContrasena"
             v-on:keyup.enter="login()"
          />

        </v-card-text>

        <v-card-actions >
          <input v-on:keyup.enter="login()" class="boton" type="button" @click="login()" value="Iniciar">                   
        </v-card-actions>

      </v-form >
    </v-main>

    <div class="burbujas">
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
      <div class="burbuja"></div>
    </div>

  </v-app>  
</template>

<script>
  import axios from "axios"
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        mostrarContrasena:false,
        nombre:"",
        pass:"",
        msgError:'',
        nameRules: [
          v => !!v || 'Email requerido',
          v => v.length <= 50 || 'Email supero los 50 caracteres',
        ],
        passRules: [
          v => !!v || 'Contraseña requerida',
          v => v.length <= 10 || 'Contraseña supera los 10 caracteres',
        ],
            
      }//return
    },//data

    methods:{
      msjAlerta:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          background: 'black',
          timer: 3000})
      },

      login(){
        if (!this.nombre || !this.pass) {
          this.msgError = 'Usuario / contraseña  oblicagorios';
          this.msjAlerta(this.msgError);
        }else{        
          axios.post("usuario/login",{nombreUser:this.nombre, password:this.pass})
            .then(response =>{
              this.$store.dispatch("setToken", response.data.token);
              this.$store.dispatch("setRol", response.data.rol);
              this.$store.dispatch("setId", response.data.id);
              this.$store.dispatch("setNameUser", response.data.nombreUser);
              this.$router.push("/home");
            }).catch((error)=>{   
                if(!error.response.data.msg){
                  this.msgError = error.response.data.errors[0].msg
                  this.msjAlerta(this.msgError);
                }else{
                  this.msgError = error.response.data.msg
                  this.msjAlerta(this.msgError);
                }
            })
        }
      },
       
    }//methods
}
</script>

<style scoped>

.v-application {
  background: linear-gradient(82deg, rgb(229,129,251) 0%, rgb(189,10,229) 25%, rgb(14,13,13) 100%) ;
}


.form-registro{
    z-index:100;
    position:relative;
    
    margin: auto;
    width: 400px;
    background: #ffff;
    /* pardding margen interno */
    padding: 30px;
    border-radius: 4px;
    font-family: 'calibri';
    color: #E2E2E2;
    box-shadow: 7px 13px 37px #52515198;
}
.titulo{
  color:#72128E
}
.form-input .v-label{
    color: #72128E;
    font-size: 18px;
}
.form-input .placeholder{
    color: #72128E;
    font-size: 18px;
}
#caja{
  color:#72128E
}
.boton{
    width: 100%;
    background: #72128E;
    padding: 10px;
    margin: 16px 0px;
    border-radius: 12px;
    color: #FFFFFF;
}


.burbuja{
  
  border-radius:50%;
  background:#fff;
  opacity:.3;
  position:absolute;
  bottom:-10;
  
  animation:burbujas 3s linear infinite;

}

.burbuja:nth-child(1){
  width:80px;
  height:80px;
  left:5%;
  animation-duration:3s;
  animation-delay:0;
}

.burbuja:nth-child(2){
  width:100px;
  height:100px;
  left:35%;
  animation-duration:3s;
  animation-delay:1s;
}
.burbuja:nth-child(3){
  width:10px;
  height:10px;
  left:50%;
  animation-duration:4s;
  animation-delay:2s;
}
.burbuja:nth-child(4){
  width:40px;
  height:40px;
  left:80%;
  animation-duration:3s;
  animation-delay:2s;
}
.burbuja:nth-child(5){
  width:89px;
  height:89px;
  left:90%;
  animation-duration:3s;
  animation-delay:3s;
}
.burbuja:nth-child(6){
  width:35px;
  height:35px;
  left:34%;
  animation-duration:3s;
  animation-delay:3s;
}
.burbuja:nth-child(7){
  width:100px;
  height:100px;
  left:95%;
  animation-duration:3s;
  animation-delay:5s;
}
.burbuja:nth-child(8){
  width:66px;
  height:66px;
  left:65%;
  animation-duration:3s;
  animation-delay:5s;
}
.burbuja:nth-child(9){
  width:78px;
  height:78px;
  left:35%;
  animation-duration:3s;
  animation-delay:2s;
}
.burbuja:nth-child(10){
  width:98px;
  height:98px;
  left:5%;
  animation-duration:3s;
  animation-delay:1s;
}

@keyframes burbujas{
  0%{
    bottom:0;
    opacity:0; 
  }
  30%{
    transform:translateX(30px);
  }
  50%{
    opacity:.4;
  }
  100%{
    bottom:100vh;
    opacity:0;
  }
}
</style>