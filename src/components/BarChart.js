import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


var labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

export default class BarChart extends React.Component {
    constructor(props){
        super(props);
        labels = props.months;
        this.state = {
            data: {
                labels,
                datasets: [
                  {
                    label: this.props.firstName,
                    data: this.props.firstValues,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: this.props.secondName,
                    data: this.props.secondValues,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: this.props.title,
                  },
                },
              }
        };
    }
    componentDidUpdate = (prevProps) => {
      console.log(this.props);
      console.log(prevProps);
    }
      
    render(){
        return <Bar options={this.state.options} data={this.state.data} />;
    }
}
