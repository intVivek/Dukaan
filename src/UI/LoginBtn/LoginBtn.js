
import './LoginBtn.css';

const LoginBtn = props =>{

  const modal =()=>{
    props.setLogin(!props.login);
  }
    if(props.auth){
      return <h4>{props.userData.email}</h4>
    }
    else{
      return <button className='loginBtn' onClick={modal}>
        Login
        </button>
    }
}

export default LoginBtn;