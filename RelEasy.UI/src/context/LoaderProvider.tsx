import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "../models/shared/Loader/Loader";
import { useSelector } from "react-redux";

const LoaderContext = createContext<any>(null);

export const LoaderProvider = (props: any) => {
  const isAnythingLoading = useSelector((state) =>
    Object.values((state as any)?.api.queries).some(
      (entry) => (entry as any)?.status === "pending"
    )
  );
  return (
    <LoaderContext.Provider value={isAnythingLoading}>
      <Loader isLoading={isAnythingLoading} />
      {props?.children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};
