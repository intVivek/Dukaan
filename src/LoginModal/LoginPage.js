import './LoginPage.css';
import CloseBtn from './CloseBtn/CloseBtn.js';
import TextField from './TextField/TextField.js';

const LoginPage = props =>{
  return(
    <div className="loginFull">
      <div className="loginWindow">
        <div className="loginPadding"></div>
        <div className="loginPage">
          <div className='loginInput'>
            <div id = 'loginInputSection1' className="loginInputSection"></div>
            <div id = 'loginInputSection2' className="loginInputSection"> <TextField placeHolder='Enter Email'/></div>
            <div id = 'loginInputSection3' className="loginInputSection"><TextField placeHolder='Enter Password'/></div>
            <div id = 'loginInputSection4' className="loginInputSection"><div className='PrivacyPolicy'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</div></div>
            <div id = 'loginInputSection5' className="loginInputSection"><button className='loginModalLoginBtn'>Login</button></div>
            <div id = 'loginInputSection6' className="loginInputSection"><h2>OR</h2></div>
            <div id = 'loginInputSection7' className="loginInputSection"><button className='loginModalReqOTPBtn'>Request OTP</button></div>
            <div id = 'loginInputSection8' className="loginInputSection"></div>
            <div id = 'loginInputSection9' className="loginInputSection"><h3>New to Flipkart? Create an account</h3></div>
          </div>
        </div>
        <div className="loginPadding"><CloseBtn  login={props.login} setLogin={props.setLogin}/></div>
      </div>
    </div>
  );
}

export default LoginPage;