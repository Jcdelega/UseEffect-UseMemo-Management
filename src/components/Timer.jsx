import { useState, useEffect } from "react";

const Timer = ({time, message})=>{
    const [timer, setTimer] = useState(time);
    
    const secondaryEffect = ()=>{
        if (timer > 0){
            setTimeout(()=>{
                setTimer(timer => timer -1);
            },1000);
        }
    };
    useEffect(secondaryEffect,[timer]);

    return (
        <div className="mx-auto">
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