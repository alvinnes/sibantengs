import useCheckbox from "./useCheckbox.js";
import useElementMessage from "./useElementMessage.js";
import useMonth from "./useMonth.js";

const containerData = document.querySelector(".container-data");
const infoPagination = document.querySelector(".info-pagination");

const usePaginationMessage = async (page, totalPage, currentPagination) => {
  try {
    const url = `http://localhost:3000/api/v1/message?page=${page}`;
    const response = await fetch(url);
    const result = await response.json();

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${currentPagination} dari ${totalPage}`;

    containerData.innerHTML = "";
    result.payload.forEach((message) => {
      const date = new Date(message.created_at);
      const month = useMonth(date.getMonth());
      const time = `${date.getDate()}  ${month}`;

      containerData.innerHTML += useElementMessage(message, time);
    });

    useCheckbox();
  } catch (error) {
    console.error(error);
  }
};

export default usePaginationMessage;
