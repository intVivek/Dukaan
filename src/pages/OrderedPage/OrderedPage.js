import './OrderedPage.css';
import OrderedItemTray from '../../components/OrderedItemTray/OrderedItemTray.js';
import { useState ,useEffect} from "react";
import {UseDataBase} from "../../utils/UseDataBase.js";
import ErrorPage from '../ErrorPage/ErrorPage.js';
import EmptyPage from '../EmptyPage/EmptyPage.js';
import LottieLoading from '../../components/LottiePlayer/OrderLoading.json';
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer.jsx';
const OrderedPage=props=>{


  const [productData, setProductData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(false);
  const [empty,setEmpty]=useState(false);

    useEffect(() => {
      const url = '/openOrders';
      var data = {
        user_id: props.userData.id
      }
      props.userData.id && UseDataBase(data,url,setProductData,setLoading,setError,setEmpty);
    },[props]);

  
  const tray = productData&&productData.map((data, index) =>
    <OrderedItemTray key={index} data={data}/>
  );
  return(
    error?<ErrorPage/>:empty?<EmptyPage name={'No Orders Yet'}/>:loading?<div className="homeLoading"><LottiePlayer className='loader' animationData={LottieLoading} /><span>Loading ...</span></div>:
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