const windowLocation = "/client/pages/dashboardAdmin/adminManage.html";

const navItem = document.querySelectorAll("aside ul li");
const navLink = document.querySelectorAll("aside ul li a");

if (window.location.pathname === windowLocation) {
  navItem[1].classList.add("active");
  navLink[1].classList.add("active");
} else {
  navItem[1].classList.remove("active");
  navLink[1].classList.remove("active");
}

const tableData = document.querySelector("#tableData tbody");
const titleTable = document.getElementById("select");

let datasNasabah = [];
let page = 1;
let currentPagination = null;
let totalPage = null;

const btnDelete = document.querySelector(".btn-delete");
const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");
const infoPagination = document.querySelector(".info-pagination");

const dataNull = document.querySelector(".data-null");

window.addEventListener("load", async () => {
  try {
    const nik = JSON.parse(localStorage.getItem("nikAdmin")) || null;
    const urlProfile = `http://localhost:3000/data/userNikAdmin?nik=${nik}`;
    const url = `http://localhost:3000/data/userAll?page=${page}`;

    const response = await fetch(url);
    const responseProfile = await fetch(urlProfile);

    const result = await response.json();
    const resultProfile = await responseProfile.json();

    const dateNow = result.payload.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${result.pagination.currentPage} dari ${result.pagination.totalPage}`;

    resultProfile.payload.forEach((item) => {
      const firstLetter = item.username.slice(0, 1).toUpperCase();

      imgProfile.textContent = firstLetter;
      username.textContent = item.username;
      role.textContent = item.role;
    });

    if (dateNow.length === 0) {
      dataNull.style.display = "flex";
    } else {
      dataNull.style.display = "none";
      dateNow.forEach((item, index) => {
        const element = dataNasabah(item, index);
        tableData.innerHTML += element;
        datasNasabah.push(item);
      });
    }
  } catch (err) {
    console.error(err);
  }
});

const dataNasabah = (data, index) => {
  return `
             <tr>
              <td id="check" onclick="selectItem(${data.kk_number})">
                <input type="checkbox" name="check" />
              </td>
              <td>${index + 1}</td>
              <td id="fullname"><a href="./detailUser.html?nik=${
                data.kk_number
              }">${data.fullname}</a></td>
              <td>${data.email}</td>
              <td>${data.phone}</td>
              <td>${data.created_at.substring(0, 10)}</td>
              <td><div class="btn-action">
              <button class="btn-update">
                <a href="../form/formUpdateData.html?nik=${data.kk_number}">
                  <i class="ph ph-pencil-simple"></i>
                </a>
              </button>
              <button onclick="handleDeleteData(${
                data.kk_number
              })"><i class="ph ph-trash"></i></button>
            </div></td>
              </tr>
              `;
};

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", async (e) => {
  const url = `http://localhost:3000/data/userAll`;
  const request = await fetch(url);
  const result = await request.json();
  if (e.target.value === "") {
    tableData.innerHTML = "";
    result.payload.forEach((item, index) => {
      const element = dataNasabah(item, index);
      tableData.innerHTML += element;
    });
  }
  if (result.payload.length !== 0 && e.target.value == "") {
    handelDataNotFound.style.display = "none";
  }
});

const handelDataNotFound = document.querySelector(".data-not-found");

searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const url = `http://localhost:3000/data/user?nama=${e.target.value}`;
    const request = await fetch(url);
    const result = await request.json();
    if (e.target.value !== "") {
      tableData.innerHTML = "";
      result.payload.forEach((item, index) => {
        const element = dataNasabah(item, index);
        tableData.innerHTML += element;
      });
    }
    if (result.payload.length === 0) {
      console.log("Data not found");
      handelDataNotFound.style.display = "flex";
    }
  }
});

const sortByAlpha = () => {
  const sortedByAlpha = datasNasabah.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
  tableData.innerHTML = "";
  sortedByAlpha.forEach((item, index) => {
    const element = dataNasabah(item, index);
    tableData.innerHTML += element;
  });
};

const sortByNik = () => {
  const sortedByNik = datasNasabah.sort((a, b) => a.kk_number - b.kk_number);
  tableData.innerHTML = "";
  sortedByNik.forEach((item, index) => {
    const element = dataNasabah(item, index);
    tableData.innerHTML += element;
  });
};

const sortByDate = () => {
  const sortedByDate = datasNasabah.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  tableData.innerHTML = "";
  sortedByDate.forEach((item, index) => {
    const element = dataNasabah(item, index);
    tableData.innerHTML += element;
  });
};

const containerModalConfirm = document.querySelector(
  ".container-modal-confirm"
);
const modalConfirm = document.querySelector(".modal-confirm");
const btnAgree = document.getElementById("agree");
const btnDisagree = document.getElementById("disagree");

const handleDeleteData = async (nik) => {
  containerModalConfirm.classList.add("show-modal");
  btnDisagree.onclick = () => {
    containerModalConfirm.classList.remove("show-modal");
  };
  document.onclick = (e) => {
    if (
      !modalConfirm.contains(e.target) &&
      containerModalConfirm.contains(e.target)
    ) {
      containerModalConfirm.classList.remove("show-modal");
    }
  };
  btnAgree.addEventListener("click", async () => {
    try {
      const deletedData = datasNasabah.filter((item) => item.kk_number !== nik);
      tableData.innerHTML = "";
      deletedData.forEach((item, index) => {
        const element = dataNasabah(item, index);
        tableData.innerHTML += element;
      });
      containerModalConfirm.classList.remove("show-modal");
      const url = `http://localhost:3000/data/userAll?nik=${nik}`;
      const request = await fetch(url, { method: "DELETE" });
      const result = await request.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  });
};

// Function untuk menangani halaman selanjutnya
const nextPagination = async () => {
  if (page > totalPage - 1) return;
  page += 1;

  try {
    const url = `http://localhost:3000/data/userAll?page=${page}`;
    const response = await fetch(url);
    const result = await response.json();

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${result.pagination.currentPage} dari ${result.pagination.totalPage}`;

    tableData.innerHTML = "";
    result.payload.forEach((item, index) => {
      element = dataNasabah(item, index);
      tableData.innerHTML += element;
    });
  } catch (error) {
    console.error(error);
  }
};

const prevPagination = async () => {
  if (page < 2) return;
  page -= 1;

  try {
    const url = `http://localhost:3000/data/userAll?page=${page}`;
    const response = await fetch(url);
    const result = await response.json();

    currentPagination = result.pagination.currentPage;
    totalPage = result.pagination.totalPage;
    infoPagination.textContent = `Halaman ${result.pagination.currentPage} dari ${result.pagination.totalPage}`;

    tableData.innerHTML = "";
    result.payload.forEach((item, index) => {
      element = dataNasabah(item, index);
      tableData.innerHTML += element;
    });
  } catch (error) {
    console.error(error);
  }
};

// Function untuk menangani logout
const deleteSession = () => {
  localStorage.removeItem("nikAdmin");
  console.log("deleted");
  setTimeout(() => {
    window.location.href = "/client/index.html";
  }, 500);
};
