import {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import LoginPage from './components/LoginModal/LoginPage.js';
import Cart from './pages/Cart/Cart.js';
import { useCookies } from 'react-cookie';
import Body from './pages/Body/Body.js';
import OrderedPage from './pages/OrderedPage/OrderedPage.js';
import ProductPage from './pages/ProductPage/ProductPage.js';
import Home from './pages/Home/Home.js';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {

  const [auth,setAuth]=useState(false);
  const [login, setLogin] = useState(false);
  const [userData,setUserData] = useState({});
  const [cookies, setCookie] = useCookies(['user']);
  const [reload,setReload] = useState(true);

useEffect(()=>{
  var email = cookies.email,
     password = cookies.password;
     console.log("cookie ",email,password);
  if(email&&password){
    
    var data = {
      email,
      password,
    }
      const url = 'http://localhost:5000/login';
      fetch(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-type": "application/json" }
      }).then(function (response) {
              return response.json(data);
      }).then(function (data) {
              if(data[0].status===0){
                      setAuth(true);
                      setUserData(data[1]);     
              }
      })
    }
},[]);
  



  return (
    <div  className="App">
      <Header 
        userData={userData}
        auth ={auth}
        login={login}
        setLogin={setLogin}
        reload={reload}
        setReload={setReload}
      />      
      {login?<LoginPage 
              setCookie={setCookie} 
              setUserData={setUserData} 
              auth={auth} 
              setAuth={setAuth} 
              login={login} 
              setLogin={setLogin} 
            />:""
      }
      <Switch>

      <Route
          exact path ="/"
          render={()=>
            <Home />
          }
        />
      
      <Route
          exact path ="/product"
          render={()=>
            <ProductPage
              auth={auth}
              login={login}
              setLogin={setLogin}
              userData={userData}
            />
          }
        />
        <Route
          exact path ="/search"
          render={()=>
            <Body 
            reload={reload}
            setReload={setReload}
            />
          }
        />
        <Route
          exact path ="/cart"
          render={()=>
            <Cart userData={userData}/>
          }
        />
        <Route
          exact path ="/orders"
          render={()=>
            <OrderedPage userData={userData}/>
          }
        />
        <Route exact path ="/*" render={()=> <Redirect path='/'/> } />
      </Switch>
    </div>
  );
}

export default App;
