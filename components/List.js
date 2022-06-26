import React from "react";
import {BiTrash} from "react-icons/bi";

const obj =[
    {
        name:"Flight",
        color:"#0018a8"
    },
    {
        name:"Accommodation",
        color:"#34495e"
    },
    {
        name:"Transport",
        color:"#2ecc71"
    },
    {
        name:"Food",
        color:"#260909"
    },
    {
        name:"Entertainment",
        color:"#ff8fbb"
    },
    {
        name:"Shopping",
        color:"#d38fff"
    },
    {
        name:"Miscellaneous",
        color:"#ffe652"
    }

]
export default function List() {
    return (
        <div className="flex flex-col py-6 gap-3">
            {obj.map((v,i)=><Transaction key={i} category={v}></Transaction>)}
        </div>
    )
}

function Transaction({category}) {
    if(!category) return null;
    return ( 
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight: `8px solid${category.color ?? "#e5e5e5"}`}}>
            <span className="block w-full">{category.name ?? ""}</span>
        </div>
    )
}