import useCheckbox from "./useCheckbox.js";
import useElementMessage from "./useElementMessage.js";
import useMonth from "./useMonth.js";

const containerData = document.querySelector(".container-data");
const dataNotFound = document.querySelector(".data-not-found");
const deleteAll = document.querySelector(".delete-all");
const btnPagination = document.querySelector(".btn-pagination");
const sortByAlpha = document.getElementById("alpha");
const sortByDate = document.getElementById("date");

const useSearchMessage = async (urlData) => {
  const url = urlData;
  const response = await fetch(url);
  const result = await response.json();
  containerData.innerHTML = "";

  if (result.payload == 0) {
    dataNotFound.style.display = "flex";
    btnPagination.style.display = "none";
    sortByAlpha.setAttribute("disabled", true);
    sortByDate.setAttribute("disabled", true);
    deleteAll.setAttribute("disabled", true);
  } else {
    btnPagination.style.display = "flex";
    sortByAlpha.removeAttribute("disabled");
    sortByDate.removeAttribute("disabled");
    deleteAll.removeAttribute("disabled");
    dataNotFound.style.display = "none";
    result.payload.forEach((message) => {
      const date = new Date(message.created_at);
      const month = useMonth(date.getMonth());
      const time = `${date.getDate()}  ${month}`;

      containerData.innerHTML += useElementMessage(message, time);
      useCheckbox();
    });
  }
};

export default useSearchMessage;
