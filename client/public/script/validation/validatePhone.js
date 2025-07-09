const errorMessagePhone = document.querySelector(".error-message-phone");

const validatePhone = (phone) => {
  if (validator.isEmpty(phone)) {
    errorMessagePhone.textContent = "Nomor hp tidak boleh kosong!";
    return;
  } else if (!validator.isMobilePhone(phone, "id-ID")) {
    errorMessagePhone.textContent = "Format nomor harus indonesia!";
    return;
  } else {
    errorMessagePhone.textContent = "";
  }
  return true;
};

export default validatePhone;
