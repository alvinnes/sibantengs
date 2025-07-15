const navButtons = document.querySelector(".nav-buttons");
const profile = document.querySelector(".profile");
const trustPeople = document.querySelector(".trust-people");

const nikAdmin = JSON.parse(localStorage.getItem("nikAdmin")) || null;
const nikUser = JSON.parse(localStorage.getItem("nikUser")) || null;

window.addEventListener("load", async () => {
  if (nikAdmin !== null || nikUser !== null) {
    navButtons.style.display = "none";
    profile.style.display = "flex";

    if (nikAdmin) {
      trustPeople.style.display = "none";
      try {
        const urlAdmin = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userNikAdmin?nik=${nikAdmin}`;
        const responseAdmin = await fetch(urlAdmin);
        const resultAdmin = await responseAdmin.json();
        if (resultAdmin.payload[0].nik === nikAdmin) {
          const element = elementProfileAdmin(resultAdmin.payload[0]);
          profile.innerHTML += element;
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      trustPeople.style.display = "none";
      try {
        const urlUser = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userNik?nik=${nikUser}`;
        const responseUser = await fetch(urlUser);
        const resultUser = await responseUser.json();
        console.log(nikUser);
        if (resultUser.payload[0].kk_number === nikUser) {
          const element = elementProfileUser(resultUser.payload[0]);
          profile.innerHTML += element;
        }
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    navButtons.style.display = "flex";
    trustPeople.style.display = "flex";
    profile.style.display = "none";
  }
});

const elementProfileAdmin = (data) => {
  const firstLetter = data.username.slice(0, 1);
  return `
  <a href="./pages/dashboardAdmin/adminOverview.html">${firstLetter.toUpperCase()}</a>
  `;
};

const elementProfileUser = (data) => {
  const firstLetter = data.fullname.slice(0, 1);
  return `
      <a href="./pages/dashboardUser/dashboardUser.html">${firstLetter.toUpperCase()}</a>
      `;
};

import dataSteps from "../data/dataSteps.js";
const btnTab = document.querySelectorAll(".tab");
const stepsContainer = document.querySelector(".steps-container");

fetch("./public/data/dataServices.json")
  .then((response) => response.json())
  .then((result) => {
    result.forEach((service) => {
      stepsContainer.innerHTML += elementServices(service);

      btnTab.forEach((item) => {
        item.addEventListener("click", (e) => {
          btnTab.forEach((el) => el.classList.remove("active"));
          item.classList.add("active");

          stepsContainer.classList.add("hide-step");

          setTimeout(() => {
            stepsContainer.classList.remove("hide-step");
          }, 500);

          const filteredData = dataSteps.filter(
            (data) => data.category === e.target.textContent
          );

          stepsContainer.innerHTML = "";
          filteredData.forEach((data) => {
            result = { ...data };
            stepsContainer.innerHTML += elementServices(data);
          });
        });
      });
    });
  });

const elementServices = (data) => {
  return `
        <div class="step">
          <img
            src=${data.img}
            alt=${data.title}
          />
          <h3>${data.title}</h3>
          <p>
            ${data.step}
          </p>
        </div>
  `;
};

const formContact = document.querySelector(".form-contact");
const modalSucces = document.querySelector(".modal-succes");
const modalLoading = document.querySelector(".modal-loading");
const btnSubmit = document.getElementById("btnSubmit");

import validateMessage from "../script/validation/validateMessage.js";
const errorMessageNullData = document.querySelector(".error-message-null-data");

const inputFullname = document.getElementById("fullname");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");

formContact.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    fullname: e.target.fullname.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value,
  };

  try {
    if (nikUser == null && nikAdmin == null) {
      console.log("Login dulu");
      errorMessageNullData.textContent =
        "Login terlebih dahulu untuk mengirim pesan!";
      return;
    } else if (nikAdmin !== null) {
      errorMessageNullData.textContent = "admin tidak dapat mengirim pesan!";
      return;
    } else {
      console.log("Berhasil");
      errorMessageNullData.textContent = "";
    }

    if (
      !validateMessage(
        e.target.fullname.value,
        e.target.email.value,
        e.target.phone.value,
        e.target.message.value
      )
    )
      return;

    modalLoading.classList.add("show-modal-loading");
    btnSubmit.setAttribute("disabled", true);
    btnSubmit.style.cursor = "not-allowed";

    const url = "https://api-sibantengs.smkw9jepara.sch.id/api/v1/message";
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await request.json();
    console.log(result);

    modalLoading.classList.remove("show-modal-loading");
    modalSucces.classList.add("show-modal");
    setTimeout(() => {
      modalSucces.classList.remove("show-modal");
      btnSubmit.removeAttribute("disabled");
      btnSubmit.style.cursor = "pointer";
    }, 1000);

    inputFullname.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    inputMessage.value = "";
  } catch (error) {
    console.error(error);
  }
});

const btnIcon = document.querySelector(".icons");
const navbar = document.querySelector("nav ul");
const navbarItems = document.querySelectorAll("ul li");

btnIcon.addEventListener("click", () => {
  navbar.classList.toggle("show-navbar");
});

document.addEventListener("click", (e) => {
  if (!btnIcon.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("show-navbar");
  }
});

window.addEventListener("hashchange", () => {
  navbarItems.forEach((item) => {
    const navLink = "#" + item.textContent.toLowerCase();

    if (window.location.hash == navLink) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});
