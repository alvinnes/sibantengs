const message = document.querySelector(".message");
const email = document.querySelector(".email");
const fullname = document.querySelector(".fullname");
const elDate = document.querySelector(".date");
const letter = document.querySelector(".letter");

window.addEventListener("load", async () => {
  const id = window.location.search.substring(12);

  const url = `https://api-sibantengs.smkw9jepara.sch.id/api/v1/messageId?created_at=${id}`;
  const request = await fetch(url);
  const response = await request.json();
  const data = response.payload[0];
  console.log(data);

  const firsLetter = data.fullname.slice(0, 1).toUpperCase();
  const date = data.created_at.slice(0, 10);

  message.textContent = data.message;
  letter.textContent = firsLetter;
  fullname.textContent = data.fullname;
  email.textContent = data.email;
  elDate.innerHTML += date;
});
