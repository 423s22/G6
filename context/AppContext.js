import { createContext, useContext } from 'react';
import {React, useState, useMemo} from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {

    const initialInfo = {
      id: -1,
      options: [],

    }
    const [productInfo, setProductInfo] = useState(initialInfo);
    const product = useMemo(() => ({ productInfo, setProductInfo}), [productInfo]);

  

  return (
    <AppContext.Provider value={product}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}