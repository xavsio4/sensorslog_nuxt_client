<template>
  <div>
    <b-overlay :show="show">
      You have {{ rows }} measure(s) recorded.
      <div v-if="isFilter === false">
        <strong
          >{{ filteredItems.length }} filtered record(s) with {{ filterval }}
        </strong>
      </div>

      <b-dropdown right text="action" size="sm" class="float-right">
        <b-dropdown-item>
          <download-csv :data="measures" name="sensorslog.csv" class="">
            Download Data
          </download-csv>
        </b-dropdown-item>
        <!--<b-dropdown-item @click="refresh"> Refresh </b-dropdown-item>-->
        <b-dropdown-item
          v-b-modal.confirmDestroySelected
          :disabled="selecteds.length === 0 ? true : false"
          >Delete only selected</b-dropdown-item
        >
        <b-dropdown-item
          v-b-modal.confirmDestroyInverse
          :disabled="selecteds.length === 0 ? true : false"
          >Delete all but selected</b-dropdown-item
        >
        <b-dropdown-item v-b-modal.confirmDestroyFilter :disabled="isFilter"
          >Delete filtered data</b-dropdown-item
        >
        <b-dropdown-item variant="danger" v-b-modal.confirmDestroyAll
          >Delete everything</b-dropdown-item
        >
      </b-dropdown>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="sensor-table"
      ></b-pagination>

      <b-table
        id="sensor-table"
        selectable
        :filter="filter"
        @row-selected="rowselect"
        :sticky-header="true"
        :busy.sync="isBusy"
        :items="filteredItems"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :dark="colormode == 'dark'"
      >
        <template #head(origin)="data">
          <b>{{ data.label }}</b>
          <select
            class="form-control form-control-sm"
            @click.stop.prevent
            v-model="selectVal['origin']"
          >
            <option :value="undefined">--</option>
            <option
              :value="option"
              v-for="option in options['origin']"
              :key="option"
            >
              {{ option }}
            </option>
          </select>
        </template>
        <!-- origin -->

        <template #head(measure_type)="data">
          <b>{{ data.label }}</b>
          <select
            class="form-control form-control-sm"
            @click.stop.prevent
            v-model="selectVal['measure_type']"
          >
            <option :value="undefined">--</option>
            <option
              :value="option"
              v-for="option in options['measure_type']"
              :key="option"
            >
              {{ option }}
            </option>
          </select>
        </template>
        <!-- measure_type -->

        <template #head(created_at)="data">
          <div class="headtop">{{ data.label }}</div>
        </template>

        <template #head(measure_value)="data">
          <div class="headtop">{{ data.label }}</div>
        </template>

        <template #head(id)="data">
          <div class="headtop">{{ data.label }}</div>
        </template>

        <template #head(measure_unit)="data">
          <div class="headtop">{{ data.label }}</div>
        </template>

        <template #cell(actions)="row">
          <a
            v-b-modal.confirmDestroy
            title="delete"
            @click="current_id = row.item.id"
          >
            <b-icon class="text-danger" icon="trash-fill"></b-icon
          ></a>
          <!-- <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
           
          </b-button> -->
          <a class="float-right" href="#" @click.prevent="row.toggleDetails">
            <!--{{ row.detailsShowing ? 'Hide' : <b-icon v-if="row.detailsShowing" class="text-danger" icon="caret-down">` }} Details -->
            <b-icon v-if="row.detailsShowing" icon="caret-up" />
            <b-icon v-if="!row.detailsShowing" icon="caret-down" />
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

    <b-modal
      id="confirmDestroyFilter"
      title="Delete selection"
      @ok="destroyfilter"
    >
      Do you confirm irrevocable deletation based on this filter :
      {{ filterval }} ?
    </b-modal>

    <b-modal
      id="confirmDestroySelected"
      title="Delete selection"
      @ok="destroyselected(0)"
    >
      Do you confirm irrevocable deletation of your selection ?
    </b-modal>

    <b-modal
      id="confirmDestroyInverse"
      title="Delete all but selected"
      @ok="destroyselected(1)"
    >
      Do you confirm irrevocable deletation everything but your selection ?
    </b-modal>

    <b-modal
      id="confirmDestroyAll"
      title="Delete all data !!!!"
      @ok="destroyall"
    >
      <p class="text-danger">
        Woaaa...hey...your are going to really delete all ! There is no coming
        back from that. I suggest you download your data first or, at least,
        consider the other data cleaning options. Are you sure ?
      </p>
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
      current_id: '',
      show: true,
      isBusy: false,
      selectVal: {
        measure_type: undefined,
        origin: undefined,
      },
      fields: [
        { key: 'id' },
        { key: 'measure_value', sortable: true },
        { key: 'measure_unit' },
        { key: 'measure_type', sortable: true },
        { key: 'origin', sortable: true },
        {
          key: 'created_at',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$moment(value).format('DD/MM/YYYY H:mm:s')
          },
        },
        { key: 'actions', label: '' },
      ],
      perPage: 20,
      currentPage: 1,
      pageOptions: [5, 10, 15, 20, { value: 100, text: 'Show a lot' }],
      filter: '',
      selecteds: [],
    }
  },
  asyncData({ axios }) {
    //
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
    getAvg(arraydata) {
      const total = arraydata.reduce((acc, c) => acc + c, 0)
      return total / arraydata.length
    },
    getMax(arraydata) {
      return Math.max(...arraydata)
    },
    getMin(arraydata) {
      return Math.min(...arraydata)
    },
    async loadData() {
      // this.show=true;
      this.isBusy = true
      await this.$axios.get('/v1/measures').then((response) => {
        this.measures = response.data.data
        this.show = false
        this.isBusy = false
      })
    }, //loaddata
    rowselect(evt) {
      this.selecteds = evt.map((item) => item.id)
      console.log(this.selecteds)
    },
    async destroy() {
      this.isBusy = true
      this.show = true
      await this.$axios
        .delete(`/v1/measure/destroy/${this.current_id}`)
        .then((response) => {
          this.measures = this.measures.filter((p) => p.id !== this.current_id)
          this.show = false
          this.isBusy = false
          this.$toast.success('Measure deleted', { duration: 2500 })
        })
    }, //destroy
    async destroyall() {
      this.isBusy = true
      this.show = true
      await this.$axios.delete(`/v1/measure/destroyall`).then((response) => {
        this.filteredItems = []
        this.measures = []
        this.selectVal.measure_type = undefined
        this.selectVal.origin = undefined
        this.show = false
        this.isBusy = false
        this.$toast.success('Everything has been deleted', { duration: 2500 })
      })
    }, //destroyall
    async destroyselected(inversed) {
      this.isBusy = true
      this.show = true
      await this.$axios
        .post(`/v1/measure/destroyselected`, {
          inverse: inversed,
          selection: this.selecteds,
        })
        .then((response) => {
          if (inversed === 0)
            this.measures = this.measures.filter(
              (p) => !this.selecteds.includes(p.id)
            )
          else
            this.measures = this.measures.filter((p) =>
              this.selecteds.includes(p.id)
            )

          this.show = false
          this.isBusy = false
          this.$toast.success('Your selection has been deleted', {
            duration: 2500,
          })
        })
    }, //destroyselected
    async destroyfilter() {
      this.isBusy = true
      this.show = true
      await this.$axios
        .post(`/v1/measure/destroyfiltered`, {
          selection: this.filteredItems.map((i) => i.id),
        })
        .then((response) => {
          this.measures = this.measures.filter(
            (p) => !this.filteredItems.map((i) => i.id).includes(p.id)
          )
          this.selectVal.measure_type = undefined
          this.selectVal.origin = undefined
          this.show = false
          this.isBusy = false
          this.$toast.success('Your filtered selection has been deleted', {
            duration: 2500,
          })
        })
    }, //destroyfilter
  },
  mounted() {
    this.loadData()
  },
  computed: {
    rows() {
      return this.measures.length
    },
    isFilter() {
      return (
        this.selectVal.origin === undefined &&
        this.selectVal.measure_type === undefined
      )
    },
    filterval() {
      let output = ''
      if (this.selectVal.measure_type !== undefined)
        output = 'measure Type value is "' + this.selectVal.measure_type + '"'
      if (
        this.selectVal.measure_type !== undefined &&
        this.selectVal.origin !== undefined
      )
        output += ' and '
      if (this.selectVal.origin !== undefined)
        output += 'Origin value is "' + this.selectVal.origin + '"'
      return output
    },
    filteredItems() {
      return this.measures.filter((item) => {
        let keep = true
        this.fieldKeys.forEach((key) => {
          keep =
            keep &&
            (this.selectVal[key] === undefined ||
              item[key] === this.selectVal[key])
        })
        return keep
      })
    },
    fieldKeys() {
      return ['measure_type', 'origin']
    },
    options() {
      //distinct values of options
      const options = []
      this.fieldKeys.forEach((key) => {
        const vals = this.measures.map((item) => item[key])
        // Cheap and efficient unique.
        options[key] = Array.from(new Set(vals))
      })
      return options
    }, // options
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
.headtop {
  position: relative;
  top: -30px;
  font-weight: bolder;
}
</style>
