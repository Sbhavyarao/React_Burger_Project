import React , { Component } from "react";
import Aux from '../../hoc/auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES ={
    salad :0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false,
        loading : false,
        error : false,
    }

    componentDidMount () {
        console.log(this.props);
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({
                ingredients : response.data
            })
        })
        .catch(err => {
            this.setState({error : true})
        });
    }

    updatePurchaseState (updatedIngredients) {
        
        const sum = Object.keys(updatedIngredients).map((value , index) =>{
            return updatedIngredients[value];
        }).reduce((sum , ele)=>{
            return sum+ele;
        })
        this.setState({purchasable : sum>0})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients, 
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        this.setState({
            ingredients: updatedIngredients,
            totalPrice : oldPrice+ priceAddition
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
            const updatedCount = oldCount-1;
            const updatedIngredients = {
                ...this.state.ingredients, 
            }
            updatedIngredients[type] = updatedCount;
            const priceRemoval = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice : oldPrice - priceRemoval
            })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing : true
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing : false
        })
    }
    purchaseContinueHandler = () =>{
        //alert(' You continue !')
        
        const queryParams = [];
        for( let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +'=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice.toFixed(2) )
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        });
    }
    render(){
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
 
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingedients can't be loaded</p>: <Spinner/>
        if(this.state.ingredients){
            burger = <Aux>
                        <Burger ingredients= {this.state.ingredients}/>
                        <BuildControls disabled = {disableInfo} purchasable = {this.state.purchasable}less={this.removeIngredientHandler}
                        more= {this.addIngredientHandler}
                        price={this.state.totalPrice}
                        ordered = {this.purchaseHandler}/>
                    </Aux>
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            purchaseCancelled ={this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            totalPrice = {this.state.totalPrice}/>
            if( this.state.loading ){
                orderSummary = <Spinner/>
            }
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder , axios); 