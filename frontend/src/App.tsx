import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import PrivatePage from "./Common/PrivatePage";
import Layout from "./Common/Layout/Layout";
import ToDo from "./Pages/ToDo";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/") {
      navigate("/toDo", { replace: true });
    }
  }, [path, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/toDo" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/toDo"
        element={
          <PrivatePage>
            <Layout>
              <ToDo />
            </Layout>
          </PrivatePage>
        }
      />
    </Routes>
  );
};

export default App;
