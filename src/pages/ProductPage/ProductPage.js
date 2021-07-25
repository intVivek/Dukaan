import { useEffect } from "react";
import { useState } from "react";
import "./ProductPage.css";
import cartIcon from '../../components/CartBtn/CartIcon.svg'
import { useHistory,useLocation } from "react-router-dom";
import {UseDataBase} from "../../utils/UseDataBase.js";
import ProductPageLoading from './ProductPageLoading.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
import buttonLoadingImg from '../../buttonLoading.svg';
import SlideShow from '../../components/SlideShow/SlideShow.js'

const ProductPage = props => {
  const [products,setProducts]=useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(false);
  const [cartButtonLoading,setCartButtonLoading]=useState(false);
  const [BuyButtonLoading,setBuyButtonLoading]=useState(false);
  var location = useLocation();
  const query = new URLSearchParams(location.search);
  let history = useHistory();
  const [displayImg, setDisplayImg] = useState(0);
  
  const productId = query.get('id');
  props.setBodyLoading(true);
  useEffect(()=>{
    productId && UseDataBase({product_id: productId},'/openProduct',setProducts,setLoading,setError);
  },[productId]);
 
  var x=products[1];
  const imageTray = x && x.map((data, index) =>
    <div key={index} onClick={() => { setDisplayImg(index) }} className="productPageImageTray"><img alt="" src={'https://dukaan--app.herokuapp.com/image?url='+data.url} /></div>
  );

  var spec = products?.[0]&&products[0].product_specifications;
  spec = spec && spec.split('|');
  spec = spec && spec.filter((data) => data.includes(':') && data.split(':')[0] && data.split(':')[1]);
  const specTray = spec && spec.map((data, i) =>
    <div key={i} className='productPageSpecListItems'><div className="productPageSpecKey">{data.split(':')[0]}</div><div className="productPageSpecValue">{data.split(':')[1]}</div></div>
  );
  const dp = products[0]&&products[0].discounted_price,
    rp = products[0]&&products[0].retail_price,
    discount = Math.floor(((rp - dp) * 100 / rp));
  var description = products[0]&&products[0].description;

  const addToCartHandler=()=>{
    if(props.auth){
      setCartButtonLoading(true);
      var data = {
        user_id: props.userData.id,
        product_id:products[0]&&products[0].id,
      }
      props.userData.id && UseDataBase(data,'/addToCart',(dataSet)=>{
        if(dataSet.status===0)
        setCartButtonLoading(false);
        window.scrollTo({top: 0});
        history.push("/cart");
      },setCartButtonLoading,setError);

    }
    else{
      props.setLogin(!props.login);
    }
  }

  const buyNowHandler=()=>{
    if(props.auth){
      setBuyButtonLoading(true);
      var data = {
        user_id: props.userData.id,
        product_id:products[0]&&products[0].id,
        price:products[0]&&products[0].discounted_price,
        quantity:1
      }
      props.userData.id && UseDataBase(data,'/buyNow',(dataSet)=>{
        if(dataSet.status===0)
        setBuyButtonLoading(false);
        window.scrollTo({top: 0});
        history.push("/orders");
      },setBuyButtonLoading,setError);
    }
    else{
      props.setLogin(!props.login);
    }
  }

  return (
    error?<ErrorPage/>:loading?<ProductPageLoading/>:
    <div className="productPage">
      <div className="productPageMain">
      {window.innerWidth>500?
        <div className="productPageImageMain">
          <div className="productPageImageThumbnail">
            {imageTray}
          </div>
          <div className="productPageImageDisplay">
            <div className="productPageImageShow">
              {<img alt="" src={x && 'https://dukaan--app.herokuapp.com/image?url='+x[displayImg].url} />}
            </div>
            <div className="productPageBuyButtons">
              <button onClick={addToCartHandler} className="productAddToCartBtn">{cartButtonLoading?<img src={buttonLoadingImg} alt=''/>:<><img alt="" className='cartImg' src={cartIcon}/> ADD TO CART</>}</button>
              <button onClick={buyNowHandler} className="productbuyBtn">{BuyButtonLoading?<img src={buttonLoadingImg} alt=''/>:<><div></div> &nbsp;BUY NOW</>}</button>
            </div>
          </div>
        </div>:<><SlideShow images={x}/>
        <div className="productPageBuyButtons">
              <button onClick={addToCartHandler} className="productAddToCartBtn">{cartButtonLoading?<img src={buttonLoadingImg} alt=''/>:<><img alt="" className='cartImg' src={cartIcon}/> ADD TO CART</>}</button>
              <button onClick={buyNowHandler} className="productbuyBtn">{BuyButtonLoading?<img src={buttonLoadingImg} alt=''/>:<><div></div> &nbsp;BUY NOW</>}</button>
            </div>
        </>}
        <div className="productPageAbout">
          <div className="productPageAboutName"><span>{products[0]&&products[0].product_name}</span></div>
          <div className="productRating">{products[0]&&products[0].product_rating} ★</div>
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