export interface ISchoolExpense {
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

export type SchoolType = "H" | "M" | "E" | "A";

export const SchoolTypeToTypeLabel = {
    "H": "High",
    "M": "Middle",
    "E": "Elementary",
    "A": "Alternative"
}