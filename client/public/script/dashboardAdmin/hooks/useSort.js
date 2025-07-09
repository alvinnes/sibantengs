import useCheckbox from "./useCheckbox.js";
import useMonth from "./useMonth.js";
import useElement from "./useElement.js";
const containerData = document.querySelector(".container-data");

const useSort = (data, isNullData) => {
  if (isNullData) return;

  containerData.innerHTML = "";
  data.forEach((message) => {
    const date = new Date(message.created_at);
    const month = useMonth(date.getMonth());
    const time = `${date.getDate()}  ${month}`;

    containerData.innerHTML += useElement(message, time);
  });

  useCheckbox();
};

export default useSort;
