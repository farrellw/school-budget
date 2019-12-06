export interface ITableData {
    name: string,
    type: string,
    "non-grant-operating-budget"?: ISchoolExpenseData,
    "grant-operating-budget"?: ISchoolExpenseData
}

export type SchoolType = "HS" | "MS" | "ES";
export type FilterType = "All" | SchoolType;

export interface ISchoolExpenseData {
    "Administrative Salaries"?: string,
    "Instructional Salaries"?: string,
    "Instructional Support Salaries"?: string,
    "Non-Instructional Support Salaries"?: string,
    "Temp/Part-Time/Sub"?: string,
    "Benefits"?: string,
    "Discretionary Budget"?: string
}

export type SchoolExpenseDataKey = "Administrative Salaries" |
    "Instructional Salaries" |
    "Instructional Support Salaries" |
    "Non-Instructional Support Salaries" |
    "Temp/Part-Time/Sub" |
    "Benefits" |
    "Discretionary Budget"