import  './CartItemTray.css';

const CartItemTray = props=>{
  return(
    <div className="cartItemTray">
      <div className="cartItemTrayUpper">
          <div className="cartItemTrayUpperLeft"><img src={props.data.image} alt='Product' /></div>
          <div className="cartItemTrayUpperRight">
            <div>{props.data.name}</div>
            <div>{"₹"+props.data.price}</div>
          </div>
      </div>
      <div className="cartItemTrayLower">
          <div className="cartItemTrayLowerLeft">
            <button onClick={() => {if(props.data.itemInCart>1){props.alterQty(props.data.id)}}}>-</button>
            <input placeholder={props.data.itemInCart}></input>
            <button onClick={() => props.alterQty(props.data.id, true)}>+</button>
          </div>
          <div className="cartItemTrayLowerRight"><button>SAVE FOR LATER</button><button onClick={()=>{props.delete(props.data.id)}}>REMOVE</button></div>
      </div>
    </div>
  );
}

export default CartItemTray;