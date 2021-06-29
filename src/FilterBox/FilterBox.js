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
    const value = e.target.value.replace(/\D/g, "");
    setMin(value);
  }
  const maxHandler=(e)=>{
    const value = e.target.value.replace(/\D/g, "");
    setMax(value);
  }
  const filterPrice=()=>{
    if(min&&max&&max>min){
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
              <button onClick={filterPrice}>GO</button>
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
        </div>
  );
}

export default FilterBox;