import useElementManage from "./useElementManage.js";

const tableData = document.querySelector("#tableData tbody");

export const sortedDataByDate = (datasNasabah) => {
  const sortedByDate = datasNasabah.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  tableData.innerHTML = "";
  sortedByDate.forEach((message, index) => {
    tableData.innerHTML += useElementManage(message, index);
  });
};

export const sortedDataByAlpha = (datasNasabah) => {
  const sortedMsgByAlpha = datasNasabah.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
  tableData.innerHTML = "";
  sortedMsgByAlpha.forEach((message, index) => {
    tableData.innerHTML += useElementManage(message, index);
  });
};

export const sortedDataByNik = (datasNasabah) => {
  const sortedByNik = datasNasabah.sort((a, b) => a.kk_number - b.kk_number);
  tableData.innerHTML = "";
  sortedByNik.forEach((message, index) => {
    tableData.innerHTML += useElementManage(message, index);
  });
};
