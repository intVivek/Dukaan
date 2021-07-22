import './Body.css';
import {useState,useEffect} from 'react';
import ProductTray from '../../components/ProductTray/ProductTray.js';
import FilterBox from '../../components/FilterBox/FilterBox.js';
import Category from '../../components/Category/Category.js';
import { useHistory,useLocation } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import BodyLoading from './BodyLoading.js';
import {UseDataBase} from "../../utils/UseDataBase.js";
import ErrorPage from '../ErrorPage/ErrorPage.js';
import noResultFound from './noResultFound.png';

const Body = props =>{
  var location = useLocation();
  let history = useHistory();
  const query = new URLSearchParams(location.search);
  const [productData,setProductData] = useState([]);
  const [error,setError]=useState(false);

  var search  = query.get('q'),
  page        = query.get('page'),
  sort        = query.get('sort'),
  isAssured   = query.get('isAssured'),
  minPrice    = query.get('minPrice'),
  maxPrice    = query.get('maxPrice'),
  filterRating= query.get('filterRating'),
  filterBrand = query.getAll('filterBrand');

  useEffect(()=>{
    const url = 'https://dukaan--app.herokuapp.com/product';
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
    UseDataBase(data,url,setProductData,props.setLoading,setError);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    // eslint-disable-next-line
  },[props.reload]);
  //props.reload, filterBrand, filterRating, isAssured, maxPrice, minPrice, page, props.setLoading, search, sort
  
  const tray = productData[0]&&productData[0].map((data, index) =>
      <ProductTray  key={index} data={data}></ProductTray>
  ),
  getClassName = (sort) => {
    return sort === query.get('sort') ? 'active' : '';
  };
  const sortHandler=(order)=>{
    props.setLoading(true);
    query.set('sort',order);
    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
  }

  var s = tray&&'Showing '+Number(24*(page-1)+1)+' to '+Number(24*(page-1)+tray.length)+' Products of '+productData[1][0].count+' Products';

  const pageHandler = (event, value) => {
    props.setLoading(true);
    query.set('page',value);
    history.push('/search?'+query.toString());
    props.setReload(!props.reload);
  };
  const zero = <div className="bodyNoResult">
  <img src={noResultFound} alt=''/>
  <span>Sorry, no results found!</span>
  <p>Please check the spelling or try searching for something else</p>
</div>

  return(
    error?<ErrorPage/>:
    <div className = 'MainBody'>
      <Category reload={props.reload} setLoading={props.setLoading} setReload={props.setReload}/>
      <div className="BodyDisplay">
        <div className="BodyDisplayGap"></div>
        <FilterBox reload={props.reload} setLoading={props.setLoading} setReload={props.setReload} brand={productData[2]}/>
        <div className="itemBox">
          <div className='productSort'>
          <div className='productSortTop'><span>{search?search:"All Products"}</span>{!props.loading&&tray?.length>0?<p>({s})</p>:""}</div>
          <div className='productSortBottom'>
            <span>Sort By</span>
            <button className={getClassName('popularity')} onClick={()=>sortHandler('popularity')}>Popularity</button>
            <button className={getClassName('product_rating DESC')} onClick={()=>sortHandler('product_rating DESC')}>Rating</button>
            <button className={getClassName('discounted_price ASC')} onClick={()=>sortHandler('discounted_price ASC')}>Price -- Low to High</button>
            <button className={getClassName('discounted_price DESC')} onClick={()=>sortHandler('discounted_price DESC')}>Price -- High to Low</button>
          </div>
          </div>
          {props.loading?<BodyLoading/>:tray?.length===0?zero:tray}
          <div className ='bodyPagesChange'>
          {productData?.[1]?.[0].count?<Pagination count={Math.ceil(parseInt(productData[1][0].count)/24)} page={parseInt(page)} boundaryCount={2} onChange={pageHandler}/>:''}
          </div>
        </div>
      </div>
    </div>
  ); 

}

export default Body;
