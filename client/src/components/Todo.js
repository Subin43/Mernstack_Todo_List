import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
function Todo() {
  //Add useState, we ll store items in the array
  const [items, setItems] = useState([]);
    // Add input state, we will store the user's input in this state
    const [input, setInput] = useState("");

  //Add useEffect, GetTodos() will run every time the component renders
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todo');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
// Store the target's value into the input state 
 const handleChange = (e)=>{
setInput(e.target.value)
 }

 // add Data
 const addTodo = async () => {
  try {
      const response = await axios.post('http://localhost:8000/todo/new', {
          name: input
      }, {
          headers: {
              "content-type": "application/json"
          }
      });

      // Assuming your server returns some data after creating the todo
      console.log(response.data);

      // Call fetchData function
      await fetchData();

      // Reset input
      setInput('');
  } catch (error) {
      console.error("Error:", error);
  }
}

  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={()=>addTodo()}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
  {items.map((item) => {
    const { _id, name } = item;
    return <TodoItem key={_id} name={name} id={_id} setItems={setItems} />;
  })}
  </div>
    </div>
  );
}

export default Todo;
