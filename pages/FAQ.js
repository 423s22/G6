import {Page, Layout, EmptyState, Banner} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
import { TextField } from '@shopify/polaris';
import { List } from '@shopify/polaris';
import React, { useCallback, useState } from "react";
import "react-dom";
import Lists from "../pages/List";
import "../components/css/searchBar.module.css";
class FAQ extends React.Component{

    render(){
        
        return(
            <div className='main'>
                <div className='search'>
                    <TextField
                        label='Search FAQ'
                        id="outlined-basic"
                        variant='outlined'
                        fullWidth
                        autoComplete="off"
                        />
                </div>
                <Lists />
            </div>
        );
    }
    /*render(){
    const [query, setQuery] = useState("")
        return(
            
           <><div className="main">
                <h1>Search FAQ</h1>
                <div>
                    <input placeholder='Enter Question' onChange={event => setQuery(event.target.value)}/>
                    {
                       Data.map((post, index) => {
                            <div key={index}>
                                <p>{post.question}</p>
                                <p>{post.answer}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='list'>
                {Data.map((post) => (
                    <div className='list' key={post.id}>
                    <p>{post.question}</p>
                    <p>{post.answer}</p>
                </div>
                ))}  
                </div > </> 
        );
    }*/
}

export default FAQ;