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
    const urlAdmin = "https://api-sibantengs.smkw9jepara.sch.id/api/v1/admin";
    const url = "https://api-sibantengs.smkw9jepara.sch.id/api/v1/register";
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
    const nik = parseInt(e.target.nik.value);
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
      localStorage.setItem("nikAdmin", JSON.stringify(nik));
      setTimeout(() => {
        window.location.href = `/client/pages/dashboardAdmin/adminOverview.html`;
      }, 1000);
    } else {
      if (!matchedNik && !matchedPassword) {
        errorMessageNik.textContent = "NIK tidak ditemukan!";
        errorMessagePassword.textContent = "Password salah!";
        return;
      } else {
        localStorage.setItem("nikUser", JSON.stringify(nik));
        console.log("Berhasil Login");
        errorMessageNik.textContent = "";
        errorMessagePassword.textContent = "";
        setTimeout(() => {
          window.location.href = `/client/pages/dashboardUser/dashboardUser.html`;
        }, 1000);
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
    }, 800);

    btnSubmit.removeAttribute("disabled");
    btnSubmit.classList.remove("btn-disabled");
    btnSubmit.textContent = "Submit";
  } catch (err) {
    console.error(err);
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
