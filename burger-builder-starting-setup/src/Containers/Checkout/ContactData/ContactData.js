import React , { Component } from "react";
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street :'',
            postalCode: '',
        },
        loading :false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading :true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'bhavya',
                address: '123 road',
                zipcode: '64111',
                country: 'usa'
            },
            delivaryMethod: 'fastest'
        }
        alert('bhavya!!')
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading :false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading :false })
            });    
    }
    componentWillUnmount () {
        console.log('contact component unmount');
    }
    render () {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Enter your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Enter your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Enter your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Enter your postal code"/>
            <Button btnType="Success" clicked= {this.orderHandler}>ORDER</Button>

        </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;