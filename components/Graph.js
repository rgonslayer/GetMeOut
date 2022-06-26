import React from 'react'
import { Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement} from 'chart.js'
import Labels from "./Labels" 
import { supabase } from '../utils/supabaseClient';


Chart.register(ArcElement);


//const total = async () => {await supabase.from('transactions').select('amount')};

/*CREATE OR REPLACE function getTotal()
    RETURNS Float as $$
    BEGIN
    RETURN QUERY 
    select "amount",
    sum("amount") as total,
    from "transactions"
    single()  
END; $$
LANGUAGE 'plpgsql'
*/


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
            borderRadius:20,
            spacing: 10 
        }]
    },
    options:{
        cutout:115
    }      
}

export default function Graph() {
    return(
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                <Doughnut {...config}></Doughnut>
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>${0}</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4'>
                <Labels></Labels>
            </div> 
        </div>
    </div>
    )
}