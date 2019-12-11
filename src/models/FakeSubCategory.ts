import { ITableData, SubCategorySchoolExpense } from "./Data";

export const subCategoryExpenseLabel = [
    "Line Item 1",
    "Line Item 2",
    "Line Item 3",
    "Line Item 4",
    "Line Item 5",
    "Line Item 6"
];

export const subCategoryTableData: ITableData[] = subCategoryExpenseLabel.map(n => {
    return {
        label: n,
        key: n
    }
})

export const subCategoryExpenseData: SubCategorySchoolExpense = subCategoryExpenseLabel.reduce((agg, curr) => {
    agg[curr] = 0;
    return agg;
}, new Map<string, number>());