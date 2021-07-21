import {useEffect, useState } from 'react';
import './LoginPage.css';
import CloseBtn from '../../components/CloseBtn/CloseBtn.js';
import TextField from '../../components/TextField/TextField.js';
import Noty from 'noty';  
import validator from 'validator';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/nest.css";
import buttonLoadingImg from '../../buttonLoading.svg';
import {UseDataBase} from "../../utils/UseDataBase.js";

const LoginPage = props =>{
  const [reg,setReg] = useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [number,setNumber]=useState('');
  const [password,setPassword]=useState('');
  const [cpass,setCpass]=useState('');
  const [error,setError]=useState(false);
  const [buttonLoading,setButtonLoading]=useState(false);


  const authenticate =()=>{
    if(email===''){
      notification("Email cannot be empty",'error');
    }
    else if (!validator.isEmail(email)){
      notification("Enter a valid Email",'error');
    }
    else if(password===''){
      notification("Password cannot be empty",'error');
    }
    else{
      setButtonLoading(true);
      var data = {
        email,
        password   
      }
      UseDataBase(data,'http://localhost:5000/login',(dataSet)=>{
        console.log(dataSet);
        if(dataSet?.[0]?.status===0){
          props.setAuth(true);
          props.setLogin(!props.login);
          props?.setUserData(dataSet?.[1]);
        }
        else{
          notification(dataSet?.message,'error');
        }
        setButtonLoading(false);
      },setButtonLoading,setError);
    }
  }

  const register = ()=>{
    if(name===''){
      notification("Username cannot be empty",'error');
    }
    else if(email===''){
      notification("Email cannot be empty",'error');
    }
    else if (!validator.isEmail(email)){
      notification("Enter a valid Email",'error');
    }
    else if(number===''){
      notification("Mobile Number cannot be empty",'error');
    }
    if (!validator.isMobilePhone(number)){
      notification("Enter a valid Mobile Number",'error');
    }
    else if(password===''){
      notification("Password cannot be empty",'error');
    }
    else if(password.length<6){
      notification("Password should be greater than five digits",'error');
    }
    else if(password!==cpass){
      notification("Passwords do not match",'error');
    }
    else{
      setButtonLoading(true);
      const data = {
        name,
        email,
        number,
        password,
        cpass
      }
      UseDataBase(data,'http://localhost:5000/register',(dataSet)=>{
        console.log(dataSet)
        if(dataSet.status===0){
          setReg(!reg);
          notification(dataSet?.message,'success');
          }
          else{
            notification(dataSet?.message,'error');
          }
          setButtonLoading(false);
      },setButtonLoading,setError);
    }
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

  return(
    
    <div className="loginFull">
      <div className="loginWindow">
        <div className="loginPadding"></div>
        <div className="loginPage">
          <div className='loginInput'>
            {!reg?<div id = 'loginInputSection1' className="loginInputSection"></div>:""}
            <div id = 'loginInputSection2' className="loginInputSection">{!reg?<TextField key={1} setValue={setEmail} placeHolder='Enter Email'/>:<TextField setValue={setName} placeHolder='User Name'/>}</div>
            <div id = 'loginInputSection3' className="loginInputSection">{!reg?<TextField key={2} setValue={setPassword} placeHolder='Enter Password'/>:<TextField key={1} setValue={setEmail} placeHolder='Enter Email'/>}</div>
            <div id = 'loginInputSection4' className="loginInputSection">{!reg?<div className='PrivacyPolicy'>By continuing, you agree to Easy Buy's Terms of Use and Privacy Policy.</div>:<TextField setValue={setNumber} placeHolder='Enter Mobile Number'/>}</div>
            <div id = 'loginInputSection5' className="loginInputSection">{!reg?<button className='loginModalLoginBtn' type="submit" onClick={authenticate}>{buttonLoading?<img src={buttonLoadingImg} alt='buttonLoadingImg'/>:'Login'}</button>:<TextField key={2} setValue={setPassword} placeHolder='Enter Password'/>}</div>
            <div id = 'loginInputSection6' className="loginInputSection">{!reg?"":<TextField setValue={setCpass} placeHolder='Confirm Password'/>}</div>
            <div id = 'loginInputSection7' className="loginInputSection">{!reg?"":<div className='PrivacyPolicy'>By continuing, you agree to Easy Buy's Terms of Use and Privacy Policy.</div>}</div>
            <div id = 'loginInputSection8' className="loginInputSection">{!reg?"":<button className='loginModalLoginBtn' type="submit" onClick={register}>{buttonLoading?<img src={buttonLoadingImg} alt='buttonLoadingImg'/>:'Register'}</button>}</div>
            <div id = 'loginInputSection9' className="loginInputSection">{!reg?<button onClick = {()=>setReg(!reg)}>New to Easy Buy? Create an account</button>:<button onClick = {()=>setReg(!reg)}>Existing User? Log In</button>}</div>
          </div>
        </div>
        <div className="loginPadding"><CloseBtn  login={props.login} setLogin={props.setLogin}/></div>
      </div>
    </div>
  );
}

export default LoginPage;