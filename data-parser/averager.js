var fs = require("fs");

var schools = JSON.parse(fs.readFileSync(`${__dirname}/SchoolExpenses.json`));

const count = {
    "H": 0,
    "M": 0,
    "E": 0,
    "A": 0
}

const totals = {
    "H": {
        "id": "101",
        "name": "High School Avg",
        "type": "H",
        "projectedEnrollment": 0,
        "administrativeSalaries": 0,
        "instructionalSalaries": 0,
        "instructionalSupportSalaries": 0,
        "nonInstructionalSupportSalaries": 0,
        "temp": 0,
        "benefits": 0,
        "transportation": 0,
        "discretionary": 0
    }, "M":
    {
        "id": "102",
        "name": "Middle School Avg",
        "type": "M",
        "projectedEnrollment": 0,
        "administrativeSalaries": 0,
        "instructionalSalaries": 0,
        "instructionalSupportSalaries": 0,
        "nonInstructionalSupportSalaries": 0,
        "temp": 0,
        "benefits": 0,
        "transportation": 0,
        "discretionary": 0
    }, "E":
    {
        "id": "103",
        "name": "Elementary School Avg",
        "type": "E",
        "projectedEnrollment": 0,
        "administrativeSalaries": 0,
        "instructionalSalaries": 0,
        "instructionalSupportSalaries": 0,
        "nonInstructionalSupportSalaries": 0,
        "temp": 0,
        "benefits": 0,
        "transportation": 0,
        "discretionary": 0
    }, "A":
    {
        "id": "104",
        "name": "Alternative School Avg",
        "type": "A",
        "projectedEnrollment": 0,
        "administrativeSalaries": 0,
        "instructionalSalaries": 0,
        "instructionalSupportSalaries": 0,
        "nonInstructionalSupportSalaries": 0,
        "temp": 0,
        "benefits": 0,
        "transportation": 0,
        "discretionary": 0
    }
}

schools.forEach(school => {
    var type = school.type;
    count[type] += 1;
    let schoolSubObject = totals[type];
    schoolSubObject.projectedEnrollment += school.projectedEnrollment;
    schoolSubObject.administrativeSalaries += school.administrativeSalaries;
    schoolSubObject.instructionalSalaries += school.instructionalSalaries;
    schoolSubObject.instructionalSupportSalaries += school.instructionalSupportSalaries;
    schoolSubObject.nonInstructionalSupportSalaries += school.nonInstructionalSupportSalaries;
    schoolSubObject.temp += school.temp;
    schoolSubObject.benefits += school.benefits;
    schoolSubObject.transportation += school.transportation;
    schoolSubObject.discretionary += school.discretionary;
})



function averageATotal(key) {
    const value = totals[key]
    value.projectedEnrollment = Math.round((value.projectedEnrollment / count[key]) * 100) / 100;
    value.administrativeSalaries = Math.round((value.administrativeSalaries / count[key]) * 100) / 100;
    value.instructionalSalaries = Math.round((value.instructionalSalaries / count[key]) * 100) / 100;
    value.instructionalSupportSalaries = Math.round((value.instructionalSupportSalaries / count[key]) * 100) / 100;
    value.nonInstructionalSupportSalaries = Math.round((value.nonInstructionalSupportSalaries / count[key]) * 100) / 100;
    value.temp = Math.round((value.temp / count[key]) * 100) / 100;
    value.benefits = Math.round((value.benefits / count[key]) * 100) / 100;
    value.transportation = Math.round((value.transportation / count[key]) * 100) / 100;
    value.discretionary = Math.round((value.discretionary / count[key]) * 100) / 100;
    return value;
}

const averages = [averageATotal("H"), averageATotal("M"), averageATotal("E"), averageATotal("A")];

fs.writeFileSync(`${__dirname}/SchoolAverages.json`, JSON.stringify(averages));