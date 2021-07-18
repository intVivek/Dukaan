import {useState,useEffect} from 'react';
import './Cart.css';
import CartItemTray from '../../components/CartItemTray/CartItemTray.js';
import CartBill from '../../components/CartBill/CartBill.js';
import { useHistory } from "react-router-dom";
import {UseDataBase} from "../../utils/UseDataBase.js";

const Cart = props =>{
  let history = useHistory();
  const [cartData, setCartData] = useState([]);
  const [qtyChange, setQtyChange] = useState();
  const [billData, setBillData] = useState([]);
  const [reload, setReload] = useState(false);

  const alterItemQty = (id, isIncrease,limit) => {
    var data;
    if(isIncrease){
       data = {
        user_id: props.userData.id,
        product_id : id,
        table:'cart'
      }
      UseDataBase(data,'http://localhost:5000/addTo');
    }
    else{
       data = {
        product_id:id,
        limit
      }
      UseDataBase(data,'http://localhost:5000/deleteFromCart');
    }
  };

  useEffect(() => {
    const url = 'http://localhost:5000/openCart';
    var data = {
      user_id: props.userData.id,
    }
    UseDataBase(data,url,setCartData);
    console.log(cartData);
  },[props,reload]);

  useEffect(() => {
    const url = 'http://localhost:5000/cartBill';
    var data = {
      user_id: props.userData.id,
    }
    UseDataBase(data,url,setBillData);
  },[props,qtyChange,reload]);

  const order =()=>{
    const url = 'http://localhost:5000/cartOrderAll';
    var data = {
      user_id: props.userData.id
    }
    UseDataBase(data,url);
      window.scrollTo({top: 0});
      history.push("/orders");
  }

  const tray = cartData&&cartData.map((data, index) =>
    <CartItemTray reload={reload} setReload={setReload} key={index} qtyChange={qtyChange} setQtyChange={setQtyChange} alterQty={alterItemQty} data={data}/>
  );

  return(
    <div className="backgroundColor">
      <div className="cartFull">
        <div className="cartWindow">
          <div className="cartItemContainer">
            <div className="cartHeader"><p>My Cart ({cartData.length})</p></div>
            {tray}
            <div className="cartFooter"><button onClick={order} className='CartBuyBtn'>Place Order</button></div>
          </div>
          <CartBill data={billData}/>
        </div>
      </div>
    </div>
  );
}
export default Cart;