import react from "react";
import { supabase } from "../utils/supabaseClient";

export default function random({chingus}) {
    console.log({chingus});
    return (
        <div>
            {chingus.map(chingus => <p>
                {chingus.id}
            </p>) }
        </div>
    );
}

export const getFriends = async () => {
    const {data:chingus} = await supabase
    .from('profiles')
    .select("*") 
    return {
        props: {chingus,},
    };
    
};