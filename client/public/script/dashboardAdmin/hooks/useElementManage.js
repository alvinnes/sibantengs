const useElementManage = (data, index) => {
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
              <button class="btn-delete"><i class="ph ph-trash"></i></button>
            </div></td>
              </tr>
    `;
};

export default useElementManage;
