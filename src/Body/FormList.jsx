import SearchBar from "./SearchBar";
import {memo} from "react";

const FormList= memo(({taskData, EditTask, DeleteTask, setSearchTerm}) => {
    return(
        <>
        <h2 className="title">Form List</h2>

            <table>
                <thead>
                    <tr>
                        <th><SearchBar term="Task" setSearchTerm={setSearchTerm} /></th>
                        <th><SearchBar term="Status" setSearchTerm={setSearchTerm} /></th>
                        <th></th>
                    </tr>
                <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>   
                    {
                    taskData.map( item => (
                    <tr key={item.Id}>
                        <td>{item.Task}</td>
                        <td>{item.Status}</td>
                        <td>
                            <button onClick={() => EditTask(item.Id)}>Edit</button> &nbsp;
                            <button onClick={() => DeleteTask(item.Id)}>Delete</button>
                        </td>
                    </tr>
                      ))
                    }  
                </tbody>
            </table>
        </>
    )
})

export default FormList;