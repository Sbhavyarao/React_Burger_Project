import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label :'Meat', type: 'meat'},
{label :'Salad', type: 'salad'},
{label :'Bacon', type: 'bacon'},
{label :'Cheese', type: 'cheese'},

];

const buildControls = (props) =>{
    return <div className={classes.BuildControls}>
<p>Current Price : {props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl key= {ctrl.label} disabled= {props.disabled[ctrl.type]} label={ctrl.label}
            less={()=> props.less(ctrl.type)} 
            more={()=> props.more(ctrl.type)}/>
        ))}
        <button className ={classes.OrderButton} disabled = {!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
};

export default buildControls;