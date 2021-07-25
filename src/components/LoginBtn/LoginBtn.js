import './LoginBtn.css';
import arrow from './arrow.svg';

const LoginBtn = props =>{

    if(props.auth && props.userData){
      return (
        props.buttonLoading?<div className ='loginBtnLoading'><span className='loader'/></div>:
        <div onMouseEnter={() => props.setMenu(!props.menu)} onMouseLeave={() => props.setMenu(!props.menu)} className="dropdown">
          <button  className="dropbtn">{props?.userData?.name}<img alt='arrow' src={arrow}/></button>
          {props.menu?
          <div className="dropdown-content">
            <button onClick={props.openHomeHandler}>Home</button>
            <button className='enabled' onClick={props.openOrderHandler} >orders</button>
            <button onClick={props.openCartHandler}>Cart</button>
            <button >Wishlist</button>
            <button className='enabled' onClick={props.logOutHandler}>Log Out</button>
          </div>:""}
        </div>
      );
    }
    else{
      return <button className='loginBtn' onClick={props.clickHandler}>
        Login
        </button>
    }
}

export default LoginBtn;