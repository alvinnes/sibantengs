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

    const formDatas = new FormData(e.target);

    const urlPostData = "https://api-sibantengs.smkw9jepara.sch.id/api/v1/register";
    const request = await fetch(urlPostData, {
      method: "POST",
      body: formDatas,
    });

    const response = await request.json();
    console.log(response);

    modalLoading.classList.remove("show-modal-loading");
    modalSucces.classList.add("show-modal-succes");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal-succes");
    }, 800);
    setTimeout(() => {
      window.location.href = "/client/pages/dashboardAdmin/adminManage.html";
    }, 1000);
  } catch (err) {
    console.error(err);
  }
});
