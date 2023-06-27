import React, { useEffect } from 'react';
import Modal from '../UI/Modal';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { CartAction } from '../../Reducer/CartReducer';
import axios from 'axios';

const Cart = () => {
  // const {  addItem, removeItem, hideModal } = useContext(CartContext);

  // useEffect(()=>{
  //   fetchCart();
  // }, []);

  // const fetchCart = async () =>{
  //   try{
  //     const {data} = await axios.get(
  //       "https://crudcrud.com/api/d1cdceb54a3340b79e78566de75e2358/cart"
  //     );
  //     console.log(data);
  //     dispatch(CartAction.setFetchStatus(data))
  //   } catch (error){
  //     console.error("Error fetching data from API:", error);
  //   }
  // }

  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart)
  const url = process.env.REACT_APP_URL;

  const addItemHandler = (item) => {
    // addItem(item)
    dispatch(CartAction.addItem(item))
  }

  const removeItemHandler = async (id,backendId) => {
    dispatch(CartAction.removeItem(id))
    await axios.delete(`${url}/cart/${backendId}`)
  }

  const hideModalHandler = () => {
    dispatch(CartAction.hideModal())
  }

  return (
    <Modal onClose={hideModalHandler}>
      <div>
        <div className='cart_body'>
          <ul className='cart_body_ul'>
            <div>
              {items.map((item) => (
                <div className='cart_body_amount'>
                  <div>
                    <li id={item.id}>
                      <h3>{item.name}</h3>
                      <p>${item.amount}</p>
                    </li>
                    <div className='cart_item_quantity'>x{item.quantity}</div>
                  </div>
                  <div className='cart_body_action'>
                    <button type='submit' onClick={removeItemHandler.bind(null, item.id, item._id)}>-</button>
                    <button type='submit' onClick={addItemHandler.bind(null, item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
        <div className='total_amount'>
          <span className='total'>Total Amount</span>
          <span className='total_amount_value'>${totalAmount}</span>
        </div>
        <div className='actions'>
          <button onClick={hideModalHandler} className='button--alt'>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
