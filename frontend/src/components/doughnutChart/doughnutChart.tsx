'use client'

import React, {FC} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    labels: string[],
    data: number[],
    colors: string[],
    label: string
}

const DoughnutChart: FC<Props> = ({data, labels, colors, label}) => {
    const dataSet = {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut data={dataSet} />
    );
};

export default DoughnutChart
