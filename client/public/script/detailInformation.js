const values = document.querySelectorAll(".value");
const contentValue = document.querySelectorAll(".content-value");

values.forEach((item, index) => {
  item.addEventListener("click", () => {
    contentValue[index].classList.toggle("show-value");
  });
});
