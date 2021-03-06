const app = require("../app");
const request = require("supertest");
const { describe } = require("yargs");
const { test, expect } = require("@jest/globals");
const { response } = require("express");
const fs = require("fs");
const router = require("../routes/DataBaseRoute");
let shortedUrls = JSON.parse(fs.readFileSync("./bins/ShortedURLS.json"));

// test("Illegal id", () => {
//   request(app)
//     .get("/new/illegal")
//     .catch((e) => {
//       expect(e.status).toBe(422);
//     });
// });

// test("if a bin is not found an", () => {
//   request(router)
//     .get("/statistic/notFound")
//     .catch((e) => {
//       expect(e.status).toBe(404);
//     });
// });
// //
// test("can add a new bin", async () => {
//   const req = (
//     await request(router).post("/").send("https://www.facebook.com/")
//   ).text;
//   const arr = JSON.parse(req);
//   expect(idExist(arr[arr.length - 1]["id"])).toBeTruthy();
// });
// //
// test("Bonus!can not add a bin with illegal body", async () => {
//   const req = await request(app).post("/b/bin").send({});

//   expect(req.status).toBe(400);
// });

// test("Check the redirect counter", async () => {
//   let urlObj = shortedUrls[0];
//   const counter = urlObj.redirectCount;
//   const response = await request(app).get(`/shortURL/new/${urlObj.shortedUrl}`);
//   expect(urlObj.redirectCount).toBe(counter + 1);
// });

test("Add an URL", async () => {
  const response = await request(app)
    .post("/shortURL")
    .type("form")
    .send({ url: "https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s%22%7D" });
  //   expect(response.status).toBe(201);
  expect(response.text).toEqual("gggggg");
});
