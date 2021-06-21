import './CloseBtn.css';
import icon from './closeIcon.svg';
const CloseBtn = props =>{
  const modal =()=>{
    props.setLogin(!props.login);
  }
  return(
    <button className="loginCloseBtn" onClick ={modal}><img className = 'loginCloseImg' src={icon}/></button>
  );
}

export default CloseBtn;