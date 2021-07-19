import {useState,useEffect} from 'react';
import './Cart.css';
import CartItemTray from '../../components/CartItemTray/CartItemTray.js';
import CartBill from '../../components/CartBill/CartBill.js';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js';
import { useHistory } from "react-router-dom";
import {UseDataBase} from "../../utils/UseDataBase.js";

const Cart = props =>{
  let history = useHistory();
  const [cartData, setCartData] = useState([]);

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
    UseDataBase(data,'http://localhost:5000/alterQty');
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
    UseDataBase(data,'http://localhost:5000/deleteFromCart');
  }

  useEffect(() => {
    const url = 'http://localhost:5000/openCart';
    var data = {
      user_id: props.userData.id,
    }
    UseDataBase(data, url,setCartData);
  },[props]);

  useEffect(() => {
    console.log('cart',cartData);
  },[cartData]);

  const order =()=>{
    const url = 'http://localhost:5000/cartOrderAll';
    var data = {
      user_id: props.userData.id
    }
    UseDataBase(data,url);
      window.scrollTo({top: 0});
      history.push("/orders");
  }

  return(
    <div className="backgroundColor">
      <div className="cartFull">
        <LoadingBox/>
        <div className="cartWindow">
          <div className="cartItemContainer">
            <div className="cartHeader"><p>My Cart ({cartData.length})</p></div>
            {
              cartData && cartData.map((cartItem, i) =>{
                console.log('newData',cartItem)
              return  <CartItemTray key={i} index={i} deleteItem={deleteItem} alterQty={alterItemQty} data={cartItem}/>
              })
            }
            <div className="cartFooter"><button onClick={order} className='CartBuyBtn'>Place Order</button></div>
          </div>
          <CartBill data={cartData}/>
        </div>
      </div>
    </div>
  );
}
export default Cart;