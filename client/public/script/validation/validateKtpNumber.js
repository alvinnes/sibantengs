const errorMessageKtp = document.querySelector(".error-message-ktp");

const validateKtpNumber = (ktp_number) => {
  if (validator.isEmpty(ktp_number)) {
    errorMessageKtp.textContent = "Nomor ktp tidak boleh kosong!";
    return;
  } else if (!validator.isLength(ktp_number, { max: 16 })) {
    errorMessageKtp.textContent = "Format ktp salah!";
    return;
  } else {
    errorMessageKtp.textContent = "";
  }
  return true;
};

export default validateKtpNumber;
