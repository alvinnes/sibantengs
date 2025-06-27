const form = document.querySelector("form");
const modalSucces = document.querySelector(".modal-succes");
const btnSubmit = document.querySelector(".btn-submit");
const showPassword = document.querySelector(".icon-eye");
const iconEye = document.querySelector(".icon-eye i");

const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputPhone = document.getElementById("phone");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    btnSubmit.textContent = "Loading...";
    const url = "http://localhost:3000/data";
    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
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
    inputEmail.value = "";
    inputPassword.value = "";
    inputPhone.value = "";

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
