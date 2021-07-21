import './Header.css';
import { useHistory } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar.js';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import CartBtn from '../CartBtn/CartBtn.js';
import { useParams } from "react-router-dom";

const Header = (props) =>{
  let history = useHistory();
  const page = useParams().page;
  return(
  <div className='header'>
    <h3 onClick={()=>{!page=='' && history.push('/home')}}>EASY BUY</h3>
    <SearchBar setBodyLoading ={props.setBodyLoading} setSearch={props.setSearch} reload={props.reload} setReload={props.setReload}/>
    <LoginBtn reload={props.reload} setReload={props.setReload} userData={props.userData} auth ={props.auth} setAuth={props.setAuth} login = {props.login} setLogin = {props.setLogin}/>
    <CartBtn auth ={props.auth} login = {props.login} setLogin = {props.setLogin} cartOpen={props.cartOpen}/>
  </div>
  );
}

export default Header;