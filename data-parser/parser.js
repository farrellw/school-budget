var xlsx = require("node-xlsx");
var fs = require("fs");

// Parse a buffer
const workSheets = xlsx.parse(
  fs.readFileSync(`${__dirname}/SchoolExpenses.xlsx`)
);

const sheetOne = workSheets[0];
const data = sheetOne.data;

var schools = [];

function getNum(val) {
  if (val) {
    return Number(val);
  } else {
    return 0;
  }
}

data.forEach(row => {
  const schoolName = row[0];

  // Ignore First Row
  if (schoolName !== "School Name") {
    const individualSchool = {
      name: row[0],
      type: row[1],
      projectedEnrollment: row[2],
      administrativeSalaries: getNum(row[3]) + getNum(row[11]),
      instructionalSalaries: getNum(row[4]) + getNum(row[12]),
      instructionalSupportSalaries: getNum(row[5]) + getNum(row[13]),
      nonInstructionalSupportSalaries: getNum(row[6]) + getNum(row[14]),
      temp: getNum(row[7]) + getNum(row[15]),
      benefits: getNum(row[8]) + getNum(row[16]),
      transportation: getNum(row[9]) + getNum(row[17]),
      discretionary: getNum(row[10]) + getNum(row[18])
    };
    schools.push(individualSchool);
  }
});

fs.writeFileSync("SchoolExpenses.json", JSON.stringify(schools));
