import './CartBtn.css';
import icon from './CartIcon.svg';
const CartBtn = props =>{
  const cart =()=>{
    if(props.auth)
      props.setCart(!props.cart);
    else
      props.setLogin(!props.login);
  }
  return(
    <button className="cartBtn" onClick={cart}><img className = 'cartImg' alt='cart' src={icon}/><span> Cart</span></button>
  );                               
}

export default CartBtn;

