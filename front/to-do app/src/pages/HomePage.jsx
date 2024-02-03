import React, { useEffect, useState } from "react";
import "../styles/homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTasks, pushTask } from "../../reduxStore/taskSlice";
import axios from "axios";
import TaskComponent from "../components/taskComponent";

function HomePage() {
  const dispatch = useDispatch();
  const { tasksArr, tasksLoading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user);
  const [newTask, setNewTask] = useState({ title: "", body: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [onDelete ,setOndelete]=useState(true)
  const[OnEdit,setOnEdit]=useState(true)
  const handleOnEditSave = () => setOnEdit((prevOnEdit) => !prevOnEdit);

  const handleDeletion = () => {
    setOndelete((prevOnDelete) => !prevOnDelete);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          "http://localhost:3002/task/list/" + user.id
        );
          console.log('api response :',response.data)
        dispatch(setTasks({ tasksArr: response.data.tasks }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    if (user) {
      fetchTasks();
    }
  }, [user, onDelete,isConfirmed,OnEdit, dispatch]);
  
  const addTask = () => {
    setIsConfirmed(false);
    setIsAdding(!isAdding);
  };

  const handleConfirmation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/task/add/" + user.id,
        newTask
      );
      console.log("new task :",newTask);
      console.log('api responese',response.data)
      dispatch(pushTask({task:response.data.task}));
      setIsAdding(true);
      setIsConfirmed(true);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="home">
      <div className="home-nav">
        <div className="home-nav-profile">
          <div className="profile-img">
            <img src="../public/assets/user.png" alt="user profile" />
          </div>
          <div className="profile-username">
            {user ? user.username : "Loading..."}
          </div>
        </div>
        <div className="buttons">
          <button
            className="crud_buttons"
            onClick={() => {
              addTask();
            }}
          >
            add task
          </button>
        </div>
        {isAdding ? null : (
          <div className="adding-container">
            <input
              id="newtitle"
              placeholder="Title..."
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prevTask) => ({
                  ...prevTask,
                  title: e.target.value,
                }))
              }
            />

            <input
              id="newbody"
              placeholder="Body..."
              value={newTask.body}
              onChange={(e) =>
                setNewTask((prevTask) => ({
                  ...prevTask,
                  body: e.target.value,
                }))
              }
            />

            <button
              id="confirm_button"
              onClick={() => {
                setTimeout(() => {
                  handleConfirmation();
                }, 1000); // Set the delay time in milliseconds
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <div className="home-content">
        <div className="tasks">
          <ul>
            {tasksArr && tasksArr.length > 0 ? (
              tasksArr.map((task, index) => (
                <li key={index}>
                  <TaskComponent
                    userId={user.id}
                    id={task.id }
                    title={task.title || "title"}
                    body={task.body || "title"}
                    index={index}
                    onDeletion={onDelete}
                    handleOnDeletion={handleDeletion}
                    onEditSave={handleOnEditSave}
                  />
                </li>
              ))
            ) : (
              <p id="unavailable">No tasks available !    <span>  </span></p>
            )}
          </ul>
          </div>

     
        
       
      </div>
    </div>
  );
}

export default HomePage;
