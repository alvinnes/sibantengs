import useCheckbox from "./useCheckbox.js";
import useElement from "./useElement.js";
import useMonth from "./useMonth.js";

const containerData = document.querySelector(".container-data");
const infoPagination = document.querySelector(".info-pagination");
const dataNotFound = document.querySelector(".data-not-found");
const deleteAll = document.querySelector(".delete-all");

const useSearch = async (
  urlData,
  currentPagination,
  totalPage,
  objIsNullData
) => {
  const url = urlData;
  const response = await fetch(url);
  const result = await response.json();
  containerData.innerHTML = "";

  if (result.payload == 0) {
    dataNotFound.style.display = "flex";
    objIsNullData.isNullData = true;
    deleteAll.setAttribute("disabled", true);

    currentPagination = result.pagination.currentPage;
    totalPage = 1;
    infoPagination.textContent = `Halaman ${currentPagination} dari ${totalPage}`;
  } else {
    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${currentPagination} dari ${totalPage}`;

    deleteAll.removeAttribute("disabled");
    objIsNullData.isNullData = false;
    dataNotFound.style.display = "none";
    result.payload.forEach((message) => {
      const date = new Date(message.created_at);
      const month = useMonth(date.getMonth());
      const time = `${date.getDate()}  ${month}`;

      containerData.innerHTML += useElement(message, time);
      useCheckbox();
    });
  }
};

export default useSearch;
