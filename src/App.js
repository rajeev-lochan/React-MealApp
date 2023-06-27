import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { CartAction } from './Reducer/CartReducer';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddMeal from './components/AddMeal/AddMeal';
// import CartProvider from './Context/CartProvider';

function App() {

  const url = process.env.REACT_APP_URL;

  const dispatch=useDispatch()

  useEffect(()=>{
    fetchCart();
  }, []);

  const fetchCart = async () =>{
    try{
      const { data } = await axios.get(
        `${url}/cart`
      );
      console.log({data});
      let totalAmount=0
      data.forEach((curr)=>{
        totalAmount+=curr.amount
      })
      dispatch(CartAction.setFetchStatus({data,totalAmount}))
    } catch (error){
      console.error("Error fetching data from API:", error);
    }
  }

  return (
    // <CartProvider>
    <div>
    <div className='header_division'>
      <h1>ReactMeals</h1>
    </div>
    <Routes>
      <Route path='/' element={<Header />} />
      <Route path='/add' element={<AddMeal />} />
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  </div>
    // </CartProvider>
  );
}

export default App;