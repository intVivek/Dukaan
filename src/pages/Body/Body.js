import './Body.css';
import {useState,useEffect} from 'react';
import ProductTray from '../../components/ProductTray/ProductTray.js';
import FilterBox from '../../components/FilterBox/FilterBox.js';
import Category from '../../components/Category/Category.js';
import { useHistory,useLocation } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';


const Body = props =>{
  var location = useLocation();
  let history = useHistory();
  const query = new URLSearchParams(location.search);
  const [productData,setProductData] = useState([]);
  const [count,setCount]=useState(0);
  const [brand,setBrand]=useState([]);


  var search  = query.get('q'),
  page        = query.get('page'),
  sort        = query.get('sort'),
  isAssured   = query.get('isAssured'),
  minPrice    = query.get('minPrice'),
  maxPrice    = query.get('maxPrice'),
  filterRating= query.get('filterRating'),
  filterBrand = query.getAll('filterBrand');

  useEffect(()=>{

    const url = 'http://localhost:5000/product';
    var data = {
        search,
        page,
        sort,
        minPrice,
        maxPrice,
        isAssured,
        filterRating,
        filterBrand
    }
        fetch(url, {
                credentials: "include",
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json" }
        }).then(function (response) {
                return response.json(data);
        }).then(function (data) {
          setProductData(data[0]);
          setCount(data[1][0].count);
          setBrand(data[2]);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
  },[props.reload]);
  
  const tray = productData.map((data, index) =>
      <ProductTray  key={index} data={data}></ProductTray>
  ),
  getClassName = (sort) => {
    return sort === query.get('sort') ? 'active' : '';
  };
  const sortHandler=(order)=>{
    query.set('sort',order);
    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
  }

  var s = 'Showing '+Number(24*(page-1)+1)+' to '+Number(24*(page-1)+tray.length)+' Products of '+count+' Products';

  const pageHandler = (event, value) => {
    query.set('page',value);
    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
  };
  return(
    <div className = 'MainBody'>
      <Category reload={props.reload} setReload={props.setReload}/>
      <div className="BodyDisplay">
        <div className="BodyDisplayGap"></div>
        <FilterBox reload={props.reload} setReload={props.setReload} brand={brand}/>
        <div className="itemBox">
          <div className='productSort'>
          <div className='productSortTop'><span>{search?search:"All Products"}</span><p>({s})</p></div>
          <div className='productSortBottom'>
            <span>Sort By</span>
            <button className={getClassName('popularity')} onClick={()=>sortHandler('popularity')}>Popularity</button>
            <button className={getClassName('product_rating DESC')} onClick={()=>sortHandler('product_rating DESC')}>Rating</button>
            <button className={getClassName('discounted_price ASC')} onClick={()=>sortHandler('discounted_price ASC')}>Price -- Low to High</button>
            <button className={getClassName('discounted_price DESC')} onClick={()=>sortHandler('discounted_price DESC')}>Price -- High to Low</button>
          </div>
          </div>
          {tray}
          <div className ='bodyPagesChange'>
          <Pagination count={Math.ceil(count/24)} page={parseInt(page)} boundaryCount={2} onChange={pageHandler}/>
          </div>
        </div>
        
      </div>
    </div>
  ); 

}
export default Body;