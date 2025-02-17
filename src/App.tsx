import React from "react";
import "./App.scss";
import RoutesConfig from "./config/routesConfig";
import { AuthProvider } from "./context/AuthProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import SnackBarProvider from "./context/SnackbarProvider";

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <SnackBarProvider>
          <RoutesConfig />
        </SnackBarProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
