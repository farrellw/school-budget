export interface IGeneralSchoolExpense {
  id: string;
  name: string;
  type: string;
  projectedEnrollment: number;
  administrativeSalaries: number;
  instructionalSalaries: number;
  instructionalSupportSalaries: number;
  nonInstructionalSupportSalaries: number;
  temp: number;
  benefits: number;
  transportation: number;
  discretionary: number;
}

export type SubCategorySchoolExpense = Map<string, number>;

export type SchoolExpense = IGeneralSchoolExpense | SubCategorySchoolExpense;

export type SchoolType = "H" | "M" | "E" | "A";

export const SchoolTypeToTypeLabel = {
  H: "High",
  M: "Middle",
  E: "Elementary",
  A: "Alternative"
};

export interface ITableData {
  label: string;
  key: string;
}

export interface ITableRow {
  label: string;
  values: string[];
  selected?: boolean;
}


export const averageSchoolFunction = (school: IGeneralSchoolExpense) => {
  const averagedSchool = {
    ...school,
    administrativeSalaries:
      school.administrativeSalaries / school.projectedEnrollment,
    instructionalSalaries:
      school.instructionalSalaries / school.projectedEnrollment,
    instructionalSupportSalaries:
      school.instructionalSupportSalaries / school.projectedEnrollment,
    nonInstructionalSupportSalaries:
      school.nonInstructionalSupportSalaries / school.projectedEnrollment,
    temp: school.temp / school.projectedEnrollment,
    benefits: school.benefits / school.projectedEnrollment,
    transportation: school.transportation / school.projectedEnrollment,
    discretionary: school.discretionary / school.projectedEnrollment
  };
  return averagedSchool;
}

export type TotalOrPerStudent = "Total" | "Per Student";