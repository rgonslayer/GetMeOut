import React from "react";
import {BiTrash} from "react-icons/bi";

export default function History() {
    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 text-md font-bold text-xl">History</h1> 
            <button className="px-3"><BiTrash /></button>
        </div>
    )   
}

