const server = "http://localhost:3000/";
axios.defaults.baseURL = server;

const input = document.getElementById("urlInput");
const button = document.getElementById("submit");
const body = document.body;
const linkSpan = document.createElement("span");

button.addEventListener("click", () => {
  if (input.value != "") {
    axios
      .post(`/shortURL/`, { url: input.value })
      .then((res) => shortUrlLink(res.data));
  } else {
    alert("please enter URL adress");
  }
});

function shortUrlLink(shortUrl) {
  linkSpan.innerHtml = "";
  linkSpan.innerText = "";
  const link = document.createElement("a");

  link.innerText = server + "shortURL/" + shortUrl;
  const linkMessage =
    "This: " + input.value + " and his short version id :  \n";
  linkSpan.innerText = linkMessage;
  link.setAttribute("href", link.innerText);
  linkSpan.id = "linkSpan";
  linkSpan.append(link);
  body.append(linkSpan);
  input.value = "";
}
