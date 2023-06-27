import React, { useEffect } from 'react'
import CardList from './CardList';
import './CardBody.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CartAction } from '../../Reducer/CartReducer';

export const foodList = [
    {
        id: 1,
        name: "Sushi",
        details: "Finest fish and veggies",
        amount: 22
    },
    {
        id: 2,
        name: "Schnitzel",
        details: "A german specialty!",
        amount: 16
    },
    {
        id: 3,
        name: "Barbecue Burger",
        details: "American, raw, meaty",
        amount: 12
    },
    {
        id: 4,
        name: "Green Bowl",
        details: "Healthy...and green...",
        amount: 18
    },
    {
        id: 5,
        name: "Samosa",
        details: "Nothing taste like this....",
        amount: 4
    }
]


const CardBody = () => {

    const url = process.env.REACT_APP_URL;

    const dispatch = useDispatch();
    const newData = useSelector((state) => state.cart.newItems);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await axios.get(
                `${url}/items`
            );
            dispatch(CartAction.addNewItems(data));
        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };

    return (
        <div >
            <ul>
                <div className='card_body'>
                    {[...foodList, ...newData].map((items, index) => (
                        <div key={index}>
                            <li><CardList items={items} /></li>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    )
}
export default CardBody;