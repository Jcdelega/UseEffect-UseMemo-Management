import React, { useState, useEffect, useMemo } from 'react';
import Timer from './Timer';

// Filtrar tasks: Agrega un filtro que permita ver solo las tasks de cierta duración o aquellas que hayan sido agregadas recientemente.

function Form() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [firstTimeLoadingItems, setFirst] = useState(true);

    const getFromLocalStorageHandler =()=>{
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('Tasks'));
        if(tasksFromLocalStorage) {
            setTimeout(()=>{
                setTasks(tasksFromLocalStorage)
            },1000); 
        }
    };
    
    const setTasksToLocalStorage=()=>{
        if(firstTimeLoadingItems){
            setFirst(false);
            return;
        }else{
            localStorage.setItem('Tasks', JSON.stringify(tasks));
        }
    }    

    useEffect(setTasksToLocalStorage,[tasks, firstTimeLoadingItems])
    useEffect(getFromLocalStorageHandler,[]);


    // Time calculated optimized using useMemo
    const calculatedTotalTime = useMemo(() => {
        return tasks.reduce((total, task) => total + task.durationTime, 0);
    }, [tasks]);
    
    // This secondary effect update the title, every time a new task is added
    useEffect(() => {
        document.title = `Total: ${calculatedTotalTime} minutes`;
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
                        <li className='list-group-item' key={index}><i className="bi bi-nut-fill"></i> <strong>{task.name}</strong></li>
                    ))}
                </ul>
                <ul className='list-group col-2 text-start'>
                    {tasks.map((task, index) => (
                        <li className='list-group-item' key={index}>{task.durationTime} minutes</li>
                    ))}
                </ul>
            </div>
            <h3 className='m-3' >Total time: {calculatedTotalTime} minutes</h3>
            <Timer timeLeftToDecrease={calculatedTotalTime} message="Your time is running out: "/>
        </section>
    );
}

export default Form;