const inputKtp = document.getElementById("img_ktp");
const inputKk = document.getElementById("img_kk");
const inputKtpPerson = document.getElementById("img_ktp_person");

const previewKtp = document.getElementById("preview-ktp");
const previewKk = document.getElementById("preview-kk");
const previewKtpPerson = document.getElementById("preview-ktp-person");

const labelFile = document.querySelectorAll(".file-item .label-file");
const iconFile = document.querySelectorAll(".file-item i");

previewKtpPerson.style.display = "none";
previewKtp.style.display = "none";
previewKk.style.display = "none";

inputKtp.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      labelFile[0].style.display = "none";
      iconFile[0].style.display = "none";
      previewKtp.style.display = "block";
      previewKtp.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    labelFile[0].style.display = "flex";
    iconFile[0].style.display = "block";
    previewKtp.style.display = "none";
    previewKtp.src = "";
  }
});

inputKk.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      labelFile[1].style.display = "none";
      iconFile[1].style.display = "none";
      previewKk.style.display = "block";
      previewKk.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    labelFile[1].style.display = "flex";
    iconFile[1].style.display = "block";
    previewKk.style.display = "none";
    previewKk.src = "";
  }
});

inputKtpPerson.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewKtpPerson.style.display = "block";
      previewKtpPerson.src = e.target.result;
      labelFile[2].style.display = "none";
      iconFile[2].style.display = "none";
    };

    reader.readAsDataURL(file);
  } else {
    labelFile[2].style.display = "flex";
    iconFile[2].style.display = "block";
    previewKtpPerson.style.display = "none";
    previewKtpPerson.src = "";
  }
});
