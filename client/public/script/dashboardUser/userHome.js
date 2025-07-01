const ctx = document.getElementById("myChart");

const data = {
  labels: [],
  datasets: [
    {
      label: "Distribusi",
      data: [500, 100, 200, 100, 100],
      borderWidth: 1,
      backgroundColor: [
        "lightcoral",
        "dodgerblue",
        "deepskyblue",
        "cornflowerblue",
        "darkblue",
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
  labels: ["January", "Februari", "Maret", "April", "Mei", "Juni"],
  datasets: [
    {
      label: "",
      data: [100, 180, 130, 160, 180, 100],
      borderWidth: 0,
      fill: true,
      backgroundColor: ["#03346E", "#1e90ff40"],
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
        ticks: {
          stepSize: 50,
          font: {
            family: "Poppins",
          },
        },
      },
      x: {
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

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");
const windowLocation = "/client/pages/dashboardUser.html";

if (window.location.pathname === windowLocation) {
  navItem[0].classList.add("active");
  navLink[0].classList.add("active");
} else {
  navItem[0].classList.remove("active");
  navLink[0].classList.remove("active");
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");

hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
});

document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target) && !sidebar.contains(e.target)) {
    sidebar.classList.remove("show-sidebar");
  }
});
