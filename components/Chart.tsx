import React from 'react';
import {Bar} from 'react-chartjs-2';

interface ChartProps {
    labels: String[],
    datasets: any
}

const ChartComponent = ({labels, datasets}: ChartProps) => {


    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={{labels, datasets}} options={options}/>;
};

export default ChartComponent;
