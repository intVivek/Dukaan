import './CartItemTray.css';
import {addThreeDots} from "../../utils/addThreeDots.js";
import { useHistory } from "react-router-dom";

const CartItemTray = props => {
  const {url: img, discounted_price, retail_price,product_name,quantity,product_id,cart_id} = props?.data || {};
  const discount = Math.floor(((retail_price - discounted_price) * 100 / retail_price));
  let history = useHistory();
  const openProductHandler=()=>{
    if(window.innerWidth>500){
      window.open("/product?id="+product_id, '_blank');
    }
    else{
      history.push("/product?id="+product_id);
    }
    window.scrollTo({top: 0});
  }

  return (
    <div className="cartItemTray">
      <div onClick={openProductHandler} className="cartItemTrayUpper">
        <div className="cartItemTrayUpperLeft"><img src={img&&('https://dukaan--app.herokuapp.com/image?url='+img)} alt='Product' /></div>
        <div className="cartItemTrayUpperRight">
          <div className="cartItemName">{addThreeDots(product_name,50)}</div>
          <div className='cartItemPrice'>
            <div className='cartItemDiscountedPrice'>₹{discounted_price && discounted_price.toLocaleString()}</div>
            <div className='cartItemActualPrice'>₹{retail_price && retail_price.toLocaleString()}</div>
            <div className='cartItemDiscount'>{discount && discount} %OFF</div>
            <div className='cartItemAssured'></div>
          </div>
        </div>
      </div>
      <div className="cartItemTrayLower">
        <div className="cartItemTrayLowerLeft">
          <button disabled={quantity===1?true:false} onClick={() =>  quantity > 1 && props.alterQty(product_id,cart_id,quantity-1,props.index)}>-</button>
          <input placeholder={quantity}></input>
          <button disabled={quantity>9?true:false} onClick={() =>  props.alterQty(product_id,cart_id,quantity+1,props.index)}>+</button>
        </div>
        <div className="cartItemTrayLowerRight"><button>SAVE FOR LATER</button><button onClick={() => props.deleteItem(product_id,cart_id,props.index)}>REMOVE</button></div>
      </div>
    </div>
  );
}

export default CartItemTray;