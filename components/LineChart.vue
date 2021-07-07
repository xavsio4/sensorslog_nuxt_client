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
        //backgroundColor: ['rgba(47, 152, 208, 0.2)'],
        legend: {
            display: true,
        },
        elements: {
          line: { fill: false },
                    point:{
                        radius: 0
                    }
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
               time: {
                  parser: 'YYYY-MM-DDTHH:mm',
                  unit: 'day',
                  displayFormats: {
                     day: 'DD/MM/YY hh:mm',
                  },
                  
               },
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