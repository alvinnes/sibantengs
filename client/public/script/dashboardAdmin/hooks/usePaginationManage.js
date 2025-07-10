import useMonth from "./useMonth.js";
import useElementManage from "./useElementManage.js";

const tableData = document.querySelector("#tableData tbody");
const infoPagination = document.querySelector(".info-pagination");

const usePaginationManage = async (page, totalPage, currentPagination) => {
  try {
    const url = `http://localhost:3000/data/register?page=${page}`;
    const response = await fetch(url);
    const result = await response.json();

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${currentPagination} dari ${totalPage}`;

    tableData.innerHTML = "";
    result.payload.forEach((message) => {
      tableData.innerHTML += useElementManage(message);
    });
  } catch (error) {
    console.error(error);
  }
};

export default usePaginationManage;
