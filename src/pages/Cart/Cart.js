import {useState,useEffect} from 'react';
import './Cart.css';
import CartItemTray from '../../components/CartItemTray/CartItemTray.js';
import CartBill from '../../components/CartBill/CartBill.js';
import { useHistory } from "react-router-dom";
import {UseDataBase} from "../../utils/UseDataBase.js";
import CartLoading from './CartLoading.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
import EmptyPage from '../EmptyPage/EmptyPage.js';
import buttonLoadingImg from '../../buttonLoading.svg';

const Cart = props =>{
  let history = useHistory();
  const [cartData, setCartData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(false);
  const [empty,setEmpty]=useState(false);
  const [buttonLoading,setButtonLoading]=useState(false);
  
  const alterItemQty = (id,cart_id, quantity, index) => {
    var data = {
      user_id: props.userData.id,
      product_id : id,
      cart_id,
      quantity
    }
    setCartData((oldCartData) => {
      oldCartData[index]['quantity'] = quantity;
      return [...oldCartData];
    });
    UseDataBase(data,'/alterQty');
  };

  const deleteItem =(id,cart_id,index)=>{
    var data = {
      user_id: props.userData.id,
      product_id : id,
      cart_id
    }
    setCartData((oldCartData) => {
      oldCartData.splice (index, index+1)
      return [...oldCartData];
    });
    UseDataBase(data,'/deleteFromCart');
  }

  useEffect(() => {
    const url = '/openCart';
    var data = {
      user_id: props.userData.id,
    }
    props.userData.id && UseDataBase(data, url,setCartData,setLoading,setError,setEmpty);
  },[props]);

  useEffect(() => {
    console.log('empty',empty);
  },[empty]);

  const order =()=>{
    setButtonLoading(true);
    const url = 'cartOrderAll';
    var data = {
      user_id: props.userData.id
    }
    props.userData.id && UseDataBase(data,url,(dataSet)=>{
      if(dataSet.status===0){
      setButtonLoading(false);
      window.scrollTo({top: 0});
      history.push("/orders");
      }
    },setButtonLoading,setError);

  }
  const tray=cartData && cartData.map((cartItem, i) =>{
  return  <CartItemTray key={i} index={i} deleteItem={deleteItem} alterQty={alterItemQty} data={cartItem}/>
  })
 
  return(
    error?<ErrorPage/>: empty  ? <EmptyPage name={'Your Cart is Empty'}/> :
    <div className="backgroundColor">
      <div className="cartFull">
        <div className="cartWindow">
          <div className="cartItemContainer">
            <div className="cartHeader"><p>My Cart ({cartData.length})</p></div>
            {loading?<CartLoading/>:tray}
            <div className="cartFooter"><button onClick={order} className='CartBuyBtn'>{buttonLoading?<img className='buttonLoadingImg' src={buttonLoadingImg} alt='button loading icon'/>:'Place Order'}</button></div>
          </div>
          <CartBill loading={loading} data={cartData}/>
        </div>
      </div>
    </div>
  );
}
export default Cart;