const username = document.getElementById("username");
const role = document.getElementById("role");
const imgProfile = document.querySelector(".img-profile");

window.addEventListener("load", async () => {
  const nik = JSON.parse(localStorage.getItem("nikUser"));
  try {
    const url = `http://localhost:3000/api/v1/userNik?nik=${nik}`;
    const response = await fetch(url);
    const result = await response.json();
    result.payload.forEach((item) => {
      const firstLetter = item.fullname.slice(0, 1).toUpperCase();
      imgProfile.textContent = firstLetter;
      username.textContent = item.fullname;
      role.textContent = item.role;
    });
  } catch (err) {
    console.error(err);
  }
});

const deleteSession = () => {
  localStorage.removeItem("nikUser");
  console.log("deleted");
  setTimeout(() => {
    window.location.href = "/client/index.html";
  }, 500);
};
