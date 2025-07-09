const errorMessageKk = document.querySelector(".error-message-kk");

const validateKkNumber = (kk_number) => {
  if (validator.isEmpty(kk_number)) {
    errorMessageKk.textContent = "NIK tidak boleh kosong!";
    return;
  } else if (!validator.isLength(kk_number, { max: 16 })) {
    errorMessageKk.textContent = "NIK salah!";
    return;
  } else {
    errorMessageKk.textContent = "";
  }
  return true;
};

export default validateKkNumber;
