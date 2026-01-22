// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/singUp";
// import Dashboard from "./pages/dashboard";
// import Users from "./pages/users";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/users" element={<Users />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/singUp";
import Todos from "./pages/Todo";
import Completed from "./pages/Complete";
import Users from "./pages/users";



const Private = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/todos" element={<Private><Todos /></Private>} />
        <Route path="/completed" element={<Private><Completed /></Private>} />
        <Route path="/users" element={<Private><Users /></Private>} />

        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
