import './OrderedItemTray.css';
import { useHistory } from "react-router-dom";
import {addThreeDots} from "../../utils/addThreeDots.js";

const OrderedItemTray =props=>{
  let history = useHistory();
  var img = props.data.url;
  var date = new Date( props.data.date );
  const day = date.getUTCDay();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const openProductHandler=()=>{
    if(window.innerWidth>500){
      window.open("/product?id="+props.data.id, '_blank');
    }
    else{
      history.push("/product?id="+props.data.id);
    }
    window.scrollTo({top: 0});
  }

  return(
    <div onClick={openProductHandler} className="OrderedTray">
        <div className="OrderedTrayImage"><img src={'https://dukaan--app.herokuapp.com/image?url='+img} alt='Product'/></div>
          <div className ="OrderedName"><span>{addThreeDots(props.data.product_name,40)}</span><p>{props.data.quantity>1&&('x'+props.data.quantity)}</p></div>
        <div className = "OrderedPrice">
          <div><span>₹{props.data.price.toLocaleString()}</span></div>
        </div>
        <div className = "OrderedTrayInfo">
          <div className = "OrderedTrayInfoOrdered">
            <div className = "OrderedTrayInfoGreen"></div>
            <span>Ordered On {day+' '+month+' '+year}</span> 
          </div>
          <div className = "OrderedTrayInfoDelivered">{window.innerWidth<500?"Delivered":"Your Item Has Been Delivered"}</div>
        </div> 
      </div>
  );
}

export default OrderedItemTray;