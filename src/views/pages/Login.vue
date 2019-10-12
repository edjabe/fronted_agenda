<template>
  <div id="fondo" class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @keyup.enter="login">
                  <h1 class="text-center">Central de citas</h1>
                  <!--p> class="text-muted">Sign In to your account</p-->
                  <br><br>
                  <p class="text-danger text-center" v-if="error">Usuario y contraseña incorrectos.</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="user.email" class="form-control" placeholder="Correo" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="user.password" class="form-control" placeholder="Contraseña" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="login" :disabled="$store.getters['loading']" >
                        <b-spinner small  v-if="$store.getters['loading']"/> Ingresar
                      </b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Olvidaste la contraseña?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Registrate</h2>
                  <p>No tienes cuenta con nosotros? Recuerda que si deseas ver la disponibilidad y apartar tu cita, debes crear un cuenta.</p>
                  <b-button variant="primary" class="active mt-3">Registrate ahora!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            error: null
        }
    },
    computed: {
        user () {
            return this.$store.getters['login/user'];
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login/login', this.user)
            .then((data) => {
                this.error = null;
                this.$router.push('/dashboard')
            }).catch(error => {
                error.status == 401? this.error = error.data.error : console.log(error);
            })
        }
    },
}
</script>

<style>
  #fondo {
    background-image: url(../../../public/img/brand/imagen_fondo.jpg);
    background-size: cover;
  }
</style>
