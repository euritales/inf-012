import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Costumers from "../pages/Costumers";
import New from "../pages/New";

function RotasProtegidas(props) {
  if (localStorage.getItem("usuarioLogado")) {
    console.log(localStorage.getItem("usuarioLogado"));
    return <Outlet />;
  } else {
    console.log(localStorage.getItem("usuarioLogado"));
    return <Navigate to="/" replace />;
  }
}

export default function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/register" element={<SignUp />} />
      <Route element={<RotasProtegidas />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/costumers" element={<Costumers />} />
        <Route exact path="/new" element={<New />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/register" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
