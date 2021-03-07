const app = require("../app");
const request = require("supertest");
const { describe } = require("yargs");
const { test, expect } = require("@jest/globals");
const { response } = require("express");
const fs = require("fs");
const router = require("../routes/DataBaseRoute");
let shortedUrls = JSON.parse(fs.readFileSync("./bins/ShortedURLS.json"));

test("Illegal id", () => {
  request(app)
    .get("/new/illegal")
    .catch((e) => {
      expect(e.status).toBe(422);
    });
});

test("if a bin is not found an", () => {
  request(app)
    .get("/shortURL/statistic/notFound")
    .catch((e) => {
      expect(e.status).toBe(404);
    });
});

test("Add an URL", async () => {
  await promiseTimeout(2000);
  const response = await request(app).post("/shortURL/", {
    url: "https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s%22%7D",
  });
  expect(response.status).toBe(200);
});

test("Get method test checks if the new shorted url is send the client to the original url.", async () => {
  let urlObj = shortedUrls[0];
  const response = await request(app).get(`/shortURL/new/${urlObj.shortedUrl}`);
  await promiseTimeout(2000);
  expect(response.status).toBe(302);
});

function promiseTimeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
