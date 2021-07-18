import './LoginBtn.css';
import arrow from './arrow.svg';
import { useHistory} from "react-router-dom";
import {useState} from 'react';

const LoginBtn = props =>{
  const [menu,setMenu]=useState(false);
  let history = useHistory();
  const clickHandler =()=>{
    props.setLogin(!props.login);
  }
const logOutHandler=()=>{
  var data = {}
  const url = 'http://localhost:5000/logout';
  fetch(url, {
           credentials: "include",
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json" }
  }).then(function (response) {
          return response.json(data);
  }).then(function (data) {
    props.setAuth(false);
    history.push("/");
  });
}

    if(props.auth){
      return (
        <div onMouseEnter={() => setMenu(!menu)} onMouseLeave={() => setMenu(!menu)} class="dropdown">
          <button  className="dropbtn">{props.userData.name}<img alt='arrow' src={arrow}/></button>
          {menu?
          <div className="dropdown-content">
            <button href="#">Profile</button>
            <button onClick={()=>{setMenu(!menu);history.push("/orders");}} href="#">orders</button>
            <button href="#">Wishlist</button>
            <button href="#" onClick={logOutHandler}>Log Out</button>
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