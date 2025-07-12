const ctx = document.getElementById("myChart");

const data = {
  labels: [],
  datasets: [
    {
      label: "Distribusi",
      data: [500, 100, 200, 100, 100],
      borderWidth: 1,
      backgroundColor: [
        "lightskyblue",
        "dodgerblue",
        "deepskyblue",
        "#578FCA",
        "lightblue",
      ],
    },
  ],
};

new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
  },
});

const chartLine = document.getElementById("chartLine");

const dataChartLine = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  datasets: [
    {
      label: "",
      data: [500, 680, 230, 460, 380, 800],
      borderWidth: 2,
      tension: 0.3,
      borderColor: "#87a2ff",
      fill: true,
      backgroundColor: (context) => {
        if (!context.chart.chartArea) return;

        const {
          ctx,
          chartArea: { top, height },
        } = context.chart;

        const bgGradient = ctx.createLinearGradient(0, top, 0, height);
        bgGradient.addColorStop(0, "white");
        bgGradient.addColorStop(1, "#87a2ff10");
        return bgGradient;
      },
    },
  ],
};

new Chart(chartLine, {
  type: "line",
  data: dataChartLine,
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1000,
        grid: {
          color: "#80808020",
        },
        ticks: {
          stepSize: 200,
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
      x: {
        grid: {
          color: "#80808020",
        },
        ticks: {
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Riwayat Penggunaan Rekening",
        font: {
          family: "Poppins",
          size: 20,
          weight: 500,
        },
        padding: {
          top: 20,
          bottom: 40,
        },
        color: "#1d1d1d",
      },
    },
  },
});
