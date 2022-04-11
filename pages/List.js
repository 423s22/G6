import React from 'react';
import data from "../components/ListData.json";

function List(props) {
    //creating  an array by filterinf the orignal array
    const filteredData = data.filter((el) => {
        //if no input return oringal
        if (props.input == '') {
            return el;
        }
        //returning the item containing the user input
        /*else{
            return el.text.toLowerCase().includes(props.input)
        }*/
    })
    return(
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>
                    {item.question }
                    { item.answer}
                    </li>
            ))}
        </ul>
    )
}
export default List
