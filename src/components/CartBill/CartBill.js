import './CartBill.css';

const CartBill = props=>{
  var totalPrice= props.data.reduce((accumulator, {price,itemInCart}) => accumulator = accumulator + price*itemInCart, 0);
  var discount = (totalPrice*0.05).toFixed(0);
  return(
    <div className='cartBill'>
      <div className='cartBillHeader'><div>PRICE DETAILS</div></div>
      <div className='cartBillMain'>
        <div><p>Price ({props.data.length} items)</p><p>
          ₹{totalPrice}</p></div>
        <div><p>Discount</p><p className='cartBillMainGreen'>- ₹{discount}</p></div>
        <div><p>Delivery Charges</p><p className='cartBillMainGreen'>FREE</p></div>
        <div className='cartMainTotal'><p>Total Amount</p><p>₹{totalPrice-discount}</p></div>
        <p className='cartBillMainGreen'>You will save ₹{discount} on this order</p>
      </div>
    </div>
  );
}
export default CartBill;