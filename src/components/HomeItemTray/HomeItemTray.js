import './HomeItemTray.css';
import icon from '../../components/ProductTray/assured.png';
import { useHistory } from "react-router-dom";

const HomeItemTray = props=>{
  let history = useHistory();
  var img = props.product.image;
  var x = img && img.split(',');
  const dp = props.product.discounted_price,
  rp = props.product.retail_price,
  discount = Math.floor(((rp - dp) * 100 / rp));

  return(
    <div onClick={()=>history.push("/product?id="+props.product.id)} className='CardItemBox'>
      <div className='CardItemBoxContainer'>
        <div className='CardItemBoxImage'><img className='CardItemBoxImageContainer' src={x[0]}/></div>
        <div className='CardItemBoxName'>{props.product.product_name}</div>
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