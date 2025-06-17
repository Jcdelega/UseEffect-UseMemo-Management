import React, { useState, useEffect, useMemo } from 'react';
import Timer from './Timer';

/* Filtrar tasks: Agrega un filtro que permita ver solo las tasks de cierta duración o aquellas que hayan sido agregadas recientemente.

Persistencia de datos: Implementa la persistencia de datos utilizando localStorage para que las tasks no se pierdan cuando el navegador se recarga.

Estilización: Añade algunos estilos CSS para que la interfaz sea más atractiva y fácil de usar. */

function Form() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [durationTime, setDurationTime] = useState('');

    // This secondary effect update the title, every time a new task is added
    useEffect(() => {
        document.title = `Total: ${calculatedTotalTime} minutes`;
    }, [tasks]);

    // Time calculated optimized using useMemo
    const calculatedTotalTime = useMemo(() => {
        console.log("Calculating total time...");
        return tasks.reduce((total, task) => total + task.durationTime, 0);
    }, [tasks]);

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
        <section className='row'>
            <h1 className='m-5 p-3 border rounded-5'>Task Counter</h1>
            <div>
                <label htmlFor='new-task' className='text-black p-3'>Insert a new task</label>
                <input
                    className='rounded-pill'
                    name='new-task'
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Name your task"
                />
                <label htmlFor="time-duration" className='p-3 '>Time for this task</label>
                <input
                    className='rounded-pill'
                    name='time-duration'
                    type="number"
                    value={durationTime}
                    onChange={(e) => setDurationTime(e.target.value)}
                    placeholder="Duration in minutes"
                />
                <button className='rounded-pill' onClick={addNewTask}>Add</button>
            </div>

            <h2 className='text-black'>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task.name}: {task.durationTime} minutos</li>
                ))}
            </ul>
            <h3>Total time: {calculatedTotalTime} minutes</h3>
            <Timer time={calculatedTotalTime * 60} message="Your time is running out:"/>
        </section>
    );
}

export default Form;