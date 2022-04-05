import React from 'react';
import ReactDOM  from 'react-dom';
import Data from "../components/json/ListData.json"
import "../components/css/searchBar.module.css"; 
import TextField from "@shopify/polaris";
import List from "../pages/List"
import { useState } from "react";

class FAQ extends React.Component{
    
    render(){
        return(
            <div className='main'>
                <h1>React Search</h1>
                <div classname="search">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                     />
                </div>

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