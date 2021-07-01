import { useEffect } from "react";
import { useState } from "react";
import "./ProductPage.css";

const ProductPage = props =>{
  const [productData,setProductData]=useState({});
  const [displayImg,setDisplayImg]=useState(0);
  
  const url = 'http://localhost:5000/openProduct';
  var img;
  var data = {
    id : 164
  }  
  useEffect(()=>{
      fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json" }
        }).then(function (response) {
                return response.json(data);
        }).then(function (data) {
          setProductData(data[0]);
          
        })

      
      },[]);
      console.log(productData);
      var img=productData.image;
      var x=img && img.split(',');
      x = x&&x.filter(link => link.includes('.jpeg'));
      const  tray = x&&x.map( (data, index) =>
        <div key={index} onClick={()=>{setDisplayImg(index)}} className="productPageImageTray"><img src ={data}/></div>
      );

  return(
    <div className="productPage">
      <div className="bodyHeader">hello</div>
      <div className="productPageMain">
        <div className="productPageImageMain">
          <div className="productPageImageThumbnail">
          {tray}
          </div>
          <div className="productPageImageDisplay">{<img src = {x&&x[displayImg]}/>}</div>
        </div>
        <div className="productPageAbout">
        <div className ="productPageAboutName"><span>{productData.product_name}</span></div>
        <div className ="productRating">{productData.product_rating}★</div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;