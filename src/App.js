import {useState} from 'react';
import './App.css';
import Header from './UI/Header/Header.js'
import LoginPage from './LoginModal/LoginPage.js';
import Cart from './Cart/Cart.js';
function App() {
  const isAuth = false;
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState(false);
  return (
    <div  className="App">
      { login ? <LoginPage login={login} setLogin={setLogin} />:""}
      <>
        <Header 
          isAuth ={isAuth}
          login={login}
          setLogin={setLogin}
          cart={cart}
          setCart={setCart}
        />
        {cart?<Cart/>:""}
      </>
      
    </div>
  );
}

export default App;
