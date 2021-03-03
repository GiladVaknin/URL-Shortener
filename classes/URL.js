class ShortURL {
  constructor(originalUrl) {
    this.originalUrl = originalUrl;
    this.shortedUrl = this.addShortUrl();
    this.creationDate = Date.now();
    this.redirectCount = 0;
  }

  addShortUrl() {
    let str = "abcdefghijklmnopqrstuvwxyz";
    str += str.toUpperCase();
    str += "1234567890";
    let arr = str.split("");
    let id = "";

    for (let i = 1; i <= 5; i++) {
      let rnd = Math.floor(Math.random() * 62);
      id += arr[rnd];
    }

    return id;
  }

  // get creationDate() {
  //   return new Date(this.creationDate).toISOString();
  // }

  // set creationDate() {
  //   this.creationDate = Date.now();
  // }
}

module.exports = { ShortURL };
