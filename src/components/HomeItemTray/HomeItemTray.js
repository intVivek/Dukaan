import './HomeItemTray.css';
import icon from '../../components/ProductTray/assured.png';
import { useHistory } from "react-router-dom";
import {addThreeDots} from "../../utils/addThreeDots.js";

const HomeItemTray = props=>{
  let history = useHistory();
  var img = props.product.image;
  var x = img && img.split(',');
  const dp = props.product.discounted_price,
  rp = props.product.retail_price,
  discount = Math.floor(((rp - dp) * 100 / rp));

  return(
    <div onClick={()=>window.open("/product?id="+props.product.id, '_blank')} className='CardItemBox'>
      <div className='CardItemBoxContainer'>
        <div className='CardItemBoxImage'><img className='CardItemBoxImageContainer' src={x[0]}/></div>
        <div className='CardItemBoxName'>{addThreeDots(props.product.product_name,70)}</div>
        <div className='CardItemBoxRating'>
         <div className ="CardRating">{props.product.product_rating}★</div>
         {props.product.assured==='true'?<img className="assuredIMG" src ={icon} alt='assured'></img>:""}
        </div>
        <div className='CardItemBoxPrice'>
          <div className='cardItemPrice'>
            <div className='cardItemDiscountedPrice'>₹{dp && dp.toLocaleString()}</div>
            <div className='cardItemActualPrice'>₹{rp && rp.toLocaleString()}</div>
            <div className='cardItemDiscount'>{discount && discount} %OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeItemTray;