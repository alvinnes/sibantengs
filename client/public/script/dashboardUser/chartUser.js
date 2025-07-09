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
      data: [100, 180, 130, 160, 180, 100],
      borderWidth: 0,
      fill: true,
      backgroundColor: ["#03346E", "#578FCA"],
      barPercentage: 0.7,
    },
  ],
};

new Chart(chartLine, {
  type: "bar",
  data: dataChartLine,
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 200,
        grid: {
          color: "#80808020",
        },
        ticks: {
          stepSize: 50,
          font: {
            family: "Poppins",
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
