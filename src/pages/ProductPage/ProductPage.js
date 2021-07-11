import { useEffect } from "react";
import { useState } from "react";
import "./ProductPage.css";
import cartIcon from '../../components/CartBtn/CartIcon.svg'
import { useHistory,useLocation } from "react-router-dom";
import {UseDataBase} from "../../utils/UseDataBase.js";

const ProductPage = props => {
  const [products,setProducts]=useState([]);
  var location = useLocation();
  const query = new URLSearchParams(location.search);
  let history = useHistory();
  const [displayImg, setDisplayImg] = useState(0);
  
  const productId = query.get('id');
  useEffect(()=>{
    UseDataBase({product_id: productId},'http://localhost:5000/openProduct',setProducts);
  },[productId]);
 
  var img = products.image;
  var x = img && img.split(',');
  x = x && [... new Set(x.filter(link => link.includes('.jpeg')))];
  const imageTray = x && x.map((data, index) =>
    <div key={index} onClick={() => { setDisplayImg(index) }} className="productPageImageTray"><img src={data} /></div>
  );

  var spec = products.product_specifications;
  spec = spec && spec.split('|');
  spec = spec && spec.filter((data) => data.includes(':') && data.split(':')[0] && data.split(':')[1]);
  const specTray = spec && spec.map((data, i) =>
    <div key={i} className='productPageSpecListItems'><div className="productPageSpecKey">{data.split(':')[0]}</div><div className="productPageSpecValue">{data.split(':')[1]}</div></div>
  );
  const dp = products.discounted_price,
    rp = products.retail_price,
    discount = Math.floor(((rp - dp) * 100 / rp));
  var description = products.description;

  const addToCartHandler=()=>{
    if(props.auth){
      var data = {
        user_id: props.userData.id,
        product_id:products.id,
        table:'cart'
      }
      UseDataBase(data,'http://localhost:5000/addTo');
      window.scrollTo({top: 0});
      history.push("/cart");
    }
    else{
      props.setLogin(!props.login);
    }
  }

  const buyNowHandler=()=>{
    if(props.auth){
      var data = {
        user_id: props.userData.id,
        product_id:products.id,
        price:products.discounted_price,
        quantity:1
      }
      UseDataBase(data,'http://localhost:5000/buyNow');
      window.scrollTo({top: 0});
      history.push("/orders");
    }
    else{
      props.setLogin(!props.login);
    }
  }

  return (
    <div className="productPage">
      <div className="productPageMain">
        <div className="productPageImageMain">
          <div className="productPageImageThumbnail">
            {imageTray}
          </div>
          <div className="productPageImageDisplay">
            <div className="productPageImageShow">
              {<img src={x && x[displayImg]} />}
            </div>
            <div className="productPageBuyButtons">
              <button onClick={addToCartHandler} className="productAddToCartBtn"><img className='cartImg' src={cartIcon}/> ADD TO CART</button>
              <button onClick={buyNowHandler} className="productbuyBtn"><div></div> &nbsp;BUY NOW</button>
            </div>
          </div>
        </div>
        <div className="productPageAbout">
          <div className="productPageAboutName"><span>{products.product_name}</span></div>
          <div className="productRating">{products.product_rating} ★</div>
          <div className='ProductPagePrice'>
            <div className='ProductPageDiscountedPrice'>₹{dp && dp.toLocaleString()}</div>
            <div className='ProductPageActualPrice'>₹{rp && rp.toLocaleString()}</div>
            <div className='ProductPageDiscount'>{discount && discount} %OFF</div>
            <div className='ProductPageAssured'></div>
          </div>
          <div className="productPageSpecList">
            {specTray ? <div className="productPageSpecName"><span>Specifications</span></div> : ''}
            {specTray}
          </div>
          {description ? <div className="productPageDescription">
            <div className="productPageDescriptionName">Description</div>
            <div className="productPageDescriptionValue">{description}</div>
          </div> : ''}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;