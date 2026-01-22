function TodoCard({ todo, onComplete, onDelete }) {
  return (
    <div className="border border-red-400 rounded-lg p-4 flex justify-between items-center w-96 bg-white">
      <div>
        <p className="font-semibold">{todo.title}</p>
        <p className="text-sm text-gray-500">
          {new Date(todo.date).toLocaleString()}
        </p>
      </div>

      <div className="space-x-2 flex items-center">
        {todo.completed ? (
          <span className="text-green-500 font-semibold">
            Completed
          </span>
        ) : (
          <button
            onClick={() => onComplete(todo.id)}
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Mark Complete
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


export default TodoCard;

