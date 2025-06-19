import { useState, useEffect } from "react";

const Timer = ({timeLeftToDecrease, message})=>{
    const [timeLeft, setTimer] = useState(timeLeftToDecrease * 60);
    
    const handlerTimeLeftToDecrease = ()=>{
        const additionalTime = timeLeftToDecrease * 60;
        setTimer(prevTimer => prevTimer + additionalTime);
    }
    const secondaryEffect = ()=>{
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimer(prev => prev - 1); 
        }, 1000);
 
        return () => clearInterval(interval);
    };

    useEffect(handlerTimeLeftToDecrease,[timeLeftToDecrease]);

    useEffect(secondaryEffect,[timeLeft]);
            
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="col-3 text-black border px-auto py-1 rounded bg-warning">
            <p>{message}</p>
            <p>  
                <strong>
                    {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                </strong> seconds left
            </p>
        </div>
    )
}
export default Timer;