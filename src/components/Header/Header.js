import './Header.css';
import SearchBar from '../SearchBar/SearchBar.js';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import CartBtn from '../CartBtn/CartBtn.js';

const Header = (props) =>{
  return(
  <div className='header'>
    <h3>EASY BUY</h3>
    <SearchBar setSearch={props.setSearch} reload={props.reload} setReload={props.setReload}/>
    <LoginBtn userData={props.userData} auth ={props.auth} login = {props.login} setLogin = {props.setLogin}/>
    <CartBtn auth ={props.auth} login = {props.login} setLogin = {props.setLogin}/>
  </div>
  );
}

export default Header;