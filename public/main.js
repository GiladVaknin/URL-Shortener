// const { json } = require("body-parser");
// const { url } = require("inspector");

const server = "http://localhost:3000/";
axios.defaults.baseURL = server;

const input = document.getElementById("urlInput");
const button = document.getElementById("submit");
const body = document.body;
const linkSpan = newElem("span", "linkSpan");
const centerDiv = document.getElementById("center");
const statisticsSection = document.getElementById("statisticsSection");
const searchInput = document.getElementById("searchUrl");
const searchButton = document.getElementById("search");

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
  link.innerText = server + "shortURL/new/" + shortUrl;
  // const linkMessage =
  //   "This: " + input.value + " and his short version id :  \n";
  // linkSpan.innerText = linkMessage;
  link.setAttribute("href", link.innerText);
  linkSpan.append(link);
  centerDiv.append(linkSpan);
  input.value = "";
}

function newElem(type, className) {
  let elem = document.createElement(type);
  if (className) elem.className = className;
  return elem;
}

function showStatistics(creationDate, redirectCount, originalUrl, shorturl) {
  const creationDateDiv = newElem("div", "creationDateStat");
  const redirectCountDiv = newElem("div", "redirectCountStat");
  const originalUrlDiv = newElem("div", "originalUrlStat");
  const shortUrlDiv = newElem("div", "shortlUrStat");
  creationDateDiv.innerText = creationDate;
  redirectCountDiv.innerText = redirectCount;
  originalUrlDiv.innerText = originalUrl;
  shortUrlDiv.innerText = shorturl;
  statisticsSection.append(
    creationDateDiv,
    redirectCountDiv,
    shortUrlDiv,
    originalUrlDiv
  );
}

const searchedUrl = searchInput.value;

searchButton.addEventListener("click", () => {
  const searchedUrl = searchInput.value;
  if (searchedUrl != "") {
    axios.get(`/shortURL/statistic/${searchedUrl}`).then((jsonUrl) => {
      const parsedURL = JSON.parse(jsonUrl.data);
      showStatistics(
        parsedURL.creationDate,
        parsedURL.redirectCount,
        parsedURL.originalUrl,
        parsedURL.shortedUrl
      );
    });
  } else {
    alert("please enter URL adress");
  }
});
