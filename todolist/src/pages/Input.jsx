import { useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


function Input({ setTasks, currentTask, clearCurrentTask }) {
  const [task, setTask] = useState('')

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask.task)
    }
  }, [currentTask])

  const addOrUpdate = () => {
    if (task === '') {
      toast.error('Please add a task!');
    } else {
      if (currentTask) {
        axios.put(`http://localhost:3001/update-name/${currentTask._id}`, { taskName: task })
          .then(result => {
            setTasks(prevTasks => prevTasks.map(t => t._id === currentTask._id ? result.data : t));
            setTask('');
            clearCurrentTask();
            toast.success('Task Updated!');
          })
        .catch(err => console.log(err));
      } else {

        axios.post('http://localhost:3001/add', { task })
          .then(result => {
            setTasks(prevTasks => [...prevTasks, result.data]);
            setTask(''); 
            toast.success('Task Created!')
          })
          .catch(err => console.log(err));
          
      }
    }
  };



  return (
    <div className="create_form">
      <input 
      type="text" 
      value={task}
      placeholder="Add a task"
      onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={addOrUpdate}>
      {currentTask ? 'Update' : 'Add'}
      </button>
    </div>
  )
}
export default Input