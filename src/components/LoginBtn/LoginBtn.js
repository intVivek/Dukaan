import './LoginBtn.css';
import arrow from './arrow.svg';
import { useHistory} from "react-router-dom";
import {useState} from 'react';
import {UseDataBase} from "../../utils/UseDataBase.js";
import Noty from 'noty';  
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const LoginBtn = props =>{
  const [menu,setMenu]=useState(false);
  const [error,setError]=useState(false);
  const [buttonLoading,setButtonLoading]=useState(false);
  const page = useParams().page;

  let history = useHistory();
  const clickHandler =()=>{
    props.setLogin(!props.login);
  }
const logOutHandler=()=>{

  setButtonLoading(true);
  var data = {}
  UseDataBase(data,'http://localhost:5000/logout',(dataSet)=>{
    console.log(dataSet);
    if(dataSet?.status===0){
      props.setUserData({});
      console.log('user',props.userData);
      props.setAuth(false);
      setMenu(false);
      history.push("/");
      notification(dataSet?.message,'success');
    }
    else{
      notification(dataSet?.message,'error');
    }
    setButtonLoading(false);
  },setButtonLoading,setError);
}
const openOrderHandler=()=>{
  console.log('page',page)
  if(page!=='orders'){
    setMenu(!menu);
    history.push("/orders");
  }
}
useEffect(()=>{
  if(error){
    notification('Some error Occured','error');
    setButtonLoading(false);
  }
},[error]);

const notification = (message,type) =>{
  new Noty({
          type: type,
          theme: 'nest',
          timeout: 1500,
          text: message
  }).show();
  }
  useEffect(() => {
    if (buttonLoading) document.querySelector('.App').style.overflow='hidden';
    else document.querySelector('.App').style.overflow='auto';
  }, [buttonLoading]);

    if(props.auth && props.userData){
      return (
        buttonLoading?<div className ='loginBtnLoading'><span className='loader'/></div>:
        <div onMouseEnter={() => setMenu(!menu)} onMouseLeave={() => setMenu(!menu)} className="dropdown">
          <button  className="dropbtn">{props?.userData?.name}<img alt='arrow' src={arrow}/></button>
          {menu?
          <div className="dropdown-content">
            <button disabled={true}>Profile</button>
            <button onClick={openOrderHandler} >orders</button>
            <button disabled={true} >Wishlist</button>
            <button onClick={logOutHandler}>Log Out</button>
          </div>:""}
        </div>
      );
    }
    else{
      return <button className='loginBtn' onClick={clickHandler}>
        Login
        </button>
    }
}

export default LoginBtn;