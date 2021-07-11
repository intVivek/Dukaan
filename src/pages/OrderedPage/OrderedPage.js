import './OrderedPage.css';
import OrderedItemTray from '../../components/OrderedItemTray/OrderedItemTray.js';
import { useState ,useEffect} from "react";
import {UseDataBase} from "../../utils/UseDataBase.js";
const OrderedPage=props=>{


  const [productData, setProductData] = useState([]);

    useEffect(() => {
      const url = 'http://localhost:5000/openOrders';
      var data = {
        user_id: props.userData.id
      }
      UseDataBase(data,url,setProductData);
    },[props]);

  
  const tray = productData&&productData.map((data, index) =>
    <OrderedItemTray key={index} data={data}/>
  );
  return(
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