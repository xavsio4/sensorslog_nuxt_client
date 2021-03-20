<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartdata'],
  data () {
    return {
      options: {
      responsive: true,
        maintainAspectRatio: false,
        borderColor: 'rgba(47, 152, 208, 0.2)',
        backgroundColor: ['rgba(47, 152, 208, 0.2)'],
        legend: {
            display: true,
        },
      /*  tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var index = tooltipItem.index;
                    return dataset.labels[index] + ': ' + dataset.data[index];
                }
            }
        },*/
       scales: {
         /*   xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]*/
            xAxes: [{
                type: 'time',
               /*  time: {
                    unit: 'hour',
                    round:true,
                    minUnit:'minute',
                    displayFormats:'h:mm'
                }*/
            }]
        } 
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>