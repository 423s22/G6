import { React, useState} from 'react'
import Data from "../components/json/ListData.json"

function List(props) {
    //creating  an array by filterinf the orignal array
    const filterData = data.filter((el) => {
        //if no input return oringal
        if (props.input == '') {
            return el;
        }
        //returning the item containing the user input
        else{
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return(
        <ul>
            {Data.map((item) => (
                <div key={item.id}>
                    <p> {item.question}</p>
                    <p>{item.answer}</p>
                </div>
            ))}
        </ul>
    )
}
export default List
