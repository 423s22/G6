import { createContext, useContext } from 'react';
import React, { useState, useMemo } from 'react';

const ProductContext = createContext();

export function ProductWrapper({ children }) {

    const initialInfo = null;

    
    const [productInfo, setProductInfo] = useState(initialInfo);
    const product = useMemo(() => ({ productInfo, setProductInfo}), [productInfo]);

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}