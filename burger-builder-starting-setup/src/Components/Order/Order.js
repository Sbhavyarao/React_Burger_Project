import React from 'react';
import classes from './Order.css'

const order = (props) => {
    // one way
    //----------------
    // let ingredients = [];
    // ingredients = Object.keys(props.ingredients).map( // [salad,bacon,meat,cheese]
    //     ing => {
    //         return (
    //         <p key ={ing}>{ing} : {props.ingredients[ing]}</p>
    //         )
    // })

    const ingredients =[];
    for(let ing in props.ingredients){
        ingredients.push( 
            {
            name : ing,
            amount: props.ingredients[ing]
            }
        );
    }

    const ingredientOutput = ingredients.map(ing => {
    return <span style= {{
        textTransform :'capitalize' , 
        display: 'inline-block',
        margin :'0 8px',
        border : '1px solid #ccc',
        padding: '5px'
        }}
    key={ing}>{ing.name} ({ing.amount})</span>;
    });

    return (
        <div className ={classes.Order}>
         <p>Ingredients : {ingredientOutput}</p>   
    <p>Price : <strong>{props.price}</strong></p>
        </div>
    );
};

export default order;