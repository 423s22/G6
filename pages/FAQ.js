import React from "react";
import { useState } from "react";
import data from "../components/ListData.json"
import style from "../components/css/searchBar.module.css";

//in handlerDB uncomment 276-285
//this code allows for the user 
function FAQ(){
    const [inputValue, setInputValue] = useState("");
    
    return(
        <div className={style.search}>
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
                }).map((post, inputValue) => (
                    <div className={style.box} key={inputValue}>
                        <p>{post.question}</p>
                        </div>
                ))
            }
        </div>
    );
}
export default FAQ;
