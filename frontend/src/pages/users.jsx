import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(atob(token.split(".")[1])); // decode JWT

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch users");
      }

      setUsers(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (id === currentUser.id) {
      return alert("You cannot delete yourself");
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />

      <div className="flex flex-col items-center space-y-4 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded shadow w-96 flex justify-between items-center"
          >
            <span>{user.email}</span>

            {currentUser.role === "admin" && (
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>

        ))}
      </div>
    </div>
  );
}

export default Users;
