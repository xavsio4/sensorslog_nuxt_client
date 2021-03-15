<template>
  <div>
    <b-overlay :show="show">
      You have {{ rows }} measure(s)
      <download-csv
        :data="measures"
        name="sensorslog.csv"
        class="btn btn-light btn-sm float-right"
      >
        Download Data
      </download-csv>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="sensor-table"
      ></b-pagination>

      <b-table
        id="sensor-table"
        selectable
        :sticky-header="true"
        :busy.sync="isBusy"
        :items="measures"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :dark="colormode == 'dark'"
      >
        <template #cell(actions)="row">
          <a v-b-modal.confirmDestroy 
          title="delete" 
          @click="current_id = row.item.id"> <b-icon class="text-danger" icon="trash-fill"></b-icon></a>
         <!-- <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
           
          </b-button> -->
          <a class="float-right" href="#" @click.prevent="row.toggleDetails">
            <!--{{ row.detailsShowing ? 'Hide' : <b-icon v-if="row.detailsShowing" class="text-danger" icon="caret-down">` }} Details -->
              <b-icon v-if="row.detailsShowing"  icon="caret-up"/>
              <b-icon v-if="!row.detailsShowing"  icon="caret-down"/>
          </a>
        </template>
        <template #row-details="row">
          <b-card>
            <ul class="list-unstyled">
              <li v-for="(value, key) in row.item" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="sensor-table"
      ></b-pagination>
    </b-overlay>
    <b-modal id="confirmDestroy" title="Confirm deletation " @ok="destroy">
      Do you confirm irrevocable deletation of this measure ?
    </b-modal>
  </div>
</template>
<script>
import DownloadCsv from 'vue-json-csv'
export default {
  components: {
    DownloadCsv,
  },
  data() {
    return {
      measures: [],
      current_id:'',
      show: false,
      isBusy: false,
      fields: [
        { key: 'id' },
        { key: 'measure_value', sortable: true },
        { key: 'measure_unit' },
        { key: 'measure_type' },
        { key: 'origin' },
        {
          key: 'created_at',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$moment(value).format('DD/MM/YYYY H:mm:s')
          },
        },
        { key: 'actions', label: 'Actions' },
      ],
      perPage: 20,
      currentPage: 1,
      pageOptions: [5, 10, 15, 20, { value: 100, text: 'Show a lot' }],
    }
  },
  methods: {
    async loadData() {
      // this.show=true;
      this.isBusy = true
      await this.$axios.get('/v1/measures').then((response) => {
        this.measures = response.data.data
        this.show = false
        this.isBusy = false
      })
    },
    async destroy() {
      this.isBusy = true
      await this.$axios
        .delete(`/v1/measure/destroy/${this.current_id}`)
        .then((response) => {
          this.measures = this.measures.filter((p) => p.id !== this.current_id)
          this.show = false
          this.isBusy = false
          this.$toast.success('Measure deleted',{ duration:2500, })
        })
    },
  },
  mounted() {
    this.loadData()
  },
  computed: {
    rows() {
      return this.measures.length
    },
    colormode() {
      if (this.$colorMode.preference) {
        if (
          this.$colorMode.preference === 'system' ||
          this.$colorMode.preference === 'dark'
        )
          return 'dark'
      }
      return 'light'
    },
  },
}
</script>
<style></style>
