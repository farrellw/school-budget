export interface ISchool {
  id: string;
  name: string;
  type: string;
  address?: string;
  principal?: string;
  phone?: string;
  projectedEnrollment: number;
  expenses: IGeneralSchoolExpense;
}

export interface IGeneralSchoolExpense {
  total: number;
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


export const averageSchoolFunction = (school: ISchool) => {
  const averagedSchool = {
    ...school,
    expenses: {
      administrativeSalaries:
        school.expenses.administrativeSalaries / school.projectedEnrollment,
      instructionalSalaries:
        school.expenses.instructionalSalaries / school.projectedEnrollment,
      instructionalSupportSalaries:
        school.expenses.instructionalSupportSalaries / school.projectedEnrollment,
      nonInstructionalSupportSalaries:
        school.expenses.nonInstructionalSupportSalaries / school.projectedEnrollment,
      temp: school.expenses.temp / school.projectedEnrollment,
      benefits: school.expenses.benefits / school.projectedEnrollment,
      transportation: school.expenses.transportation / school.projectedEnrollment,
      discretionary: school.expenses.discretionary / school.projectedEnrollment,
      total: school.expenses.total / school.projectedEnrollment
    },
  };
  return averagedSchool;
}

export type TotalOrPerStudent = "Total" | "Per Student";