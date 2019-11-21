const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/allSchools.json`);

data.reduce((prev, next) => {}, {
  All: 0,
  HS: 0,
  MS: 0,
  ES: 0
});
