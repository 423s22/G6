import { TextField } from '@shopify/polaris';
import React from "react";
import { useState, useCallback } from "react";
import Lists from "../pages/List";
import data from "../components/ListData.json"
import style from "../components/css/searchBar.module.css";
//import "../components/ListData.json";


function FAQ(){
    const [inputValue, setInputValue] = useState("");

    //const inputHandler = useCallback((newValue) => setInputValue(newValue), []);
    
    return(
        <div >
            <h1 className={style.h1}>Frequently Asked Questions </h1>
            <input placeholder='Input your question...' onChange={event => setInputValue(event.target.value)} />
            {
                data.filter(post => {
                    if (inputValue == ' '){
                        return post;
                    } else if (post.question.toLowerCase().includes(inputValue.toLowerCase())) {
                        return post;
                    }
                }).map((post, inputValue) => (
                    <div key={inputValue}>
                        <p>{post.id}</p>
                        <p>{post.question}</p>
                        </div>
                ))
            }

        </div>
    );
}
export default FAQ;

/*
#1

            <div >
                <TextField 
                    id="outlined-basic"
                    placeholder='Input your question...'
                    value={inputValue}
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    />
            </div>
            <Lists input={inputValue} /> 

            */
