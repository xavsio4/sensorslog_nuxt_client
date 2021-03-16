<script>
import { Line, mixins } from "vue-chartjs";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import chartjsPluginDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

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

    this.addPlugin(chartjsPluginAnnotation);
    this.addPlugin(chartjsPluginDataLabels);

    this.renderChart(
      //data
      {
        labels: this.chartData.labels,
        datasets: [
          {
            label: "HeartBeat Rate",
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
            data: this.chartData.datasets,
            // backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          //idea for treatment instead of annotation
          {
            // type: "line",
            label: "Changement de traitement",
            datalabels: {
              //datasetIndex:0,
              color: "#3622EB",
              align: "top",
              offset: 10,
              formatter: function(value, context) {
                return "CT " + context.dataIndex;
              },
              font: {
                weight: "bold"
              }
            }, // datalabels
            borderColor: "transparent",
            backgroundColor: "#8F13FE",
            pointStyle: "rectRot",
            pointBackgroundColor: "#8F13FE",
            pointBorderColor: "#8F13FE",
            pointBorderWidth: 10,
            borderWidth: 2,
            spanGaps: true,
            fill: false,
            data: [30, NaN, NaN, NaN, 30, NaN, NaN]
          }
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
        annotation: {
          annotations: [
            {
              drawTime: "afterDraw", // overrides annotation.drawTime if set
              // id: "a-limit-1", // optional
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 100,

              borderColor: "red",
              borderWidth: 1,
              label: {
                position: "right",
                xAdjust: 10,
                backgroundColor: "#FF6659",
                content: "100",
                enabled: true
              }
            }
          ]
        } // annotation
      } // options
    );
  } //mounted
};
</script>
