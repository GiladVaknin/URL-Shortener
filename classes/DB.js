const fs = require("fs");
const { Url } = require("./URL.js");

class DataBase {
  constructor() {
    this.URLS = [];
  }

  addUrl(url) {
    this.URLS.push(url);
    // fs.writeFile(`./ShortedURLS.json`);
  }

  findUrlIndex(url) {
    return this.URLS.indexOf(url);
  }

  urlShort(url) {
    return this.URLS[this.findUrlIndex(url)].shortUrl;
  }

  deleteURL(url) {
    this.URLS.slice(this.findUrlIndex(url), 1);
  }
}

const url = new Url("12345");
const db1 = new DataBase();
db1.addUrl(url);
console.log(db1);
