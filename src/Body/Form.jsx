import {memo} from "react";

const Form = memo(({ addEvent, task, setTask}) => { 
    
    const handleAdd = (event) =>{
         
        event.preventDefault();
            addEvent()             
    }

    return (
        <>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Enter the Task.."
                    value={task.Task}
                    onChange={e =>   setTask({...task, Task:e.target.value})}
                >
                </input> &nbsp;
                <select
                    value={task.Status}
                    onChange={e => setTask({...task, Status:e.target.value})}
                >
                    <option value="">--Select--</option>
                    <option value="In-Queue">In Queue</option>
                    <option value="In-Progress">In Progress</option>
                    <option value="On-Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                </select> &nbsp;
                <button type="Submit">
                    {task.Id == 0 ? 'Add Task' : 'Update Task'}
                </button>
            </form>
        </>
    )
})

export default Form;