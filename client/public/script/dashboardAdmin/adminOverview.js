const windowLocation = "/client/pages/dashboardAdmin/adminOverview.html";

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");

if (window.location.pathname === windowLocation) {
  navItem[0].classList.add("active");
  navLink[0].classList.add("active");
} else {
  navItem[0].classList.remove("active");
  navLink[0].classList.remove("active");
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");

hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
});

document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target) && !sidebar.contains(e.target)) {
    sidebar.classList.remove("show-sidebar");
  }
});

const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");

const totalMessage = document.querySelector(".total-message");
const totalUser = document.querySelector(".total-user");

window.addEventListener("load", async () => {
  const nik = JSON.parse(localStorage.getItem("nikAdmin")) || [];
  try {
    const url = `http://localhost:3000/api/v1/userNikAdmin?nik=${nik}`;
    const urlMessage = "http://localhost:3000/api/v1/message";
    const urlRegister = "http://localhost:3000/api/v1/register";

    const responseMessage = await fetch(urlMessage);
    const response = await fetch(url);
    const responseRegister = await fetch(urlRegister);

    const result = await response.json();
    const resultMessage = await responseMessage.json();
    const resultRegister = await responseRegister.json();

    result.payload.forEach((item) => {
      const firstLetter = item.username.slice(0, 1).toUpperCase();

      imgProfile.textContent = firstLetter;
      username.textContent = item.username;
      role.textContent = item.role;
    });

    totalUser.textContent = resultRegister.totalData;
    totalMessage.textContent = resultMessage.totalData;
  } catch (err) {
    console.error(err);
  }
});

const deleteSession = () => {
  localStorage.removeItem("nikAdmin");
  console.log("deleted");
  setTimeout(() => {
    window.location.href = "/client/index.html";
  }, 500);
};
