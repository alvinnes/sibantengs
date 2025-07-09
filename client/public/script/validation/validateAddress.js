const errorMessageAddress = document.querySelector(".error-message-address");

const validateAddress = (address) => {
  const sanitazedAddress = validator.blacklist(address, "!$%^&*+<>?~");

  if (validator.isEmpty(sanitazedAddress)) {
    errorMessageAddress.textContent = "Alamat tidak boleh kosong!";
    return;
  } else {
    errorMessageAddress.textContent = "";
  }
  return true;
};

export default validateAddress;
