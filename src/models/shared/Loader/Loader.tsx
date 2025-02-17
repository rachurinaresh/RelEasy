import React from "react";
import "./Loader.scss";
import CircularProgress from "@mui/material/CircularProgress";

function Loader(props: any) {
  return (
    <>
      {props?.isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default Loader;
