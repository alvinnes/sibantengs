const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");
const windowLocation = "/client/pages/dashboardUserHistory.html";

if (window.location.pathname === windowLocation) {
  navItem[2].classList.add("active");
  navLink[2].classList.add("active");
} else {
  navItem[2].classList.remove("active");
  navLink[2].classList.remove("active");
}
