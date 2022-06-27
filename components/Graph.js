import React from 'react'
import { Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement} from 'chart.js'
import Labels from "./Labels" 
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react'


Chart.register(ArcElement);

export const getTotal= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount') 
    return data
    
};

const config = {
    
    data:{
        datasets:[{
            data:[300,200,100,100,50,100,50],
            backgroundColor:[
                "#0018a8",
                "#34495e",
                "#2ecc71",
                "#260909",
                "#ff8fbb",
                "#d38fff",
                "#ffe652"
            ],
            hoveroffset:4,
            borderRadius:20
        }]
    },
    options:{
        cutout:115

    }      
}

export default function Graph() {
    const [total, setTotal] = useState(0)
    getTotal().then(x => {
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        console.log(sum)
        setTotal(sum)
    })
    
    return(
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                <Doughnut {...config}></Doughnut>
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>${total}</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4'>
                <Labels></Labels>
            </div> 
        </div>
    </div>
    )
}