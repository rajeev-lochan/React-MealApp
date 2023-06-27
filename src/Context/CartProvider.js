import React, { useReducer } from 'react'
import CartContext from './CartContext';

const CartProvider = (props) => {

    const defaultCart = {
        items: [],
        totalAmount: 0,
        modal: false
    };

    const cartReducer=(state, action)=>{
        if(action.type === "Add"){
            let updatedTotalAmount;
            const existingItemIndex = state.items.findIndex(
                (item)=>{
                    return item.id === action.item.id
                }
            );
            const existingItem = state.items[existingItemIndex];
            let updatedItem, updatedItems;

            if(existingItem){
                updatedItem={
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedTotalAmount = state.totalAmount+action.item.amount;
                updatedItems = [...state.items]
                updatedItems[existingItemIndex]=updatedItem
            } else{
                updatedItems = [action.item, ...state.items];
                updatedTotalAmount = parseInt(state.totalAmount+(action.item.amount * action.item.quantity))               
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                modal: state.modal
            }
        }
        
        if (action.type === "Remove") {
            const existingCartItemIndex = state.items.findIndex(
                (item)=> item.id === action.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.amount;
            let updatedItems;

            if (existingCartItem.quantity === 1) {
              updatedItems = state.items.filter((item) => item.id !== action.id);
            } else {
              const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
              };
              updatedItems = [...state.items];
              updatedItems[existingCartItemIndex] = updatedItem;
            }
            return {
              items: updatedItems,
              totalAmount: updatedTotalAmount,
              modal: state.modal
            };
          }

        if(action.type === 'Show'){
            return{
                items: state.items,
                totalAmount: state.totalAmount,
                modal: true
            }
        }

        if(action.type === 'Hide'){
            return{
                items: state.items,
                totalAmount: state.totalAmount,
                modal: false
            }
        }
        return defaultCart        
    }

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart)

    const addItemHandler = (item) => {
        dispatchCart({ type: 'Add', item: item })
    }

    const removeItemHandler = (id) => {
        dispatchCart({ type: 'Remove', id: id })
    }

    const showModalHandler=()=>{
        dispatchCart({type: 'Show'})
    }

    const hideModalHandler=()=>{
        dispatchCart({type: 'Hide'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        modal: cartState.modal,
        showModal: showModalHandler,
        hideModal: hideModalHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;