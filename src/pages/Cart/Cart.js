import {useState,useEffect} from 'react';
import './Cart.css';
import CartItemTray from '../../components/CartItemTray/CartItemTray.js';
import CartBill from '../../components/CartBill/CartBill.js';

const Cart = props =>{
  const [cartData, setCartData] = useState([]);
  const [qtyChange, setQtyChange] = useState();
  

  const alterItemQty = (id, isIncrease) => {
    if(isIncrease){
      var data = {
        user_id: props.userData.id,
        product_id : id
      }
        const url = 'http://localhost:5000/addToCart';
        fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json" }
        }).then(function (response) {
          return response.json(data);
        }).then(function (data) {
          window.scrollTo({
            top: 0
          })
        })
    }
    else{
      console.log("else");
      var data = {
        cart_id:id
      }
        const url = 'http://localhost:5000/deleteFromCart';
        fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json" }
        }).then(function (response) {
          return response.json(data);
        }).then(function (data) {
          console.log(data);
        })
    }
  };

  useEffect(() => {
    const url = 'http://localhost:5000/openCart';
    var data = {
      user_id: props.userData.id
    }
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (data) {
      setCartData(data);
      console.log(data);
    })
  },[qtyChange,props]);

  const [itemDelete, setItemDelete] = useState(0);
  
  // useEffect(() => {
  //   setCartData((cartItems) => cartItems.filter((cartData) => data.id !== itemDelete));
  // }, [itemDelete]);


  

  

  const tray = cartData&&cartData.map((data, index) =>
    <CartItemTray key={index} qtyChange={qtyChange} setQtyChange={setQtyChange} delete={setItemDelete} alterQty={alterItemQty} data={data}/>
  );

  return(
    <div className="cartFull">
      <div className="cartWindow">
        <div className="cartItemContainer">
          <div className="cartHeader"><p>My Cart ({cartData.length})</p></div>
          {tray}
          <div className="cartFooter"><button className='CartBuyBtn'>Place Order</button></div>
        </div>
        <CartBill data={cartData}/>
      </div>
      
    </div>
  );
}
export default Cart;