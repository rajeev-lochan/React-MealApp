import React, { useContext } from 'react'
import './Header.css'
import CardBody from '../Card/CardBody'
import CartContext from '../../Context/CartContext'
import Cart from '../Cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { CartAction } from '../../Reducer/CartReducer'
import AddMeal from '../AddMeal/AddMeal'
import { useNavigate } from 'react-router-dom'
const Header = () => {

    // const cxt = useContext(CartContext)

    // const noOfItems = cxt.items.reduce((currentNumber, item) => {
    //     return currentNumber + item.quantity;
    // }, 0);

    const { items, modal } = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const showModalHandle = () => {
        dispatch(CartAction.showModal())
    }

    const navigate = useNavigate();

    const navigateToMeal = () => {
        navigate('/add');
    }

    return (
        <div>
            <div className='header_division'>
                <h1>ReactMeals</h1>
                <button
                    className='header_button'
                    onClick={showModalHandle}
                >
                    <span>Your Cart<span className='cart_count'>{items.length}</span></span>
                </button>

                <button
                    className='header_button'
                    onClick={navigateToMeal}
                >
                    <span>Add Items</span>
                </button>
            </div>

            <div className='summary'>
                <h1>Delicious Food, Delivered To You</h1>
                <p>Choose your favorite meal from broad selection of available meals and enjoy a delicious lunch or dinner at home</p>
                <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
            </div>
            <div>
            </div>
            <div>
                <CardBody />
                {modal && <Cart />}
            </div>
        </div>
    )
}
export default Header