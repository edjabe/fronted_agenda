<template>
      <TheFooter>
        <div>
          <!--footer-->
          <a href="https://coreui.io">CoreUI</a>
          <span class="ml-1">&copy; : Plantilla Vue.js usada en la prueba</span>
        </div>
        <div class="ml-auto">
          <span class="mr-1">Desarrollado por</span>
          <a href="https://github.com/edjabe">Jair Beltran</a>
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
}
</script>
