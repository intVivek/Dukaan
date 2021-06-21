
import './LoginBtn.css';

const LoginBtn = props =>{

  const modal =()=>{
    props.setLogin(!props.login);
  }
    if(props.isAuth){
      return <h4>vivek</h4>
    }
    else{
      return <button className='loginBtn' onClick={modal}>
        Login
        </button>
    }
}

export default LoginBtn;