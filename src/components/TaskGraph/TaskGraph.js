import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TaskGraph = ({ tasks }) => {
  const priorityArr =
    tasks &&
    tasks?.map((item) =>
      item.priority == 'High' ? 3 : item?.priority == 'Medium' ? 2 : 1
    );
  const taskArr = tasks && tasks?.map((item) => item.title);
  console.log('tasksList:::', taskArr, priorityArr);
  const chartData = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: taskArr,
      },
      yaxis: {
        categories: taskArr,
      },
    },
    series: [
      {
        name: 'Task Priority',
        data: priorityArr,
      },
    ],
    plotOptions: {
        bar: {
          colors: ['red', 'yellow', 'blue'],
        },
      },
  };

  return (
    <div>
      <h2>Monthly Sales Bar Graph</h2>
      <ReactApexChart
      width={400}
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={250}
      />
    </div>
  );
};

export default TaskGraph;
