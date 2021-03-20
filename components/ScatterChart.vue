<script>
import { Scatter, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Scatter,
  mixins: [reactiveProp],
  props: ['chartdata'],
  data() {
    return {
      chartd: {
        datasets: [
          {
            label: 'Scatter Dataset',
            data: [
              {
                x: 1499516102000,
                y: 20.06,
              },
              {
                x: 1499516202000,
                y: 19.62,
              },
              {
                x: 1499516402000,
                y: 19.0,
              },
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        borderColor: 'rgba(47, 152, 208, 0.2)',
        backgroundColor: ['rgba(47, 152, 208, 0.2)'],
        legend: {
          display: true,
        },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var index = tooltipItem.index;
                    return dataset.labels[index] + ': ' + dataset.data[index];
                }
            }
        },
       scales: {
            xAxes: [{
                type: 'time',
              /*  time: {
                    unit: 'hour',
                    round:true,
                    minUnit:'minute',
                    displayFormats:'h:mm a'
                }*/
            }]
        }
    }
    }
  },
  mounted() {
    this.renderChart(this.chartd, this.options)
  },
}
</script>
<style></style>
