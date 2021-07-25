import  './ProductTray.css';
import icon from './assured.png';

const ProductTray = props=>{
 var img = props.data.url;
 var spec =props.data.product_specifications.replaceAll(':',' : ').split('|');
 spec = spec.filter((data) => data.includes(':')&&data.split(':')[0]&&data.split(':')[1]);

  const dp = props.data.discounted_price,
        rp = props.data.retail_price,
        discount=Math.floor(((rp-dp)*100/rp));
  
  return(
    <div onClick={()=>window.open("/product?id="+props.data.id, '_blank')} className="ProductTrayContainer">
      <div className="ProductTray">
        <div className="ProductTrayImage"><img src={'https://dukaan--app.herokuapp.com/image?url='+img} alt='Product'/></div>
        <div className="ProductTraySpecList">
          <div className ="productName"><span>{props.data.product_name}</span></div>
          <div className='bodyratingPrice'><div className ="productRating">{props.data.product_rating}★</div>{window.innerWidth<500&&<div className = "productTrayPrice">
          <div><span>₹{dp.toLocaleString()}</span></div>
          <div>{rp>dp?<><p>₹{rp.toLocaleString()}</p><h4>{discount}%OFF</h4></>:""}{props.data.assured==1?<img className="assuredIMG" src ={icon} alt='assured'></img>:""}</div>  
        </div>}</div>
        
          <ul>
            {spec[0]&&spec[0].length<50?<li>{spec[0]}</li>:''}
            {spec[1]&&spec[1].length<50?<li>{spec[1]}</li>:''}
            {window.innerWidth>500&&spec[2]&&spec[2].length<50?<li>{spec[2]}</li>:''}
            {window.innerWidth>500&&spec[3]&&spec[3].length<50?<li>{spec[3]}</li>:''}
            {window.innerWidth>500&&spec[4]&&spec[4].length<50?<li>{spec[4]}</li>:''}
          </ul>
        </div>
        {window.innerWidth>500&&<div className = "productTrayPrice">
          <div><span>₹{dp.toLocaleString()}</span>{props.data.assured==1?<img className="assuredIMG" src ={icon} alt='assured'></img>:""}</div>
          <div>{rp>dp?<><p>₹{rp.toLocaleString()}</p><h4>{discount}%OFF</h4></>:""}</div>  
        </div> }
      </div>
    </div>
  );
}

export default ProductTray;