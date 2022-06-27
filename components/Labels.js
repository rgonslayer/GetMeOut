import React from "react"

const obj =[
    {
        type:"Flight",
        color:"#0018a8",
        percent:"10%"
    },
    {
        type:"Accommodation",
        color:"#34495e",
        percent:"20%"
    },
    {
        type:"Transport",
        color:"#2ecc71",
        percent:"10%"
    },
    {
        type:"Food",
        color:"#260909",
        percent:"15%"
    },
    {
        type:"Entertainment",
        color:"#ff8fbb",
        percent:"5%"
    },
    {
        type:"Shopping",
        color:"#d38fff",
        percent:"30%"
    },
    {
        type:"Miscellaneous",
        color:"#ffe652",
        percent:"10%"
    }

]
export default function Labels() {
    return (
        <div>
            {obj.map((v,i) => <LabelComponent key ={i} data ={v}></LabelComponent>)}
        </div>
        
    )
}

function LabelComponent({data}) {
    if(!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{background: data.color ?? "#f9c74f"}}></div>
                <h3 className="text-md">{data.type ?? ""}</h3>
                <h3 className="font-bold">{data.percent ?? 0}</h3>
            </div>
        </div>
    )
}