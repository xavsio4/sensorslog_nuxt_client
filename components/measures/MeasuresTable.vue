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
        :busy.sync="isBusy"
        :items="measures"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small :dark="colormode == 'dark'"
      >
      </b-table>
    </b-overlay>
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
      show: false,
      isBusy: false,
      fields: [
        { key: 'id' },
        { key: 'measure_value', sortable: true },
        { key: 'measure_unit' },
        { key: 'measure_type' },
        { key: 'origin' },
        { key: 'created_at', sortable: true },
      ],
      perPage: 6,
      currentPage: 1,
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
<style>
</style>