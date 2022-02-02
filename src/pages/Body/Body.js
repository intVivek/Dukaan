import './Body.css';
import {useState,useEffect} from 'react';
import ProductTray from '../../components/ProductTray/ProductTray.js';
import FilterBox from '../../components/FilterBox/FilterBox.js';
import SortBox from '../../components/SortBox/SortBox.js';
import Category from '../../components/Category/Category.js';
import { useHistory,useLocation } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import BodyLoading from './BodyLoading.js';
import {UseDataBase} from "../../utils/UseDataBase.js";
import ErrorPage from '../ErrorPage/ErrorPage.js';
import LottieNotFound from '../../components/LottiePlayer/NotFound.json';
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer.jsx';


const Body = props =>{
  var location = useLocation();
  let history = useHistory();
  const query = new URLSearchParams(location.search);
  const [productData,setProductData] = useState([]);
  const [error,setError]=useState(false);
  const [sortBox,setSortBox]=useState(false);
  const [filterBox,setFilterBox]=useState(false);
  var search  = query.get('q'),
  page        = query.get('page'),
  sort        = query.get('sort'),
  isAssured   = query.get('isAssured'),
  minPrice    = query.get('minPrice'),
  maxPrice    = query.get('maxPrice'),
  filterRating= query.get('filterRating'),
  filterBrand = query.getAll('filterBrand');

  var element=0;
  useEffect(()=>{
    const url = '/product';
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
  <LottiePlayer className='loader' animationData={LottieNotFound} />
  <span>Sorry, no results found!</span>
  <p>Please check the spelling or try searching for something else</p>
</div>
const sortBtnHandler=()=>{
  setSortBox(!sortBox);
}
const filterBtnHandler=()=>{
  setFilterBox(!filterBox);
}
  return(
    error?<ErrorPage/>:
    <div className = 'MainBody'>
      {window.innerWidth>500 && <Category reload={props.reload} setLoading={props.setLoading} setReload={props.setReload}/>}
      <div className="BodyDisplay">
      {window.innerWidth>500?<><div className="BodyDisplayGap"></div>
        <FilterBox filterBox={filterBox }setFilterBox={setFilterBox} reload={props.reload} setLoading={props.setLoading} setReload={props.setReload} brand={productData[2]}/></>:""}
        {filterBox&&<FilterBox filterBox={filterBox }setFilterBox={setFilterBox} reload={props.reload} setLoading={props.setLoading} setReload={props.setReload} brand={productData[2]}/>}
        {sortBox&&<div className='SortBoxMobile'><SortBox sortBox={sortBox} setSortBox={setSortBox} sortHandler={sortHandler} getClassName={getClassName}/><div onClick={()=>setSortBox(!sortBox)} className="sortBottomClose"></div></div>}
        <div className="itemBox">
        {window.innerWidth>500?
          <div className='productSort'>
          <div className='productSortTop'><span>{search?search:"All Products"}</span>{!props.loading&&tray?.length>0?<p>({s})</p>:""}</div>
          {window.innerWidth>500 && <SortBox sortHandler={sortHandler} getClassName={getClassName}/>}
          </div>:<>
            <div className="filterSort"><button onClick={sortBtnHandler} className="sortOpenBtn">Sort</button><button onClick={filterBtnHandler} className="filterOpenBtn">filter</button></div>
            <div className='productSortTop'><span>{search?search:"All Products"}</span>{!props.loading&&tray?.length>0?<p>({s})</p>:""}</div>
          </>}
          {props.loading?<BodyLoading/>:tray?.length===0?zero:tray}
          {!props.loading&&productData?.[1]?.[0].count?
          <><div className ='bodyPagesChange'>
          <div className='pagination'><Pagination count={Math.ceil(parseInt(productData[1][0].count)/24)} page={parseInt(page)} boundaryCount={2} onChange={pageHandler}/></div>
          </div></>:""}
        </div>
      </div>
    </div>
  ); 

}

export default Body;
