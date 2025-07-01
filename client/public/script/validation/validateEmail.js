const errorMessageEmail = document.querySelector(".error-message-email");

const validateEmail = (email) => {
  let sanitazedEmail = validator.escape(email);
  sanitazedEmail = validator.normalizeEmail(sanitazedEmail, {
    gmail_remove_dots: true,
    gmail_remove_subaddress: true,
    gmail_convert_googlemaildotcom: true,
  });

  if (validator.isEmpty(email)) {
    errorMessageEmail.textContent = "Email tidak boleh kosong!";
  } else if (!validator.isEmail(sanitazedEmail)) {
    errorMessageEmail.textContent = "Format email anda salah!";
    return;
  } else {
    errorMessageEmail.textContent = "";
  }
  return true;
};

export default validateEmail;
