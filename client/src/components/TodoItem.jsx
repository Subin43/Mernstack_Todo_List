import React from "react";
import axios from 'axios';
//Add API, we ll need it later when we send a delete request

function TodoItem(props){
 // Pass down props
 // Modify hardcoding content to dynamic content
 // Now it displays the data we created in advance
const {name, id, setItems} = props
//Detete Tasks


const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/todo/delete/${id}`);

    if (response.status !== 204) { // Check for status 204 (No Content), as per your backend response
      throw new Error("Failed to delete a task");
    } 

    // No need to parse response data as there's no content in the response
    setItems(items => items.filter(item => item._id !== id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}



    return(
     <div className="todo">
        <div className="text">{name}</div>
        <div className="delete-todo"
        onClick={()=>deleteTodo(id)}><span >X</span></div>
      </div>
    )
}

export default TodoItem;