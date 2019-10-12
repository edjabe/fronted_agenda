<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/7.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-item><b>{{usuario.nombres + ' ' + usuario.apellidos}}</b></b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-power-off" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  computed: {
        tipo_adiciones() {
            return  !this.$store.getters['parametrizacion/loading']? this.$store.getters['parametrizacion/datos'] : []
        },
        progress_text () {
            return this.$store.getters['adicion/progress_text'];
        },
        usuario () {
            return this.$store.getters['login/user']
        },
    },
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
        logout () {
            this.$store.dispatch('login/logout', this.user)
            .then((data) => {
                this.error = null;
                this.$router.push('/pages/login')
            }).catch(error => {
                error.status == 401? this.error = error.data.error : console.log(error);
            })
        }
    }
}
</script>
