<template>
  <div class="row espacio_top">
    <div class="col-md-12">
        <div class="card">
          <div class="loader" v-if="this.$store.getters['prestacion/loading']"><i class="fa fa-spinner fa-2x fa-spin text-info"></i></div>
            <div class="card-header">
                <div>
                    <b>Agendar cita</b></div>
            </div>
            <div class="card-body">
              <b-form-group label="Sedes" label-for="basicSelectSm" :label-cols="3">
                      <b-form-select
                        id="basicSelectSm"
                        size="sm"
                        :plain="true"
                        :options="sedes"
                        v-model="busqueda.sede_id"
                      ></b-form-select>
              </b-form-group>
              <b-form-group v-if="busqueda.sede_id != null && !this.$store.getters['prestacion/loading']" label="Prestaciones" label-for="basicSelectSm" :label-cols="3">
                      <b-form-select
                        id="basicSelectSm"
                        size="sm"
                        :plain="true"
                        :options="prestaciones"
                        v-model="busqueda.prestacion_id"
                      ></b-form-select>
              </b-form-group>
              <div class="text-center">
                <button class="btn btn-primary btn-sm"  :disabled="busqueda.sede_id == null || busqueda.prestacion_id == null" @click.prevent="consultarDisponibilidad()">Consultar disponibilidad</button>
              </div>
            </div>
        </div>
    </div>

    <div class="col-md-12" v-if="consultar_disponibilidad">
        <div class="card">
          <div class="loader" v-if="this.$store.getters['agenda/loading']"><i class="fa fa-spinner fa-2x fa-spin text-info"></i></div>
            <div class="card-header">
                <div>
                    <b>Disponibilidad</b></div>
            </div>
            <div class="card-body">
              <div v-if="disponibilidad.length == 0" :hidden="this.$store.getters['agenda/loading'] == true" class="row">
                <div class="col-md-12  text-center">
                    No hay disponibilidad en la agenda para la prestacion y sede seleccionada, por favor intentelo mas tarde.
                </div>
              </div>
              <div v-if="disponibilidad.length > 0" :hidden="this.$store.getters['agenda/loading'] == true" class="row">


                <div class="col-md-6 text-center">
                  <b>Sede: </b> {{nombre_sede}}
                </div>
                <div class="col-md-6 text-center">
                  <b>Prestación: </b> {{nombre_prestacion}}
                </div>

                <div class="col-md-12 espacio_top">
                  <table class="table table-responsive-sm">
                    <thead>
                      <tr class="text-center">
                        <th>Fecha</th>
                        <th>Disponibilidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(value, index) in disponibilidad">
                          <tr v-for="(valor, fecha) in value" class="text-center">
                            <td>{{fecha}}</td>
                            <td>
                              <template  v-for="(hora) in valor.intervalos">
                                <span  :class="hora.disponible==1?'badge-success':'badge-secondary'" class="badge espacio_derecha">
                                  {{hora.hora | moment("h:m")}}
                                </span>
                              </template>
                            </td>
                          </tr>
                      </template>
                    </tbody>
                  </table>
                  <div class="espacio_top text-center">
                    <span class="text-muted">
                      <b>*</b> Recuerde que los horarios verde son los que se encuentran disponibles, y los grises ya estan tomados.
                    </span>
                  </div>
                </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  computed: {
      sedes() {
          return !this.$store.getters['sede/loading']?this.$store.getters['sede/sedes']:[];
      },
      prestaciones() {
        return !this.$store.getters['prestacion/loading']?this.$store.getters['prestacion/prestaciones']:[];
      },
      disponibilidad() {
        return !this.$store.getters['agenda/loading']?this.$store.getters['agenda/agendas']:[];
      }
  },
  components: {

  },
  data: () => ({
      busqueda: {
          'sede_id': null,
          'prestacion_id': null,
      },
      loading: false,
      consultar_disponibilidad: false,
      nombre_sede: null,
      nombre_prestacion: null,
      opcion_garantia : [
          {
              opcion : "Si",
              valor : 1
          },
          {
              opcion : "No",
              valor : 0
          }
      ]
  }),
  methods: {
    consultarDisponibilidad () {
      this.consultar_disponibilidad = true;

      this.$store.commit('agenda/setAgendas', {replace: true, datos: []});
      this.$store.commit('agenda/setParams', {sede_id: this.busqueda.sede_id, prestacion_id: this.busqueda.prestacion_id});
      this.$store.dispatch('agenda/index');



    }
  },
  watch: {
      'busqueda.sede_id': function(newVal, oldVal) {
          if (newVal != oldVal) {
            this.busqueda.prestacion_id = null;
            this.nombre_prestacion = null;
            this.consultar_disponibilidad = false;
            this.nombre_sede = this.sedes.filter(sede => sede.value == this.busqueda.sede_id)[0].text;
            this.$store.commit('prestacion/setPrestaciones', {replace: true, datos: []});
            this.$store.commit('agenda/setAgendas', {replace: true, datos: []});
            this.$store.commit('prestacion/setParams', {sede_id: newVal});
            this.$store.dispatch('prestacion/index');
          }
      },
      'busqueda.prestacion_id': function(newVal, oldVal) {
          if (newVal != oldVal) {
            this.consultar_disponibilidad = false;

            if (newVal != null && newVal != '') {
              this.nombre_prestacion = this.prestaciones.filter(prestacion => prestacion.value == this.busqueda.prestacion_id)[0].text;
              this.$store.commit('agenda/setAgendas', {replace: true, datos: []});
            }
          }
      },
  },
  mounted() {
    this.$store.dispatch('sede/index');
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }

  .loader {
    top: 0;
    left: 0;
    z-index: 3;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.479);
    opacity: 0.96;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
            align-items: center;
  }

  .espacio_top {
    margin-top: 1.5rem;
  }

  .espacio_derecha {
    margin-right: 12px
  }

</style>
