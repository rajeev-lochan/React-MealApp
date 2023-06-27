import React, { useContext, useState } from 'react'
import './CardList.css'
import CartContext from '../../Context/CartContext'
import { useDispatch } from 'react-redux'
import { CartAction } from '../../Reducer/CartReducer';
import axios from 'axios';
const CardList = ({ items }) => {

    const dispatch = useDispatch();
    const url = process.env.REACT_APP_URL;

    const [amountValue, setAmountValue] = useState(1)
    // const cxt = useContext(CartContext)
    const addItemHandler = async () => {

        const newCartItem ={
            id: items.id,
            name: items.name,
            details: items.details,
            amount: parseInt(items.amount),
            quantity: amountValue,
        }
        
        dispatch(CartAction.addItem(newCartItem))

        const response = await axios.post(`${url}/cart`, newCartItem)
        console.log(response);
    }
    return (
        <div className='card_list'>
            <div>
                <h3>{items.name}</h3>
                <div className='card_details'>{items.details}</div>
                <div className='card_amount'>${items.amount}</div>
            </div>
            <div className='card_list_amount'>
                <label>Amount: </label>
                <input type="number" min='1' value={amountValue} onChange={(e) => setAmountValue(e.target.value)} />
                <div>
                    <button type='submit' onClick={addItemHandler}>Add</button>
                </div>
            </div>
        </div>
    )
}
export default CardList