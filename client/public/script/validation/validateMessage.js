const errorMessageFullname = document.querySelector(".error-message-fullname");
const errorMessageEmail = document.querySelector(".error-message-email");
const errorMessagePhone = document.querySelector(".error-message-phone");
const errorMessage = document.querySelector(".error-message");

const validateMessage = (fullname, email, phone, message) => {
  if (validator.isEmpty(fullname)) {
    errorMessageFullname.textContent = "Nama tidak boleh kosong!";
    return;
  } else if (!validator.isLength(fullname, { min: 3 })) {
    errorMessageFullname.textContent = "Nama minimal 3 karakter!";
    return;
  } else {
    errorMessageFullname.textContent = "";
  }

  if (validator.isEmpty(email)) {
    errorMessageEmail.textContent = "Email tidak boleh kosong!";
    return;
  } else if (!validator.isEmail(email)) {
    errorMessageEmail.textContent = "Format email salah!!";
  } else {
    errorMessageEmail.textContent = "";
  }

  if (validator.isEmpty(phone)) {
    errorMessagePhone.textContent = "Nomor hp tidak boleh kosong!";
    return;
  } else if (!validator.isMobilePhone(phone, "id-ID")) {
    errorMessagePhone.textContent = "Format nomor hp salah!";
  } else if (!validator.isLength(phone, { min: 12 })) {
    errorMessagePhone.textContent = "Format nomor hp salah!";
    return;
  } else {
    errorMessagePhone.textContent = "";
  }

  if (validator.isEmpty(message)) {
    errorMessage.textContent = "Pesan tidak boleh kosong!";
    return;
  } else {
    errorMessage.textContent = "";
  }
  return true;
};

export default validateMessage;
