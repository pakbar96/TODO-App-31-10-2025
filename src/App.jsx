import './App.css'
import { useState, useCallback, useMemo, useEffect } from 'react'
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
const [taskList, setTaskList] = useState( JSON.parse(localStorage.getItem('taskList')) || [] );


// Function to add a new task or update an existing task
const AddTask = useCallback(() => {
  if (task.Task.trim() === '' || task.Status.trim() === '') {
    alert('Please fill all the fields');
    return;
  }

  setTaskList(prevList => {
    let updatedList;

    if (task.Id === 0) {
      // ADD NEW TASK
      updatedList = [...prevList, { ...task, Id: Date.now() }];
    } else {
      // UPDATE EXISTING TASK
      updatedList = prevList.map(item =>
        item.Id === task.Id ? task : item
      );
    }

    // sync to localStorage
    localStorage.setItem('taskList', JSON.stringify(updatedList));
    return updatedList;
  });

  // reset form
  setTask({ Id: 0, Task: '', Status: '' });

}, [task]);

// Function to edit a task by its ID
// itemID is the ID of the task to be edited
const EditTask = useCallback((itemID) => {
  const storedList = JSON.parse(localStorage.getItem('taskList') || '[]');
  const selected = storedList.find(item => item.Id === itemID);

  if (selected) {
    setTask(selected);
  }

}, []);


// Function to delete a task by its ID
// itemID is the ID of the task to be deleted
const DeleteTask = useCallback((itemID) => {
  
  const updatedList = taskList.filter(item => item.Id !== itemID);

  // Update state → triggers UI re-render
  setTaskList(updatedList);

  // Update localStorage → persist data
  localStorage.setItem("taskList", JSON.stringify(updatedList));

}, [taskList]);

// Function to filter the task list based on the search term
// value is the search input value, 
// term is the current search term (Task or Status)
const FilterSearch = useCallback((value, term) => {
  setSearch(value)    
  setSearchTerm(term)
 
}, [])

// Memoized filtered list based on the search term and search input value
const filteredList = useMemo(() => {
  if (!taskList) return [];

  return taskList.filter(item => {
    const value = search.toLowerCase();

    if (searchTerm === 'Task') {
      return item.Task.toLowerCase().includes(value);
    }

    if (searchTerm === 'Status') {
      return item.Status.toLowerCase().includes(value);
    }

    return true; // no filter
  });

}, [search, searchTerm, taskList]);


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
      taskList?.length > 0 &&
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
