const errorMessagePassword = document.querySelector(".error-message-password");
const errorMessageRepeatPassword = document.querySelector(
  ".error-message-repeat-password"
);

export const validatePassword = (password) => {
  const digits = password.match(/\d/g);
  const symbols = password.match(/[@#$_-]/g);

  const hasNumbers = digits && digits.length > 2;
  const hasSymbol = symbols && symbols.length > 0;

  if (validator.isEmpty(password)) {
    errorMessagePassword.textContent = "Password tidak boleh kosong!";
    return;
  } else if (!validator.isLength(password, { min: 8 })) {
    errorMessagePassword.textContent = "Password minimal 8 karakter!";
    return;
  } else if (!hasSymbol) {
    errorMessagePassword.textContent = "Password harus memiliki symbol";
    return;
  } else if (!hasNumbers) {
    errorMessagePassword.textContent =
      "Password harus memiliki minimal 3 angka";
    return;
  } else {
    errorMessagePassword.textContent = "";
  }
  return true;
};

export const validateRepeatPassword = (password, repeat_password) => {
  if (password !== repeat_password) {
    errorMessageRepeatPassword.textContent = "Password tidak sama!";
    return;
  } else {
    errorMessageRepeatPassword.textContent = "";
  }
  return true;
};
