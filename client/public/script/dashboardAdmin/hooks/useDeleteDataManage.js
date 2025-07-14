import useElementManage from "./useElementManage.js";

const containerModalConfirm = document.querySelector(
  ".container-modal-confirm"
);
const tableData = document.querySelector("#tableData tbody");
const modalConfirm = document.querySelector(".modal-confirm");
const btnAgree = document.getElementById("agree");
const btnDisagree = document.getElementById("disagree");

const useDeleteDataManage = (nik, datasNasabah, btn) => {
  containerModalConfirm.classList.add("show-modal");
  btnDisagree.onclick = () => {
    containerModalConfirm.classList.remove("show-modal");
  };
  document.onclick = (e) => {
    if (!btn.contains(e.target) && !modalConfirm.contains(e.target)) {
      containerModalConfirm.classList.remove("show-modal");
    }
  };
  btnAgree.addEventListener("click", async () => {
    console.log(nik);
    try {
      const deletedData = datasNasabah.filter((item) => item.kk_number !== nik);
      tableData.innerHTML = "";
      deletedData.forEach((item, index) => {
        const element = useElementManage(item, index);
        tableData.innerHTML += element;
      });
      containerModalConfirm.classList.remove("show-modal");
      const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/userAll?nik=${nik}`;
      const request = await fetch(url, { method: "DELETE" });
      const result = await request.json();
      console.log(result);

      location.reload();
    } catch (err) {
      console.error(err);
    }
  });
};

export default useDeleteDataManage;
