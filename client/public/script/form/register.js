import validateAddress from "../validation/validateAddress.js";
import validateFullname from "../validation/validateFullname.js";
import validatePhone from "../validation/validatePhone.js";
import validateEmail from "../validation/validateEmail.js";
import validateKtpNumber from "../validation/validateKtpNumber.js";
import validateKkNumber from "../validation/validateKkNumber.js";
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
const agree = document.getElementById("agree");
const btnSubmit = document.querySelector(".btn-submit");

btnSubmit.disabled = !agree.checked;
btnSubmit.style.cursor = agree.checked ? "pointer" : "not-allowed";

agree.onclick = () => {
  if (agree.checked) {
    btnSubmit.disabled = false;
    btnSubmit.style.cursor = "pointer";
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = "not-allowed";
  }
};

const modalLoading = document.querySelector(".modal-loading");
const modalSucces = document.querySelector(".modal-succes");
const previewKtp = document.getElementById("preview-ktp");
console.log(previewKtp.getAttribute("src"));

form.addEventListener("submit", async (e) => {
  const fullname = e.target.fullname.value;
  const phone = e.target.phone.value;
  const email = e.target.email.value;
  const address = e.target.addres.value;
  const password = e.target.password.value;
  const repeat_password = e.target.repeat_password.value;
  const ktp_number = e.target.ktp_number.value;
  const kk_number = e.target.kk_number.value;

  e.preventDefault();
  try {
    if (!validateFullname(fullname)) return;
    if (!validatePhone(phone)) return;
    if (!validateEmail(email)) return;
    if (!validateAddress(address)) return;
    if (!validatePassword(password)) return;
    if (!validateRepeatPassword(password, repeat_password)) return;
    if (!validateKtpNumber(ktp_number)) return;
    if (!validateKkNumber(kk_number)) return;
    if (!validateImgKtp(e.target.img_ktp.value)) return;
    if (!validateImgKk(e.target.img_kk.value)) return;
    if (!validateImgKtpPerson(e.target.img_ktp_person.value)) return;

    modalLoading.classList.add("show-modal-loading");
    const data = {
      fullname: fullname,
      phone: phone,
      email: email,
      addres: address,
      password: password,
      repeat_password: repeat_password,
      birtdate: e.target.birtdate.value,
      rekening: e.target.rekening.value,
      ktp_number: ktp_number,
      kk_number: kk_number,
      img_ktp: e.target.img_ktp.value,
      img_kk: e.target.img_kk.value,
      img_ktp_person: e.target.img_ktp_person.value,
    };
    console.log(data);

    const urlPostData = "http://localhost:3000/data/register";
    const request = await fetch(urlPostData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);

    modalLoading.classList.remove("show-modal-loading");
    modalSucces.classList.add("show-modal-succes");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal-succes");
    }, 1000);
    setTimeout(() => {
      window.location.href = "/client/pages/login.html";
    }, 1000);
  } catch (err) {
    console.error(err);
  }
});
