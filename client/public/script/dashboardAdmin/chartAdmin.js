const chartBar = document.getElementById("chartBar");

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
  ],
  datasets: [
    {
      label: "Internet Banking",
      data: [1000, 2000, 1504, 2013, 1202, 3002, 2005, 1001, 1204, 2005],
      backgroundColor: "#578FCA",
    },
    {
      label: "Pengajuan Kredit Online",
      data: [800, 1903, 1405, 1911, 1106, 3203, 3006, 1013, 1231, 2308],
      backgroundColor: "lightskyblue",
    },
    {
      label: "Tarik Tunai Tanpa Kartu",
      data: [1000, 4004, 1203, 2216, 1203, 3007, 4002, 3007, 1103, 2109],
      backgroundColor: "#3674B5",
    },
    {
      label: "Bima Mobile",
      data: [1220, 2030, 1540, 2015, 2204, 4004, 3003, 1200, 1320, 2400],
      backgroundColor: "#1F509A",
    },
  ],
};

new Chart(chartBar, {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: "#80808015",
        },
        ticks: {
          font: {
            family: "Poppins",
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "#80808015",
        },
        min: 0,
        max: 5000,
        ticks: {
          stepSize: 1000,
          font: {
            size: 10,
            family: "Poppins",
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Data Penggunaan Layanan",
        font: {
          size: 18,
          family: "Poppins",
          weight: 500,
        },
        color: "#1d1d1d",
        padding: {
          bottom: 40,
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

const chartLine = document.getElementById("chartLine");

const dataChartLine = {
  labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  datasets: [
    {
      label: "Nasabah",
      data: [1000, 3000, 1000, 6000, 3000, 4500, 4000],
      tension: 0.3,
      fill: true,
      backgroundColor: (context) => {
        if (!context.chart.chartArea) return;
        const {
          ctx,
          chartArea: { top, height },
        } = context.chart;
        const bgGradient = ctx.createLinearGradient(0, top, 0, height);
        bgGradient.addColorStop(0, "#3674B585");
        bgGradient.addColorStop(1, "#3674B510");
        return bgGradient;
      },
      borderColor: "#3674B5",
      borderWidth: 2,
      pointBorderWidth: 1,
    },
  ],
};

new Chart(chartLine, {
  type: "line",
  data: dataChartLine,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: "#80808015",
        },
        ticks: {
          font: {
            family: "Poppins",
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "#80808015",
        },
        min: 0,
        max: 10000,
        ticks: {
          stepSize: 2500,
          font: {
            size: 10,
            family: "Poppins",
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Aktivitas Nasabah",
        font: {
          size: 16,
          weight: 500,
          family: "Poppins",
        },
        color: "#1d1d1d",
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        usePointStyle: true,
      },
      legend: {
        display: false,
      },
    },
  },
});

const chartPie = document.getElementById("chartPie");

const dataChartPie = {
  labels: ["Aktif", "Tidak Aktif", "Ditangguhkan"],
  datasets: [
    {
      label: "",
      data: [35, 50, 15],
      backgroundColor: ["gainsboro", "lightseagreen", "lightcoral"],
    },
  ],
};

new Chart(chartPie, {
  type: "pie",
  data: dataChartPie,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
