import { Navigate, Route, Routes } from "react-router-dom";
import LandingLayout from "../pages/LandingLayout/LandingLayout";
import { routePaths } from "../constants/routePaths";
import React from "react";
import ProjectManagementTools from "../components/ProjectManagementTools/ProjectManagementTools";
import Organizations from "../components/ProjectManagementTools/Organizations/Organizations";
import Login from "../pages/Login/login";
import ReleaseNotes from "../components/ProjectManagementTools/ReleaseNotes/ReleaseNotes";
import Projects from "../components/ProjectManagementTools/Projects/Projects";
import { useAuth } from "../context/AuthProvider";
import Register from "../pages/Register/register";

const RoutesConfig = () => {
  const auth = useAuth();
  return (
    <Routes>
      {auth?.isLoggedIn ? (
        <Route element={<LandingLayout />}>
          <Route
            path={routePaths.projectManagementTools}
            element={<ProjectManagementTools />}
          />
          <Route path={routePaths.organizations} element={<Organizations />} />
          <Route path={routePaths.projects} element={<Projects />} />
          <Route path={routePaths.releaseNotes} element={<ReleaseNotes />} />
          <Route
            path={routePaths.wild}
            element={<Navigate to="/ProjectManagementTools" />}
          />
        </Route>
      ) : (
        <Route>
          <Route path={routePaths.register} element={<Register />} />
          <Route path={routePaths.login} element={<Login />} />
          <Route path={routePaths.wild} element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesConfig;
