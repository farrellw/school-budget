export interface IGeneralSchoolExpense {
    name: string,
    type: string,
    projectedEnrollment: number,
    administrativeSalaries: number,
    instructionalSalaries: number,
    instructionalSupportSalaries: number,
    nonInstructionalSupportSalaries: number,
    temp: number,
    benefits: number,
    transportation: number,
    discretionary: number
}

export type SubCategorySchoolExpense = Map<string, number>;

export type SchoolExpense = IGeneralSchoolExpense | SubCategorySchoolExpense;

export type SchoolType = "H" | "M" | "E" | "A";

export const SchoolTypeToTypeLabel = {
    "H": "High",
    "M": "Middle",
    "E": "Elementary",
    "A": "Alternative"
}

export interface ITableData {
    label: string,
    key: string
}