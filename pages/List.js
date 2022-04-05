import { React, useState} from 'react'
import Data from "../components/json/ListData.json"

function List(props) {
    return(
        <ul>
            {Data.map((item) => (
                <li key={item.id}>{item.question}{item.answer}</li>
            ))}
        </ul>
    )
    /*{ Data.map((post) => (
        <div  key={post.id}>
            <p>{post.question}</p>
            <p>{post.answer}</p>
        </div>
    )); }*/
    /*return(
        <ul>
            {data.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )*/
}
export default List
