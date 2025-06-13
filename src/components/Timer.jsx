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
        <div>
            <p className="text-black border p-5 rounded bg-warning">{message} {timer} left</p>
        </div>
    )
}
export default Timer;