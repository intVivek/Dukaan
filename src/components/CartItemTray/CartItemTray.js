import  './CartItemTray.css';
import {useState} from 'react';
const CartItemTray = props=>{
  console.log('hello',props.data);
  var img = props.data.image;
  var x = img && img.split(',');
  const [qty, setQty] = useState(props.data.quantity);
  const dp = props.data.discounted_price,
        rp = props.data.retail_price,
  discount = Math.floor(((rp - dp) * 100 / rp));
  console.log(props.data.cart_id);
  return(
    <div className="cartItemTray">
      <div className="cartItemTrayUpper">
          <div className="cartItemTrayUpperLeft"><img src={x[0]} alt='Product' /></div>
          <div className="cartItemTrayUpperRight">
            <div className="cartItemName">{props.data.product_name}</div>
            <div className='cartItemPrice'>
              <div className='cartItemDiscountedPrice'>₹{dp && dp.toLocaleString()}</div>
              <div className='cartItemActualPrice'>₹{rp && rp.toLocaleString()}</div>
              <div className='cartItemDiscount'>{discount && discount} %OFF</div>
              <div className='cartItemAssured'></div>
          </div>
          </div>
      </div>
      <div className="cartItemTrayLower">
          <div className="cartItemTrayLowerLeft">
            <button onClick={() => {if(qty>1){props.alterQty(props.data.cart_id,false);setQty(qty-1);props.setQtyChange(!props.qtyChange)}}}>-</button>
            <input placeholder={qty}></input>
            <button onClick={() =>{ props.alterQty(props.data.id, true);setQty(qty+1);props.setQtyChange(!props.qtyChange)}}>+</button>
          </div>
          <div className="cartItemTrayLowerRight"><button>SAVE FOR LATER</button><button onClick={()=>{props.delete(props.data.id)}}>REMOVE</button></div>
      </div>
    </div>
  );
}

export default CartItemTray;