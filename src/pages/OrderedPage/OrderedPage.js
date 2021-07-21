import './OrderedPage.css';
import OrderedItemTray from '../../components/OrderedItemTray/OrderedItemTray.js';
import { useState ,useEffect} from "react";
import {UseDataBase} from "../../utils/UseDataBase.js";
import ErrorPage from '../ErrorPage/ErrorPage.js';
import EmptyPage from '../EmptyPage/EmptyPage.js';
import loadingImg from './loading.svg';
const OrderedPage=props=>{


  const [productData, setProductData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(false);
  const [empty,setEmpty]=useState(false);

    useEffect(() => {
      const url = 'https://dukaan--app.herokuapp.com/openOrders';
      var data = {
        user_id: props.userData.id
      }
      props.userData.id && UseDataBase(data,url,setProductData,setLoading,setError,setEmpty);
    },[props]);

  
  const tray = productData&&productData.map((data, index) =>
    <OrderedItemTray key={index} data={data}/>
  );
  return(
    error?<ErrorPage/>:empty?<EmptyPage name={'No Orders Yet'}/>:loading?<div className='orderedLoading'><img src ={loadingImg} alt=''/><span>Loading Orders</span></div>:
    <div className="backgroundColor">
      <div className="OrderedPageMain">
      <div  className="OrderedPageContainer">
        <div className="OrderedPageName">Ordered History</div>
        {tray}
      </div>
    </div>  
  </div>
  );
}

export default OrderedPage;