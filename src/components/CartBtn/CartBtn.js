import { useHistory } from "react-router-dom";
import './CartBtn.css';
import icon from './CartIcon.svg';
import { useParams } from "react-router-dom";

const CartBtn = props =>{
  const page = useParams().page;
  let history = useHistory();
  const clickHandler =()=>{
    if(props.auth){
      if(page!=='cart'){
          window.scrollTo({
            top: 0
          })
          history.push("/cart");
      }
  }
    else
      props.setLogin(!props.login);
  }
  return(
    <button className="cartBtn" disabled={props.cartOpen} onClick={clickHandler}><img className = 'cartImg' alt='cart' src={icon}/><span> Cart</span></button>
  );                               
}

export default CartBtn;

