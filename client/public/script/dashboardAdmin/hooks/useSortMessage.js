import useCheckbox from "./useCheckbox.js";
import useMonth from "./useMonth.js";
import useElementMessage from "./useElementMessage.js";
const containerData = document.querySelector(".container-data");

export const sortedDataByDate = (dataMessages) => {
  const sortedByDate = dataMessages.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  containerData.innerHTML = "";
  sortedByDate.forEach((message) => {
    const date = new Date(message.created_at);
    const month = useMonth(date.getMonth());
    const time = `${date.getDate()}  ${month}`;

    containerData.innerHTML += useElementMessage(message, time);
  });

  useCheckbox();
};

export const sortedDataByAlpha = (dataMessages) => {
  const sortedMsgByAlpha = dataMessages.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
  containerData.innerHTML = "";
  sortedMsgByAlpha.forEach((message) => {
    const date = new Date(message.created_at);
    const month = useMonth(date.getMonth());
    const time = `${date.getDate()}  ${month}`;

    containerData.innerHTML += useElementMessage(message, time);
  });

  useCheckbox();
};
