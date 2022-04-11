import { TextField } from '@shopify/polaris';
import React from "react";
import { useState, useCallback } from "react";
import Lists from "../pages/List";
import style from "../components/css/searchBar.module.css";
//import "../components/ListData.json";


function FAQ(){
    const [inputValue, setInputValue] = useState("");

    const inputHandler = useCallback((newValue) => setInputValue(newValue), []);
    
    return(
        <div >
            <h1>Search </h1>
            <div>
                <TextField
                    id="outlined-basic"
                    placeholder='Input your question and press enter...'
                    value={inputValue}
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    />
            </div>
            <Lists input={inputValue} />
        </div>
    );
}
export default FAQ;
