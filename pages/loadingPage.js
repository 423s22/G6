import React from 'react';
import { ReactDOM } from 'react';
import {Provider, Loading} from "@shopify/app-bridge-react";
//import ProductList from '../components/ProductList';
import Router from 'next/router';

// link: https://shopify.dev/apps/tools/app-bridge/react-components/loading

/*class LoadingPage extends React.Component {
    config = {apiKey: API_KEY,
                host:host}
    loading = isTheAppLoading();
    loadingComponent = loading ? <LoadingPage /> : null;
    
    return (

        <Provider config={config}>
                {loadingComponent}
        </Provider> 
 
    );
}

            
root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<LoadingPage />, root);*/