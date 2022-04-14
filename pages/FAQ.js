import React from "react";
import { useState } from "react";
import data from "../components/ListData.json"
import style from "../components/css/searchBar.module.css";

//this code allows for the user type thier question into a search bar if they run into problems 
//the data is stored in a json file and the search bar looks through the json file usign keywords
//the users input is changed to all lowercase letters before being compared to json file. The data
// is compared using .map 
function FAQ(){
    const [inputValue, setInputValue] = useState("");
    
    return(
        <div >
            <h2 className={style.h1}>Look up keywords for questions</h2>
            <div >
            <input className={style.search2}  placeholder='Input your question...' onChange={event => setInputValue(event.target.value)} />
            </div>
            {
                data.filter(post => {
                    if (inputValue == ' '){
                        return post;
                    } else if (post.question.toLowerCase().includes(inputValue.toLowerCase())) {
                        return post;
                    } 
                    /* else if (post.answer.toLowerCase().includes(inputValue.toLowerCase())) {
                        return post;
                    } */
                }).map((post, inputValue) => (
                    <div className={style.box} key={inputValue}>
                        <p>{post.question}</p>
                        <p> {post.answer}</p>
                        </div>
                ))
            }
        </div>
    );
}
export default FAQ;
