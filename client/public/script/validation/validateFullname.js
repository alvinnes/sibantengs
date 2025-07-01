const errorMessageFullname = document.querySelector(".error-message-fullname");

const validateFullname = (fullname) => {
  const onlyAlpha = /^[A-Za-z\s]+$/.test(fullname);
  if (validator.isEmpty(fullname)) {
    errorMessageFullname.textContent = "Nama tidak boleh kosong!";
    return;
  } else if (!validator.isLength(fullname, { min: 3 })) {
    errorMessageFullname.textContent = "Nama minimal 3 karakter!";
    return;
  } else if (!onlyAlpha) {
    errorMessageFullname.textContent =
      "Nama tidak boleh memiliki symbol dan angka!";
    return;
  } else {
    errorMessageFullname.textContent = "";
  }
  return true;
};

export default validateFullname;
