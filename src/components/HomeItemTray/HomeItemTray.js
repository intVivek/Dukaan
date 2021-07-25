import './HomeItemTray.css';
import icon from '../../components/ProductTray/assured.png';
import {addThreeDots} from "../../utils/addThreeDots.js";
import { useHistory } from "react-router-dom";

const HomeItemTray = props=>{
  let history = useHistory();
  var img = props.product.url;
  const dp = props.product.discounted_price,
  rp = props.product.retail_price,
  discount = Math.floor(((rp - dp) * 100 / rp));
  const openProductHandler=()=>{
    if(window.innerWidth>500){
      window.open("/product?id="+props.product.id, '_blank');
    }
    else{
      history.push("/product?id="+props.product.id);
    }
    window.scrollTo({top: 0});
  }

  return(
    <div onClick={openProductHandler} className='CardItemBox'>
      <div className='CardItemBoxContainer'>
        <div className='CardItemBoxImage'><img className='CardItemBoxImageContainer' alt='img' src={'https://dukaan--app.herokuapp.com/image?url='+img}/></div>
        <div className='CardItemBoxName'>{addThreeDots(props.product.product_name,50)}</div>
        <div className='CardItemBoxDesc'>
        {window.innerWidth>500 && <div className='CardItemBoxRating'>
        <div className ="CardRating">{props.product.product_rating}★</div>
         {props.product.assured==='true'?<img className="assuredIMG" src ={icon} alt='assured'></img>:""}
        </div>}
        <div className='CardItemBoxPrice'>
          <div className='cardItemPrice'>
            <div className='cardItemDiscountedPrice'>₹{dp && dp.toLocaleString()}</div>
            <div className='cardItemActualPrice'>₹{rp && rp.toLocaleString()}</div>
            <div className='cardItemDiscount'>{discount && discount} %OFF</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default HomeItemTray;