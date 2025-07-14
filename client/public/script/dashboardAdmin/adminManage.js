import useDeleteDataManage from "./hooks/useDeleteDataManage.js";
import useDeleteSession from "./hooks/useDeleteSession.js";
import useElementManage from "./hooks/useElementManage.js";
import usePaginationManage from "./hooks/usePaginationManage.js";
import useSearchManage from "./hooks/useSearchManage.js";
import {
  sortedDataByAlpha,
  sortedDataByDate,
  sortedDataByNik,
} from "./hooks/useSortManage.js";

const windowLocation = "/pages/dashboardAdmin/adminManage.html";

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");

if (window.location.pathname === windowLocation) {
  navItem[1].classList.add("active");
  navLink[1].classList.add("active");
} else {
  navItem[1].classList.remove("active");
  navLink[1].classList.remove("active");
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

const tableData = document.querySelector("#tableData tbody");

let datasNasabah = [];
let page = 1;
let currentPagination = null;
let totalPage = null;

const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");
const infoPagination = document.querySelector(".info-pagination");
const searchInput = document.getElementById("search");
const btnPagination = document.querySelector(".btn-pagination");

const dataNull = document.querySelector(".data-null");

window.addEventListener("load", async () => {
  try {
    const nik = JSON.parse(localStorage.getItem("nikAdmin")) || null;
    const urlProfile = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userNikAdmin?nik=${nik}`;
    const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userAll?page=${page}`;

    const response = await fetch(url);
    const responseProfile = await fetch(urlProfile);

    const result = await response.json();
    const resultProfile = await responseProfile.json();

    const dateNow = result.payload.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${result.pagination.currentPage} dari ${result.pagination.totalPage}`;

    resultProfile.payload.forEach((item) => {
      const firstLetter = item.username.slice(0, 1).toUpperCase();

      imgProfile.textContent = firstLetter;
      username.textContent = item.username;
      role.textContent = item.role;
    });

    if (dateNow.length === 0) {
      dataNull.style.display = "flex";
      searchInput.setAttribute("disabled", true);
      btnPagination.style.display = "none";
    } else {
      searchInput.removeAttribute("disabled");
      btnPagination.style.display = "flex";
      dataNull.style.display = "none";

      dateNow.forEach((item, index) => {
        const element = useElementManage(item, index);
        tableData.innerHTML += element;
        datasNasabah.push(item);

        const btnDelete = document.querySelectorAll(".btn-delete");
        btnDelete.forEach((btn) => {
          btn.addEventListener("click", () =>
            useDeleteDataManage(item.kk_number, datasNasabah, btn)
          );
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
});

searchInput.addEventListener("input", async (e) => {
  try {
    if (e.target.value === "") {
      const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userAll`;
      useSearchManage(url);
    }
  } catch (error) {
    console.error(error);
  }
});

searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    try {
      if (e.target.value !== "") {
        const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/user?nama=${e.target.value}`;
        useSearchManage(url);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

const sortByNik = document.getElementById("nik");
const sortByAlpha = document.getElementById("alpha");
const sortByDate = document.getElementById("date");

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

// Fungsi untuk mengurutkan data
sortByDate.addEventListener("click", () => sortedDataByDate(datasNasabah));
sortByAlpha.addEventListener("click", () => sortedDataByAlpha(datasNasabah));
sortByNik.addEventListener("click", () => sortedDataByNik(datasNasabah));

// Function untuk menangani pagination
btnNext.onclick = async () => {
  if (page > totalPage - 1) return;
  page += 1;
  usePaginationManage(page, totalPage, currentPagination);
};

btnPrev.onclick = async () => {
  if (page < 2) return;
  if (totalPage < 1) return (page = 1);
  page -= 1;
  usePaginationManage(page, totalPage, currentPagination);
};

// Function untuk menangani logout
const logout = document.querySelector(".logout");
logout.addEventListener("click", useDeleteSession);
