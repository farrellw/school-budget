import { ITableData } from './Data';

export const rows: ITableData[] = [
    { label: "Total", key: "total" },
    { label: "Administrative Salaries", key: "administrativeSalaries" },
    { label: "Instructional Salaries", key: "instructionalSalaries" },
    {
        label: "Instructional Support Salaries",
        key: "instructionalSupportSalaries"
    },
    {
        label: "Non Instructional Support Salaries",
        key: "nonInstructionalSupportSalaries"
    },
    { label: "Temp", key: "temp" },
    { label: "Benefits", key: "benefits" },
    { label: "Transportation", key: "transportation" },
    { label: "Discretionary", key: "discretionary" }
];

export const colors = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];