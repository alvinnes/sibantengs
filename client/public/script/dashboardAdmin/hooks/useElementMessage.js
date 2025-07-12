const useElementMessage = (data, time) => {
  const firstLetter = data.fullname.slice(0, 1).toUpperCase();
  return `
          <div class="wrapper-item" data-item=${data.created_at}>
          <div class="first-content">
          <input type="checkbox" id="check" value=${data.created_at} >
          <div class="profile-user">
          <p>${firstLetter}</p>
          </div>
          <h3 id="fullname">${data.fullname}</h3>
          </div>
            <p class="message"><a href="/client/pages/dashboardAdmin/detailMessage.html?fullname=${data.fullname}">s${data.message}</a></p>  
            <p class="date">${time}</p>
          </div>
    `;
};

export default useElementMessage;
