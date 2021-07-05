import './LoginBtn.css';

const LoginBtn = props =>{
  const clickHandler =()=>{
    props.setLogin(!props.login);
  }
    if(props.auth){
      return (
        <div class="dropdown">
          <button class="dropbtn">{props.userData.name}</button>
          <div class="dropdown-content">
            <a href="#">Profile</a>
            <a href="#">orders</a>
            <a href="#">Wishlist</a>
            <a href="#">Log Out</a>
          </div>
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