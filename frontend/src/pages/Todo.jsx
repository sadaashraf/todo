import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import TodoCard from "../components/todoCard";


function Todos() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:3000/todo?completed=false", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(await res.json());
  };

  const addTodo = async () => {
    if (!title) return alert("Enter todo");

    await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTodos();
  };

  const markCompleted = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}/complete`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />

      <div className="flex flex-col items-center mt-8 space-y-4">
        <div className="w-96">
          <label className="font-semibold">Enter Todo</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={addTodo}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>

        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onComplete={markCompleted}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default Todos;
