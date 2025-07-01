const errorMessageImgKtp = document.querySelector(".error-message-img-ktp");
const errorMessageImgKk = document.querySelector(".error-message-img-kk");
const errorMessageImgKtpPerson = document.querySelector(
  ".error-message-img-ktp-person"
);

export const validateImgKtp = (img_ktp) => {
  if (validator.isEmpty(img_ktp)) {
    errorMessageImgKtp.textContent = "Foto ktp tidak boleh kosong!";
    return;
  } else {
    errorMessageImgKtp.textContent = "";
  }
  return true;
};

export const validateImgKk = (img_kk) => {
  if (validator.isEmpty(img_kk)) {
    errorMessageImgKk.textContent = "Foto kk tidak boleh kosong!";
    return;
  } else {
    errorMessageImgKk.textContent = "";
  }
  return true;
};

export const validateImgKtpPerson = (img_ktp_person) => {
  if (validator.isEmpty(img_ktp_person)) {
    errorMessageImgKtpPerson.textContent =
      "Foto selfie dengan ktp tidak boleh kosong!";
    return;
  } else {
    errorMessageImgKtpPerson.textContent = "";
  }
  return true;
};
