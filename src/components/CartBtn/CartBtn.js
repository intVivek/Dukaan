import { useHistory } from "react-router-dom";
import './CartBtn.css';
import icon from './CartIcon.svg';
const CartBtn = props =>{
  let history = useHistory();
  const clickHandler =()=>{
    if(props.auth){
        window.scrollTo({
          top: 0
        })
        history.push("/cart");
  }
    else
      props.setLogin(!props.login);
  }
  return(
    <button className="cartBtn" onClick={clickHandler}><img className = 'cartImg' alt='cart' src={icon}/><span> Cart</span></button>
  );                               
}

export default CartBtn;

