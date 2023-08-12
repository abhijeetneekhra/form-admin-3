import "./App.css";
import { Toaster } from "react-hot-toast";
import RegForm from "./components/RegForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Admin from "./components/Admin.js";
//import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Hello from "./components/Hello";
import Hello2 from "./components/Hello2";
import { Admin } from "./components/Admin";
import Admin2 from "./components/Admin2";
import { RecycleBin } from "./components/RecycleBin";
import EditForm from "./components/EditForm";
import PasswordChange from "./components/PasswordChange";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<RegForm />} />
        <Route path="/admin" element={<Protected Component={Admin} />} />
        <Route path="/admin2" element={<Admin2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/hello2" element={<Hello2 />} />
        <Route path="/recyclebin" element={<RecycleBin />} />
        <Route path="/editform/:id" element={<EditForm />} />
        <Route path="/passwordchange/:email" element={<PasswordChange />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
