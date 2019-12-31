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

data.forEach((row, index) => {
  const schoolName = row[0];

  // Ignore First Row
  if (schoolName !== "School Name") {
    const school = {
      id: String(index),
      name: row[0],
      type: row[1],
      address: row[19],
      principal: row[21],
      phone: row[20],
      projectedEnrollment: row[2],
      expenses: {
        administrativeSalaries: getNum(row[3]) + getNum(row[11]),
        instructionalSalaries: getNum(row[4]) + getNum(row[12]),
        instructionalSupportSalaries: getNum(row[5]) + getNum(row[13]),
        nonInstructionalSupportSalaries: getNum(row[6]) + getNum(row[14]),
        temp: getNum(row[7]) + getNum(row[15]),
        benefits: getNum(row[8]) + getNum(row[16]),
        transportation: getNum(row[9]) + getNum(row[17]),
        discretionary: getNum(row[10]) + getNum(row[18])
      }
    };
    school.expenses.total =
      school.expenses.administrativeSalaries +
      school.expenses.instructionalSalaries +
      school.expenses.instructionalSupportSalaries +
      school.expenses.nonInstructionalSupportSalaries +
      school.expenses.temp +
      school.expenses.benefits +
      school.expenses.transportation +
      school.expenses.discretionary;

    schools.push(school);
  }
});

fs.writeFileSync("SchoolExpenses.json", JSON.stringify(schools));
