
const Chart = require("chart.js");
var mode = "light"; //(themeMode) ? themeMode : 'light';
var fonts = {
  base: "Open Sans"
}
var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};

var elementOptions = {
  point: {
    radius: 0,
    backgroundColor: colors.theme["primary"]
  },
  line: {
    tension: 0.4,
    borderWidth: 4,
    borderColor: colors.theme["primary"],
    backgroundColor: colors.transparent,
    borderCapStyle: "rounded"
  },
  rectangle: {
    backgroundColor: colors.theme["warning"]
  },
  arc: {
    backgroundColor: colors.theme["primary"],
    borderColor: mode === "dark" ? colors.gray[800] : colors.white,
    borderWidth: 4
  }
}

var globalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    defaultColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
    defaultFontColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
    defaultFontFamily: fonts.base,
    defaultFontSize: 13,
    layout: {
      padding: 0
    },
    legend: {
      display: false,
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 16
      }
    },
    elements: elementOptions,
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false
    }
  }



var doughnutOptions = {
  cutoutPercentage: 83,
  legendCallback: function(chart) {
    var data = chart.data;
    var content = "";

    data.labels.forEach(function(label, index) {
      var bgColor = data.datasets[0].backgroundColor[index];

      content += '<span class="chart-legend-item">';
      content +=
        '<i class="chart-legend-indicator" style="background-color: ' +
        bgColor +
        '"></i>';
      content += label;
      content += "</span>";
    });

    return content;
  }
}

var yAxesGridLines = {
  borderDash: [2],
  borderDashOffset: [2],
  color: mode === "dark" ? colors.gray[900] : colors.gray[300],
  drawBorder: false,
  drawTicks: false,
  lineWidth: 0,
  zeroLineWidth: 0,
  zeroLineColor: mode === "dark" ? colors.gray[900] : colors.gray[300],
  zeroLineBorderDash: [2],
  zeroLineBorderDashOffset: [2]
}

// Chart.js global options
function chartOptions() {
  // Options
  var options = {
    defaults: {
      global: globalOptions,
      doughnut: doughnutOptions
    }
  };

  // yAxes
  Chart.scaleService.updateScaleDefaults("linear", {
    gridLines: yAxesGridLines,
    ticks: {
      beginAtZero: true,
      padding: 10,
      callback: function(value) {
        if (!(value % 10)) {
          return value;
        }
      }
    }
  });

  // xAxes
  Chart.scaleService.updateScaleDefaults("category", {
    gridLines: {
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false
    },
    ticks: {
      padding: 20
    },
    maxBarThickness: 10
  });

  return options;
}

// Parse global options
function parseOptions(parent, options) {
  for (var item in options) {
    if (typeof options[item] !== "object") {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
}

// Example 1 of Chart inside src/views/Index.jsx (Sales value - Card)
let chartExample1 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900]
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                return "$" + value;
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          content += "$" + yLabel;
          return content;
        }
      }
    }
  }
};

// Example 2 of Chart inside src/views/Index.jsx (Total orders - Card)
let chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        }
      }
    }
  }
};


let chartExample4 = {
  options: {

  },
  legend: {display: true,
  position: 'top'},
};

module.exports = {
  chartOptions, // used inside src/views/Index.jsx
  parseOptions, // used inside src/views/Index.jsx
  chartExample1, // used inside src/views/Index.jsx
  chartExample2, // used inside src/views/Index.jsx
  chartExample4, // used inside src/views/Index.jsx
};