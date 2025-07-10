// Function untuk menangani logout
const useDeleteSession = () => {
  localStorage.removeItem("nikAdmin");

  setTimeout(() => {
    window.location.href = "/client/index.html";
  }, 500);
};

export default useDeleteSession;
