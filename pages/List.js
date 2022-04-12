import React from 'react'
import { useState } from 'react'
import data from "../components/ListData.json"
import style from "../components/css/searchBar.module.css"

function List(props) {

    return(
        <div>
            {data.map((item) => (
                <div className={style.box} key={item.id}>
                    {item.question}</div>
            ))}
        </div>   
    )
}
export default List
