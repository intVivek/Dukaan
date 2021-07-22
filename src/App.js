import {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import LoginPage from './components/LoginModal/LoginPage.js';
import Cart from './pages/Cart/Cart.js';
import Body from './pages/Body/Body.js';
import OrderedPage from './pages/OrderedPage/OrderedPage.js';
import ProductPage from './pages/ProductPage/ProductPage.js';
import Home from './pages/Home/Home.js';
import { Redirect, useParams } from "react-router-dom";
import {UseDataBase} from "./utils/UseDataBase.js";

function App() {
  const path = useParams().page || '';
  const [auth,setAuth]=useState(false);
  const [login, setLogin] = useState(false);
  const [userData,setUserData] = useState({});
  const [reload,setReload] = useState(true);
  const [bodyLoading,setBodyLoading]=useState(true);

  useEffect(()=>{
      var data = {}
        UseDataBase(data,'/isLogin',(dataSet)=>{
          if(dataSet){
            setUserData(dataSet[0])
            setAuth(true);
            }
        });
  },[]);

   useEffect(() => {
    console.log(login);
    if (login) document.querySelector('.App').style.overflow='hidden';
    else document.querySelector('.App').style.overflow='auto';
  }, [login]);


console.log('path', path);
  var page;
  switch(path){
    case ''        : page = <Home setLoading={setBodyLoading} reload={reload} setReload={setReload}/>;break;
    case 'product' : page = <ProductPage auth={auth} login={login} setLogin={setLogin} userData={userData}/>;break;
    case 'search'  : page = <Body loading={bodyLoading} setLoading={setBodyLoading} reload={reload} setReload={setReload}/>;break;
    case 'cart'    : page = <Cart userData={userData} />;break;
    case 'orders'  : page = <OrderedPage userData={userData}/>;break;
    default        : page = <Redirect to='/'/>;break;
  }

  return (
    <div  className="App">
      <Header 
        userData={userData}
        auth ={auth}
        login={login}
        setLogin={setLogin}
        reload={reload}
        setReload={setReload}
        setAuth={setAuth}
        setUserData={setUserData}
        setBodyLoading={setBodyLoading}
      />      
      {login?<LoginPage 
              setUserData={setUserData} 
              auth={auth} 
              setAuth={setAuth} 
              login={login} 
              setLogin={setLogin} 
              reload={reload}
            setReload={setReload}
            />:""
      }
      {page}
    </div>
  );
}

export default App;
