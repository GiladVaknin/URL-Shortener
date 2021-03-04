const server = "http://localhost:3000/";
axios.defaults.baseURL = server;

const input = document.getElementById("urlInput");
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  axios.post(`/shortURL/`, { url: input.value });
});
