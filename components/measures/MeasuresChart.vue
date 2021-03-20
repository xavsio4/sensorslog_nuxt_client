<script>
import { Line, mixins } from "vue-chartjs";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import chartjsPluginDataLabels from "chartjs-plugin-datalabels";

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      gradient: null,
      gradient2: null
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");


    this.renderChart(
      //data
      {
        labels: this.chartData.measure_type,
        datasets: [
          {
            label: "Sensorslog",
            datalabels: {
              color: function(context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                // Change the label text color based on our new `hovered` context value.
                return value > 70 ? "red" : "blue";
              },
              align: "start",
              offset: 10,
              formatter: function(value, context) {
                return value + "";
              },
              font: {
                weight: "bold"
              }
            }, // datalabels
            backgroundColor: this.gradient,
            data: this.chartData.measure_value,
            // backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          //idea for treatment instead of annotation
         
        ]
      },
      //options
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        title: {
          display: true,
          text: "Measures"
        }, //title
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: false,
                suggestedMin: 30,
                suggestedMax: 150
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        }, // scales,
     
      } // options
    );
  } //mounted
};
</script>
