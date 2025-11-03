import './App.css'
import { useState, useCallback, useMemo } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Form from './Body/Form'
import FormList from './Body/FormList'

function App() {

  //State variables
  //task: to hold the current task being added or edited
  //search: to hold the search input value
  //searchTerm: to hold the current search term (Task or Status)
  //taskList: to hold the list of tasks
  //useCallback and useMemo are used to optimize performance by memoizing functions and values
  //useState is used to manage state in functional components
const [task, setTask] = useState({Id:0, Task:'', Status:''})
const [search, setSearch] = useState('')
const [searchTerm, setSearchTerm] = useState('')
const [taskList, setTaskList] = useState([]);


// Function to add a new task or update an existing task
const AddTask = useCallback(() => {
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
  setTask({Id:0, Task:'', Status:''})    
}, [task, taskList]);

// Function to edit a task by its ID
// itemID is the ID of the task to be edited
const EditTask = useCallback((itemID) => {
   let filData = taskList.find(x => x.Id == itemID)
    if(filData)
    {
     setTask(filData);
    }
}, [taskList])


// Function to delete a task by its ID
// itemID is the ID of the task to be deleted
const DeleteTask = useCallback((itemID) => {
   setTaskList(taskList.filter(item => item.Id != itemID))
}, [taskList])

// Function to filter the task list based on the search term
// value is the search input value, 
// term is the current search term (Task or Status)
const FilterSearch = useCallback((value, term) => {
  setSearch(value)    
  setSearchTerm(term)
 
}, [])

// Memoized filtered list based on the search term and search input value
const filteredList = useMemo(() => {
  return taskList.filter(item => 
    searchTerm === 'Task' 
      ? item.Task.toLowerCase().includes(search.toLowerCase())
      : item.Status.toLowerCase().includes(search.toLowerCase())
  );
}, [taskList,searchTerm, search]);


  return (
    <> 
    <div className='body'>
      
      <Header />
    
      <Form 
        task={task}
        setTask={setTask}
        addEvent={AddTask}   
      />
      { 
      taskList.length > 0 &&
      <FormList 
        taskData={filteredList} 
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
