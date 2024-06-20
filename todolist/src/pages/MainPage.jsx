import { useEffect, useState } from "react";
import Input from "./Input";
import axios from 'axios'
import { TiDelete, TiEdit } from "react-icons/ti";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";

function MainPage() { 
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setTasks(result.data))
    .catch(err => (err))
  }, [])
  
  const toggleTask = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
    .then(result => setTasks(result.data))
    .catch(err => (err)) 
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        toast.success('Task Deleted')
      })

      .catch(err => console.error(err));
};

  const  handleEdit = (task) => {
    setCurrentTask(task)
  }

  const clearCurrentTask = () => {
    setCurrentTask(null)
  }


  return (
    <div className="home">
      <h2>𝐓𝐚𝐬𝐤 𝐋𝐢𝐬𝐭</h2>
      <Input setTasks={setTasks} currentTask={currentTask} clearCurrentTask={clearCurrentTask} />
        <div className="task-wrapper">
        {
          tasks.length === 0
           ? <div className="center"><h3>No Record</h3></div> 
           :
          tasks.map(task => (
            <div className={`task ${task.done ? 'completed' : ''}`} key={task._id}>
              <div className="checkbox" onClick={() => toggleTask(task._id)}>
                {task.done ? <RiCheckboxCircleFill className="icons" /> : <MdCheckBoxOutlineBlank className="icons" />}
                <p>{task.task}</p>
              </div>
              <div>
              <span onClick={() => deleteTask(task._id)}><TiDelete className="icon" /></span>
              <span onClick={() => handleEdit(task)}><TiEdit className="icon" /></span>
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
}
export default MainPage