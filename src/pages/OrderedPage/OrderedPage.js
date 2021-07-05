import './OrderedPage.css';
import OrderedItemTray from '../../components/OrderedItemTray/OrderedItemTray.js';
import { useState ,useEffect} from "react";
const OrderedPage=props=>{


  const [productData, setProductData] = useState([]);

    useEffect(() => {
      const url = 'http://localhost:5000/openOrders';
      var data = {
        user_id: props.userData.id
      }
      fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
      }).then(function (response) {
        return response.json(data);
      }).then(function (data) {
        setProductData(data);
        console.log(data);
      })
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