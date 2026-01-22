// import { NavLink, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "bg-blue-600 px-3 py-1 rounded text-white"
//       : "px-3 py-1 rounded hover:bg-blue-600 hover:text-white";

//   return (
//     <div className="bg-purple-400 text-white px-6 py-3 flex justify-between items-center">
//       <h1 className="font-bold">Todo App</h1>

//       <div className="space-x-4">
//         <NavLink to="/todos" className={linkClass}>Todos</NavLink>
//         <NavLink to="/completed" className={linkClass}>Completed</NavLink>
//         <NavLink to="/users" className={linkClass}>Users</NavLink>
//       </div>

//       <button onClick={logout}>Log out</button>
//     </div>
//   );
// }

// export default Navbar;
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 px-3 py-1 rounded text-white"
      : "px-3 py-1 rounded hover:bg-blue-600 hover:text-white";

  return (
    <div className="bg-purple-400 px-6 py-3 flex justify-between items-center text-white">
      <h1 className="font-bold">Todo App</h1>

      <div className="space-x-4">
        <NavLink to="/todos" className={linkClass}>Todos</NavLink>
        <NavLink to="/completed" className={linkClass}>Completed</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
