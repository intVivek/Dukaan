import './CartBill.css';

const CartBill = props=>{
  
  var dp= props?.data.reduce((accumulator, {discounted_price,quantity}) => accumulator = accumulator + discounted_price*quantity, 0);
  var rp= props?.data.reduce((accumulator, {retail_price,quantity}) => accumulator = accumulator + retail_price*quantity, 0);
  var discount = rp-dp;
  return(
    <div className='cartBill'>
      <div className='cartBillHeader'><div>PRICE DETAILS</div></div>
      <div className='cartBillMain'>
        <div><p>Price ({props.data.length} items)</p><p>
          ₹{dp.toLocaleString()}</p></div>
        <div><p>Discount</p><p className='cartBillMainGreen'>- ₹{discount.toLocaleString()}</p></div>
        <div><p>Delivery Charges</p><p className='cartBillMainGreen'>FREE</p></div>
        <div className='cartMainTotal'><p>Total Amount</p><p>₹{(dp).toLocaleString()}</p></div>
        <p className='cartBillMainGreen'>You will save ₹{discount.toLocaleString()} on this order</p>
      </div>
    </div>
  );
}
export default CartBill;