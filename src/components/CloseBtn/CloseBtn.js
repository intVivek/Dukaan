import './CloseBtn.css';
import icon from './closeIcon.svg';

const CloseBtn = props =>{
  const clickHandler =()=>{
    props.setLogin(!props.login);
  }
  return(
    <button className="loginCloseBtn" onClick ={clickHandler}><img className = 'loginCloseImg' alt='cross' src={icon}/></button>
  );
}

export default CloseBtn;