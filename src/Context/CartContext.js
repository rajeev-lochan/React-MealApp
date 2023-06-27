import { createContext } from 'react'
export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=>{},
    modal: false,
    showModal: ()=>{},
    hideModal: ()=>{}
});
export default CartContext