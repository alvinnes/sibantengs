import validateAddress from "../validation/validateAddress.js";
import validateFullname from "../validation/validateFullname.js";
import validatePhone from "../validation/validatePhone.js";
import validateEmail from "../validation/validateEmail.js";
import validateKtpNumber from "../validation/validateKtpNumber.js";
import validateKkNumber from "../validation/validateKkNumber.js";
import { validateDate } from "../validation/validateDate.js";
import {
  validateImgKk,
  validateImgKtp,
  validateImgKtpPerson,
} from "../validation/validateImgFile.js";
import {
  validatePassword,
  validateRepeatPassword,
} from "../validation/validatePassword.js";

const form = document.querySelector("form");

const modalLoading = document.querySelector(".modal-loading");
const modalSucces = document.querySelector(".modal-succes");

const inputFullname = document.getElementById("fullname");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputAddres = document.getElementById("addres");
const inputKk = document.getElementById("kk_number");
const inputKtp = document.getElementById("ktp_number");
const inputPassword = document.getElementById("password");
const inputRepeatPassword = document.getElementById("repeat_password");

const nik = parseInt(window.location.search.substring(5));
window.addEventListener("load", async () => {
  try {
    const url = `http://localhost:3000/api/v1/userNik?nik=${nik}`;
    const response = await fetch(url);
    const result = await response.json();
    const data = result.payload[0];
    const hidePassword = data.password.slice(0, 3) + "****";

    inputFullname.value = data.fullname;
    inputPhone.value = data.phone;
    inputEmail.value = data.email;
    inputAddres.value = data.addres;

    inputPassword.setAttribute("type", "text");
    inputRepeatPassword.setAttribute("type", "text");

    inputPassword.value = hidePassword;
    inputRepeatPassword.value = hidePassword;

    inputKtp.value = data.ktp_number;
    inputKk.value = data.kk_number;
  } catch (err) {
    console.error(err);
  }
});

form.addEventListener("submit", async (e) => {
  const fullname = e.target.fullname.value;
  const phone = e.target.phone.value;
  const email = e.target.email.value;
  const address = e.target.addres.value;
  const password = e.target.password.value;
  const repeat_password = e.target.repeat_password.value;
  const ktp_number = e.target.ktp_number.value;
  const kk_number = e.target.kk_number.value;
  const img_ktp = e.target.img_ktp.value;
  const img_kk = e.target.img_kk.value;
  const img_ktp_person = e.target.img_ktp_person.value;

  e.preventDefault();
  try {
    if (!validateFullname(fullname)) return;
    if (!validatePhone(phone)) return;
    if (!validateEmail(email)) return;
    if (!validateAddress(address)) return;
    if (!validatePassword(password)) return;
    if (!validateRepeatPassword(password, repeat_password)) return;
    if (!validateDate(e.target.birtdate.value)) return;
    if (!validateKtpNumber(ktp_number)) return;
    if (!validateKkNumber(kk_number)) return;
    if (!validateImgKtp(img_ktp)) return;
    if (!validateImgKk(img_kk)) return;
    if (!validateImgKtpPerson(img_ktp_person)) return;

    modalLoading.classList.add("show-modal-loading");
    const fromDatas = new FormData(e.target);

    const urlPostData = `http://localhost:3000/api/v1/userAll?nik=${nik}`;
    const request = await fetch(urlPostData, {
      method: "PATCH",
      body: fromDatas,
    });

    const response = await request.json();
    console.log(response);

    modalLoading.classList.remove("show-modal-loading");
    modalSucces.classList.add("show-modal-succes");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal-succes");
    }, 800);
    setTimeout(() => {
      window.location.href = "../../pages/dashboardAdmin/adminManage.html";
    }, 1000);
  } catch (err) {
    console.error(err);
  }
});
