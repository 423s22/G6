import React from 'react'
import { useState } from 'react'
import data from "../components/ListData.json"
import "../components/css/searchBar.module.css"

function List(props) {

    return(
        <ul className='box'>
            {data.map((item) => (
                <li key={item.id}>{item.question}</li>
            ))}
        </ul>   
    )
}
export default List
