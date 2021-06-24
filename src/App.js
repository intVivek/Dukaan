import {useState,useEffect} from 'react';
import './App.css';
import Header from './UI/Header/Header.js'
import LoginPage from './LoginModal/LoginPage.js';
import Cart from './Cart/Cart.js';

function App() {
  const [auth,setAuth]=useState(false);
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState(false);
  const [userData,setUserData] = useState({});

useEffect(()=>{
  const url = 'http://localhost:5000/';
      fetch(url, {
              method: "get",
              headers: { "Content-type": "application/json" }
      }).then(function (response) {
              return response.json();
      }).then(function (data) {
        console.log("hello");
        console.log(data);
              if(data.status===1){
                      setAuth(true);
                      setUserData(data);
              }
      })
},[]);
  
  return (
    <div  className="App">
      {login ? <LoginPage setUserData={setUserData} auth={auth} setAuth={setAuth} login={login} setLogin={setLogin} />:""}
      <>
        <Header 
          userData={userData}
          auth ={auth}
          login={login}
          setLogin={setLogin}
          cart={cart}
          setCart={setCart}
        />
        {cart&&!login?<Cart/>:""}
      </>
      
    </div>
  );
}

export default App;
