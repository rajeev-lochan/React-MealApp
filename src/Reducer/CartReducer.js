import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    totalAmount: 0,
    modal: false,
    newItems: [],
    // isDataFetched: []
}

// export const fetchItems = async () => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.put('https://crudcrud.com/api/25039d954e7d41e48d94e9d569ec08e7/cart');
//             const data = await response.json();
//             dispatch(CartAction.addNewItems(data));
//             dispatch(CartAction.setFetchStatus(true));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let updatedTotalAmount;
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            const existingItem = state.items[existingItemIndex];
            let updatedItem, updatedItems;

            if (existingItem) {
                updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedTotalAmount = state.totalAmount + action.payload.amount;
                updatedItems = [...state.items]
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems = [action.payload, ...state.items];
                updatedTotalAmount = parseInt(state.totalAmount + (action.payload.amount * action.payload.quantity))
            }
            state.items = updatedItems;
            state.totalAmount = updatedTotalAmount;
        },
        removeItem: (state, action) => {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.amount;
            let updatedItems;

            if (existingCartItem.quantity === 1) {
                updatedItems = state.items.filter((item) => item.id !== action.payload);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            state.items = updatedItems;
            state.totalAmount = updatedTotalAmount;
        },
        showModal: (state) => {
            state.modal = true
        },
        hideModal: (state) => {
            state.modal = false
        },
        addNewItems: (state, action) => {
            // state.newItems.push(action.payload)
            state.newItems = action.payload
        },
        setFetchStatus: (state, action) => {
            state.items=action.payload.data;
            state.totalAmount=action.payload.totalAmount;
        }
    }
});

export const CartAction = cartSlice.actions;
export default cartSlice.reducer;