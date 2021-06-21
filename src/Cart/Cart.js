import {useState,useEffect} from 'react';
import './Cart.css';
import CartItemTray from '../CartItemTray/CartItemTray.js';
import CartBill from '../CartBill/CartBill.js';

const Cart = props =>{
  const [data, setData] = useState([
    { 
      id : 1,
      name : 'SanDisk SDDDC2-128G-I35 128 GB OTG Drive',
      price : 200,
      itemInCart : 2,
      image : 'https://rukminim1.flixcart.com/image/224/224/khxqt8w0-0/pendrive/type-a-to-type-c/c/g/g/sdddc2-064g-i35-sandisk-original-imafxubtqtxahat2.jpeg?q=90'
    },
    {
      id : 2,
     name : 'Bike Solid Men Hooded Neck Black, Red T-Shirt',
     price : 359,
     itemInCart : 1,
     image : 'https://rukminim1.flixcart.com/image/224/224/kksmikw0/t-shirt/8/j/j/s-bk4221-bike-original-imagy2a2qwfgkr7m.jpeg?q=90'
   },
   {
     id : 3,
     name : 'ASUS ROG Zephyrus G14 Ryzen 9 Octa Core 4900HS - (16 GB/512 GB SSD/Windows 10 Home/6 GB Graphics/NVIDIA GeForce GTX 1660Ti/60 Hz) GA401IU-HA251TS Gaming Laptop  (14 inch, Eclipse Grey, 1.6 Kg, With MS Office)',
     price : 108000,
     itemInCart : 1,
     image : 'https://rukminim1.flixcart.com/image/224/224/ko4ni4w0/computer/q/v/p/na-gaming-laptop-asus-original-imag2nq4adns4fgr.jpeg?q=90'
   },
   {
     id : 4,
     name : 'APPLE iPhone 11 (Black, 64 GB)',
     price : 49999,
     itemInCart : 1,
     image : 'https://rukminim1.flixcart.com/image/224/224/kgiaykw0/mobile/y/n/y/apple-iphone-11-mhda3hn-a-original-imafwqepdb3fxtug.jpeg?q=90'
   }
   ]);


  const [itemDelete, setItemDelete] = useState(0);
  const [itemMinus, setItemMinus] = useState(0);
  const [itemPlus, setItemPlus] = useState(0);
  
  useEffect(() => {
    setData(data.filter((data) => data.id != itemDelete));
  }, [itemDelete]);

 
  useEffect(() => {
    if(itemMinus>0){
    var newData = [ ...data ];
    newData[itemMinus-1].itemInCart--;
    setData(newData);
    setItemMinus(0);
    }
  }, [itemMinus]);

  useEffect(() => {
    if(itemPlus>0){
    var newData = [ ...data];
    newData[itemPlus-1].itemInCart++;
    setData(newData);
    setItemPlus(0);
    }
  }, [itemPlus]);

  const tray = data.map((data) =>
    <CartItemTray delete={setItemDelete} minus={setItemMinus} plus={setItemPlus} data={data} setData={setData}/>
  );

  return(
    <div className="cartFull">
      <div className="cartWindow">
        <div className="cartItemContainer">
          <div className="cartHeader"><p>My Cart ({data.length})</p></div>
          {tray}
          <div className="cartFooter"><button className='CartBuyBtn'>Place Order</button></div>
        </div>
        <CartBill data={data}/>
      </div>
      
    </div>
  );
}
export default Cart;