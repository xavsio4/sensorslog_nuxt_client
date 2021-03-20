<template>
  <b-container class="reportpage">
    <b-row>
      <b-col>
        <b-card title="You've logged" class="card-widget">
          <h5>{{ nbrItems }} measures</h5>
          <strong>since {{ formatDate(firstItem.created_at) }}</strong>
        </b-card>
      </b-col>
      <b-col v-for="(item, index) in latest" :index="index">
        <b-card class="card-widget">
          <b-card-text
            ><h2>{{ item.measure_value }} {{ item.measure_unit }}</h2>
            <div class="latest_time">
              {{ formatDate(item.created_at) }}
            </div>
            <div>
              <b-badge>{{ item.measure_type }}</b-badge>
              <b-badge variant="info">{{ item.origin }}</b-badge>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <div class="float-right">
            <b-badge>{{ now }}</b-badge
            >&nbsp;<clock style="position: relative" />
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-overlay :show="false">
      <b-row>
        <b-col>
          <b-card>
            <b-button size="sm" @click="fillDataLine()">Last 24h</b-button>
            <b-button size="sm" @click="fillDataScatter()">Last 5 days</b-button>
            <b-button size="sm" @click="fillData()">Last month</b-button>
            <b-button size="sm" @click="fillData()">Current month</b-button>
          </b-card>
          <b-card>
            <line-chart :chart-data="datacollection"></line-chart>
          </b-card>
        </b-col>
       <!-- <b-col>
          <b-card title="Customize the chart">
            <b-form>
              <b-form-group>
                <label><strong>Available measure type(s)</strong></label>
                <ul class="list-unstyled">
                  <li v-for="item in options['measure_type']">
                    <b-form-checkbox
                      :name="item"
                      value="accepted"
                      unchecked-value="hidden"
                    >
                      {{ item }}</b-form-checkbox
                    >
                  </li>
                </ul>
              </b-form-group>
              <b-form-group>
                <label><strong>Available origine(s) of measures</strong></label>
                <ul class="list-unstyled">
                  <li v-for="item in options['origin']">
                    {{ item }}
                  </li>
                </ul>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>-->
        <b-col>
            {{watcheddata}}
            <scatter-chart :chart-data="chartd"/>
        </b-col>
      </b-row>
    </b-overlay>
  </b-container>
</template>

<script>
import LineChart from '@/components/LineChart'
import ScatterChart from '@/components/ScatterChart'
import Clock from '../components/clock.vue'
export default {
  middleware: 'auth',
  components: {
    LineChart,
    Clock,
    ScatterChart
  },
  asyncData() {
    // help
  },
  data() {
    return {
        chartd: {
        datasets: [{
            label: 'Scatter Dataset',
            borderColor: 'rgba(47, 152, 208, 0.2)',
            backgroundColor: [
                                'rgba(47, 152, 208, 0.2)',
                            ],
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
      now: this.$dayjs().format('DD/MM/YYYY'),
      measures: [],
      chartData: {
       // labels: '',
        datasets: [],
      },
      datacollection: '',
      loading: false,
      latest: '',
      firstRecord: '',
      chartColors:['#610F45','#23C19A','#7466F2','#FD9EA6','#B1F76A','#F7552C'],
      watchedData : ''
    }
  },
  methods: {
    loadData() {
      this.loading = true
      this.$axios.get('/v1/measures').then((response) => {
        this.measures = response.data.data
        
        this.loading = false
        console.log(this.measures)
        this.firstRecord = this.measures[0]
      })
    }, //loaddata
    async getLatest() {
      this.loading = true
      await this.$axios.get('/v1/measure/latest').then((response) => {
        this.latest = response.data.data
      })
      this.loading = false
    }, //getLatest
    formatDate(value) {
      return this.$moment(value).format('DD/MM/YYYY H:mm:s')
    },
    fillDataLine() {
         this.chartData.labels = []
        this.chartData.datasets = []
        this.watcheddata = this.chartdsp(1,'day')
      let item
      for (item in this.options['measure_type']) {
       this.chartData.labels = this.datasetsDate(this.watcheddata)
        this.chartData.datasets.push({
          label: this.options['measure_type'][item],
          data: this.datasetsValue(this.options['measure_type'][item],this.watcheddata),
          fill: false,
          backgroundColor: this.chartColors[item],
           borderColor: this.chartColors[item],
        showLines: true,
        spanGaps: true,
        })
      }
      

      this.datacollection = this.chartData

      console.log(this.chartData.labels)

     /* this.datacollection = {
        labels: this.datasetsDate,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            fill: false,
            showLines: true,
            spanGaps: true,
            data: this.datasetsValue('externalTemp'),
          },
          {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
        ],
      } */
    }, //filldata
    fillDataScatter() {
       // this.chartData.labels = []
        this.chartData.datasets = []
this.watcheddata = this.chartdsp(1,'day')
      let item
      for (item in this.options['measure_type']) {
       //this.chartData.labels = this.datasetsDate(this.watcheddata)
        this.chartData.datasets.push({
          label: this.options['measure_type'][item],
          data: this.datasetsScatter(this.options['measure_type'][item],this.watcheddata),
         // fill: false,
          backgroundColor: this.chartColors[item],
           borderColor: this.chartColors[item],
       // showLines: true,
       // spanGaps: true,
        })
      }
      console.log(this.chartData)

      this.datacollection = this.chartData
    },
    datasetsValue(val,fromtime) {
      return this.measures
        .filter((p) => (p.measure_type === val))
        .map((p) => p.measure_value)
        //.reverse()
    },
     datasetsScatter2(val,fromtime) {
      return this.measures
        .filter((p) => (p.measure_type === val))
        .map((p) => [{x: this.$moment(p.created_at).unix(),y: p.measure_value}])
        //.reverse()
    },
    datasetsScatter(val,fromtime) {
      return this.measures
        .filter((p) => (p.measure_type === val))
        .reduce((accumulator, currentValue, index, array)=>{
            accumulator.push({x: this.$moment(currentValue.created_at).unix(),y: currentValue.measure_value})
            return accumulator;
            },[])
        //.map((p) => [{x: this.$moment(p.created_at).unix(),y: p.measure_value}])
        //.reverse()
    },
    datasetsDate(fromtime) {
      return this.measures
      //.filter((a) => (a.created_at.valueOf() > fromtime.valueOf()))
      .map((p)=> p.created_at )
        //.map((p) => this.$moment(p.created_at).format('H:mm a'))
       // .reverse()
    },
    chartdsp(val,unit)
      {
         return this.$dayjs().subtract(val,unit).toISOString()
         //.format('DD/MM/YYYY H:mm')
      },
  }, // methods
  computed: {
    async firstItem() {
      this.firstRecord = this.measures.reverse()
      return this.firstRecord[0]
    },
    nbrItems() {
      return this.measures.length
    },
    fieldKeys() {
      return ['measure_type', 'origin']
    },
    options() {
      //distinct values of each key
      const options = []
      this.fieldKeys.forEach((key) => {
        const vals = this.measures.map((item) => item[key])
        // Cheap and efficient unique.
        options[key] = Array.from(new Set(vals))
      })
      return options
    }, // options
    labels() {
      return this.options['measure_type']
    },
    
    backgrounds() {
      return ['#f87979', '#f87979']
    },
  },
  mounted() {
    this.loadData()
    this.getLatest()
  },
}
</script>
<style scoped>
.reportpage {
  background-color: whitesmoke !important;
  margin: 5px;
  border-radius: 14px;
  max-width: 100% !important;
  padding: 12px;
}
.card {
  margin: 6px;
  border-radius: 14px;
}
</style>
