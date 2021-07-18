import './FilterBox.css';
import {useState} from 'react';
import assuredIcon from '../ProductTray/assured.png';
import { useHistory,useLocation } from "react-router-dom";

const FilterBox = props =>{
  var location = useLocation();
  let history = useHistory();
  function isNumeric(value) {
    return /^\d+$/.test(value);
  }
  const query = new URLSearchParams(location.search);
  var urlBrand=query.getAll('filterBrand');

  const [min,setMin]=useState(isNumeric(query.get('minPrice'))?query.get('minPrice'):'');
  const [max,setMax]=useState(isNumeric(query.get('maxPrice'))?query.get('maxPrice'):'');

  const priceHandler=(e,set)=>{
    if(isNumeric(e.target.value)){
      set(parseInt(e.target.value));
    }
    else{
      set('');
    }
  }

  const filterPriceHandler=()=>{

    if(isNumeric(min)&&isNumeric(max)&&parseInt(min)>=parseInt(max)){
      setMin('');
      setMax('');
      query.delete('minPrice');
      query.delete('maxPrice');
    }
    else{
      isNumeric(min)?query.set('minPrice',min):query.delete('minPrice');

      isNumeric(max)?query.set('maxPrice',max):query.delete('maxPrice');

    }
    history.push('/search?'+query.toString());
      
    props.setReload(!props.reload);
  }

  const filterRatingHandler=(rating)=>{
    if(query.get('filterRating')===''+rating){
      query.delete('filterRating');
    }
    else{
      query.set('filterRating',rating);
    }

    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
    
  }

  const filterBrandHandler=(brand)=>{
      if(urlBrand.includes(brand)){
        query.delete('filterBrand');
        urlBrand = urlBrand.filter(function(item) {
          return item !== brand
        })
        urlBrand.forEach(b=>{
          query.append('filterBrand',b)
        })
      }
      else{
        query.append('filterBrand',brand);
      }
      history.push('/search?'+query.toString());
      props.setReload(!props.reload);
  }
   
  const isAssuredHandler=()=>{
    if(query.has('isAssured')){
      query.delete('isAssured');
    }
    else{
      query.append('isAssured',1)
    }
    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
  }


  const tray = props.brand.map((data, index) =>
    <div key={index}><input type="checkbox" checked={urlBrand.includes(data.brand)?true:false} onChange={()=>filterBrandHandler(data.brand)}></input><span>{data.brand}</span></div>
  );

  return(
        <div className="filterBox">
          <div className="filterBoxName">
            <span>Filters</span>
            {query.has('minPrice')||query.has('maxPrice')||query.has('isAssured')||query.has('filterRating')||query.has('filterBrand')?<p onClick={()=>{history.push('/search?q='+query.get('q').toString());props.setReload(!props.reload);}}>Clear All</p>:""}
          </div>
          <div className ="filterBoxPrice">
            <span className ="filterBoxSpan"><span>Price</span></span>
            <div className ="filterBoxPriceText">
              <input value={min} onChange={(event)=>priceHandler(event,setMin)} placeholder="Min"/>
              <input value={max} onChange={(event)=>priceHandler(event,setMax)} placeholder="Max"/>
              <button onClick={filterPriceHandler}>GO</button>
            </div>
          </div>
          <div className="filterBoxAssure">
            <input type="checkbox" checked={query.has('isAssured')} onChange={isAssuredHandler}></input>
            <img src ={assuredIcon} alt='assured'/>
            <span>ASSURED</span>
          </div>
          <div className="filterBoxRating">
            <span>CUSTOMER RATINGS</span>
            <div><input type="checkbox" checked={query.get('filterRating')==='4'?true:false} onChange={()=>filterRatingHandler(4)} ></input><span>4★ & above</span></div>
            <div><input type="checkbox" checked={query.get('filterRating')==='3'?true:false} onChange={()=>filterRatingHandler(3)} ></input><span>3★ & above</span></div>
            <div><input type="checkbox" checked={query.get('filterRating')==='2'?true:false} onChange={()=>filterRatingHandler(2)} ></input><span>2★ & above</span></div>
          </div>
          <div className="filterBoxBrandName"><span>Select Brands</span></div>
          <div className="filterBoxBrand">
            {tray}
          </div>
        </div>
  );
}

export default FilterBox;