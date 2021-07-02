import {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import LoginPage from './components/LoginModal/LoginPage.js';
import Cart from './pages/Cart/Cart.js';
import { useCookies } from 'react-cookie';
import Body from './pages/Body/Body.js';
import ProductPage from './components/ProductPage/ProductPage.js';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [auth,setAuth]=useState(false);
  const [login, setLogin] = useState(false);
  const [userData,setUserData] = useState({});
  const [cookies, setCookie] = useCookies(['user']);
  const [productData,setProductData] = useState([]);
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState('');
  const [count,setCount]=useState(0);
  const [brand,setBrand]=useState([]);
  const [sort,setSort]=useState('popularity');
  const [filterPrice,setFilterPrice]=useState('');
  const [isAssured,setIsAssured]=useState(false);
  const [filterRating,setFilterRating]=useState('');
  const [filterBrand,setFilterBrand] =useState({});
  const [openProduct,setOpenProduct] =useState(0);


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
  
useEffect(()=>{
  const url = 'http://localhost:5000/product';
  var data = {
      search,
      page,
      sort,
      filterPrice,
      isAssured,
      filterRating,
      filterBrand
  }
      fetch(url, {
              method: "post",
              body: JSON.stringify(data),
              headers: { "Content-type": "application/json" }
      }).then(function (response) {
              return response.json(data);
      }).then(function (data) {
        
        setProductData(data[0]);
        setCount(data[1].count);
        setBrand(data[2]);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      })
},[page,search,sort,filterPrice,isAssured,filterRating,filterBrand]);


useEffect(()=>{
    setPage(1);
  },[search,sort,filterPrice,isAssured,filterRating,filterBrand]);

  useEffect(()=>{
    setFilterBrand({});
  },[search]);


  return (
    <div  className="App">
      <Header 
        userData={userData}
        auth ={auth}
        login={login}
        setLogin={setLogin}
        setSearch={setSearch}
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
          exact path ="/"
          render={()=>
            <Body 
              filterBrand={filterBrand} 
              setFilterBrand={setFilterBrand} 
              brand={brand}
              setFilterRating={setFilterRating} 
              isAssured={isAssured} 
              setIsAssured={setIsAssured} 
              setFilterPrice={setFilterPrice} 
              setSort={setSort} 
              search={search} 
              count={count} 
              page={page} 
              setPage={setPage} 
              productData={productData}
              setProductData={setProductData}
            />
          }
        />
        <Route
          exact path ="/cart"
          render={()=>
            <Cart userData={userData}/>
          }
        />
        <Route exact path ="/*" render={()=> <Redirect path='/'/> } />
      </Switch>
    </div>
  );
}

export default App;
