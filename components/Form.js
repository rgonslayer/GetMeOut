import React from 'react'
import {useForm} from 'react-hook-form'
import List from './List';
import { supabase } from '../utils/supabaseClient';
import History from './History';




export default function Form(){
    const{register,handleSubmit, resetField} = useForm();
    

    const onSubmit = async(data) => {
        const { transaction, error } = await supabase
        .from('transactions')
        .insert([
            { name: data.name, category: data.type, amount: data.amount, trip_id: 1 }
        ])
        if (error) setError(error.message)
    }



    return(
        
        <div className='form max-w-sm mx-auto w-96'>
            <List></List>
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <select className='form-input' {...register('type')}>
                        <option value ="Flight">Flight</option>
                        <option value ="Accommodation">Accommodation</option>
                        <option value ="Transport">Transport</option>
                        <option value ="Food">Food</option>
                        <option value ="Entertainment">Entertainment</option>
                        <option value ="Shopping">Shopping</option>
                        <option value ="Miscellaneous">Miscellaneous</option>
                    </select>
                    <div className='input-group'>
                        <input type= "text" {...register('name')}placeholder='Item' className='form-input'></input>
                    </div>
                    <div className='input-group'>
                        <input type= "number" {...register('amount')}placeholder='Amount' className='form-input'></input>
                    </div>
                    <div className='submit-btn'>
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Add expenses</button>
                    </div>
                </div>
            </form>
            <History></History>
        </div>
        
    )
}