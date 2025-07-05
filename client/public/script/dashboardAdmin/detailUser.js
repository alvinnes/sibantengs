const nik = parseInt(window.location.search.substring(5));
const profile = document.querySelector(".general-information");

const statusAccount = document.querySelector(".status");
const fullname = document.querySelector(".text-header h3");
const email = document.getElementById("email");
const addres = document.getElementById("addres");
const created = document.querySelector(".created");

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

    const element = elementInput(data);
    profile.innerHTML += element;
  } catch (err) {
    console.error(err);
  }
});

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
