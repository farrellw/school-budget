var fs = require("fs");

var schools = JSON.parse(fs.readFileSync(`${__dirname}/SchoolExpenses.json`));

const count = {
  H: 0,
  M: 0,
  E: 0,
  A: 0
};

const totals = {
  H: {
    id: "101",
    name: "High School Avg",
    type: "H",
    projectedEnrollment: 0,
    expenses: {
      administrativeSalaries: 0,
      instructionalSalaries: 0,
      instructionalSupportSalaries: 0,
      nonInstructionalSupportSalaries: 0,
      temp: 0,
      benefits: 0,
      transportation: 0,
      discretionary: 0
    }
  },
  M: {
    id: "102",
    name: "Middle School Avg",
    type: "M",
    projectedEnrollment: 0,
    expenses: {
      administrativeSalaries: 0,
      instructionalSalaries: 0,
      instructionalSupportSalaries: 0,
      nonInstructionalSupportSalaries: 0,
      temp: 0,
      benefits: 0,
      transportation: 0,
      discretionary: 0
    }
  },
  E: {
    id: "103",
    name: "Elementary School Avg",
    type: "E",
    projectedEnrollment: 0,
    expenses: {
      administrativeSalaries: 0,
      instructionalSalaries: 0,
      instructionalSupportSalaries: 0,
      nonInstructionalSupportSalaries: 0,
      temp: 0,
      benefits: 0,
      transportation: 0,
      discretionary: 0
    }
  },
  A: {
    id: "104",
    name: "Alternative School Avg",
    type: "A",
    projectedEnrollment: 0,
    expenses: {
      administrativeSalaries: 0,
      instructionalSalaries: 0,
      instructionalSupportSalaries: 0,
      nonInstructionalSupportSalaries: 0,
      temp: 0,
      benefits: 0,
      transportation: 0,
      discretionary: 0
    }
  }
};

schools.forEach(school => {
  var type = school.type;
  count[type] += 1;
  let schoolSubObject = totals[type];
  schoolSubObject.projectedEnrollment += school.projectedEnrollment;
  schoolSubObject.expenses.administrativeSalaries +=
    school.expenses.administrativeSalaries;
  schoolSubObject.expenses.instructionalSalaries +=
    school.expenses.instructionalSalaries;
  schoolSubObject.expenses.instructionalSupportSalaries +=
    school.expenses.instructionalSupportSalaries;
  schoolSubObject.expenses.nonInstructionalSupportSalaries +=
    school.expenses.nonInstructionalSupportSalaries;
  schoolSubObject.expenses.temp += school.expenses.temp;
  schoolSubObject.expenses.benefits += school.expenses.benefits;
  schoolSubObject.expenses.transportation += school.expenses.transportation;
  schoolSubObject.expenses.discretionary += school.expenses.discretionary;
});

function averageATotal(key) {
  const value = totals[key];
  value.projectedEnrollment =
    Math.round((value.projectedEnrollment / count[key]) * 100) / 100;
  value.expenses.administrativeSalaries =
    Math.round((value.expenses.administrativeSalaries / count[key]) * 100) /
    100;
  value.expenses.instructionalSalaries =
    Math.round((value.expenses.instructionalSalaries / count[key]) * 100) / 100;
  value.expenses.instructionalSupportSalaries =
    Math.round(
      (value.expenses.instructionalSupportSalaries / count[key]) * 100
    ) / 100;
  value.expenses.nonInstructionalSupportSalaries =
    Math.round(
      (value.expenses.nonInstructionalSupportSalaries / count[key]) * 100
    ) / 100;
  value.expenses.temp =
    Math.round((value.expenses.temp / count[key]) * 100) / 100;
  value.expenses.benefits =
    Math.round((value.expenses.benefits / count[key]) * 100) / 100;
  value.expenses.transportation =
    Math.round((value.expenses.transportation / count[key]) * 100) / 100;
  value.expenses.discretionary =
    Math.round((value.expenses.discretionary / count[key]) * 100) / 100;
  return value;
}

const averages = [
  averageATotal("H"),
  averageATotal("M"),
  averageATotal("E"),
  averageATotal("A")
];

fs.writeFileSync(`${__dirname}/SchoolAverages.json`, JSON.stringify(averages));
