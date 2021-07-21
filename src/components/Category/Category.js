import './Category.css';
import { useHistory } from "react-router-dom";
const Category = props =>{
  let history = useHistory();
  const clickHandler = (q) =>{
    console.log(props);
    props.setLoading(true);
    history.push('/search?q='+q+'&page=1&sort=popularity');
    props.setReload(!props.reload);
  }
  return(
    <div className="category">
      <div className="categoryMain">
      <span className="categoryItems" onClick={()=>clickHandler('Electronics')}>Electronics</span>
      <span className="categoryItems" onClick={()=>clickHandler('Appliances')}>TVs & Appliances</span>
      <span className="categoryItems" onClick={()=>clickHandler('Men')}>Men</span>
      <span className="categoryItems" onClick={()=>clickHandler('Women')}>Women</span>
      <span className="categoryItems" onClick={()=>clickHandler('Kids')}>Baby & Kids</span>
      <span className="categoryItems" onClick={()=>clickHandler('Furniture')}>Home & Furniture</span>
      <span className="categoryItems" onClick={()=>clickHandler('Sports')}>Sports</span>
      <span className="categoryItems" onClick={()=>clickHandler('Books')}>Books</span>
      </div>
    </div>
  );          
}

export default Category;
