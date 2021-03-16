// const { json } = require("body-parser");
// const { url } = require("inspector");

const server = window.location.origin;
axios.defaults.baseURL = server;

const input = document.getElementById("urlInput");
const button = document.getElementById("submit");
const body = document.body;
const linkSpan = newElem("span", "linkSpan");
const centerDiv = document.getElementById("center");
const statisticsSection = document.getElementById("statisticsSection");
const searchInput = document.getElementById("searchUrl");
const searchButton = document.getElementById("search");
const statistics = document.getElementById("statistics");
const controlSection = document.getElementById("controlSection");
const lastFive = document.getElementById("lastShower");
const lastShorted = document.getElementById("lastShorted");

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
  const link = newElem("a", "newShorted");
  link.innerText = "\n" + server + "/shortURL/new/" + shortUrl;
  link.setAttribute("href", link.innerText);
  link.setAttribute("target", "_blank");
  linkSpan.append(link);
  controlSection.append(linkSpan);
  input.value = "";
}

function newElem(type, idName) {
  let elem = document.createElement(type);
  if (idName) elem.id = idName;
  return elem;
}

function showStatistics(creationDate, redirectCount, originalUrl, shorturl) {
  statistics.innerHTML = "";
  const creationDateDiv = newElem("span", "creationDateStat");
  const redirectCountDiv = newElem("div", "redirectCountStat");
  const originalUrlDiv = newElem("div", "originalUrlStat");
  const shortUrlDiv = newElem("div", "shortlUrStat");
  creationDateDiv.innerText = " Creation Date:\n\n" + creationDate;
  redirectCountDiv.innerText = "Redirect Count :\n\n" + redirectCount;
  originalUrlDiv.innerText = "Original URL :\n \n" + originalUrl;
  shortUrlDiv.innerText = "Shorted URL : \n\n" + shorturl;
  statistics.append(
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
    throw new Error(422);
    alert("please enter URL adress");
  }
});

lastFive.addEventListener("click", () => {
  axios.get("/shortURL/lastFiveURLS").then((str) => {
    lastShorted.innerHTML = "";
    let urlsArr = str.data.split(",");
    if (urlsArr.length <= 5) {
      for (let i = urlsArr.length; i >= 0; i--) {
        const link = document.createElement("a");
        link.innerText = "\n" + server + "/shortURL/new/" + urlsArr[i];
        link.setAttribute("href", link.innerText);
        link.setAttribute("target", "_blank");
        lastShorted.append(link);
      }
    } else {
      for (let i = urlsArr.length - 2; i >= urlsArr.length - 6; i--) {
        const link = document.createElement("a");
        link.innerText = "\n" + server + "/shortURL/new/" + urlsArr[i];
        link.setAttribute("href", link.innerText);
        link.setAttribute("target", "_blank");
        lastShorted.append(link);
      }
    }
  });
});
