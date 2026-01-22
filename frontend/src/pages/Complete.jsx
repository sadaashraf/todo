import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import TodoCard from "../components/todoCard";


function Completed() {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/todo/completed", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setTodos);
  }, []);

  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />

      <div className="flex flex-col items-center mt-8 space-y-4">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            hideComplete
          />
        ))}
      </div>
    </div>
  );
}

export default Completed;
