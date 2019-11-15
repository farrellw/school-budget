import { Chart } from "chart.js";
import * as React from "react";
import { useEffect } from "react";

interface IProps {
    id: string;
    score: number;
    title: string;
    color: string;
};
function DoughnutChart({ score, title, id, color }: IProps): JSX.Element | null {
    {
        useEffect(() => {
            const ctx = document.getElementById(id) as HTMLCanvasElement;
            const chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: [score.toString()],
                    datasets: [
                        {
                            data: [score, 5 - score],
                            backgroundColor: [color, "rgba(0, 0, 0, 0.125)"],
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 80,
                    legend: { display: false },
                    title: { text: score.toString() }
                }
            });
            console.log(chart);
        });

        return (
            <div className="doughnut_chart">
                <p className="doughnut_chart-title">{title}</p>
                <canvas id={id} className="doughnut_chart-canvas" />
            </div>
        );
    }
}

export default DoughnutChart;