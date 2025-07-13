const errorMessageDate = document.querySelector(".error-message-date");

export const validateDate = (date) => {
  if (validator.isEmpty(date)) {
    errorMessageDate.textContent = "Tanggal lahir tidak boleh kosong!";
    return;
  } else {
    errorMessageDate.textContent = "";
  }

  return true;
};
