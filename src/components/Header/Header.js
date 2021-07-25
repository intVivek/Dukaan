import './Header.css';
import { useHistory } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar.js';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import CartBtn from '../CartBtn/CartBtn.js';
import { useParams } from "react-router-dom";
import SideMenu from '../SideMenu/SideMenu.js';
import {useState,useEffect} from 'react';
import {UseDataBase} from "../../utils/UseDataBase.js";
import Noty from 'noty';  

const Header = (props) =>{
  let history = useHistory();
  const page = useParams().page;
  const [error,setError]=useState(false);
  const [buttonLoading,setButtonLoading]=useState(false);
  const [menu,setMenu]=useState(false);
  const [openNav,setOpenNav] = useState(false);

  const clickHandler =()=>{
    props.setLogin(!props.login);
  }
const logOutHandler=()=>{

  setButtonLoading(true);
  var data = {}
  UseDataBase(data,'/logout',(dataSet)=>{
    if(dataSet?.status===0){
      props.setAuth(false);
      setMenu(false);
      setOpenNav(!openNav);
      history.push("/home");
      notification(dataSet?.message,'success');
    }
    else{
      notification(dataSet?.message,'error');
    }
    setButtonLoading(false);
  },setButtonLoading,setError);
}
const openOrderHandler=()=>{
  if(page!=='orders'){
    history.push("/orders");
  }
  setMenu(!menu);
  setOpenNav(!openNav);
}
const openCartHandler=()=>{
  if(page!=='cart'){
    history.push("/cart");
  }
  setMenu(!menu);
  setOpenNav(!openNav);
}
const openHomeHandler=()=>{
  if(page){
    history.push("");
  }
  setMenu(!menu);
  setOpenNav(!openNav);
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

console.log(props.auth);

  return(
    window.innerWidth>500?
  <div className='header'>
    <h3 onClick={()=>{page && history.push('')}}>DUKAAN</h3>
    <SearchBar setBodyLoading ={props.setBodyLoading} setSearch={props.setSearch} reload={props.reload} setReload={props.setReload}/>
    <LoginBtn menu={menu} setMenu={setMenu} buttonLoading={buttonLoading} auth={props.auth} userData={props.userData} openOrderHandler={openOrderHandler} logOutHandler={logOutHandler} clickHandler={clickHandler} openCartHandler={openCartHandler} openHomeHandler={openHomeHandler}/>
    <CartBtn auth ={props.auth} login = {props.login} setLogin = {props.setLogin} cartOpen={props.cartOpen}/>
  </div>:
  <div className='header'>
    <div className='headerMobile'>
      {props.auth?<SideMenu open={openNav} setOpen={setOpenNav} login = {props.login} setLogin = {props.setLogin} auth={props.auth} userData={props.userData} buttonLoading={buttonLoading} openOrderHandler={openOrderHandler} logOutHandler={logOutHandler} clickHandler={clickHandler} openCartHandler={openCartHandler} openHomeHandler={openHomeHandler}/>:<div className='sideMenuFiller'></div>}
      <div className='headerMobileName'>
      <h3 onClick={()=>{page && history.push('')}}>DUKAAN</h3>
      {props.auth?
      <CartBtn auth ={props.auth} login = {props.login} setLogin = {props.setLogin} cartOpen={props.cartOpen}/>:<div onClick={()=>{props.setLogin(!props.login)}}>login</div>}</div>
    </div>
    <SearchBar setBodyLoading ={props.setBodyLoading} setSearch={props.setSearch} reload={props.reload} setReload={props.setReload}/>
  </div>
  );
}

export default Header;