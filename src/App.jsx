import './App.css'
import { useState } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Form from './Body/Form'
import FormList from './Body/FormList'

function App() {

const [task, setTask] = useState({Id:0, Task:'', Status:''})

const [search, setSearch] = useState('')
const [searchTerm, setSearchTerm] = useState('')

const [taskList, setTaskList] = useState([]);

const AddTask = () => {
  if(task.Task === '' || task.Status === ''){
    alert('Please fill all the fields')
    return
  }
  if(task.Id == 0){
  setTaskList([...taskList , {Id:Date.now(), Task: task.Task, Status: task.Status}])
  }
  else{
    setTaskList(taskList.map(item => item.Id === task.Id ? task : item))
  }
}

const EditTask = (itemID) => {
   let filData = taskList.find(x => x.Id == itemID)
    if(filData)
    {
     setTask(filData);
    }
}

const DeleteTask = (itemID) => {
   setTaskList(taskList.filter(item => item.Id != itemID))
}

const FilterSearch = (value, term) => {
  setSearch(value)    
  setSearchTerm(term)
 
}

const filteredList = () => {
  return taskList.filter(item => 
    searchTerm === 'Task' 
      ? item.Task.toLowerCase().includes(search.toLowerCase())
      : item.Status.toLowerCase().includes(search.toLowerCase())
  );
}


  return (
    <> 
    <div className='body'>
      
      <Header />
    
      <Form 
        task={task} 
        setTask={setTask}
        addEvent={AddTask}   
      />
{ taskList.length > 0 &&
      <FormList 
        taskData={filteredList()} 
        EditTask={EditTask}
        DeleteTask={DeleteTask}
        setSearchTerm={FilterSearch}
      />
}

      <Footer />

     </div>
    </>
  )
}

export default App
