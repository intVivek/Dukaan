import './Header.css';
import { useHistory } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar.js';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import CartBtn from '../CartBtn/CartBtn.js';

const Header = (props) =>{
  let history = useHistory();
  return(
  <div className='header'>
    <h3 onClick={()=>{history.push('/home')}}>EASY BUY</h3>
    <SearchBar setSearch={props.setSearch} reload={props.reload} setReload={props.setReload}/>
    <LoginBtn reload={props.reload} setReload={props.setReload} userData={props.userData} auth ={props.auth} setAuth={props.setAuth} login = {props.login} setLogin = {props.setLogin}/>
    <CartBtn auth ={props.auth} login = {props.login} setLogin = {props.setLogin}/>
  </div>
  );
}

export default Header;