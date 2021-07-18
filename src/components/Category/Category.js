import './Category.css';
import { useHistory } from "react-router-dom";
const Category = props =>{
  let history = useHistory();
  return(
    <div className="category">
      <div className="categoryMain">
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Electronics&page=1&sort=popularity');props.setReload(!props.reload);}}>Electronics</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Appliances&page=1&sort=popularity');props.setReload(!props.reload);}}>TVs & Appliances</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Men&page=1&sort=popularity');props.setReload(!props.reload);}}>Men</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=women&page=1&sort=popularity');props.setReload(!props.reload);}}>Women</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=kids&page=1&sort=popularity');props.setReload(!props.reload);}}>Baby & Kids</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Furniture&page=1&sort=popularity');props.setReload(!props.reload);}}>Home & Furniture</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Sports&page=1&sort=popularity');props.setReload(!props.reload);}}>Sports</span>
      <span className="categoryItems" onClick={()=>{history.push('/search?q=Books&page=1&sort=popularity');props.setReload(!props.reload);}}>Books</span>
      </div>
    </div>
  );          
}

export default Category;
