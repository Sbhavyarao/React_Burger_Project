import React , { Component } from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    state ={
        ingredients: {
            salad: 0,
            meat:0,
            cheese: 0,
            bacon : 0
        },
        totalPrice: 0,

    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        console.log('query: '+ query.entries());
        const ingredients={}
        let price = 0;
        for(let param of query.entries()){
           // console.log(param) ['bacon' ,'1']
            if(param[0] === 'price'){
                price = +param[1]
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                render={() => <ContactData {...this.props} ingredients={this.state.ingredients} 
                price={this.state.totalPrice}/>}
                />            
            </div>
        );
    }

}

export default Checkout;