import React, { useState, useEffect, useMemo } from 'react';
import Timer from './Timer';

/* Filtrar tasks: Agrega un filtro que permita ver solo las tasks de cierta duración o aquellas que hayan sido agregadas recientemente.

Persistencia de datos: Implementa la persistencia de datos utilizando localStorage para que las tasks no se pierdan cuando el navegador se recarga.

Estilización: Añade algunos estilos CSS para que la interfaz sea más atractiva y fácil de usar. */

function Form() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [time, setTime] = useState(0);

    
    
    // Time calculated optimized using useMemo
    const calculatedTotalTime = useMemo(() => {
        console.log("Calculating total time...");
        return tasks.reduce((total, task) => total + task.durationTime, 0);
    }, [tasks]);
    
    // This secondary effect update the title, every time a new task is added
    useEffect(() => {
        document.title = `Total: ${calculatedTotalTime} minutes`;
        setTime(calculatedTotalTime);
    }, [tasks]);

    useEffect(()=>{
        setTime(calculatedTotalTime);
    },[calculatedTotalTime]);
    
    // Function to add a new task
    const addNewTask = () => {
        if (newTask && durationTime) {
            const newTaskObject = {
                name: newTask,
                durationTime: parseInt(durationTime)
            };
            setTasks([...tasks, newTaskObject]);
            setNewTask('');
            setDurationTime('');
        }
    };

    return (
        <section className='row align-items-center justify-content-center'>
            <h1 className='mt-5 p-3 border rounded-5 col-12'>Task Counter</h1>
            <div className='rounded-4 border col-10'>
                <label htmlFor='new-task' className='text-black p-3'>Insert a new task</label>
                <input
                    className='rounded-3 bg-primary-subtle text-black'
                    name='new-task'
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Name your task"
                />
                <label htmlFor="time-duration" className='p-3 '>Time for this task</label>
                <input
                    className='rounded-3 bg-primary-subtle text-black'
                    name='time-duration'
                    type="number"
                    value={durationTime}
                    onChange={(e) => setDurationTime(e.target.value)}
                    placeholder="Duration in minutes"
                />
                <button className='p-2 mx-3 text-primary-emphasis bg-primary-subtle ' onClick={addNewTask}>Add</button>
            </div>

            <h2 className='text-black'>Tasks</h2>
            <div className='row align-items-center justify-content-center'>
                <ul className='list-group col-4 text-start'>
                    {tasks.map((task, index) => (
                        <li className='list-group-item' key={index}><i class="bi bi-nut-fill"></i> <strong>{task.name}</strong></li>
                    ))}
                </ul>
                <ul className='list-group col-2 text-start'>
                    {tasks.map((task, index) => (
                        <li className='list-group-item' key={index}>{task.durationTime} minutes</li>
                    ))}
                </ul>
            </div>
            <h3 className='m-3' >Total time: {calculatedTotalTime} minutes</h3>
            <Timer time={time} message="Your time is running out: "/>
        </section>
    );
}

export default Form;