
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todos from "./pages/Todo";
import Completed from "./pages/Complete";
import Users from "./pages/users";
import Login from "./pages/login";
import Signup from "./pages/singup";



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
