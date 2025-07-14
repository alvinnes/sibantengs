const containerModal = document.querySelector(".container-modal-confirm");
const modalConfirm = document.querySelector(".modal-confirm");
const btnDelete = document.querySelector(".btn-delete");
const btnAgree = document.getElementById("agree");
const btnDisagree = document.getElementById("disagree");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const sortByAlpha = document.getElementById("alpha");
const sortByDate = document.getElementById("date");

const useCheckbox = () => {
  const checkbox = document.querySelectorAll("#check");
  checkbox.forEach((btn) => {
    const wrapperItem = document.querySelectorAll(`[data-item="${btn.value}"]`);
    btn.onclick = (e) => {
      if (e.target.checked == true) {
        sortByDate.setAttribute("disabled", true);
        sortByAlpha.setAttribute("disabled", true);
        btnNext.setAttribute("disabled", true);
        btnPrev.setAttribute("disabled", true);
        wrapperItem.forEach((list) => {
          list.style.backgroundColor = "#87cefa10";
        });
      } else {
        btnNext.removeAttribute("disabled");
        btnPrev.removeAttribute("disabled");
        sortByAlpha.removeAttribute("disabled");
        sortByDate.removeAttribute("disabled");
        wrapperItem.forEach((list) => {
          list.style.backgroundColor = "white";
        });
      }
    };
    btnDelete.addEventListener("click", () => {
      btn.classList.toggle("show-checkbox");
      if (btn.checked == true) {
        containerModal.classList.add("show-modal");
        wrapperItem.forEach((item) => {
          btnDeleteAgree(item);
          btnDeleteDisagree(checkbox, wrapperItem);
          btnDeleteDoc(btn, wrapperItem);
        });
      }
    });
  });
};

const btnDeleteAgree = (item) => {
  btnAgree.onclick = async () => {
    item.remove();
    try {
      containerModal.classList.remove("show-modal");
      const url = `http://localhost:3000/api/v1/messageOne?date=${item.dataset.item}`;
      const request = await fetch(url, { method: "DELETE" });
      const response = await request.json();
      console.log(response);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
};

const btnDeleteDisagree = (checkbox, wrapperItem) => {
  btnDisagree.onclick = () => {
    checkbox.forEach((btn) => (btn.checked = false));
    btnNext.removeAttribute("disabled");
    btnPrev.removeAttribute("disabled");
    sortByAlpha.removeAttribute("disabled");
    sortByDate.removeAttribute("disabled");
    wrapperItem.forEach((list) => {
      list.style.backgroundColor = "white";
    });
  };
};

const btnDeleteDoc = (btn, wrapperItem) => {
  document.onclick = (e) => {
    if (
      !modalConfirm.contains(e.target) &&
      !btnDelete.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      btn.checked = false;
      btnNext.removeAttribute("disabled");
      btnPrev.removeAttribute("disabled");
      sortByAlpha.removeAttribute("disabled");
      sortByDate.removeAttribute("disabled");
      wrapperItem.forEach((list) => {
        list.style.backgroundColor = "white";
      });
    }
  };
};

export default useCheckbox;
