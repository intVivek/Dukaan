import {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import LoginPage from './components/LoginModal/LoginPage.js';
import Cart from './pages/Cart/Cart.js';
import Body from './pages/Body/Body.js';
import OrderedPage from './pages/OrderedPage/OrderedPage.js';
import ProductPage from './pages/ProductPage/ProductPage.js';
import Home from './pages/Home/Home.js';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {

  const [auth,setAuth]=useState(false);
  const [login, setLogin] = useState(false);
  const [userData,setUserData] = useState({});
  const [reload,setReload] = useState(true);


  useEffect(()=>{
      var data = {}
        const url = 'http://localhost:5000/isLogin';
        fetch(url, {
                 credentials: "include",
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json" }
        }).then(function (response) {
                return response.json(data);
        }).then(function (data) {
          if(data){
          setUserData(data[0])
          setAuth(true);
          }
        });
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
        setAuth={setAuth}
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
      <Switch>

      <Route
          exact path ="/"
          render={()=>
            <Home 
              reload={reload}
              setReload={setReload}
            />
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
