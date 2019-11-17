import { Chart } from "chart.js";
import * as React from "react";
import { useEffect } from "react";
import IData from 'src/models/Data';


interface IProps {
    id: string;
    data: any;
    title: string;
};
function DoughnutChart({ data, id, title }: IProps): JSX.Element | null {
        useEffect(() => {
            const ctx = document.getElementById(id) as HTMLCanvasElement;
            const chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: data.map((node: IData) => {
                        return node.label;
                    }),
                    datasets: [
                        {
                            data: data.map((node: IData) => {
                                return node.amount;
                            }),
                            backgroundColor: data.map((node: IData) => {
                                return node.color;
                            }),
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 60,
                    legend: {
                        display: true,
                        position: "bottom"
                    },
                    title: {
                        text: title,
                        display: true
                    },
                    tooltips: {
                        callbacks: {
                            label: (toolTipItem: Chart.ChartTooltipItem, dater: Chart.ChartData) => {
                                if(dater.datasets && dater.datasets[0] && dater.datasets[0].data){
                                    if(toolTipItem.index !== undefined){
                                        const selectedValue = dater.datasets[0].data[toolTipItem.index];
                                        if(typeof selectedValue === "number"){
                                            if(selectedValue >= 1000){
                                                return '$' + selectedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                             } else {
                                                return '$' + selectedValue;
                                             }
                                        }
                                    }
                                }
                                return "Tooltip Error Handler";
                            }
                        }
                    }
                },
            });
            console.log(chart);
        });

        return (
            <div className="doughnut_chart">
                <canvas id={id} className="doughnut_chart-canvas" />
            </div>
        );
}

export default DoughnutChart;