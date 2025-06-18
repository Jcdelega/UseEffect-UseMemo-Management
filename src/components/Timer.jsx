import { useState, useEffect } from "react";

const Timer = ({time, message})=>{
    const [timer, setTimer] = useState(time || 0);
    
    const secondaryEffect = ()=>{
        console.log(`Cambia estado${timer}`)
        if (timer > 0){
            setTimeout(()=>{
                setTimer(timer => timer -1);
            },1000);
        }
    };
    useEffect(secondaryEffect,[timer]);

    useEffect(()=>console.log(`Recibe  props ${time}`),[]);

    return (
        <div className="col-3">
            <p className="text-black border px-auto py-4 rounded bg-warning">
                {message}  
                <strong>
                    {timer}
                </strong> seconds left
            </p>
        </div>
    )
}
export default Timer;