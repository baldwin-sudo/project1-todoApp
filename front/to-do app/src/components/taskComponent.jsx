import React, { useState } from "react";
import "../styles/taskComponent.css"; // Make sure to import your CSS file
import axios from "axios";
import { updateTask } from "../../reduxStore/taskSlice";
const TaskComponent = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedBody, setEditedBody] = useState(props.body);

  const handleSaveClick = async () => {
    try {
      const data = { title: editedTitle, body: editedBody };
      const response = await axios.put(
        `http://localhost:3002/task/update/${props.userId}/${props.id}`,
        data
      );
      console.log(response.data);
      props.onEditSave();
      dispatch(updateTask({ task: response.data.task }));
    } catch (err) {}

    setIsEditing(false);
    setIsModifying(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(props.title);
    setEditedBody(props.body);
    setIsEditing(false);
    setIsModifying(false);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const toggleBody = () => {
    setIsModifying(false); // Reset modifying state when toggling body
  };

  const handleDelete = async () => {
    try {
      // Use the 'id' prop to delete the task
      await axios.delete(
        `http://localhost:3002/task/delete/${props.userId}/${props.id}`
      );
      props.handleOnDeletion();
      // Dispatch action or update state to reflect the deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleModifyClick = () => {
    setEditedBody("");
    setEditedTitle("");
    setIsModifying(!isModifying);
    setIsEditing(!isEditing);
  };

  return (
    <div className="task">
      <input
        className="done-check"
        id={"done-checkbox" + props.index}
        type="checkbox"
      />
      <div className="task-container">
        {isEditing ? (
          <div className="editingTask">
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="task-title-edit"
              placeholder="new Title ..."
            />
            <input
              type="text"
              value={editedBody}
              onChange={handleBodyChange}
              className="task-body-edit"
              placeholder="new body ..."
            />
            <div className="buttonsSave">
              <button id="button_delete" onClick={handleSaveClick}>
                Save
              </button>
              <button id="button_delete" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3
              className="task-title"
              onClick={() => {
                toggleBody();
              }}
            >
              {props.title}
            </h3>
            {!isModifying && <p className="task-body">{props.body}</p>}
          </>
        )}
      </div>
      <button id="button_delete" onClick={handleDelete}>
        Delete
      </button>
      <button id="button_modify" onClick={handleModifyClick}>
        Modify
      </button>
    </div>
  );
};

export default TaskComponent;
