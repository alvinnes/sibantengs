const nik = parseInt(window.location.search.substring(5));
const profile = document.querySelector(".general-information");

const statusAccount = document.querySelector(".status");
const fullname = document.querySelector(".text-header h3");
const email = document.getElementById("email");
const addres = document.getElementById("addres");
const created = document.querySelector(".created");

const containerModal = document.querySelector(".container-detail-img");
const modal = document.querySelector(".detail-img");
const btnClose = document.querySelector(".btn-close");
const preview = document.querySelectorAll(".preview");
const fileItem = document.querySelectorAll(".file-item");

window.addEventListener("load", async () => {
  try {
    const url = `http://localhost:3000/data/userNik?nik=${nik}`;
    const response = await fetch(url);
    const result = await response.json();
    const data = result.payload[0];
    const date = new Date(data.created_at).toString().substring(4, 15);

    statusAccount.innerHTML += data.status;
    fullname.textContent = data.fullname;
    email.textContent = data.email;
    addres.textContent = data.addres;
    created.innerHTML += date;

    preview[0].setAttribute("src", `http://localhost:3000/${data.img_ktp}`);
    preview[1].setAttribute("src", `http://localhost:3000/${data.img_kk}`);
    preview[2].setAttribute(
      "src",
      `http://localhost:3000/${data.img_ktp_person}`
    );

    const element = elementInput(data);
    profile.innerHTML += element;
  } catch (err) {
    console.error(err);
  }
});

fileItem.forEach((item) => {
  item.addEventListener("click", () => {
    containerModal.classList.add("show-modal");

    document.onclick = (e) => {
      if (
        !item.contains(e.target) &&
        !btnClose.contains(e.target) &&
        !modal.contains(e.target)
      ) {
        containerModal.classList.remove("show-modal");
      }
    };
  });
});

btnClose.onclick = () => {
  containerModal.classList.remove("show-modal");
};

const elementInput = (data) => {
  return `
     <label>
          <p>NIK</p>
          <input type="text" disabled value=${data.kk_number} >
        </label>
        <label>
          <p>No. Hp</p>
          <input type="text" disabled value=${data.phone}>
        </label>
        <label>
          <p>Password</p>
          <input type="text" disabled value=${data.password}>
        </label>
        <label>
          <p>Tanggal Lahir</p>
          <input type="text" disabled value=${data.birtdate}>
        </label>
        <label>
          <p>Rekening</p>
          <input type="text" disabled value=${data.rekening}>
        </label>
        <label>
          <p>Nomor KTP</p>
          <input type="text" disabled value=${data.ktp_number}>
        </label>
    `;
};
