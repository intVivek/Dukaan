import './Body.css';
import {useState,useEffect} from 'react';
import ProductTray from '../../components/ProductTray/ProductTray.js';
import FilterBox from '../../components/FilterBox/FilterBox.js';

const Body = props =>{
  const [activeSort, setActiveSort]=useState('popularity');
  
  const tray = props.productData.map((data, index) =>
      <ProductTray  key={index} data={data}></ProductTray>
  ),
  getClassName = (sort) => {
    return sort === activeSort ? 'active' : '';
  };
  var s = 'Showing '+Number(24*(props.page-1)+1)+' to '+Number(24*(props.page-1)+tray.length)+' Products of '+props.count+' Products';

  useEffect(() => {
    props.setSort(activeSort);
  }, [activeSort]);

  return(
    <div className = 'MainBody'>
      <div className="bodyHeader">hello</div>
      <div className="BodyDisplay">
        <div className="BodyDisplayGap"></div>
        <FilterBox filterBrand={props.filterBrand} setFilterBrand={props.setFilterBrand} brand={props.brand} setFilterRating={props.setFilterRating} isAssured={props.isAssured} setIsAssured={props.setIsAssured} setFilterPrice={props.setFilterPrice}/>
        <div className="itemBox">
          <div className='productSort'>
          <div className='productSortTop'><span>{props.search?props.search:"All Products"}</span><p>({s})</p></div>
          <div className='productSortBottom'>
            <span>Sort By</span>
            <button className={getClassName('popularity')} onClick={()=>setActiveSort('popularity')}>Popularity</button>
            <button className={getClassName('product_rating DESC')} onClick={()=>setActiveSort('product_rating DESC')}>Rating</button>
            <button className={getClassName('discounted_price ASC')} onClick={()=>setActiveSort('discounted_price ASC')}>Price -- Low to High</button>
            <button className={getClassName('discounted_price DESC')} onClick={()=>setActiveSort('discounted_price DESC')}>Price -- High to Low</button>
          </div>
          </div>
          {tray}
          <div className ='bodyPagesChange'>
           Prev&nbsp;<button className ='bodyPagesChangePrev' onClick={()=>{if(props.page>1){props.setPage(props.page-1)}}}>&lt;</button>
            <button className ='bodyPagesChangePrev' onClick={()=>{if(props.page<=(props.count/24)){props.setPage(props.page+1)}}}>&gt;</button> Next
          </div>
        </div>
        
      </div>
    </div>
  );                               
}
export default Body;