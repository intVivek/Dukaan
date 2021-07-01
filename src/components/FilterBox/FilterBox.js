import './FilterBox.css';
import {useState,useEffect} from 'react';
import assuredIcon from '../ProductTray/assured.png';
const FilterBox = props =>{
  const [min,setMin]=useState('');
  const [max,setMax]=useState('');
  const [fourStar,setFourStar]=useState(false);
  const [threeStar,setThreeStar]=useState(false);
  const [twoStar,setTwoStar]=useState(false);
  const minHandler=(e)=>{
    if(!isNaN(e.target.value)){
      setMin(parseInt(e.target.value));
    }
  }
  const maxHandler=(e)=>{
    if(!isNaN(e.target.value)){
      setMax(parseInt(e.target.value));
    }
  }
  const filterPriceHandler=()=>{
    console.log(min, max);
    if(parseInt(max)>parseInt(min)){
      console.log('helloprice');
      props.setFilterPrice('AND discounted_price BETWEEN '+min+' AND '+max);
    }
    setMin('');
    setMax('');
  }
  const fourRating=()=>{
    setFourStar(!fourStar);
    setThreeStar(false);  
    setTwoStar(false);  
  }
  const threeRating=()=>{
    setFourStar(false);
    setThreeStar(!threeStar);  
    setTwoStar(false);  
  }
  const twoRating=()=>{
    setFourStar(false);
    setThreeStar(false);  
    setTwoStar(!twoStar);  
  }
  const filterBrandHandler=(brand)=>{
    console.log('hello',brand);
      if(brand in props.filterBrand){
        props.setFilterBrand((filterBrand) => {
          delete filterBrand[brand];
          return {...filterBrand};
        });
      }
      else{
        props.setFilterBrand((filterBrand) => {
          const newBrand = {};
          newBrand[brand] = brand;
          return {...filterBrand, ...newBrand};
        });
      }
  }
  const tray = props.brand.map((data, index) =>
    <div><input type="checkbox" defaultChecked={false} onChange={()=>filterBrandHandler(data.brand)}></input><span>{data.brand}</span></div>
  );
  useEffect(()=>{
    if(!fourStar&&!threeStar&&!twoStar){
      props.setFilterRating('');
    }
    else if(fourStar){
      props.setFilterRating(' and product_rating>=4 ');
    }
    else if(threeStar){
      props.setFilterRating(' and product_rating>=3 ');
    }
    else if(twoStar){
      props.setFilterRating(' and product_rating>=2 ');
    }
  },[fourStar,threeStar,twoStar]);
  return(
        <div className="filterBox">
          <div className="filterBoxName"><span>Filters</span></div>
          <div className ="filterBoxPrice">
            <span className ="filterBoxSpan"><span>Price</span></span>
            <div className ="filterBoxPriceText">
              <input value={min} onChange={minHandler} placeholder="Min"/>
              <input value={max} onChange={maxHandler} placeholder="Max"/>
              <button onClick={filterPriceHandler}>GO</button>
            </div>
          </div>
          <div className="filterBoxAssure">
            <input type="checkbox" defaultChecked={props.isAssured} onChange={() => props.setIsAssured(!props.isAssured)}></input>
            <img src ={assuredIcon}/>
            <span>ASSURED</span>
          </div>
          <div className="filterBoxRating">
            <span>CUSTOMER RATINGS</span>
            <div><input type="checkbox" checked={fourStar} onClick={fourRating}></input><span>4★ & above</span></div>
            <div><input type="checkbox" checked={threeStar} onClick={threeRating}></input><span>3★ & above</span></div>
            <div><input type="checkbox" checked={twoStar} onClick={twoRating}></input><span>2★ & above</span></div>
          </div>
          <div className="filterBoxBrandName"><span>Select Brands</span></div>
          <div className="filterBoxBrand">
            {tray}
          </div>
        </div>
  );
}

export default FilterBox;