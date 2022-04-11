import { TextField } from '@shopify/polaris';
import React from "react";
import { useState } from "react";
import Lists from "../pages/List";
import "../components/css/searchBar.module.css";
//import "../components/ListData.json";


function FAQ(){
    const [inputValue, setInputValue] = useState("");
   let inputHandler = (e) => {
        //conveter to lowercase
        var lowerCase = e.target.value.toLowerCase();
        setInputValue(lowerCase);
    }; 
    
    return(
        <div className="main">
            <h1>Search </h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
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
