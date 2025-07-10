import useElementManage from "./useElementManage.js";

const tableData = document.querySelector("#tableData tbody");
const dataNotFound = document.querySelector(".data-not-found");
const btnPagination = document.querySelector(".btn-pagination");
const sortByAlpha = document.getElementById("alpha");
const sortByDate = document.getElementById("date");
const sortByNik = document.getElementById("nik");

const useSearchManage = async (urlData) => {
  const url = urlData;
  const response = await fetch(url);
  const result = await response.json();
  tableData.innerHTML = "";

  if (result.payload == 0) {
    dataNotFound.style.display = "flex";
    btnPagination.style.display = "none";
    sortByAlpha.setAttribute("disabled", true);
    sortByDate.setAttribute("disabled", true);
    sortByNik.setAttribute("disabled", true);
  } else {
    btnPagination.style.display = "flex";
    sortByAlpha.removeAttribute("disabled");
    sortByDate.removeAttribute("disabled");
    sortByNik.removeAttribute("disabled");
    dataNotFound.style.display = "none";

    result.payload.forEach((message, index) => {
      tableData.innerHTML += useElementManage(message, index);
    });
  }
};

export default useSearchManage;
