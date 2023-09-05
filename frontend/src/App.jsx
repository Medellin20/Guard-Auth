import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignIn from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp';
import './main.css';
import App_ from "./App_";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path='/' element={<App_/>} />
      <Route path='/auth/signin' element={<SignIn/>} />
      <Route path='/auth/signup' element={<SignUp/>} />
    </Routes>
  );
}

export default App;
