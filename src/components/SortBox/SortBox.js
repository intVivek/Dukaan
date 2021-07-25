import './SortBox.css';

const SortBox = props =>{

  return(
    <div className='productSortBottom'>
      {window.innerWidth<=500 &&<p onClick={()=>props.setSortBox(!props.sortBox)} className="sortBoxCloseMobile" >&times;</p>}
    <span>Sort By</span>
    <button className={props.getClassName('popularity')} onClick={()=>props.sortHandler('popularity')}>Popularity</button>
    <button className={props.getClassName('product_rating DESC')} onClick={()=>props.sortHandler('product_rating DESC')}>Rating</button>
    <button className={props.getClassName('discounted_price ASC')} onClick={()=>props.sortHandler('discounted_price ASC')}>Price -- Low to High</button>
    <button className={props.getClassName('discounted_price DESC')} onClick={()=>props.sortHandler('discounted_price DESC')}>Price -- High to Low</button>
  </div>
  );
}

export default SortBox;