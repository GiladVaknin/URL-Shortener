const fs = require("fs").promises;
const { resolve } = require("path");
const { ShortURL } = require("./URL.js");

class DataBase {
  constructor() {
    this.getData().then((data) => {
      this.URLS = JSON.parse(data);
    });
  }

  addUrl(url) {
    const urlIndex = this.isExist(url);

    if (urlIndex === false) {
      const urlItem = new ShortURL(url);
      urlItem.creationDate = new Date(urlItem.creationDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      urlItem.redirectCount++;
      this.URLS.push(urlItem);
      return this.save();
    } else {
      return new Promise((resolve, reject) => {
        const index = this.URLS[urlIndex];
        this.URLS[urlIndex].redirectCount++;
        this.save();
        if (index) resolve(index);
        else {
          reject((e) => {
            throw new Error(`Can not save data: ${e}`);
          });
        }
      });
    }
  }

  deleteURL(url) {
    if (this.isExist(url)) {
      this.URLS.splice(this.findUrlIndex(url), 1);
      this.save().then((res, rej) => {
        if (res === "savd") {
          return;
        } else {
          return rej;
        }
      });
    } else throw `This URL ${url} isn't exist ! `;
  }

  save() {
    const urls = this.URLS;
    const promise = fs
      .writeFile("./bins/ShortedURLS.json", JSON.stringify(urls))
      .catch((e) => {
        throw new Error(`Can not save data: ${e}`);
      });
    return promise;
  }

  isExist(url) {
    const exist = this.URLS.findIndex((urlObj) => urlObj.originalUrl === url);
    if (exist === -1) {
      return false;
    } else return exist;
  }

  getData() {
    const promiseBinData = fs.readFile("./bins/ShortedURLS.json").catch((e) => {
      throw new Error(`Can not get data: ${e}`);
    });
    return promiseBinData;
  }
}

module.exports = DataBase;
