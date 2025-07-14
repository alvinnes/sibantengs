const windowLocation = "/pages/dashboardAdmin/adminMessage.html";

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");

if (window.location.pathname === windowLocation) {
  navItem[2].classList.add("active");
  navLink[2].classList.add("active");
} else {
  navItem[2].classList.remove("active");
  navLink[2].classList.remove("active");
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

import useCheckbox from "./hooks/useCheckbox.js";
import { sortedDataByAlpha, sortedDataByDate } from "./hooks/useSortMessage.js";
import useMonth from "./hooks/useMonth.js";
import usePaginationMessage from "./hooks/usePaginationMessage.js";
import useElementMessage from "./hooks/useElementMessage.js";
import useSearchMessage from "./hooks/useSearchMessage.js";
import useDeleteSession from "./hooks/useDeleteSession.js";

// Profile di navbar
const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");
const infoPagination = document.querySelector(".info-pagination");

const containerData = document.querySelector(".container-data");
const btnDelete = document.querySelector(".btn-delete");
const searchInput = document.getElementById("search");
const btnPagination = document.querySelector(".btn-pagination");

const dataNull = document.querySelector(".data-null");

const containerModal = document.querySelector(".container-modal-confirm");
const deleteAll = document.querySelector(".delete-all");
const modalConfirm = document.querySelector(".modal-confirm");
const btnAgree = document.getElementById("agree");
const btnDisagree = document.getElementById("disagree");

let dataMessages = [];
let page = 1;
let currentPagination = null;
let totalPage = null;

window.addEventListener("load", async () => {
  try {
    const nik = JSON.parse(localStorage.getItem("nikAdmin")) || null;
    const urlProfile = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userNikAdmin?nik=${nik}`;
    const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/message?page=${page}`;

    const response = await fetch(url);
    const responseProfile = await fetch(urlProfile);

    const result = await response.json();
    const resultProfile = await responseProfile.json();

    // Mapping data admin
    resultProfile.payload.forEach((item) => {
      const firstLetter = item.username.slice(0, 1).toUpperCase();

      imgProfile.textContent = firstLetter;
      username.textContent = item.username;
      role.textContent = item.role;
    });

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${currentPagination} dari ${totalPage}`;
    containerData.innerHTML = "";

    if (result.payload == 0) {
      dataNull.style.display = "flex";
      deleteAll.setAttribute("disabled", true);
      searchInput.setAttribute("disabled", true);
      btnPagination.style.display = "none";
    } else {
      deleteAll.removeAttribute("disabled");
      btnPagination.style.display = "flex";
      searchInput.removeAttribute("disabled");
      dataNull.style.display = "none";
      result.payload.forEach((message) => {
        const date = new Date(message.created_at);
        const month = useMonth(date.getMonth());
        const time = `${date.getDate()}  ${month}`;

        containerData.innerHTML += useElementMessage(message, time);
        dataMessages.push(message);
      });

      useCheckbox();
    }
  } catch (err) {
    console.error(err);
  }
});

btnDisagree.addEventListener("click", () => {
  containerModal.classList.remove("show-modal");
});

document.addEventListener("click", (e) => {
  if (
    !deleteAll.contains(e.target) &&
    !modalConfirm.contains(e.target) &&
    !btnDelete.contains(e.target)
  ) {
    containerModal.classList.remove("show-modal");
  }
});

deleteAll.addEventListener("click", () => {
  containerModal.classList.add("show-modal");
  btnAgree.onclick = async () => {
    dataMessages = [];
    containerData.innerHTML = "";
    try {
      containerModal.classList.remove("show-modal");
      const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/message`;
      const request = await fetch(url, { method: "DELETE" });
      const response = await request.json();
      console.log(response);
      location.reload();
    } catch (error) {}
  };
});

searchInput.oninput = async (e) => {
  try {
    if (e.target.value == "") {
      const url = "https://api-sibantengs.smkw9jepara.sch.id/api/v1/message";
      useSearchMessage(url);
    }
  } catch (error) {
    console.error(error);
  }
};

searchInput.onkeydown = async (e) => {
  if (e.key === "Enter") {
    try {
      if (e.target.value !== "") {
        const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/queryMessage?q=${e.target.value}&page=${page}`;
        useSearchMessage(url);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const sortByAlpha = document.getElementById("alpha");
const sortByDate = document.getElementById("date");

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

sortByDate.addEventListener("click", () => sortedDataByDate(dataMessages));
sortByAlpha.addEventListener("click", () => sortedDataByAlpha(dataMessages));

btnNext.onclick = async () => {
  if (page > totalPage - 1) return;
  page += 1;
  usePaginationMessage(page, totalPage, currentPagination);
};

btnPrev.onclick = async () => {
  if (page < 2) return;
  if (totalPage < 1) return (page = 1);
  page -= 1;
  usePaginationMessage(page, totalPage, currentPagination);
};

// Function untuk menangani logout
const logout = document.querySelector(".logout");
logout.addEventListener("click", useDeleteSession);
