const windowLocation = "/pages/dashboardAdmin/adminProfile.html";

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");

if (window.location.pathname === windowLocation) {
  navItem[3].classList.add("active");
  navLink[3].classList.add("active");
} else {
  navItem[3].classList.remove("active");
  navLink[3].classList.remove("active");
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

import useDeleteSession from "./hooks/useDeleteSession.js";

const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");
const imgProfileAdmin = document.querySelector(".img-profile-admin");

const inputUsername = document.getElementById("inputUsername");
const inputNik = document.getElementById("inputNik");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

window.addEventListener("load", async () => {
  try {
    const nik = JSON.parse(localStorage.getItem("nikAdmin")) || null;
    const urlProfile = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userNikAdmin?nik=${nik}`;

    const responseProfile = await fetch(urlProfile);
    const resultProfile = await responseProfile.json();

    resultProfile.payload.forEach((item) => {
      const firstLetter = item.username.slice(0, 1).toUpperCase();
      const hidePassword = item.password.slice(0, 3) + "*****";

      inputUsername.value = item.username;
      inputNik.value = item.nik;
      inputEmail.value = item.email;
      inputPassword.value = hidePassword;

      imgProfile.textContent = firstLetter;
      imgProfileAdmin.textContent = firstLetter;
      username.textContent = item.username;
      role.textContent = item.role;
    });
  } catch (err) {
    console.error(err);
  }
});

const btnEdit = document.querySelector(".btn-edit");
const formEdit = document.querySelector(".container-input");
const informationAdmin = document.querySelector(".information-admin");
const btnSave = document.querySelector(".btn-upload");

btnEdit.addEventListener("click", () => {
  informationAdmin.classList.toggle("show-btn");
  btnSave.classList.toggle("show-btn");

  inputUsername.toggleAttribute("disabled");
  inputNik.toggleAttribute("disabled");
  inputEmail.toggleAttribute("disabled");
  inputPassword.toggleAttribute("disabled");
});

const modalSucces = document.querySelector(".modal-succes");
const modalLoading = document.querySelector(".modal-loading");

formEdit.addEventListener("submit", async (e) => {
  const username = e.target.inputUsername.value;
  const nik = e.target.inputNik.value;
  const email = e.target.inputEmail.value;
  const password = e.target.inputPassword.value;

  e.preventDefault();
  modalLoading.classList.add("show-modal-loading");
  const editedData = {
    username: username,
    nik: nik,
    email: email,
    password: password,
  };

  try {
    const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/admin?nik=${nik}`;
    const request = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });
    const response = await request.json();
    console.log(response);

    modalLoading.classList.remove("show-modal-loading");
    modalSucces.classList.add("show-modal-succes");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal-succes");
    }, 800);
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
  }
});

const logout = document.querySelector(".logout");
logout.addEventListener("click", useDeleteSession);
