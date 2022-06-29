import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Costumers from "../pages/Costumers";
import New from "../pages/New";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

function RotasProtegidas(props) {
  const { loading } = useContext(AuthContext);
  console.log(loading);
  return loading ? props.children : <Navigate to="/" replace={true} />;
}

export default function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route
        exact
        path="/dashboard"
        element={
          <RotasProtegidas redirectTo="/">
            <Dashboard />
            <Profile />
            <Costumers />
            <New />
          </RotasProtegidas>
        }
      />

      <Route exact path="/register" element={<SignUp />} />
      {/* <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/costumers" element={<Costumers />} />
      <Route exact path="/new" element={<New />} />  */}
      {/* </RotasProtegidas> */}
    </Routes>
  );
}
