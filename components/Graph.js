import React from 'react'
import { Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement} from 'chart.js'
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react'
import { SharedLayoutContext } from 'framer-motion';


Chart.register(ArcElement); 

export const getTotal= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount') 
    return data
    
};

export const getFlight= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Flight')
    return data
    
};

export const getAccom= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Accommodation')
    return data
    
};

export const getTransport= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Transport')
    return data
    
};

export const getFood= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Food')
    return data
    
};

export const getEnt= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Entertainment')
    return data
    
};

export const getShop= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Shopping')
    return data
    
};

export const getMisc= async () => {
    const {data} = await supabase
    .from('transactions')
    .select('amount')
    .eq('category','Miscellaneous')
    return data
    
};


export default function Graph() {
    const [total, setTotal] = useState(0)
    getTotal().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setTotal(sum)
        } else{setTotal(0)}
    })
    const [flight, setFlight] = useState(0);
    getFlight().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setFlight(sum)
        } else{setFlight(0)}
    })
    const [accom, setAccom] = useState(0);
    getAccom().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setAccom(sum)
        } else{setAccom(0)}
    })

    const [transport, setTransport] = useState(0);
    getTransport().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setTransport(sum)
        } else{setTransport(0)}
    })
    
    const [food, setFood] = useState(0);
    getFood().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setFood(sum)
        } else{setFood(0)}
    })
    const [ent, setEnt] = useState(0);
    getEnt().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setEnt(sum)
        } else {setEnt(0)}
    })
    const [shop, setShop] = useState(0);
    getShop().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setShop(sum)
        } else{setShop(0)}
    })
    const [misc, setMisc] = useState(0);
    getMisc().then(x => {
        if (x.length>=1){
        const sum = x.map(t => t.amount).reduce((a, b) => a + b)
        setMisc(sum)
        } else{setMisc(0)}
    })
    const config = {
    
        data:{
            datasets:[{
                data:[flight,accom,transport,food,ent,shop,misc],
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
    const fper = Number((flight/total*100).toFixed(3))
    const aper = Number((accom/total*100).toFixed(3))
    const tper = Number((transport/total*100).toFixed(3))
    const foper = Number((food/total*100).toFixed(3))
    const eper = Number((ent/total*100).toFixed(3))
    const sper = Number((shop/total*100).toFixed(3))
    const mper = Number((misc/total*100).toFixed(3))

    return(
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                <Doughnut {...config}></Doughnut>
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>${total}</span>
                </h3>
            </div>
            <div className='flex flex-col py-4 gap-2'>
                <p>Flight {fper}% Accom {aper}%</p>
            </div> 
            <div>
                <p>Transport {tper}% Food {foper}%</p>
            </div> 
            <div className='flex flex-col py-4 gap-2'>
                <p>Entertainment {eper}% Shopping {sper}%</p>
            </div> 
            <div className='flex flex-col py-4 gap-2'>
                <p>Miscellaneous {mper}%</p>
            </div> 
        </div>
    </div>
    )
}