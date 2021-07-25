import './SideMenu.css';

const SideMenu = (props) =>{

  const clickHandler=()=>{
    props.setOpen(!props.open)
  }
  return(
    <>{props?.open?
      <div className="sidenav">
        <a onClick={clickHandler} className="sideNavClose" >&times;</a>
        <span>{"Hello, "+props.userData.name}</span>
        <button onClick={props.openHomeHandler}>Home</button>
        <button onClick={props.openOrderHandler}>Orders</button>
        <button onClick={props.openCartHandler}>Cart</button>
        <button >Wishlist</button>
        <button onClick={props.logOutHandler}>Logout</button>
      </div>:""
      }
      <span onClick={clickHandler} className="sideNavOpen" >&#9776;</span>
    </>
  );
}

export default SideMenu;