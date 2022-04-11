import React from 'react'
import { useState } from 'react'
import data from "../components/ListData.json"
import "../components/css/searchBar.module.css"

function List(props) {
    //new array to filter og array
    const filteredData = data.filter((el) => {
        //no input == return og
        if (props.input == '') {
            return el;
        }
        //return iten which contains user input
        else{
            return el.text.toLowerCase().includes(props.input)
        }
    }) 
    return(
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.question}</li>
            ))}
        </ul>   
    )
}
export default List
