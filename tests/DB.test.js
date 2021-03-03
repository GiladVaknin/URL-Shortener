const fs = require("fs");
const request = require("@supertest/globals");
const { test, expect } = require("@jest/globals");
const DataBase = require("../classes/DataBase.js");
const dataBase = new DataBase();

test("Can add an url to the DataBase", async () => {
  await dataBase.addUrl("test");
  expect(dataBase.isExist("test")).toBe(true);
});
