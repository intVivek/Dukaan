import { useEffect } from "react";
import { useState } from "react";
import "./ProductPage.css";
import cartIcon from '../../components/CartBtn/CartIcon.svg'
import { useHistory,useLocation } from "react-router-dom";

const ProductPage = props => {
  var location = useLocation();
  const query = new URLSearchParams(location.search);
  let history = useHistory();
  const [productData, setProductData] = useState({});
  const [displayImg, setDisplayImg] = useState(0);
  
  const productId = query.get('id');
  console.log('clk',productId);
  const url = 'http://localhost:5000/openProduct';
  var data = {
    user_id: productId
  }
  useEffect(() => {
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (data) {
      setProductData(data[0]);
    })
  }, []);
  
  console.log(productData);
  var img = productData.image;
  var x = img && img.split(',');
  x = x && x.filter(link => link.includes('.jpeg'));
  const imageTray = x && x.map((data, index) =>
    <div key={index} onClick={() => { setDisplayImg(index) }} className="productPageImageTray"><img src={data} /></div>
  );

  var spec = productData.product_specifications;
  spec = spec && spec.split('|');
  spec = spec && spec.filter((data) => data.includes(':') && data.split(':')[0] && data.split(':')[1]);
  const specTray = spec && spec.map((data, index) =>
    <div className='productPageSpecListItems'><div className="productPageSpecKey">{data.split(':')[0]}</div><div className="productPageSpecValue">{data.split(':')[1]}</div></div>
  );
  const dp = productData.discounted_price,
    rp = productData.retail_price,
    discount = Math.floor(((rp - dp) * 100 / rp));
  var description = productData.description;

  const addToCartHandler=()=>{
    var data = {
      user_id: props.userData.id,
      product_id:productData.id,
      table:'cart'
    }
    if(props.auth){
      const url = 'http://localhost:5000/addTo';
      fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
      }).then(function (response) {
        return response.json(data);
      }).then(function (data) {
        window.scrollTo({
          top: 0
        })
        history.push("/cart");
      })
    }
    else{
      props.setLogin(!props.login);
    }
  }

  const buyNowHandler=()=>{
    var data = {
      user_id: props.userData.id,
      product_id:productData.id,
      price:productData.discounted_price,
      quantity:1
    }
    if(props.auth){
      const url = 'http://localhost:5000/buyNow';
      fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
      }).then(function (response) {
        return response.json(data);
      }).then(function (data) {
        window.scrollTo({
          top: 0
        })
        history.push("/orders");
      })
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
          <div className="productPageAboutName"><span>{productData.product_name}</span></div>
          <div className="productRating">{productData.product_rating} ★</div>
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