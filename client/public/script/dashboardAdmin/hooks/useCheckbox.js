const containerModal = document.querySelector(".container-modal-confirm");
const modalConfirm = document.querySelector(".modal-confirm");
const btnDelete = document.querySelector(".btn-delete");
const btnAgree = document.getElementById("agree");
const btnDisagree = document.getElementById("disagree");

const useCheckbox = (objIsChecked) => {
  const checkbox = document.querySelectorAll("#check");
  checkbox.forEach((btn) => {
    const wrapperItem = document.querySelectorAll(`[data-item="${btn.value}"]`);

    btn.onclick = (e) => {
      if (e.target.checked == true) {
        objIsChecked.isChecked = true;
        wrapperItem.forEach((list) => {
          list.style.backgroundColor = "#87cefa10";
        });
      } else {
        objIsChecked.isChecked = false;
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
          btnDeleteDisagree(btn);
          btnDeleteDoc(btn);
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
      const url = `http://localhost:3000/data/messageOne?date=${item.dataset.item}`;
      const request = await fetch(url, { method: "DELETE" });
      const response = await request.json();
      console.log(response);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
};

const btnDeleteDisagree = (btn) => {
  btnDisagree.onclick = () => {
    if (btn.checked == true) {
      btn.checked = false;
    } else {
      btn.checked = true;
    }
  };
};

const btnDeleteDoc = (btn) => {
  document.onclick = (e) => {
    if (
      !modalConfirm.contains(e.target) &&
      !btnDelete.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      if (btn.checked == true) {
        btn.checked = false;
      } else {
        btn.checked = true;
      }
    }
  };
};

export default useCheckbox;
