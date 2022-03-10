import React from 'react';
import {Page, Layout, EmptyState, Banner} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
import { TextField } from '@shopify/polaris';
import { List } from '@shopify/polaris';
/*import style from "../css/searchBar.module.css"; isues with import */
/*import SplitPane, {Divider, SplitPaneBottom, SplitPaneLeft, SplitPaneRight, SplitPaneTop,} from "./SplitPane"; */
class FAQ extends React.Component{

    render(){
        return(
           <div className={"main"}>
               <h1>Search FAQ</h1>
               <div className='search'>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        />
               </div> 
               <List />   
               </div>
        );
    }
}

export default FAQ;