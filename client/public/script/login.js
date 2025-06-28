const form = document.querySelector("form");
const modalSucces = document.querySelector(".modal-succes");
const btnSubmit = document.querySelector(".btn-submit");
const showPassword = document.querySelector(".icon-eye");
const iconEye = document.querySelector(".icon-eye i");

const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");

const errorMessageUsername = document.querySelector(".error-message-username");
const errorMessagePassword = document.querySelector(".error-message-password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    if (inputUsername.value.length === 0) {
      errorMessageUsername.textContent = "Username tidak boleh kosong!";
    } else if (inputUsername.value.length < 3) {
      errorMessageUsername.textContent = "Username minimal 3 karakter!";
    } else if (inputUsername.value.length > 20) {
      errorMessageUsername.textContent = "Username maximal 20 karakter!";
    } else {
      errorMessageUsername.textContent = "";
    }

    const digits = inputPassword.value.match(/\d/g);
    const symbols = inputPassword.value.match(/[@#$_-]/g);

    const hasNumbers = digits && digits.length > 2;
    const hasSymbol = symbols && symbols.length > 0;

    if (inputPassword.value.length === 0) {
      errorMessagePassword.textContent = "Password tidak boleh kosong!";
    } else if (inputPassword.value.length < 8) {
      errorMessagePassword.textContent = "Password minimal 8 karakter!";
    } else if (!hasSymbol) {
      errorMessagePassword.textContent = "Password harus memiliki symbol";
    } else if (!hasNumbers) {
      errorMessagePassword.textContent =
        "Password harus memiliki minimal 3 angka";
    } else {
      errorMessageUsername.textContent = "";
    }

    btnSubmit.textContent = "Loading...";
    btnSubmit.setAttribute("disabled", "true");
    btnSubmit.classList.add("btn-disabled");

    const url = "http://localhost:3000/data";
    const data = {
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
    };
    const request = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await fetch(request);
    const result = await response.json();
    const error = result.errors?.forEach((item) => console.log(item));
    console.log(error);
  } catch (err) {
    console.error(err);
  } finally {
    inputUsername.value = "";
    inputPassword.value = "";

    btnSubmit.removeAttribute("disabled");
    btnSubmit.classList.remove("btn-disabled");

    btnSubmit.textContent = "Submit";
    modalSucces.classList.add("show-modal");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal");
    }, 1000);
  }
});

showPassword.addEventListener("click", () => {
  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    iconEye.classList.remove("ph-eye-closed");
    iconEye.classList.add("ph-eye");
  } else {
    inputPassword.type = "password";
    iconEye.classList.remove("ph-eye");
    iconEye.classList.add("ph-eye-closed");
  }
});
