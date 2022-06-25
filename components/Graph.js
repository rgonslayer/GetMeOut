import React from 'react'
import { Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement} from 'chart.js'

Chart.register(ArcElement);

const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    }
  ]
};

export default function Graph() {
    return(
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                <Doughnut>{data}</Doughnut>
            </div>

            <div className='flex flex-col py-10 gap-4'>
                {/*lables*/}
            </div>
            
        </div>
    </div>
    )
}