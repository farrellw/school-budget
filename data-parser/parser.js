var xlsx = require("node-xlsx");
var fs = require("fs");
// Or var xlsx = require('node-xlsx').default;

// Parse a buffer
const workSheets = xlsx.parse(fs.readFileSync(`${__dirname}/25pgs.xlsx`));

const sheetOne = workSheets[0];
const data = sheetOne.data;

var json = [];

var currentSchoolCount = -1;
var grantLabel = "grant-operating-budget";

data.forEach(row => {
  var rowName = row[6];
  if (rowName === "Administra!ve Salaries") {
    if (grantLabel === "grant-operating-budget") {
      grantLabel = "non-grant-operating-budget";
      currentSchoolCount += 1;
      json[currentSchoolCount] = {
        name: "unknown",
        type: "HS"
      };
    } else {
      grantLabel = "grant-operating-budget";
    }

    json[currentSchoolCount][grantLabel] = {
      "Administrative Salaries": row[8]
    };
  } else if (rowName === "Instruc!onal Salaries") {
    json[currentSchoolCount][grantLabel]["Instructional Salaries"] = row[8];
  } else if (rowName === "Instruc!onal Support Salaries") {
    json[currentSchoolCount][grantLabel]["Instructional Support Salaries"] =
      row[8];
  } else if (rowName === "Non-Instruc!onal Support Salaries") {
    json[currentSchoolCount][grantLabel]["Non-Instructional Support Salaries"] =
      row[8];
  } else if (rowName === "Temp/Part-Time/Sub") {
    json[currentSchoolCount][grantLabel]["Temp/Part-Time/Sub"] = row[8];
  } else if (rowName === "Benefits") {
    json[currentSchoolCount][grantLabel]["Benefits"] = row[8];
  } else if (rowName === "Transportation") {
    json[currentSchoolCount][grantLabel]["Transportation"] = row[8];
  } else if (rowName === "Discre!onary Budget") {
    json[currentSchoolCount][grantLabel]["Discretionary Budget"] = row[8];
  }
});

fs.writeFileSync("savedSchools.json", JSON.stringify(json));
