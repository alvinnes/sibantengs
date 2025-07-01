const form = document.querySelector("form");
const modalSucces = document.querySelector(".modal-succes");
const btnSubmit = document.querySelector(".btn-submit");
const showPassword = document.querySelector(".icon-eye");
const iconEye = document.querySelector(".icon-eye i");

const inputNik = document.getElementById("nik");
const inputPassword = document.getElementById("password");

const errorMessageNik = document.querySelector(".error-message-nik");
const errorMessagePassword = document.querySelector(".error-message-password");

let existData = "";
let existDataAdmin = "";

window.addEventListener("load", async () => {
  try {
    const urlAdmin = "http://localhost:3000/data/admin";
    const url = "http://localhost:3000/data/register";
    const responseAdmin = await fetch(urlAdmin);
    const response = await fetch(url);
    const resultAdmin = await responseAdmin.json();
    const result = await response.json();
    existDataAdmin = resultAdmin.payload;
    existData = result.payload;
  } catch (err) {
    console.error(err);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const matchedNik = existData.find(
      (item) => item.kk_number === e.target.nik.value
    );
    const matchedPassword = existData.find(
      (item) => item.password === e.target.password.value
    );
    const matchedNikAdmin = existDataAdmin.find(
      (item) => item.nik == e.target.nik.value
    );
    const matchedPasswordAdmin = existDataAdmin.find(
      (item) => item.password === e.target.password.value
    );
    if (matchedNikAdmin && matchedPasswordAdmin) {
      console.log("Berhasil Login");
      setTimeout(() => {
        window.location.href = "/client/pages/dashboardAdmin.html";
      }, 2000);
    } else {
      if (!matchedNik && !matchedPassword) {
        errorMessageNik.textContent = "NIK tidak ditemukan!";
        errorMessagePassword.textContent = "Password salah!";
        return;
      } else {
        console.log("Berhasil Login");
        errorMessageNik.textContent = "";
        errorMessagePassword.textContent = "";
        setTimeout(() => {
          window.location.href = "/client/pages/dashboardUser.html";
        }, 2000);
      }
    }

    btnSubmit.textContent = "Loading...";
    btnSubmit.setAttribute("disabled", "true");
    btnSubmit.classList.add("btn-disabled");

    inputNik.value = "";
    inputPassword.value = "";
    modalSucces.classList.add("show-modal");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal");
    }, 1000);
  } catch (err) {
    console.error(err);
  } finally {
    btnSubmit.removeAttribute("disabled");
    btnSubmit.classList.remove("btn-disabled");
    btnSubmit.textContent = "Submit";
  }
});

showPassword.addEventListener("click", () => {
  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    iconEye.classList.remove("ph-eye-closed");
    iconEye.classList.add("ph-eye");
  } else {
    inputPassword.type = "password";
    iconEye.classList.remove("ph-eye");
    iconEye.classList.add("ph-eye-closed");
  }
});
